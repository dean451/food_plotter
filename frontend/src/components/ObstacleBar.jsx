import { OBSTACLE_KINDS } from '../utils.js'

// One-click stamps for the stuff already in the yard — house, driveway, etc.
// Beds can't be auto-placed on them and coverage math excludes them.
export default function ObstacleBar({ onAdd }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Mark what's already there:</span>
      {Object.entries(OBSTACLE_KINDS).map(([key, k]) => (
        <button
          key={key}
          onClick={() => onAdd(key)}
          title={`Mark a ${k.label.toLowerCase()} on the yard — beds can't go there`}
          style={{
            padding: '2px 8px', fontSize: 11, border: '1px solid #ccc', borderRadius: 12,
            background: '#fff', cursor: 'pointer', color: '#444',
          }}
        >
          {k.emoji} {k.label}
        </button>
      ))}
    </div>
  )
}
