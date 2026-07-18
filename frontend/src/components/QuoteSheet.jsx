import { lumberCost, plantsCost, soilVolume, yardMaterials, installEstimate, isRow, PRICING, sqft, formatCost, OBSTACLE_KINDS } from '../utils.js'

const th = { textAlign: 'left', padding: '6px 8px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', borderBottom: '2px solid #ddd' }
const td = { padding: '6px 8px', fontSize: 12, borderBottom: '1px solid #eee', verticalAlign: 'top' }
const money = { ...td, textAlign: 'right', whiteSpace: 'nowrap' }

function Row({ label, value, bold, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: bold ? 14 : 12, fontWeight: bold ? 700 : 400, color: accent ?? (bold ? '#222' : '#555'), borderTop: bold ? '2px solid #333' : 'none', marginTop: bold ? 4 : 0 }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

export default function QuoteSheet({ yard, onClose }) {
  const beds = yard.beds
  const m = yardMaterials(beds)
  const inst = installEstimate(beds)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.45)', overflowY: 'auto', padding: '32px 16px' }}
    >
      <div
        className="quote-sheet"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 760, margin: '0 auto', background: '#fff', borderRadius: 10,
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)', padding: '32px 36px',
          colorScheme: 'light', color: '#333', fontFamily: 'sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#2e7d32' }}>🌱 Food Plotter</div>
            <div style={{ fontSize: 12, color: '#888' }}>Garden bed installation quote</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: '#666' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>{yard.name}</div>
            <div>{yard.width} × {yard.height} ft yard{yard.hardiness_zone ? ` · zone ${yard.hardiness_zone}` : ''}</div>
            <div>{today}</div>
          </div>
        </div>

        {/* Bed line items */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18 }}>
          <thead>
            <tr>
              <th style={th}>Bed</th>
              <th style={th}>Size</th>
              <th style={th}>Plants</th>
              <th style={{ ...th, textAlign: 'right' }}>Lumber</th>
              <th style={{ ...th, textAlign: 'right' }}>Soil</th>
              <th style={{ ...th, textAlign: 'right' }}>Plants</th>
            </tr>
          </thead>
          <tbody>
            {beds.map((b) => (
              <tr key={b.id}>
                <td style={{ ...td, fontWeight: 600 }}>{b.name}</td>
                <td style={td}>{isRow(b) ? `${b.width}×${b.height} ft in-ground row` : `${b.width}×${b.height}×${b.depth} ft ${b.material}`}</td>
                <td style={td}>{(b.extra_plants ?? []).map((p) => p.name).join(', ') || '—'}</td>
                <td style={money}>{lumberCost(b) ? `$${lumberCost(b)}` : '—'}</td>
                <td style={money}>${Math.round(soilVolume(b) * PRICING.soilPerCuFtBagged)}</td>
                <td style={money}>{plantsCost(b) ? `$${plantsCost(b)}` : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals: DIY vs installed */}
        <div style={{ display: 'flex', gap: 28, marginTop: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2e7d32', marginBottom: 6 }}>
              Option A — DIY materials
            </div>
            {m.lumber > 0 && <Row label={`Lumber + hardware (${beds.filter((b) => !isRow(b)).length} bed${beds.filter((b) => !isRow(b)).length !== 1 ? 's' : ''})`} value={`$${m.lumber}`} />}
            <Row
              label={m.soilMode === 'bulk'
                ? `Soil — ${(m.soilCuFt / 27).toFixed(1)} cu yd bulk, delivered`
                : `Soil — ${Math.ceil(m.soilCuFt / 1.5)} bags (${sqft(m.soilCuFt)} cu ft)`}
              value={`$${m.soil}`}
            />
            {m.plants > 0 && <Row label="Plants & seeds" value={`$${m.plants}`} />}
            <Row label="DIY total" value={`$${m.total}`} bold />
            <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>
              You buy, build, fill, and plant. {m.soilMode === 'bulk' ? 'Bulk soil beats bags at this volume.' : ''}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3d2b1a', marginBottom: 6 }}>
              Option B — We install it
            </div>
            <Row label="Materials (as left)" value={`$${m.total}`} />
            <Row label={`Procurement & handling (${Math.round(PRICING.install.materialsMarkup * 100)}%)`} value={`$${inst.markup}`} />
            <Row label="Build, fill & plant labor" value={`$${inst.labor}`} />
            <Row label="Delivery" value={`$${inst.delivery}`} />
            <Row label="Installed total" value={`$${inst.total}`} bold accent="#3d2b1a" />
            <div style={{ fontSize: 10, color: '#999', marginTop: 4 }}>
              Turn-key: we deliver, build, fill, and plant everything on this sheet.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, paddingTop: 10, borderTop: '1px solid #eee', fontSize: 10, color: '#aaa', lineHeight: 1.5 }}>
          {(yard.obstacles ?? []).length > 0 && (() => {
            const counts = {}
            for (const o of yard.obstacles) {
              const label = (OBSTACLE_KINDS[o.kind] ?? OBSTACLE_KINDS.shed).label.toLowerCase()
              counts[label] = (counts[label] ?? 0) + 1
            }
            const summary = Object.entries(counts).map(([label, n]) => n > 1 ? `${label} ×${n}` : label).join(', ')
            return <>Site features marked on the plan: {summary}.{' '}</>
          })()}
          Estimate based on typical retail pricing ({formatCost(PRICING.lumberPerLf.cedar)}/lf cedar 2×6, ${PRICING.soilPerCuYdBulk}/cu yd bulk soil).
          Final installation quote confirmed after a site visit. Prices exclude tax, irrigation, and ground prep beyond normal leveling.
          {beds.some(isRow) && ' In-ground rows assume workable native soil — heavy clay or rocky sites usually do better with raised beds.'}
        </div>

        {/* Actions — hidden when printing */}
        <div className="no-print" style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '6px 14px', fontSize: 13, border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#555' }}
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            style={{ padding: '6px 18px', fontSize: 13, border: 'none', borderRadius: 6, background: '#2e7d32', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
          >
            🖨 Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  )
}
