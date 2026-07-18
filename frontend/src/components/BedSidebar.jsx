import { sqft, lumberCost, soilCost, plantsCost, formatCost, plantsPerBedShared, plantFitsZone, plantFitsRegion } from '../utils.js'
import { PlantIcon } from '../sprites.jsx'
import { SUN_LABEL, WATER_LABEL, panelStyle } from '../ui.js'

function intraBedPairs(extraPlants) {
  const pairs = []
  for (let i = 0; i < extraPlants.length; i++) {
    for (let j = i + 1; j < extraPlants.length; j++) {
      const p1 = extraPlants[i]
      const p2 = extraPlants[j]
      const rel = (p1.companions ?? []).find((c) => c.id === p2.id)
      if (rel) pairs.push({ p1, p2, relationship: rel.relationship, notes: rel.notes })
    }
  }
  return pairs
}

export default function BedSidebar({ bed, zone, region, onRemovePlant, maxHeight }) {
  const outerStyle = maxHeight ? { ...panelStyle, maxHeight } : panelStyle

  if (!bed) {
    return (
      <div style={outerStyle}>
        <div style={{ padding: 20, color: '#aaa', fontSize: 13, textAlign: 'center', marginTop: 40 }}>
          Click a bed to see details
        </div>
      </div>
    )
  }

  const extraPlants = bed.extra_plants ?? []
  const pairs = extraPlants.length >= 2 ? intraBedPairs(extraPlants) : []

  const outboundMap = {}
  for (const plant of extraPlants) {
    for (const c of (plant.companions ?? [])) {
      if (extraPlants.some((p) => p.id === c.id)) continue
      if (!outboundMap[c.id] || c.relationship === 'harmful') {
        outboundMap[c.id] = { ...c, forPlant: plant.name }
      }
    }
  }
  const goodWith = Object.values(outboundMap).filter((c) => c.relationship === 'beneficial')
  const avoid    = Object.values(outboundMap).filter((c) => c.relationship === 'harmful')

  return (
    <div style={outerStyle}>
      {/* Bed header */}
      <div style={{ padding: '12px 14px', borderBottom: '1px solid #eee' }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>{bed.name}</div>
        {extraPlants.length > 0 && (
          <div style={{ fontSize: 12, color: '#2e7d32', marginTop: 2, lineHeight: 1.4 }}>
            ({extraPlants.map((p) => p.name).join(', ')})
          </div>
        )}
        <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>
          {bed.width} × {bed.height} ft &nbsp;·&nbsp; {sqft(bed.width * bed.height)} sq ft &nbsp;·&nbsp; {bed.material}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {extraPlants.length === 0 && (
          <div style={{ padding: '16px 14px', color: '#aaa', fontSize: 12 }}>
            No plants assigned — add from the left panel
          </div>
        )}

        {/* Per-plant cards */}
        {extraPlants.map((plant) => (
          <div key={plant.id} style={{ padding: '10px 14px', borderBottom: '1px solid #eee', background: '#fafafa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <PlantIcon name={plant.name} emoji={plant.emoji} size={28} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{plant.name}</div>
                <div style={{ fontSize: 10, color: '#999' }}>
                  {plant.season}{plant.days_to_harvest ? ` · ${plant.days_to_harvest}d` : ''}
                  {' · '}{plantsPerBedShared(bed, plant, extraPlants.length)} fit
                </div>
              </div>
              <button
                onClick={() => onRemovePlant(bed, plant.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#ccc', padding: 2, lineHeight: 1 }}
                title={`Remove ${plant.name}`}
              >×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 6px', fontSize: 10, color: '#666' }}>
              {plant.sun         && <span>{SUN_LABEL[plant.sun] ?? plant.sun}</span>}
              {plant.water_needs && <span>{WATER_LABEL[plant.water_needs] ?? plant.water_needs}</span>}
              {plant.deer_resistant && <span>🦌 Deer resistant</span>}
              {plant.attracts    && <span>🦋 {plant.attracts}</span>}
              {!plantFitsZone(plant, zone) && (
                <span style={{ color: '#c62828', gridColumn: '1 / -1' }}>
                  ⚠ Zones {plant.zone_min}–{plant.zone_max} — not rated for {zone}
                </span>
              )}
              {plantFitsZone(plant, zone) && !plantFitsRegion(plant, region) && (
                <span style={{ color: '#e65100', gridColumn: '1 / -1' }}>
                  🗺 Native elsewhere, not your region
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Intra-bed compatibility */}
        {pairs.length > 0 && (
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #eee' }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, color: '#555' }}>
              In this bed
            </div>
            {pairs.map(({ p1, p2, relationship, notes }) => (
              <div key={`${p1.id}-${p2.id}`} style={{
                display: 'flex', gap: 8, padding: '6px 8px', borderRadius: 6, marginBottom: 4,
                background: relationship === 'beneficial' ? '#f1f8f1' : '#fff5f5',
                borderLeft: `3px solid ${relationship === 'beneficial' ? '#4caf50' : '#e53935'}`,
              }}>
                <span style={{ fontSize: 14 }}>{relationship === 'beneficial' ? '✓' : '✕'}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                    <PlantIcon name={p1.name} emoji={p1.emoji} size={14} />
                    <span>{p1.name}</span>
                    <span style={{ color: '#999' }}>+</span>
                    <PlantIcon name={p2.name} emoji={p2.emoji} size={14} />
                    <span>{p2.name}</span>
                  </div>
                  {notes && <div style={{ fontSize: 10, color: '#666', lineHeight: 1.4, marginTop: 2 }}>{notes}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {extraPlants.length >= 2 && pairs.length === 0 && (
          <div style={{ padding: '8px 14px', borderBottom: '1px solid #eee', fontSize: 11, color: '#aaa', fontStyle: 'italic' }}>
            No companion data between these plants
          </div>
        )}

        {/* Outbound companions */}
        {(goodWith.length > 0 || avoid.length > 0) && (
          <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#555' }}>
              Plant nearby
            </div>

            {goodWith.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#2e7d32', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
                  ✓ Good with ({goodWith.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {goodWith.map((c) => (
                    <div key={c.id} style={{ display: 'flex', gap: 8, padding: '6px 8px', background: '#f1f8f1', borderRadius: 6, borderLeft: '3px solid #4caf50', alignItems: 'flex-start' }}>
                      <PlantIcon name={c.name} emoji={c.emoji} size={20} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: '#888' }}>for {c.forPlant}</div>
                        {c.notes && <div style={{ fontSize: 10, color: '#666', lineHeight: 1.4, marginTop: 1 }}>{c.notes}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {avoid.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#c62828', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5 }}>
                  ✕ Keep away ({avoid.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {avoid.map((c) => (
                    <div key={c.id} style={{ display: 'flex', gap: 8, padding: '6px 8px', background: '#fff5f5', borderRadius: 6, borderLeft: '3px solid #e53935', alignItems: 'flex-start' }}>
                      <PlantIcon name={c.name} emoji={c.emoji} size={20} />
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 600 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: '#888' }}>for {c.forPlant}</div>
                        {c.notes && <div style={{ fontSize: 10, color: '#666', lineHeight: 1.4, marginTop: 1 }}>{c.notes}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cost estimate */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #eee', background: '#fafafa', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6, color: '#555' }}>
          Est. DIY Materials
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: 11, color: '#666' }}>
          {[
            ['Lumber', lumberCost(bed)],
            ['Soil (bagged)', soilCost(bed)],
            ...(extraPlants.length > 0 ? [['Plants', plantsCost(bed)]] : []),
          ].map(([label, cost]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{label}</span>
              <span style={{ color: '#888' }}>~{formatCost(cost)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, paddingTop: 5, marginTop: 2, borderTop: '1px solid #e0e0e0', color: '#333', fontSize: 12 }}>
            <span>Total</span>
            <span>~{formatCost(lumberCost(bed) + soilCost(bed) + plantsCost(bed))}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
