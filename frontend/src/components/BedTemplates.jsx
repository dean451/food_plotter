import { useState } from 'react'
import { SPRITES } from '../sprites.jsx'
import { parseBed, plantFitsZone, findOpenSpot, nextBedName, yardMaterials, installEstimate, formatCost, rectsOverlap, OBSTACLE_KINDS } from '../utils.js'
import { pillBtnStyle } from '../ui.js'
import { BED_TEMPLATES, GARDEN_SETS, GARDEN_PLANS } from '../templates.js'

const TEMPLATE_CATS = [
  { key: 'all', label: 'All' },
  { key: 'veg', label: '🥦 Veg' },
  { key: 'herb', label: '🌿 Herb' },
  { key: 'fruit', label: '🍓 Fruit' },
  { key: 'flower', label: '🌸 Flower' },
  { key: 'native', label: '🌵 Native' },
]

const PATH_FT = 2

// Lay a plan's grid out on the yard: each column is as wide as its widest bed,
// each row as tall as its tallest, with PATH_FT walking paths between cells.
// The block prefers the yard's center but shifts to the nearest offset where
// no bed lands on an obstacle; `blocked` means the plan fits the yard's size
// but there's no placement clear of what's marked on it.
export function layoutPlan(plan, yardWidth, yardHeight, obstacles = []) {
  const grid = plan.rows.map((row) =>
    row.map((label) => BED_TEMPLATES.find((t) => t.label === label)).filter(Boolean)
  )
  const nCols = Math.max(...grid.map((r) => r.length))
  const colWidths = Array.from({ length: nCols }, (_, c) =>
    Math.max(...grid.map((r) => r[c]?.width ?? 0))
  )
  const rowHeights = grid.map((row) => Math.max(...row.map((t) => t.height)))
  const totalW = colWidths.reduce((a, b) => a + b, 0) + PATH_FT * (nCols - 1)
  const totalH = rowHeights.reduce((a, b) => a + b, 0) + PATH_FT * (grid.length - 1)
  const snapHalf = (v) => Math.round(v * 2) / 2

  // Bed positions relative to the block's top-left corner
  const rel = []
  let y = 0
  grid.forEach((row, r) => {
    let x = 0
    row.forEach((t, c) => {
      rel.push({
        template: t,
        x: snapHalf(x + (colWidths[c] - t.width) / 2),
        y: snapHalf(y + (rowHeights[r] - t.height) / 2),
      })
      x += colWidths[c] + PATH_FT
    })
    y += rowHeights[r] + PATH_FT
  })

  const sizeFits = totalW <= yardWidth && totalH <= yardHeight
  const centered = {
    x: snapHalf(Math.max(0, (yardWidth - totalW) / 2)),
    y: snapHalf(Math.max(0, (yardHeight - totalH) / 2)),
  }
  const clearOf = (ox, oy) => rel.every((b) =>
    !obstacles.some((o) => rectsOverlap(
      { x: ox + b.x, y: oy + b.y, width: b.template.width, height: b.template.height }, o
    ))
  )

  let offset = centered
  let blocked = false
  if (sizeFits && obstacles.length > 0 && !clearOf(centered.x, centered.y)) {
    offset = null
    let best = Infinity
    for (let oy = 0; oy + totalH <= yardHeight; oy++) {
      for (let ox = 0; ox + totalW <= yardWidth; ox++) {
        if (!clearOf(ox, oy)) continue
        const d = (ox - centered.x) ** 2 + (oy - centered.y) ** 2
        if (d < best) { best = d; offset = { x: ox, y: oy } }
      }
    }
    if (!offset) { blocked = true; offset = centered }
  }

  const beds = rel.map((b) => ({
    template: b.template,
    x: snapHalf(offset.x + b.x),
    y: snapHalf(offset.y + b.y),
  }))
  return { beds, totalW, totalH, fits: sizeFits && !blocked, blocked }
}

const templateBtn = {
  padding: '8px 6px', background: '#fff', border: '1px solid #ccc',
  borderRadius: 8, cursor: 'pointer', textAlign: 'center', lineHeight: 1.5, width: '100%',
}

