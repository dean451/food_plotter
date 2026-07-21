import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RegionPicker from './RegionPicker.jsx'

describe('RegionPicker', () => {
  it('shows "Set region" when no region is chosen yet', () => {
    render(<RegionPicker region={null} onChange={() => {}} />)
    expect(screen.getByText(/Set region/)).toBeInTheDocument()
  })

  it('opens the list and reports the picked region', () => {
    const onChange = vi.fn()
    render(<RegionPicker region={null} onChange={onChange} />)

    fireEvent.click(screen.getByText(/Set region/))
    fireEvent.click(screen.getByText('Northeast / New England'))

    expect(onChange).toHaveBeenCalledWith('northeast')
  })

  it('shows the current region\'s label on the closed button', () => {
    render(<RegionPicker region="pacific_northwest" onChange={() => {}} />)
    expect(screen.getByText(/Pacific Northwest/)).toBeInTheDocument()
  })
})
