import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { spriteFor } from '../sprites.jsx'
import { sqft, bedFootprint, clampBedToYard, rectsOverlap, isRow, MATERIAL_COLORS, OBSTACLE_KINDS } from '../utils.js'

const PX_PER_FT = 20
const SNAP_FT = 1
const COMPANION_DISTANCE_FT = 15

function CompanionTooltip({ bed, selectedBed, rel, mouseX, mouseY }) {
  const conflicts = []
  const suggestions = []
  const seenConflict = new Set()
  const seenSuggestion = new Set()

  for (const selPlant of (selectedBed?.extra_plants ?? [])) {
    for (const comp of (selPlant.companions ?? [])) {
      const inThisBed = bed.extra_plants?.some((p) => p.id === comp.id)
      if (inThisBed && comp.relationship === 'harmful' && !seenConflict.has(comp.id)) {
        conflicts.push({ selPlant, comp })
        seenConflict.add(comp.id)
      }
      if (!inThisBed && comp.relationship === 'beneficial' && !seenSuggestion.has(comp.id)) {
        suggestions.push({ selPlant, comp })
        seenSuggestion.add(comp.id)
      }
    }
  }

  const tipW = 230
  const left = Math.min(mouseX + 12, window.innerWidth - tipW - 8)
  const top  = Math.max(8, mouseY - 10)

  return (
    <div style={{
      position: 'fixed', top, left,
      width: tipW, zIndex: 9999,
      background: '#fff', border: `1.5px solid ${rel === 'harmful' ? '#e53935' : '#43a047'}`,
      borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
      padding: '10px 12px', fontSize: 11, lineHeight: 1.5,
      pointerEvents: 'none', colorScheme: 'light', color: '#333',
    }}>
      <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6, color: rel === 'harmful' ? '#c62828' : '#2e7d32' }}>
        {rel === 'harmful' ? '⚠ Conflict' : '✓ Good neighbors'}
      </div>

      {conflicts.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          {conflicts.map(({ selPlant, comp }, i) => (
            <div key={i} style={{ marginBottom: 4, paddingLeft: 8, borderLeft: '2px solid #e53935' }}>
              <span style={{ fontWeight: 600 }}>{selPlant.name}</span>
              <span style={{ color: '#888' }}> + </span>
              <span style={{ fontWeight: 600 }}>{comp.name}</span>
              {comp.notes && <div style={{ color: '#666', marginTop: 1 }}>{comp.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <div style={{ fontWeight: 600, color: '#2e7d32', marginBottom: 4 }}>
            Better neighbors for this bed:
          </div>
          {suggestions.slice(0, 4).map(({ comp }, i) => (
            <div key={i} style={{ paddingLeft: 8, borderLeft: '2px solid #43a047', marginBottom: 3 }}>
              <span style={{ fontWeight: 600 }}>{comp.name}</span>
              {comp.notes && <span style={{ color: '#777' }}> — {comp.notes}</span>}
            </div>
          ))}
        </div>
      )}

      {conflicts.length === 0 && suggestions.length === 0 && (
        <div style={{ color: '#888' }}>
          {rel === 'beneficial' ? 'These plants grow well together.' : 'These plants may compete.'}
        </div>
      )}
    </div>
  )
}

export default function YardCanvas({ yard, beds, obstacles, selectedBedId, onSelectBed, selectedObstacleId, onSelectObstacle, onBedMove, onBedDelete, onBedRotate, onBedResize, onObstacleMove, onObstacleResize, onObstacleDelete, selectedPlantCompanions, selectedBed, mobile = false, onBedActivate }) {
  const [hovered, setHovered] = useState(null)
  const [hoveredObstacle, setHoveredObstacle] = useState(null)
  const [localBeds, setLocalBeds] = useState(beds)
  const [localObstacles, setLocalObstacles] = useState(obstacles ?? [])
  const [companionTooltip, setCompanionTooltip] = useState(null)
  const dragging = useRef(null)
  const resizing = useRef(null)
  // Mobile: a single tap selects (and can immediately drag from that same
  // touch) — opening the full detail sheet on tap would swallow the drag
  // before it starts. A second tap on the same bed within this window opens
  // details instead, same idea as a double-click.
  const lastTapRef = useRef({ id: null, time: 0 })
  const DOUBLE_TAP_MS = 350
  const TAP_MOVE_THRESHOLD_FT = 0.3

  // Intentional prop→state sync: localBeds/localObstacles mutate optimistically
  // during drag/resize (see dragging/resizing refs below) without waiting on the
  // parent's round trip to the API, then re-sync once the parent's props catch up.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setLocalBeds(beds) }, [beds])
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setLocalObstacles(obstacles ?? []) }, [obstacles])

  const W = yard.width * PX_PER_FT
  const H = yard.height * PX_PER_FT

  // Beds whose footprints intersect another bed's or an obstacle's (shared
  // edges don't count)
  const overlappingIds = new Set()
  for (let i = 0; i < localBeds.length; i++) {
    for (let j = i + 1; j < localBeds.length; j++) {
      const a = bedFootprint(localBeds[i])
      const b = bedFootprint(localBeds[j])
      if (rectsOverlap(a, b)) {
        overlappingIds.add(localBeds[i].id)
        overlappingIds.add(localBeds[j].id)
      }
    }
    if (localObstacles.some((o) => rectsOverlap(bedFootprint(localBeds[i]), o))) {
      overlappingIds.add(localBeds[i].id)
    }
  }

  function onBedPointerDown(e, bed) {
    e.preventDefault()
    onSelectBed(bed.id)
    const svg = e.currentTarget.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    const scale = svgScale(svg)
    dragging.current = {
      bed,
      startMouseX: (e.clientX - svgRect.left) * scale,
      startMouseY: (e.clientY - svgRect.top) * scale,
      startBedX: bed.x,
      startBedY: bed.y,
      moved: false,
    }
  }

  function onResizePointerDown(e, bed) {
    e.preventDefault()
    e.stopPropagation()
    const svg = e.currentTarget.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    const scale = svgScale(svg)
    resizing.current = {
      bed,
      startMouseX: (e.clientX - svgRect.left) * scale,
      startMouseY: (e.clientY - svgRect.top) * scale,
      startWidth: bed.width,
      startHeight: bed.height,
    }
  }

  function svgScale(svgEl) {
    const rect = svgEl.getBoundingClientRect()
    return (W + 2) / rect.width
  }

  function onObstaclePointerDown(e, obstacle) {
    e.preventDefault()
    onSelectObstacle(obstacle.id)
    const svg = e.currentTarget.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    const scale = svgScale(svg)
    dragging.current = {
      obstacle,
      startMouseX: (e.clientX - svgRect.left) * scale,
      startMouseY: (e.clientY - svgRect.top) * scale,
      startX: obstacle.x,
      startY: obstacle.y,
    }
  }

  function onObstacleResizePointerDown(e, obstacle) {
    e.preventDefault()
    e.stopPropagation()
    const svg = e.currentTarget.closest('svg')
    const svgRect = svg.getBoundingClientRect()
    const scale = svgScale(svg)
    resizing.current = {
      obstacle,
      startMouseX: (e.clientX - svgRect.left) * scale,
      startMouseY: (e.clientY - svgRect.top) * scale,
      startWidth: obstacle.width,
      startHeight: obstacle.height,
    }
  }

  function onSvgPointerMove(e) {
    const svgRect = e.currentTarget.getBoundingClientRect()
    const scale = (W + 2) / svgRect.width
    const mouseX = (e.clientX - svgRect.left) * scale
    const mouseY = (e.clientY - svgRect.top) * scale
    const snap = (v) => Math.round(v / SNAP_FT) * SNAP_FT

    if (dragging.current?.obstacle) {
      const { startMouseX, startMouseY, startX, startY, obstacle } = dragging.current
      const dx = (mouseX - startMouseX) / PX_PER_FT
      const dy = (mouseY - startMouseY) / PX_PER_FT
      const nx = Math.max(0, Math.min(yard.width - obstacle.width, snap(startX + dx)))
      const ny = Math.max(0, Math.min(yard.height - obstacle.height, snap(startY + dy)))
      setLocalObstacles((prev) => prev.map((o) => o.id === obstacle.id ? { ...o, x: nx, y: ny } : o))
    } else if (resizing.current?.obstacle) {
      const { startMouseX, startMouseY, startWidth, startHeight, obstacle } = resizing.current
      const dx = (mouseX - startMouseX) / PX_PER_FT
      const dy = (mouseY - startMouseY) / PX_PER_FT
      const nw = snap(Math.max(1, Math.min(yard.width - obstacle.x, startWidth + dx)))
      const nh = snap(Math.max(1, Math.min(yard.height - obstacle.y, startHeight + dy)))
      setLocalObstacles((prev) => prev.map((o) => o.id === obstacle.id ? { ...o, width: nw, height: nh } : o))
    } else if (dragging.current) {
      const { startMouseX, startMouseY, startBedX, startBedY, bed } = dragging.current
      const dx = (mouseX - startMouseX) / PX_PER_FT
      const dy = (mouseY - startMouseY) / PX_PER_FT
      if (Math.abs(dx) > TAP_MOVE_THRESHOLD_FT || Math.abs(dy) > TAP_MOVE_THRESHOLD_FT) {
        dragging.current.moved = true
      }
      // Clamp and snap the visual footprint (rotation-aware), then convert back
      // to the stored position
      const fp = bedFootprint({ ...bed, x: startBedX + dx, y: startBedY + dy })
      const clampX = (v) => Math.max(0, Math.min(yard.width - fp.width, v))
      const clampY = (v) => Math.max(0, Math.min(yard.height - fp.height, v))
      const fx = clampX(snap(clampX(fp.x)))
      const fy = clampY(snap(clampY(fp.y)))
      const newX = fx + (fp.width - bed.width) / 2
      const newY = fy + (fp.height - bed.height) / 2
      setLocalBeds((prev) => prev.map((b) => b.id === bed.id ? { ...b, x: newX, y: newY } : b))
    } else if (resizing.current) {
      const { startMouseX, startMouseY, startWidth, startHeight, bed } = resizing.current
      const dx = (mouseX - startMouseX) / PX_PER_FT
      const dy = (mouseY - startMouseY) / PX_PER_FT
      // At 90°/270° the bed's width extends vertically on the yard (and vice versa)
      const rotated = bed.rotation % 180 !== 0
      const maxW = rotated ? yard.height : yard.width - bed.x
      const maxH = rotated ? yard.width : yard.height - bed.y
      const newWidth  = snap(Math.max(1, Math.min(maxW, startWidth + dx)))
      const newHeight = snap(Math.max(1, Math.min(maxH, startHeight + dy)))
      const pos = clampBedToYard({ ...bed, width: newWidth, height: newHeight }, yard.width, yard.height)
      setLocalBeds((prev) => prev.map((b) => b.id === bed.id ? { ...b, width: newWidth, height: newHeight, x: pos.x, y: pos.y } : b))
    }
  }

  function onSvgPointerUp() {
    if (dragging.current?.obstacle) {
      const moved = localObstacles.find((o) => o.id === dragging.current.obstacle.id)
      dragging.current = null
      onObstacleMove(moved)
    } else if (resizing.current?.obstacle) {
      const resized = localObstacles.find((o) => o.id === resizing.current.obstacle.id)
      resizing.current = null
      onObstacleResize(resized)
    } else if (dragging.current) {
      const { bed: draggedBed, moved: didMove } = dragging.current
      const moved = localBeds.find((b) => b.id === draggedBed.id)
      dragging.current = null
      onBedMove(moved)
      if (mobile && onBedActivate && !didMove) {
        // Date.now() here is fine — this branch only runs inside the SVG's
        // onPointerUp handler (a real user interaction), never during render.
        // eslint-disable-next-line react-hooks/purity
        const now = Date.now()
        const last = lastTapRef.current
        if (last.id === draggedBed.id && now - last.time < DOUBLE_TAP_MS) {
          lastTapRef.current = { id: null, time: 0 }
          onBedActivate(draggedBed.id)
        } else {
          lastTapRef.current = { id: draggedBed.id, time: now }
        }
      }
    } else if (resizing.current) {
      const resized = localBeds.find((b) => b.id === resizing.current.bed.id)
      resizing.current = null
      onBedResize(resized)
    }
  }

  return (
    <div>
      <svg
        width={W + 2} height={H + 2}
        viewBox={`0 0 ${W + 2} ${H + 2}`}
        style={{ display: 'block', border: '2px solid #333', background: '#e8f5e9', cursor: 'default', maxWidth: '100%', height: 'auto', touchAction: 'none' }}
        onPointerMove={onSvgPointerMove}
        onPointerUp={onSvgPointerUp}
        onPointerLeave={onSvgPointerUp}
      >
        <defs>
          <pattern id="grid" width={PX_PER_FT} height={PX_PER_FT} patternUnits="userSpaceOnUse">
            <path d={`M ${PX_PER_FT} 0 L 0 0 0 ${PX_PER_FT}`} fill="none" stroke="#b2dfb2" strokeWidth={0.5} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {localBeds.length === 0 && (
          <g style={{ pointerEvents: 'none', userSelect: 'none' }}>
            <text x={W / 2} y={H / 2 - 10} textAnchor="middle" fontSize={18} fontFamily="sans-serif" fill="#7fa87f" fontWeight="600">
              🌱 Your yard is empty
            </text>
            <text x={W / 2} y={H / 2 + 14} textAnchor="middle" fontSize={12} fontFamily="sans-serif" fill="#9bbf9b">
              Pick a plan from Quick add below, or hit + Add Bed
            </text>
          </g>
        )}

        {localObstacles.map((o) => {
          const kind = OBSTACLE_KINDS[o.kind] ?? OBSTACLE_KINDS.shed
          const ox = o.x * PX_PER_FT
          const oy = o.y * PX_PER_FT
          const ow = o.width * PX_PER_FT
          const oh = o.height * PX_PER_FT
          const isHovered = hoveredObstacle === o.id
          const isSelected = selectedObstacleId === o.id
          return (
            <g
              key={o.id}
              onPointerDown={(e) => onObstaclePointerDown(e, o)}
              onPointerEnter={() => setHoveredObstacle(o.id)}
              onPointerLeave={() => setHoveredObstacle(null)}
              style={{ cursor: 'grab' }}
            >
              <rect
                x={ox} y={oy} width={ow} height={oh}
                fill={kind.fill} stroke={isSelected ? '#1a73e8' : kind.stroke}
                strokeWidth={isHovered || isSelected ? 2.5 : 1.5} rx={4}
              />
              <text
                x={ox + ow / 2} y={oy + oh / 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={Math.min(ow, oh) * 0.4} opacity={0.85}
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {kind.emoji}
              </text>
              {oh > 30 && (
                <text
                  x={ox + ow / 2} y={oy + oh / 2 + Math.min(ow, oh) * 0.28 + 8}
                  textAnchor="middle" fontSize={Math.max(6, Math.min(9, (ow - 8) / (kind.label.length * 0.6)))}
                  fontFamily="sans-serif" fill="#666" fontWeight="600"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                >
                  {kind.label}
                </text>
              )}
              {(isHovered || isSelected) && (
                <>
                  {/* Delete — top right */}
                  <g transform={`translate(${ox + ow - 10}, ${oy + 10})`} onPointerDown={(e) => { e.stopPropagation(); onObstacleDelete(o.id) }} style={{ cursor: 'pointer' }}>
                    <circle r={9} fill="white" stroke="#e53935" strokeWidth={1.5} />
                    <text textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="#e53935" fontWeight="bold" style={{ userSelect: 'none' }}>×</text>
                  </g>
                  {/* Diagonal resize — bottom right. Fingertip-precision handle,
                      not workable on touch, so desktop only. */}
                  {!mobile && (
                    <g transform={`translate(${ox + ow - 10}, ${oy + oh - 10})`} onPointerDown={(e) => onObstacleResizePointerDown(e, o)} style={{ cursor: 'nwse-resize' }}>
                      <circle r={9} fill="white" stroke="#555" strokeWidth={1.5} />
                      <text textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#555" style={{ userSelect: 'none' }}>⤡</text>
                    </g>
                  )}
                  <text
                    x={ox + ow / 2} y={oy + 12}
                    textAnchor="middle" fontSize={8} fontFamily="sans-serif" fill="#777"
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {sqft(o.width * o.height)} sq ft
                  </text>
                </>
              )}
            </g>
          )
        })}

        {localBeds.map((bed) => {
          const bx = bed.x * PX_PER_FT
          const by = bed.y * PX_PER_FT
          const bw = bed.width * PX_PER_FT
          const bh = bed.height * PX_PER_FT
          const cx = bx + bw / 2
          const cy = by + bh / 2
          const fill = MATERIAL_COLORS[bed.material] ?? '#a5d6a7'
          const isSelected = selectedBedId === bed.id
          const isOverlapping = overlappingIds.has(bed.id)
          const primaryPlant = bed.extra_plants?.[0] ?? null
          const emoji = primaryPlant?.emoji || bed.emoji
          const step = primaryPlant ? primaryPlant.spacing_ft * PX_PER_FT : 20

          // Distance from selected bed center (in feet)
          const selBed = selectedBedId !== bed.id
            ? localBeds.find((b) => b.id === selectedBedId)
            : null
          const distFt = selBed
            ? Math.sqrt(
                Math.pow((cx - (selBed.x * PX_PER_FT + selBed.width * PX_PER_FT / 2)) / PX_PER_FT, 2) +
                Math.pow((cy - (selBed.y * PX_PER_FT + selBed.height * PX_PER_FT / 2)) / PX_PER_FT, 2)
              )
            : Infinity

          return (
            <g
              key={bed.id}
              transform={`rotate(${bed.rotation}, ${cx}, ${cy})`}
              onPointerDown={(e) => onBedPointerDown(e, bed)}
              onPointerEnter={() => setHovered(bed.id)}
              onPointerLeave={() => { setHovered(null); setCompanionTooltip(null) }}
              style={{ cursor: 'grab' }}
            >
              {/* Companion ring + tooltip trigger */}
              {(() => {
                if (!bed.extra_plants?.length || !selectedPlantCompanions) return null
                if (bed.id === selectedBedId) return null
                if (distFt > COMPANION_DISTANCE_FT) return null

                let rel = null
                for (const p of bed.extra_plants) {
                  const r = selectedPlantCompanions[p.id]
                  if (r === 'harmful') { rel = 'harmful'; break }
                  if (r === 'beneficial') rel = 'beneficial'
                }
                if (!rel) return null

                const color = rel === 'beneficial' ? '#43a047' : '#e53935'
                const corners = [[bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh]]

                return (
                  <g
                    onPointerEnter={(e) => setCompanionTooltip({ bed, rel, mouseX: e.clientX, mouseY: e.clientY })}
                    onPointerMove={(e) => setCompanionTooltip((t) => t ? { ...t, mouseX: e.clientX, mouseY: e.clientY } : t)}
                    onPointerLeave={() => setCompanionTooltip(null)}
                  >
                    {/* Sonar ripple 1 */}
                    <rect x={bx - 5} y={by - 5} width={bw + 10} height={bh + 10} fill="none" stroke={color} strokeWidth={1.5} rx={10}>
                      <animate attributeName="opacity" values="0.65;0" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="x" values={`${bx - 5};${bx - 16}`} dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="y" values={`${by - 5};${by - 16}`} dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="width" values={`${bw + 10};${bw + 32}`} dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="height" values={`${bh + 10};${bh + 32}`} dur="2s" repeatCount="indefinite"/>
                    </rect>
                    {/* Sonar ripple 2 — offset by 1 s */}
                    <rect x={bx - 5} y={by - 5} width={bw + 10} height={bh + 10} fill="none" stroke={color} strokeWidth={1.5} rx={10}>
                      <animate attributeName="opacity" values="0.65;0" dur="2s" begin="1s" repeatCount="indefinite"/>
                      <animate attributeName="x" values={`${bx - 5};${bx - 16}`} dur="2s" begin="1s" repeatCount="indefinite"/>
                      <animate attributeName="y" values={`${by - 5};${by - 16}`} dur="2s" begin="1s" repeatCount="indefinite"/>
                      <animate attributeName="width" values={`${bw + 10};${bw + 32}`} dur="2s" begin="1s" repeatCount="indefinite"/>
                      <animate attributeName="height" values={`${bh + 10};${bh + 32}`} dur="2s" begin="1s" repeatCount="indefinite"/>
                    </rect>
                    {/* Pulsing inner ring */}
                    <rect x={bx - 4} y={by - 4} width={bw + 8} height={bh + 8} fill="none" stroke={color} strokeWidth={2.5} rx={9}>
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/>
                      <animate attributeName="stroke-width" values="2;3.5;2" dur="1.6s" repeatCount="indefinite"/>
                    </rect>
                    {/* Corner sparkles — staggered */}
                    {corners.map(([sx, sy], i) => (
                      <circle key={i} cx={sx} cy={sy} r={3} fill={color}>
                        <animate attributeName="opacity" values="0;1;0" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
                        <animate attributeName="r" values="1.5;4;1.5" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite"/>
                      </circle>
                    ))}
                  </g>
                )
              })()}

              <rect
                x={bx} y={by} width={bw} height={bh}
                fill={fill}
                stroke={isOverlapping ? '#e53935' : isSelected ? '#1a73e8' : isRow(bed) ? '#6d4c41' : '#555'}
                strokeWidth={isSelected || isOverlapping ? 2.5 : 1.5}
                strokeDasharray={isOverlapping ? '6 3' : isRow(bed) ? '4 3' : undefined}
                rx={6}
              />

              {(emoji || bed.extra_plants?.length > 0) && (() => {
                const PAD = 8

                if (bed.extra_plants?.length > 0) {
                  const sorted = [...bed.extra_plants].sort((a, b) => b.spacing_ft - a.spacing_ft)
                  const numPlants = sorted.length
                  const st = sorted[0].spacing_ft * PX_PER_FT
                  const MAX_RENDER = 150
                  const rawCols = Math.floor((bw - PAD * 2) / st)
                  const rawRows = Math.floor((bh - PAD * 2) / st)

                  if (rawCols === 0 || rawRows === 0) {
                    return sorted.map((plant, pi) => {
                      const Sp = spriteFor(plant.name, plant.emoji)
                      const gs = Math.min(bw, bh) * 0.28 / 24
                      const offX = (pi - (numPlants - 1) / 2) * Math.min(bw, bh) * 0.32
                      return <g key={`${bed.id}-mg-${pi}`} opacity="0.3"><Sp transform={`translate(${cx + offX - 12*gs},${cy - 12*gs}) scale(${gs})`}/></g>
                    })
                  }

                  const ratio = rawCols * rawRows > MAX_RENDER
                    ? Math.sqrt((rawCols * rawRows) / MAX_RENDER)
                    : 1
                  const renderSt = st * ratio
                  const cols = Math.floor((bw - PAD * 2) / renderSt)
                  const rows = Math.floor((bh - PAD * 2) / renderSt)
                  const sz = Math.min(renderSt * 0.75, 30)
                  const s = sz / 24
                  const startX = bx + (bw - (cols - 1) * renderSt) / 2
                  const startY = by + (bh - (rows - 1) * renderSt) / 2

                  return Array.from({ length: rows }).flatMap((_, r) =>
                    Array.from({ length: cols }).map((_, c) => {
                      const plant = sorted[(r * cols + c) % numPlants]
                      const Sp = spriteFor(plant.name, plant.emoji)
                      return (
                        <Sp key={`${bed.id}-ep-${r}-${c}`}
                          transform={`translate(${startX + c*renderSt - 12*s},${startY + r*renderSt - 12*s}) scale(${s})`}/>
                      )
                    })
                  )
                }

                const cols = Math.floor((bw - PAD * 2) / step)
                const rows = Math.floor((bh - PAD * 2) / step)
                if (cols === 0 || rows === 0) {
                  return (
                    <text
                      key={`${bed.id}-solo`}
                      x={cx} y={cy}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={Math.min(bw, bh) * 0.5} opacity={0.6}
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {emoji}
                    </text>
                  )
                }
                const startX = bx + (bw - (cols - 1) * step) / 2
                const startY = by + (bh - (rows - 1) * step) / 2
                return Array.from({ length: rows }).flatMap((_, r) =>
                  Array.from({ length: cols }).map((_, c) => (
                    <text
                      key={`${bed.id}-${r}-${c}`}
                      x={startX + c * step} y={startY + r * step}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize={Math.min(step * 0.7, 22)}
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {emoji}
                    </text>
                  ))
                )
              })()}

              {/* Name shrinks to stay inside narrow beds (~0.6em per character) */}
              <text x={cx} y={by + 9} textAnchor="middle" fontSize={Math.max(5, Math.min(9, (bw - 8) / (bed.name.length * 0.6)))} fontFamily="sans-serif" fill="#333" fontWeight="600" style={{ pointerEvents: 'none' }}>
                {bed.name}
              </text>
              <text x={cx} y={by + 18} textAnchor="middle" fontSize={Math.max(5, Math.min(8, (bw - 8) / 6))} fontFamily="sans-serif" fill="#555" style={{ pointerEvents: 'none' }}>
                {sqft(bed.width * bed.height)} sq ft
              </text>

              {(hovered === bed.id || isSelected) && (
                <>
                  {/* Delete — top right */}
                  <g transform={`translate(${bx + bw - 10}, ${by + 10})`} onPointerDown={(e) => { e.stopPropagation(); onBedDelete(bed.id) }} style={{ cursor: 'pointer' }}>
                    <circle r={9} fill="white" stroke="#e53935" strokeWidth={1.5} />
                    <text textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="#e53935" fontWeight="bold" style={{ userSelect: 'none' }}>×</text>
                  </g>
                  {/* Rotate + resize handles are a few px wide — fine with a
                      mouse cursor, not workable with a fingertip. Desktop only;
                      mobile keeps tap-to-select and drag-to-move. */}
                  {!mobile && (
                    <>
                      {/* Rotate CW — top left */}
                      <g transform={`translate(${bx + 10}, ${by + 10})`} onPointerDown={(e) => { e.stopPropagation(); onBedRotate(bed.id, (bed.rotation + 90) % 360) }} style={{ cursor: 'pointer' }}>
                        <circle r={9} fill="white" stroke="#1565c0" strokeWidth={1.5} />
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="#1565c0" style={{ userSelect: 'none' }}>↻</text>
                      </g>
                      {/* Rotate CCW — bottom left */}
                      <g transform={`translate(${bx + 10}, ${by + bh - 10})`} onPointerDown={(e) => { e.stopPropagation(); onBedRotate(bed.id, ((bed.rotation - 90) + 360) % 360) }} style={{ cursor: 'pointer' }}>
                        <circle r={9} fill="white" stroke="#1565c0" strokeWidth={1.5} />
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={13} fill="#1565c0" style={{ userSelect: 'none' }}>↺</text>
                      </g>
                      {/* Diagonal resize — bottom right */}
                      <g transform={`translate(${bx + bw - 10}, ${by + bh - 10})`} onPointerDown={(e) => onResizePointerDown(e, bed)} style={{ cursor: 'nwse-resize' }}>
                        <circle r={9} fill="white" stroke="#555" strokeWidth={1.5} />
                        <text textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#555" style={{ userSelect: 'none' }}>⤡</text>
                      </g>
                      {/* ⌘D hint — keyboard shortcut, meaningless without a keyboard */}
                      <text
                        x={cx} y={by + bh - 4}
                        textAnchor="middle" fontSize={8} fontFamily="sans-serif"
                        fill="#888" style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        ⌘D dup
                      </text>
                    </>
                  )}
                </>
              )}
            </g>
          )
        })}
      </svg>

      {companionTooltip && createPortal(
        <CompanionTooltip
          bed={companionTooltip.bed}
          selectedBed={selectedBed}
          rel={companionTooltip.rel}
          mouseX={companionTooltip.mouseX}
          mouseY={companionTooltip.mouseY}
        />,
        document.body
      )}
    </div>
  )
}
