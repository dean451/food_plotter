import { useState } from 'react'
import { createPortal } from 'react-dom'
import { PlantIcon } from '../sprites.jsx'
import { plantsPerBedShared, plantFitsZone, plantFitsRegion, REGION_INFO } from '../utils.js'
import { SUN_LABEL, WATER_LABEL, panelStyle, pillBtnStyle } from '../ui.js'

const MAX_ROSTER = 3

const SEASON_COLORS = {
  spring: '#81c784', summer: '#ffb74d', fall: '#ff8a65', winter: '#64b5f6', perennial: '#ba68c8',
}

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'vegetable', label: 'Veg' },
  { key: 'herb', label: 'Herbs' },
  { key: 'fruit', label: 'Fruit' },
  { key: 'flower', label: 'Flower' },
  { key: 'native', label: 'Native' },
]

function PlantTooltip({ plant, anchorY, anchorX, yardZone, yardRegion }) {
  const zoneFits   = plantFitsZone(plant, yardZone)
  const regionFits = plantFitsRegion(plant, yardRegion)
  return (
    <div style={{
      position: 'fixed', top: anchorY, left: anchorX + 8,
      transform: 'translateY(-50%)', width: 220, zIndex: 9999,
      background: '#fff', border: '1px solid #ddd', borderRadius: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.12)', padding: '12px 14px',
      pointerEvents: 'none', fontSize: 12, lineHeight: 1.5,
      colorScheme: 'light', color: '#333',
    }}>
      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <PlantIcon name={plant.name} emoji={plant.emoji} size={20} />
        {plant.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: '#555' }}>
        {plant.sun         && <span>{SUN_LABEL[plant.sun] ?? plant.sun}</span>}
        {plant.water_needs && <span>{WATER_LABEL[plant.water_needs] ?? plant.water_needs}</span>}
        {plant.deer_resistant && <span>🦌 Deer resistant</span>}
        {plant.attracts    && <span>🦋 Attracts {plant.attracts}</span>}
        {plant.zone_min && <span>🌡 Zones {plant.zone_min}–{plant.zone_max}</span>}
      </div>
      {!zoneFits && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #eee', color: '#c62828', fontSize: 11, lineHeight: 1.5 }}>
          ⚠ Not rated for zone {yardZone} — may need winter protection or annual replanting
        </div>
      )}
      {zoneFits && !regionFits && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #eee', color: '#e65100', fontSize: 11, lineHeight: 1.5 }}>
          🗺 Native to {REGION_INFO[plant.region]?.label ?? plant.region}, not {REGION_INFO[yardRegion]?.label ?? yardRegion} — will grow here, just isn't local
        </div>
      )}
      {plant.native_notes && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #eee', color: '#777', fontStyle: 'italic', fontSize: 11, lineHeight: 1.5 }}>
          {plant.native_notes}
        </div>
      )}
    </div>
  )
}

