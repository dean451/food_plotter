import { formatCost, yardMaterials, installEstimate, OBSTACLE_KINDS, MATERIAL_COLORS } from '../utils.js'

// Read-only miniature of the yard that rides in the right column once the main
// canvas scrolls out of view — lets you watch beds land while browsing the
// template list. Deliberately inert: bed clicking and details live at the top.
export default function YardMiniMap({ yard, width = 250 }) {
  const s = width / yard.width
  const H = Math.round(yard.height * s)
  const m = yardMaterials(yard.beds)
  const inst = installEstimate(yard.beds)

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
      <svg
        width={width} height={H} viewBox={`0 0 ${width} ${H}`}
        style={{ display: 'block', pointerEvents: 'none', background: '#e8f5e9' }}
      >
        {(yard.obstacles ?? []).map((o) => {
          const kind = OBSTACLE_KINDS[o.kind] ?? OBSTACLE_KINDS.shed
          return (
            <g key={o.id}>
              <rect
                x={o.x * s} y={o.y * s} width={o.width * s} height={o.height * s}
                rx={2} fill={kind.fill} stroke={kind.stroke} strokeWidth={0.75}
              />
              <text
                x={(o.x + o.width / 2) * s} y={(o.y + o.height / 2) * s}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={Math.min(o.width, o.height) * s * 0.5}
              >
                {kind.emoji}
              </text>
            </g>
          )
        })}
        {yard.beds.map((b) => {
          const cx = (b.x + b.width / 2) * s
          const cy = (b.y + b.height / 2) * s
          const emoji = b.extra_plants?.[0]?.emoji || b.emoji
          return (
            <g key={b.id} transform={`rotate(${b.rotation ?? 0}, ${cx}, ${cy})`}>
              <rect
                x={b.x * s} y={b.y * s} width={b.width * s} height={b.height * s}
                rx={2} fill={MATERIAL_COLORS[b.material] ?? '#a5d6a7'} stroke="#555" strokeWidth={0.75}
              />
              {emoji && (
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={Math.min(b.width, b.height) * s * 0.55}>
                  {emoji}
                </text>
              )}
            </g>
          )
        })}
      </svg>
      <div style={{ padding: '8px 10px', fontSize: 11, color: '#777', lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, color: '#444' }}>{yard.name}</div>
        <div>
          {yard.beds.length} bed{yard.beds.length !== 1 ? 's' : ''}
          {yard.beds.length > 0 && ` · ~${formatCost(m.total)} DIY · ~${formatCost(inst.total)} installed`}
        </div>
      </div>
    </div>
  )
}
