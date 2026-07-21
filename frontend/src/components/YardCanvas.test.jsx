import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import YardCanvas from './YardCanvas.jsx'

const yard = { width: 20, height: 20 }
const beds = [
  { id: 1, name: 'Tomato Bed', x: 2, y: 2, width: 4, height: 4, rotation: 0, material: 'cedar', extra_plants: [] },
]

const noop = () => {}

describe('YardCanvas', () => {
  it('renders each bed with its name and size', () => {
    render(
      <YardCanvas
        yard={yard} beds={beds} obstacles={[]}
        selectedBedId={null} onSelectBed={noop}
        selectedObstacleId={null} onSelectObstacle={noop}
        onBedMove={noop} onBedDelete={noop} onBedRotate={noop} onBedResize={noop}
        onObstacleMove={noop} onObstacleResize={noop} onObstacleDelete={noop}
      />
    )
    expect(screen.getByText('Tomato Bed')).toBeInTheDocument()
    expect(screen.getByText('16 sq ft')).toBeInTheDocument()
  })

  it('selects a bed on pointer down', () => {
    const onSelectBed = vi.fn()
    render(
      <YardCanvas
        yard={yard} beds={beds} obstacles={[]}
        selectedBedId={null} onSelectBed={onSelectBed}
        selectedObstacleId={null} onSelectObstacle={noop}
        onBedMove={noop} onBedDelete={noop} onBedRotate={noop} onBedResize={noop}
        onObstacleMove={noop} onObstacleResize={noop} onObstacleDelete={noop}
      />
    )
    const bedGroup = screen.getByText('Tomato Bed').closest('g')
    fireEvent.pointerDown(bedGroup, { clientX: 40, clientY: 40 })
    expect(onSelectBed).toHaveBeenCalledWith(1)
  })
})
