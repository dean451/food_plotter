import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import YardStats from './YardStats.jsx'

const yard = {
  width: 10, height: 10, unit: 'ft',
  beds: [ { width: 4, height: 4, extra_plants: [ { name: 'Tomato' } ] } ],
  obstacles: [],
}

describe('YardStats', () => {
  it('shows the full stat strip by default', () => {
    render(<YardStats yard={yard} />)
    expect(screen.getByText('Yard')).toBeInTheDocument()
    expect(screen.getByText('Beds')).toBeInTheDocument()
    expect(screen.getByText('100 sq ft')).toBeInTheDocument()
  })

  it('collapses to a single sqft line in compact mode', () => {
    render(<YardStats yard={yard} compact />)
    expect(screen.getByText('100 sq ft')).toBeInTheDocument()
    expect(screen.queryByText('Beds')).not.toBeInTheDocument()
  })
})
