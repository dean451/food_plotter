import { createPortal } from 'react-dom'

const UNDO_KEY = /Mac/.test(navigator.platform) ? '⌘Z' : 'Ctrl+Z'

export default function Toasts({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return createPortal(
    <div style={{
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
    }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: t.tone === 'error' ? '#b71c1c' : '#323232', color: '#fff',
            borderRadius: 8, padding: '10px 14px', fontSize: 13, maxWidth: 420,
            display: 'flex', gap: 12, alignItems: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,.25)',
          }}
        >
          <span style={{ lineHeight: 1.4 }}>{t.message}</span>
          {t.actionLabel && (
            <button
              onClick={() => { onDismiss(t.id); t.onAction?.() }}
              style={{
                background: 'none', border: 'none', color: '#81c784', fontWeight: 700,
                cursor: 'pointer', fontSize: 13, padding: '2px 4px', flexShrink: 0,
                textTransform: 'uppercase', letterSpacing: '0.03em',
              }}
            >
              {t.actionLabel}
              {t.actionLabel === 'Undo' && (
                <span style={{ marginLeft: 5, color: '#999', fontWeight: 400, textTransform: 'none' }}>{UNDO_KEY}</span>
              )}
            </button>
          )}
          <button
            onClick={() => onDismiss(t.id)}
            style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 15, padding: 0, lineHeight: 1, flexShrink: 0 }}
            title="Dismiss"
          >×</button>
        </div>
      ))}
    </div>,
    document.body
  )
}
