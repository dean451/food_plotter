import { sqft, formatCost, yardMaterials, installEstimate } from '../utils.js'

// Recommended bed coverage scales inversely with yard size: small plots can be
// planted densely, but in a big yard, paths, seating, and access eat the rest —
// and 40% of 1000 sq ft is already more garden than most people can weed.
function coverageTarget(yardArea) {
  if (yardArea <= 200) return [40, 60]
  if (yardArea <= 500) return [35, 50]
  if (yardArea <= 1000) return [25, 40]
  return [15, 30]
}

export default function YardStats({ yard }) {
  const yardArea = yard.width * yard.height
  const bedArea = yard.beds.reduce((sum, b) => sum + b.width * b.height, 0)
  const openArea = Math.max(0, yardArea - bedArea)
  const coverage = yardArea > 0 ? Math.round((bedArea / yardArea) * 100) : 0
  const plantedBeds = yard.beds.filter((b) => b.extra_plants?.length > 0).length
  const diyTotal = yardMaterials(yard.beds).total
  const installedTotal = installEstimate(yard.beds).total

  const [lo, hi] = coverageTarget(yardArea)
  const toGo = Math.ceil((lo / 100) * yardArea - bedArea)
  const coverageStatus =
    coverage < lo ? `Room to grow — about ${toGo} more sq ft of beds reaches the target.`
    : coverage <= hi ? '✓ In the sweet spot.'
    : `Above ${hi}% — keep paths walkable.`

  const stats = [
    { label: 'Yard', value: `${sqft(yardArea)} sq ft`, sub: `${yard.width}×${yard.height} ${yard.unit}` },
    {
      label: 'Beds', value: `${sqft(bedArea)} sq ft`, sub: `${coverage}% covered`,
      meter: {
        pct: coverage, lo, hi,
        tip: `${coverageStatus} Recommended bed coverage for a ${sqft(yardArea)} sq ft yard is ${lo}–${hi}% — paths and access need the rest.`,
      },
    },
    { label: 'Open', value: `${sqft(openArea)} sq ft`, sub: `${100 - coverage}% remaining` },
    { label: 'Count', value: yard.beds.length, sub: yard.beds.length === 1 ? 'bed' : 'beds' },
    { label: 'Planted', value: plantedBeds, sub: `of ${yard.beds.length} beds` },
    ...(yard.beds.length > 0 ? [{
      label: 'Est. Cost',
      value: (
        <>
          ~{formatCost(diyTotal)}
          <span style={{ fontSize: 11, fontWeight: 600, color: '#888', marginLeft: 4 }}>DIY</span>
        </>
      ),
      sub: `~${formatCost(installedTotal)} installed`,
    }] : []),
  ]

  return (
    <div style={{ display: 'flex', width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #ddd', marginBottom: 12 }}>
      {stats.map(({ label, value, sub, meter }, i) => (
        <div key={i} style={{ flex: 1, padding: '8px 12px', lineHeight: 1.35, background: i % 2 === 0 ? '#f9f9f9' : '#fff', borderRight: i < stats.length - 1 ? '1px solid #ddd' : 'none' }}>
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#222', lineHeight: 1.2 }}>{value}</div>
          {meter && (
            <div
              title={meter.tip}
              style={{ position: 'relative', height: 4, borderRadius: 3, background: '#e8e8e8', margin: '3px 0', overflow: 'hidden' }}
            >
              {/* target band */}
              <div style={{ position: 'absolute', left: `${meter.lo}%`, width: `${meter.hi - meter.lo}%`, top: 0, bottom: 0, background: '#c8e6c9' }} />
              {/* current coverage */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: `${Math.min(100, meter.pct)}%`,
                background: meter.pct > meter.hi ? '#ef6c00' : '#66bb6a',
                borderRadius: 3,
                opacity: 0.85,
              }} />
            </div>
          )}
          <div style={{ fontSize: 11, color: '#999' }}>{sub}</div>
        </div>
      ))}
    </div>
  )
}
