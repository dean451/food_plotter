// Shared UI constants and style fragments

export const SUN_LABEL   = { 'full sun': '☀️ Full sun', 'part shade': '⛅ Part shade', 'full shade': '🌑 Full shade' }
export const WATER_LABEL = { low: '💧 Low water', moderate: '💧💧 Moderate', high: '💧💧💧 High water' }

export const panelStyle = {
  border: '1px solid #ddd', borderRadius: 8,
  background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden',
}

// Green-when-selected filter pill
export function pillBtnStyle(selected, extra = {}) {
  return {
    fontSize: 10, borderRadius: 12, cursor: 'pointer', border: '1px solid',
    background: selected ? '#2e7d32' : '#fff',
    color: selected ? '#fff' : '#555',
    borderColor: selected ? '#2e7d32' : '#ccc',
    ...extra,
  }
}
