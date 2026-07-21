import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BedSidebar from './BedSidebar.jsx'

describe('BedSidebar', () => {
  it('prompts to click a bed when none is selected', () => {
    render(<BedSidebar bed={null} onRemovePlant={() => {}} />)
    expect(screen.getByText('Click a bed to see details')).toBeInTheDocument()
  })

  it('shows bed details, plant cards, and a DIY cost estimate', () => {
    const bed = {
      id: 1, name: 'Tomato Bed', width: 4, height: 4, depth: 1, material: 'cedar',
      extra_plants: [ { id: 1, name: 'Tomato', emoji: '🍅', spacing_ft: 2, season: 'summer' } ],
    }
    render(<BedSidebar bed={bed} onRemovePlant={() => {}} />)

    expect(screen.getByText('Tomato Bed')).toBeInTheDocument()
    expect(screen.getByText('Est. DIY Materials')).toBeInTheDocument()
    expect(screen.getByText('Total')).toBeInTheDocument()
  })

  it('removes a plant from the bed on click', () => {
    const onRemovePlant = vi.fn()
    const bed = {
      id: 1, name: 'Tomato Bed', width: 4, height: 4, depth: 1, material: 'cedar',
      extra_plants: [ { id: 1, name: 'Tomato', emoji: '🍅', spacing_ft: 2, season: 'summer' } ],
    }
    render(<BedSidebar bed={bed} onRemovePlant={onRemovePlant} />)

    fireEvent.click(screen.getByTitle('Remove Tomato'))
    expect(onRemovePlant).toHaveBeenCalledWith(bed, 1)
  })
})