function ZoneWarning({ unfit, zone }) {
  if (!unfit.length) return null
  return (
    <span style={{ fontSize: 9, color: '#c62828', display: 'block', marginTop: 3, lineHeight: 1.3 }}>
      ⚠ {unfit.join(', ')} not rated for zone {zone}
    </span>
  )
}

function ConflictWarning({ pairs }) {
  if (!pairs.length) return null
  return (
    <span style={{ fontSize: 9, color: '#c62828', display: 'block', marginTop: 3, lineHeight: 1.3 }}>
      ⚠ Bad companions: {pairs.join(' · ')}
    </span>
  )
}

function SetCard({ set, busy, onClick, unfit, zone, conflicts }) {
  const templateBeds = set.beds.map((label) => BED_TEMPLATES.find((t) => t.label === label)).filter(Boolean)
  const allPlants = [...new Set(templateBeds.flatMap((t) => t.plants ?? []))]
  const totalSqft = templateBeds.reduce((s, t) => s + t.width * t.height, 0)

  return (
    <button
      onClick={onClick}
      disabled={!!busy}
      style={{
        ...templateBtn,
        padding: '10px 8px',
        opacity: busy === set.key ? 0.6 : unfit.length ? 0.55 : 1,
        position: 'relative',
      }}
    >
      {busy === set.key && (
        <span style={{ position: 'absolute', top: 4, right: 6, fontSize: 9, color: '#888' }}>adding…</span>
      )}
      <svg width={Math.min(allPlants.length * 18, 80)} height={18} style={{ display: 'block', margin: '0 auto 3px' }}>
        {allPlants.slice(0, 5).map((name, i) => {
          const Sp = SPRITES[name]
          return Sp ? <Sp key={name} transform={`translate(${i * 18},0) scale(0.72)`} /> : null
        })}
      </svg>
      <span style={{ fontWeight: 700, fontSize: 11, display: 'block', lineHeight: 1.2 }}>{set.label}</span>
      <span style={{ fontSize: 9, color: '#888', display: 'block', marginTop: 2, lineHeight: 1.3 }}>{set.desc}</span>
      <span style={{ fontSize: 9, color: '#bbb', display: 'block', marginTop: 3 }}>
        {templateBeds.length} beds · {totalSqft} sq ft
      </span>
      <ZoneWarning unfit={unfit} zone={zone} />
      <ConflictWarning pairs={conflicts} />
    </button>
  )
}

function PlanPreview({ plan, layout, yard }) {
  const W = 160, H = 96
  // Uniform scale that fits the yard (or the plan, if it overflows the yard)
  const s = Math.min(W / Math.max(yard.width, layout.totalW), H / Math.max(yard.height, layout.totalH))
  const yw = yard.width * s
  const yh = yard.height * s
  const ox = (W - yw) / 2
  const oy = (H - yh) / 2

  return (
    <svg width={W} height={H} style={{ display: 'block', margin: '0 auto 6px' }}>
      {/* The yard itself, to scale, so margins and centering are visible */}
      <rect x={ox} y={oy} width={yw} height={yh} rx={3} fill="#f5f0eb" stroke="#ddd" strokeWidth={1} />
      {(yard.obstacles ?? []).map((o) => {
        const kind = OBSTACLE_KINDS[o.kind] ?? OBSTACLE_KINDS.shed
        return (
          <rect
            key={o.id}
            x={ox + o.x * s} y={oy + o.y * s}
            width={Math.max(1, o.width * s)} height={Math.max(1, o.height * s)}
            rx={1.5} fill={kind.fill} stroke={kind.stroke} strokeWidth={0.75}
          />
        )
      })}
      {layout.beds.map(({ template: t, x, y }, i) => (
        <rect
          key={i}
          x={ox + x * s}
          y={oy + y * s}
          width={Math.max(1, t.width * s - 1)}
          height={Math.max(1, t.height * s - 1)}
          rx={2}
          fill={plan.accent + '33'}
          stroke={plan.accent}
          strokeWidth={1}
        />
      ))}
      {layout.beds.map(({ template: t, x, y }, i) => {
        const cx = ox + (x + t.width / 2) * s
        const cy = oy + (y + t.height / 2) * s
        const Sp = t.plants?.[0] && SPRITES[t.plants[0]]
        const size = Math.min(t.width * s, t.height * s) * 0.65
        if (!Sp) return null
        return (
          <Sp
            key={`icon-${i}`}
            transform={`translate(${cx - size / 2}, ${cy - size / 2}) scale(${size / 24})`}
          />
        )
      })}
    </svg>
  )
}

