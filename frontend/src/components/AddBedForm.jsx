import { useState } from 'react'
import { parseBed, findOpenSpot } from '../utils.js'

const MATERIALS = ['cedar', 'pine', 'cypress']
const EMPTY_FORM = { name: '', emoji: '🌱', width: 4, height: 4, depth: 1, material: 'cedar' }

const btnStyle = {
  padding: '6px 14px', background: '#2e7d32', color: '#fff',
  border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14,
}
const formStyle = {
  marginTop: 12, padding: 16, background: '#f9f9f9',
  border: '1px solid #ddd', borderRadius: 6, maxWidth: 340,
}
const row = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
const labelStyle = { width: 90, fontSize: 13, color: '#444', flexShrink: 0 }
const inputStyle = { flex: 1, padding: '4px 8px', fontSize: 13, border: '1px solid #ccc', borderRadius: 4 }

export default function AddBedForm({ yard, onAdd }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  function set(field) { return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const { x, y } = findOpenSpot(
        yard.beds ?? [], yard.width, yard.height,
        parseFloat(form.width) || 1, parseFloat(form.height) || 1
      )
      const res = await fetch(`/api/v1/yards/${yard.token}/beds`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bed: { ...form, x, y, rotation: 0 } }),
      })
      onAdd(parseBed(await res.json()))
      setForm(EMPTY_FORM)
      setOpen(false)
    } finally { setSaving(false) }
  }

  if (!open) return <button onClick={() => setOpen(true)} style={btnStyle}>+ Add Bed</button>

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {[
        { field: 'name', label: 'Name', type: 'text', props: { placeholder: 'e.g. Carrot Bed' } },
        { field: 'emoji', label: 'Emoji', type: 'text', props: { style: { maxWidth: 60 } } },
        { field: 'width', label: 'Width (ft)', type: 'number', props: { min: 1, step: 0.5 } },
        { field: 'height', label: 'Height (ft)', type: 'number', props: { min: 1, step: 0.5 } },
        { field: 'depth', label: 'Depth (ft)', type: 'number', props: { min: 0.5, step: 0.5 } },
      ].map(({ field, label: lbl, type, props }) => (
        <div key={field} style={row}>
          <label style={labelStyle}>{lbl}</label>
          <input required={field !== 'emoji'} type={type} style={{ ...inputStyle, ...props.style }} value={form[field]} onChange={set(field)} {...props} />
        </div>
      ))}
      <div style={row}>
        <label style={labelStyle}>Material</label>
        <select style={inputStyle} value={form.material} onChange={set('material')}>
          {MATERIALS.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button type="submit" disabled={saving} style={btnStyle}>{saving ? 'Adding…' : 'Add'}</button>
        <button type="button" onClick={() => setOpen(false)} style={{ ...btnStyle, background: '#eee', color: '#333' }}>Cancel</button>
      </div>
    </form>
  )
}