export default function PlantPanel({ bed, plants, zone, region, onAddPlant, onRemovePlant, maxHeight, bare = false }) {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('all')
  const [tooltip, setTooltip]   = useState(null)
  // bare: dropped into a container that already has its own border/rounding
  // (the mobile bottom sheet) — a nested card here just wastes width.
  const outerStyle = {
    ...panelStyle,
    ...(bare ? { border: 'none', borderRadius: 0 } : {}),
    ...(maxHeight ? { maxHeight } : {}),
  }

  const roster     = bed?.extra_plants ?? []
  const rosterIds  = new Set(roster.map((p) => p.id))
  const full       = roster.length >= MAX_ROSTER

  const filtered = plants
    .filter((p) =>
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    // out-of-zone or non-local-native plants sink to the bottom
    .sort((a, b) => {
      const af = plantFitsZone(a, zone) && plantFitsRegion(a, region)
      const bf = plantFitsZone(b, zone) && plantFitsRegion(b, region)
      return bf - af
    })

  function plantsPerBed(plant) {
    if (!bed) return null
    const sharing = rosterIds.has(plant.id) ? roster.length : roster.length + 1
    return plantsPerBedShared(bed, plant, sharing)
  }

  return (
    <div style={outerStyle}>
      {/* Header */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 700, fontSize: 13 }}>Plants</div>
        <div style={{ fontSize: 11, color: bed ? '#555' : '#aaa', marginTop: 2 }}>
          {bed ? `${bed.name} · ${roster.length}/${MAX_ROSTER}` : 'Select a bed to assign'}
        </div>
      </div>

      {/* Roster chips */}
      {bed && (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #eee', minHeight: 40, flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center', alignContent: 'flex-start' }}>
          {roster.length === 0 && (
            <span style={{ fontSize: 11, color: '#bbb' }}>No plants yet</span>
          )}
          {roster.map((p) => (
            <span key={p.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 500,
              background: '#e8f5e9', border: '1px solid #a5d6a7', color: '#2e7d32',
            }}>
              <PlantIcon name={p.name} emoji={p.emoji} size={14} />
              {p.name}
              <button
                onClick={() => onRemovePlant(bed, p.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, color: '#888', fontSize: 13, marginLeft: 1 }}
                title={`Remove ${p.name}`}
              >×</button>
            </span>
          ))}
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '8px 12px 4px' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            style={pillBtnStyle(category === c.key, { padding: '3px 0', fontSize: 10, textAlign: 'center' })}
          >{c.label}</button>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: '4px 12px 6px' }}>
        <input
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '4px 8px', fontSize: 12, border: '1px solid #ddd', borderRadius: 4, boxSizing: 'border-box' }}
        />
      </div>

      {/* Plant list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {full && (
          <div style={{ fontSize: 11, color: '#999', textAlign: 'center', padding: '6px 0 2px', fontStyle: 'italic' }}>
            Roster full — remove a plant to add another
          </div>
        )}
        {filtered.length === 0 && (
          <div style={{ color: '#bbb', fontSize: 12, textAlign: 'center', marginTop: 16 }}>No plants found</div>
        )}
        {filtered.map((plant) => {
          const inRoster  = rosterIds.has(plant.id)
          const disabled  = !bed || full || inRoster
          const count      = plantsPerBed(plant)
          const zoneFits   = plantFitsZone(plant, zone)
          const regionFits = plantFitsRegion(plant, region)
          const fits       = zoneFits && regionFits
          return (
            <div
              key={plant.id}
              onClick={() => !disabled && onAddPlant(bed, plant)}
              onMouseEnter={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                setTooltip({ plant, y: r.top + r.height / 2, x: r.right })
              }}
              onMouseLeave={() => setTooltip(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '5px 7px',
                borderRadius: 5,
                cursor: disabled ? 'default' : 'pointer',
                background: inRoster ? '#e8f5e9' : 'transparent',
                border: inRoster ? '1px solid #a5d6a7' : '1px solid transparent',
                opacity: (full && !inRoster) || !bed ? 0.4 : !fits ? 0.45 : 1,
              }}
            >
              <PlantIcon name={plant.name} emoji={plant.emoji} size={22} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: inRoster ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {plant.name}
                </div>
                <div style={{ fontSize: 10, color: '#999' }}>{plant.spacing_ft} ft</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {inRoster ? (
                  <span style={{ fontSize: 11, color: '#4caf50' }}>✓</span>
                ) : !zoneFits ? (
                  <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 10, border: '1px solid #ef9a9a', color: '#c62828', whiteSpace: 'nowrap' }}>
                    zones {plant.zone_min}–{plant.zone_max}
                  </span>
                ) : !regionFits ? (
                  <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 10, border: '1px solid #ffcc80', color: '#e65100', whiteSpace: 'nowrap' }}>
                    not local native
                  </span>
                ) : (
                  <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 10, background: SEASON_COLORS[plant.season] ?? '#ddd', color: '#fff' }}>
                    {plant.season}
                  </span>
                )}
                {count !== null && !inRoster && (
                  <div style={{ fontSize: 10, color: '#888', marginTop: 1 }}>{count} fit</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {tooltip && createPortal(
        <PlantTooltip plant={tooltip.plant} anchorY={tooltip.y} anchorX={tooltip.x} yardZone={zone} yardRegion={region} />,
        document.body
      )}
    </div>
  )
}
