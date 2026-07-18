import { useState } from 'react'
import { REGION_CHOICES, REGION_INFO } from '../utils.js'

// Companion to ZonePicker: zone is climate (will it survive), region is
// ecology (is it actually native here). No zip lookup — there's no free API
// for "which native-plant region is this zip in," so it's a plain picker.
export default function RegionPicker({ region, onChange }) {
  const [open, setOpen] = useState(false)

  function pick(r) {
    setOpen(false)
    onChange(r || null)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Your ecological region — narrows 'native' plant picks to ones actually native here, not just cold-hardy here"
        style={{
          padding: '3px 10px', fontSize: 12, borderRadius: 12, cursor: 'pointer',
          border: `1px solid ${region ? '#a5d6a7' : '#ccc'}`,
          background: region ? '#e8f5e9' : '#fff',
          color: region ? '#2e7d32' : '#888',
          fontWeight: region ? 600 : 400,
        }}
      >
        {region ? `${REGION_INFO[region]?.emoji ?? '🗺'} ${REGION_INFO[region]?.label ?? region}` : '🗺 Set region'} ▾
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', left: 0, top: 'calc(100% + 4px)', zIndex: 100,
            background: '#fff', border: '1px solid #ddd', borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,.12)', padding: 12, width: 260,
          }}>
            <div style={{ fontSize: 10, color: '#999', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 6 }}>
              Ecological Region
            </div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>
              Used only to flag "native" plants that are actually local to you — everything else ignores this.
            </div>
            <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6 }}>
              {REGION_CHOICES.map((r) => {
                const info = REGION_INFO[r]
                const active = r === region
                return (
                  <button
                    key={r}
                    onClick={() => pick(r)}
                    style={{
                      display: 'flex', width: '100%', gap: 8, alignItems: 'center',
                      padding: '6px 10px', border: 'none', borderBottom: '1px solid #f5f5f5',
                      background: active ? '#e8f5e9' : '#fff', cursor: 'pointer', textAlign: 'left',
                      color: '#333',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{info.emoji}</span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 12 }}>{info.label}</span>
                    {active && <span style={{ color: '#2e7d32', fontSize: 12 }}>✓</span>}
                  </button>
                )
              })}
            </div>
            {region && (
              <button
                onClick={() => pick(null)}
                style={{ marginTop: 8, padding: '3px 8px', fontSize: 11, border: '1px solid #ddd', borderRadius: 6, background: '#fff', color: '#888', cursor: 'pointer' }}
              >
                ✕ Clear region
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
