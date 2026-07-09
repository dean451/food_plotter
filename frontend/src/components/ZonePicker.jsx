import { useState } from 'react'
import { ZONE_CHOICES, ZONE_INFO } from '../utils.js'

export default function ZonePicker({ zone, onChange }) {
  const [open, setOpen] = useState(false)
  const [zip, setZip] = useState('')
  const [status, setStatus] = useState(null) // null | 'looking' | 'error'

  async function lookupZip(e) {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip.trim())) { setStatus('error'); return }
    setStatus('looking')
    try {
      const r = await fetch(`/api/v1/zone_lookup/${zip.trim()}`)
      if (!r.ok) throw new Error(`zip lookup ${r.status}`)
      const data = await r.json()
      const found = (data.zone || '').toLowerCase()
      if (!ZONE_CHOICES.includes(found)) throw new Error(`unknown zone ${found}`)
      setStatus(null)
      setOpen(false)
      setZip('')
      onChange(found)
    } catch {
      setStatus('error')
    }
  }

  function pick(z) {
    setOpen(false)
    onChange(z || null)
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => { setOpen((o) => !o); setStatus(null) }}
        title="USDA hardiness zone — used to flag plants that won't thrive in your climate"
        style={{
          padding: '3px 10px', fontSize: 12, borderRadius: 12, cursor: 'pointer',
          border: `1px solid ${zone ? '#a5d6a7' : '#ccc'}`,
          background: zone ? '#e8f5e9' : '#fff',
          color: zone ? '#2e7d32' : '#888',
          fontWeight: zone ? 600 : 400,
        }}
      >
        {zone ? `${ZONE_INFO[zone]?.emoji ?? '🌡'} Zone ${zone}` : '🌡 Set zone'} ▾
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', left: 0, top: 'calc(100% + 4px)', zIndex: 100,
            background: '#fff', border: '1px solid #ddd', borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,.12)', padding: 12, width: 230,
          }}>
            <div style={{ fontSize: 10, color: '#999', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 6 }}>
              USDA Hardiness Zone
            </div>

            <form onSubmit={lookupZip} style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              <input
                value={zip}
                onChange={(e) => { setZip(e.target.value); setStatus(null) }}
                placeholder="Zip code"
                inputMode="numeric"
                autoFocus
                style={{ flex: 1, minWidth: 0, padding: '4px 8px', fontSize: 12, border: '1px solid #ccc', borderRadius: 6 }}
              />
              <button
                type="submit"
                disabled={status === 'looking'}
                style={{ padding: '4px 10px', fontSize: 12, border: 'none', borderRadius: 6, background: '#2e7d32', color: '#fff', cursor: 'pointer' }}
              >
                {status === 'looking' ? '…' : 'Find'}
              </button>
            </form>
            {status === 'error' && (
              <div style={{ fontSize: 11, color: '#c62828', marginBottom: 8 }}>
                Couldn't look up that zip — pick your zone below instead
              </div>
            )}

            <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>or pick your zone:</div>
            <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6 }}>
              {ZONE_CHOICES.map((z) => {
                const info = ZONE_INFO[z]
                const active = z === zone
                return (
                  <button
                    key={z}
                    onClick={() => pick(z)}
                    style={{
                      display: 'flex', width: '100%', gap: 8, alignItems: 'center',
                      padding: '6px 10px', border: 'none', borderBottom: '1px solid #f5f5f5',
                      background: active ? '#e8f5e9' : '#fff', cursor: 'pointer', textAlign: 'left',
                      color: '#333',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{info.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 12, width: 34, flexShrink: 0 }}>({z})</span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: 11, color: '#555' }}>winter lows {info.temp}</span>
                      <span style={{ display: 'block', fontSize: 10, color: '#aaa' }}>{info.eg}</span>
                    </span>
                    {active && <span style={{ color: '#2e7d32', fontSize: 12 }}>✓</span>}
                  </button>
                )
              })}
            </div>
            {zone && (
              <button
                onClick={() => pick(null)}
                style={{ marginTop: 8, padding: '3px 8px', fontSize: 11, border: '1px solid #ddd', borderRadius: 6, background: '#fff', color: '#888', cursor: 'pointer' }}
              >
                ✕ Clear zone
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
