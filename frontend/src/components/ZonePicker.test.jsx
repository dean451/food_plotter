import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ZonePicker from './ZonePicker.jsx'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ZonePicker', () => {
  it('shows "Set zone" when no zone is chosen yet', () => {
    render(<ZonePicker zone={null} onChange={() => {}} />)
    expect(screen.getByText(/Set zone/)).toBeInTheDocument()
  })

  it('opens the list and reports the picked zone', () => {
    const onChange = vi.fn()
    render(<ZonePicker zone={null} onChange={onChange} />)

    fireEvent.click(screen.getByText(/Set zone/))
    fireEvent.click(screen.getByText('(8b)'))

    expect(onChange).toHaveBeenCalledWith('8b')
  })

  it('looks up a zip code and reports the zone it resolves to', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ zone: '8b' }) })
    ))
    const onChange = vi.fn()
    render(<ZonePicker zone={null} onChange={onChange} />)

    fireEvent.click(screen.getByText(/Set zone/))
    fireEvent.change(screen.getByPlaceholderText('Zip code'), { target: { value: '78701' } })
    fireEvent.click(screen.getByText('Find'))

    await waitFor(() => expect(onChange).toHaveBeenCalledWith('8b'))
    expect(fetch).toHaveBeenCalledWith('/api/v1/zone_lookup/78701')
  })
})