export default function BedTemplates({ yard, plants, zone, onAdd, onClearBeds, onRenameYard }) {
  const yardToken = yard.token
  const [mode, setMode]   = useState('beds')
  const [busy, setBusy]   = useState(null)
  const [tCat, setTCat]   = useState('all')

  const plantByName = new Map((plants ?? []).map((p) => [p.name, p]))
  function unfitPlants(names) {
    return [...new Set(names ?? [])].filter((n) => {
      const p = plantByName.get(n)
      return p && !plantFitsZone(p, zone)
    })
  }

  // Harmful companion pairs among a card's combined plants. Should always be
  // empty for curated templates/sets/plans — a red flag here means the curated
  // data drifted from the companion data and needs fixing.
  function harmfulPairs(names) {
    const uniq = [...new Set(names ?? [])]
    const pairs = []
    for (let i = 0; i < uniq.length; i++) {
      for (let j = i + 1; j < uniq.length; j++) {
        const p1 = plantByName.get(uniq[i])
        const p2 = plantByName.get(uniq[j])
        if (!p1 || !p2) continue
        if ((p1.companions ?? []).some((c) => c.id === p2.id && c.relationship === 'harmful')) {
          pairs.push(`${uniq[i]} + ${uniq[j]}`)
        }
      }
    }
    return pairs
  }

  async function create(t) {
    setBusy(t.label)
    try {
      const { category, label, desc, plants: plantNames, ...attrs } = t
      const extraPlantIds = (plantNames ?? [])
        .map((n) => plants?.find((p) => p.name === n)?.id)
        .filter(Boolean)
      const { x, y } = findOpenSpot(yard.beds ?? [], yard.width, yard.height, t.width, t.height, yard.obstacles ?? [])
      const res = await fetch(`/api/v1/yards/${yardToken}/beds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bed: { ...attrs, name: nextBedName(t.name, yard.beds ?? []), x, y, rotation: 0, extra_plant_ids: extraPlantIds } }),
      })
      onAdd(parseBed(await res.json()))
    } finally {
      setBusy(null)
    }
  }

  async function addSet(set) {
    setBusy(set.key)
    try {
      const placed = [...(yard.beds ?? [])]
      for (const bedLabel of set.beds) {
        const t = BED_TEMPLATES.find((b) => b.label === bedLabel)
        if (!t) continue
        const { category, label, desc, plants: plantNames, ...attrs } = t
        const extraPlantIds = (plantNames ?? [])
          .map((n) => plants?.find((p) => p.name === n)?.id)
          .filter(Boolean)
        const { x, y } = findOpenSpot(placed, yard.width, yard.height, t.width, t.height, yard.obstacles ?? [])
        const name = nextBedName(t.name, placed)
        const res = await fetch(`/api/v1/yards/${yardToken}/beds`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bed: { ...attrs, name, x, y, rotation: 0, extra_plant_ids: extraPlantIds } }),
        })
        onAdd(parseBed(await res.json()))
        placed.push({ name, x, y, width: t.width, height: t.height, rotation: 0 })
      }
    } finally {
      setBusy(null)
    }
  }

  async function addPlan(plan) {
    const layout = layoutPlan(plan, yard.width, yard.height, yard.obstacles ?? [])
    if (!layout.fits) return
    const existing = yard.beds?.length ?? 0
    if (existing > 0) {
      const ok = window.confirm(
        `"${plan.label}" will replace the ${existing} bed${existing !== 1 ? 's' : ''} already in your yard. Continue?`
      )
      if (!ok) return
    }
    setBusy(plan.key)
    try {
      if (existing > 0) await onClearBeds()
      const named = []
      for (const { template: t, x, y } of layout.beds) {
        const { category, label, desc, plants: plantNames, ...attrs } = t
        const extraPlantIds = (plantNames ?? [])
          .map((n) => plants?.find((p) => p.name === n)?.id)
          .filter(Boolean)
        const name = nextBedName(t.name, named)
        named.push({ name })
        const res = await fetch(`/api/v1/yards/${yardToken}/beds`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bed: { ...attrs, name, x, y, rotation: 0, extra_plant_ids: extraPlantIds } }),
        })
        onAdd(parseBed(await res.json()))
      }
      await onRenameYard?.(plan.label)
    } finally {
      setBusy(null)
    }
  }

  // Cards whose plants all suit the yard's zone sort first
  const fitsAll = (names) => unfitPlants(names).length === 0
  const visible = (tCat === 'all' ? BED_TEMPLATES : BED_TEMPLATES.filter((t) => t.category === tCat))
    .slice().sort((a, b) => fitsAll(b.plants) - fitsAll(a.plants))
  const setsSorted = GARDEN_SETS.slice().sort((a, b) => {
    const plantsOf = (s) => s.beds.flatMap((l) => BED_TEMPLATES.find((t) => t.label === l)?.plants ?? [])
    return fitsAll(plantsOf(b)) - fitsAll(plantsOf(a))
  })
  const plansSorted = GARDEN_PLANS.slice().sort((a, b) => {
    const plantsOf = (p) => p.rows.flat().flatMap((l) => BED_TEMPLATES.find((t) => t.label === l)?.plants ?? [])
    return fitsAll(plantsOf(b)) - fitsAll(plantsOf(a))
  })

  const TABS = [
    { key: 'beds', label: 'Beds' },
    { key: 'gardens', label: 'Gardens' },
    { key: 'plans', label: 'Plans' },
  ]

  return (
    <div>
      {/* Toggle header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: '#888', flexShrink: 0 }}>Quick add</span>
        <div style={{ display: 'flex', borderRadius: 20, border: '1px solid #ddd', overflow: 'hidden' }}>
          {TABS.map(({ key, label }, i) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              style={{
                padding: '2px 10px', fontSize: 10, border: 'none', cursor: 'pointer',
                borderLeft: i > 0 ? '1px solid #ddd' : 'none',
                background: mode === key ? '#2e7d32' : '#fff',
                color: mode === key ? '#fff' : '#666',
              }}
            >{label}</button>
          ))}
        </div>
      </div>

      {mode === 'beds' && (
        <>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
            {TEMPLATE_CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setTCat(c.key)}
                style={pillBtnStyle(tCat === c.key, { padding: '2px 8px', flexShrink: 0 })}
              >{c.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {visible.map((t) => {
              const unfit = unfitPlants(t.plants)
              return (
              <button
                key={t.label}
                onClick={() => create(t)}
                disabled={!!busy}
                title={`${t.desc} · ${t.width}×${t.height} ft · ${t.material}`}
                style={{ ...templateBtn, opacity: busy === t.label ? 0.6 : unfit.length ? 0.55 : 1 }}
              >
                {t.plants ? (
                  <svg width={t.plants.length * 20 - 2} height={18} style={{ display: 'block', margin: '0 auto' }}>
                    {t.plants.map((name, i) => {
                      const Sp = SPRITES[name]
                      return Sp ? <Sp key={name} transform={`translate(${i * 20},0) scale(0.75)`} /> : null
                    })}
                  </svg>
                ) : (
                  <span style={{ fontSize: 18 }}>{t.emoji}</span>
                )}
                <span style={{ fontWeight: 600, fontSize: 11, display: 'block', marginTop: 2, lineHeight: 1.2 }}>{t.label}</span>
                <span style={{ fontSize: 9, color: '#999', display: 'block', lineHeight: 1.3, marginTop: 2 }}>{t.desc}</span>
                <span style={{ fontSize: 9, color: '#bbb', display: 'block', marginTop: 1 }}>{t.width}×{t.height} ft</span>
                <ZoneWarning unfit={unfit} zone={zone} />
                <ConflictWarning pairs={harmfulPairs(t.plants)} />
              </button>
              )
            })}
          </div>
        </>
      )}

      {mode === 'gardens' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
          {setsSorted.map((set) => {
            const setPlants = set.beds.flatMap((label) => BED_TEMPLATES.find((t) => t.label === label)?.plants ?? [])
            return (
              <SetCard
                key={set.key} set={set} busy={busy} onClick={() => addSet(set)}
                unfit={unfitPlants(setPlants)} zone={zone} conflicts={harmfulPairs(setPlants)}
              />
            )
          })}
        </div>
      )}

      {mode === 'plans' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>
            Full layouts, centered in your yard with {PATH_FT} ft walking paths between beds
          </div>
          {plansSorted.map((plan) => {
            const layout = layoutPlan(plan, yard.width, yard.height, yard.obstacles ?? [])
            const templates = layout.beds.map((b) => b.template)
            const totalSqft = templates.reduce((s, t) => s + t.width * t.height, 0)
            const allPlants = [...new Set(templates.flatMap((t) => t.plants ?? []))]
            const unfit = unfitPlants(allPlants)
            const isBusy = busy === plan.key
            // Package pricing from the same engine as the quote sheet
            const pseudoBeds = templates.map((t) => ({
              width: t.width, height: t.height, depth: t.depth, material: t.material,
              extra_plants: (t.plants ?? []).map((n) => plantByName.get(n)).filter(Boolean),
            }))
            const diy = yardMaterials(pseudoBeds).total
            const installed = installEstimate(pseudoBeds).total
            return (
              <button
                key={plan.key}
                onClick={() => addPlan(plan)}
                disabled={!!busy || !layout.fits}
                style={{
                  ...templateBtn,
                  padding: '12px 10px',
                  opacity: isBusy || !layout.fits ? 0.6 : 1,
                  cursor: layout.fits ? 'pointer' : 'not-allowed',
                  position: 'relative',
                  borderColor: plan.accent + '88',
                  borderLeftWidth: 3,
                  borderLeftColor: plan.accent,
                }}
              >
                {isBusy && (
                  <span style={{ position: 'absolute', top: 6, right: 8, fontSize: 10, color: '#888' }}>
                    placing beds…
                  </span>
                )}
                <span style={{ fontWeight: 800, fontSize: 14, display: 'block', lineHeight: 1.3, marginBottom: 6, color: plan.accent }}>
                  {plan.label}
                </span>
                <PlanPreview plan={plan} layout={layout} yard={yard} />
                <span style={{ fontSize: 10, color: '#666', display: 'block', marginTop: 3, lineHeight: 1.4 }}>
                  {plan.desc}
                </span>
                <span style={{ fontSize: 10, color: '#bbb', display: 'block', marginTop: 5 }}>
                  {layout.beds.length} beds · {totalSqft} sq ft · {allPlants.length} plant types
                </span>
                <span style={{ fontSize: 11, color: '#444', display: 'block', marginTop: 4, fontWeight: 600 }}>
                  ~{formatCost(diy)} DIY · ~{formatCost(installed)} installed
                </span>
                <ZoneWarning unfit={unfit} zone={zone} />
                <ConflictWarning pairs={harmfulPairs(allPlants)} />
                {!layout.fits && (
                  <span style={{ fontSize: 10, color: '#c62828', display: 'block', marginTop: 4 }}>
                    {layout.blocked
                      ? `Needs ${layout.totalW}×${layout.totalH} ft of open space — what's marked on your yard is in the way`
                      : `Needs ${layout.totalW}×${layout.totalH} ft — your yard is ${yard.width}×${yard.height} ft`}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
