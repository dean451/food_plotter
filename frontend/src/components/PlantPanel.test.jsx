import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PlantPanel from './PlantPanel.jsx'

const plants = [
  { id: 1, name: 'Tomato', emoji: '🍅', spacing_ft: 2, category: 'vegetable', season: 'summer' },
  { id: 2, name: 'Basil', emoji: '🌿', spacing_ft: 1, category: 'herb', season: 'summer' },
]

const bed = { id: 1, name: 'Tomato Bed', width: 4, height: 4, extra_plants: [] }

describe('PlantPanel', () => {
  it('prompts to select a bed when none is selected', () => {
    render(<PlantPanel bed={null} plants={plants} onAddPlant={() => {}} onRemovePlant={() => {}} />)
    expect(screen.getByText('Select a bed to assign')).toBeInTheDocument()
  })

  it('lists plants and adds one to the bed on click', () => {
    const onAddPlant = vi.fn()
    render(<PlantPanel bed={bed} plants={plants} onAddPlant={onAddPlant} onRemovePlant={() => {}} />)

    expect(screen.getByText('Tomato Bed · 0/3')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Tomato'))

    expect(onAddPlant).toHaveBeenCalledWith(bed, plants[0])
  })

  it('shows roster chips for plants already assigned, with a way to remove them', () => {
    const onRemovePlant = vi.fn()
    const bedWithPlant = { ...bed, extra_plants: [ plants[0] ] }
    render(<PlantPanel bed={bedWithPlant} plants={plants} onAddPlant={() => {}} onRemovePlant={onRemovePlant} />)

    fireEvent.click(screen.getByTitle('Remove Tomato'))
    expect(onRemovePlant).toHaveBeenCalledWith(bedWithPlant, 1)
  })
})
