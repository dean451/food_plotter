import { describe, it, expect } from 'vitest'
import {
  sqft, isRow, soilVolume, lumberCost, soilCost, plantsCost, bedCost,
  yardMaterials, installEstimate, formatCost,
  zoneToNum, plantFitsZone, plantFitsRegion, plantingWindow,
  bedFootprint, clampBedToYard, rectsOverlap, obstaclesArea, plantableArea,
  findOpenSpot, nextBedName, parseBed, parseObstacle,
} from './utils.js'

describe('sqft', () => {
  it('formats whole numbers without decimals and fractions with one decimal', () => {
    expect(sqft(16)).toBe('16')
    expect(sqft(16.666)).toBe('16.7')
  })
})

describe('bed cost estimates', () => {
  const bed = { width: 4, height: 4, depth: 1, material: 'cedar', extra_plants: [] }

  it('isRow only flags in-ground material', () => {
    expect(isRow(bed)).toBe(false)
    expect(isRow({ ...bed, material: 'in-ground' })).toBe(true)
  })

  it('soilVolume is width × height × depth for a raised bed', () => {
    expect(soilVolume(bed)).toBe(16)
  })

  it('lumberCost is positive for a raised bed and zero for an in-ground row', () => {
    expect(lumberCost(bed)).toBeGreaterThan(0)
    expect(lumberCost({ ...bed, material: 'in-ground' })).toBe(0)
  })

  it('soilCost scales with soil volume', () => {
    expect(soilCost(bed)).toBeGreaterThan(0)
    expect(soilCost({ ...bed, width: 8 })).toBeGreaterThan(soilCost(bed))
  })

  it('plantsCost prices a seed-tier plant at a flat $5', () => {
    const withLettuce = { ...bed, extra_plants: [ { name: 'Lettuce', spacing_ft: 0.5 } ] }
    expect(plantsCost(withLettuce)).toBe(5)
  })

  it('bedCost sums lumber, soil, and plants', () => {
    const withPlant = { ...bed, extra_plants: [ { name: 'Tomato', spacing_ft: 2 } ] }
    expect(bedCost(withPlant)).toBe(lumberCost(withPlant) + soilCost(withPlant) + plantsCost(withPlant))
  })

  it('yardMaterials totals across every bed in the yard', () => {
    const beds = [ bed, { ...bed, width: 8 } ]
    const result = yardMaterials(beds)
    expect(result.total).toBe(result.lumber + result.plants + result.soil)
  })

  it('installEstimate adds markup, labor, and delivery on top of materials', () => {
    const materials = yardMaterials([ bed ])
    const install = installEstimate([ bed ])
    expect(install.total).toBeGreaterThan(materials.total)
  })

  it('formatCost abbreviates costs at or above $1,000', () => {
    expect(formatCost(250)).toBe('$250')
    expect(formatCost(2500)).toBe('$2.5k')
  })
})

describe('hardiness zones', () => {
  it('zoneToNum parses "8b"-style zones into a sortable number', () => {
    expect(zoneToNum('8b')).toBe(8.5)
    expect(zoneToNum('8a')).toBe(8.0)
    expect(zoneToNum('not-a-zone')).toBeNull()
  })

  it('plantFitsZone passes when the yard zone falls inside the plant range', () => {
    const plant = { zone_min: '7a', zone_max: '9b' }
    expect(plantFitsZone(plant, '8b')).toBe(true)
    expect(plantFitsZone(plant, '3a')).toBe(false)
  })

  it('plantFitsZone is permissive when zone data is missing', () => {
    expect(plantFitsZone({ zone_min: '7a', zone_max: '9b' }, null)).toBe(true)
    expect(plantFitsZone({}, '8b')).toBe(true)
  })

  it('plantingWindow returns a human-readable planting time for a zone', () => {
    expect(plantingWindow('spring', '8b')).toContain('after last frost')
    expect(plantingWindow('perennial', '8b')).toBe('spring or fall, plant once')
  })
})

describe('ecological region', () => {
  it('plantFitsRegion only restricts native-category plants', () => {
    expect(plantFitsRegion({ category: 'vegetable', region: 'northeast' }, 'south_central')).toBe(true)
    expect(plantFitsRegion({ category: 'native', region: 'northeast' }, 'south_central')).toBe(false)
    expect(plantFitsRegion({ category: 'native', region: 'northeast' }, 'northeast')).toBe(true)
  })

  it('plantFitsRegion is permissive when region data is missing', () => {
    expect(plantFitsRegion({ category: 'native', region: null }, 'south_central')).toBe(true)
    expect(plantFitsRegion({ category: 'native', region: 'northeast' }, null)).toBe(true)
  })
})

describe('layout geometry', () => {
  it('bedFootprint swaps width/height when rotated 90°', () => {
    const bed = { x: 0, y: 0, width: 4, height: 2, rotation: 90 }
    const fp = bedFootprint(bed)
    expect(fp.width).toBe(2)
    expect(fp.height).toBe(4)
  })

  it('clampBedToYard keeps a bed inside the yard bounds', () => {
    const bed = { x: 18, y: 18, width: 4, height: 4, rotation: 0 }
    const pos = clampBedToYard(bed, 20, 20)
    expect(pos.x).toBeLessThanOrEqual(16)
    expect(pos.y).toBeLessThanOrEqual(16)
  })

  it('rectsOverlap detects intersecting rectangles and clears non-overlapping ones', () => {
    const a = { x: 0, y: 0, width: 4, height: 4 }
    expect(rectsOverlap(a, { x: 2, y: 2, width: 4, height: 4 })).toBe(true)
    expect(rectsOverlap(a, { x: 10, y: 10, width: 4, height: 4 })).toBe(false)
  })

  it('obstaclesArea and plantableArea account for what obstacles remove', () => {
    const yard = { width: 10, height: 10, obstacles: [ { x: 0, y: 0, width: 4, height: 4 } ] }
    expect(obstaclesArea(yard.obstacles, yard.width, yard.height)).toBe(16)
    expect(plantableArea(yard)).toBe(100 - 16)
  })

  it('findOpenSpot places a new bed clear of existing beds', () => {
    const existing = [ { x: 0, y: 0, width: 4, height: 4, rotation: 0 } ]
    const spot = findOpenSpot(existing, 20, 20, 4, 4)
    const wouldOverlap = spot.x < 4 + 1 && spot.y < 4 + 1
    expect(wouldOverlap).toBe(false)
  })

  it('nextBedName appends a number only when the name is already taken', () => {
    const beds = [ { name: 'Salad Bowl' } ]
    expect(nextBedName('Herb Spiral', beds)).toBe('Herb Spiral')
    expect(nextBedName('Salad Bowl', beds)).toBe('Salad Bowl 2')
  })
})

describe('server payload parsing', () => {
  it('parseBed coerces numeric strings from the API into numbers', () => {
    const bed = parseBed({ x: '2', y: '3', width: '4', height: '4', depth: '1', rotation: '90', extra_plants: [ { spacing_ft: '2' } ] })
    expect(bed).toMatchObject({ x: 2, y: 3, width: 4, height: 4, depth: 1, rotation: 90 })
    expect(bed.extra_plants[0].spacing_ft).toBe(2)
  })

  it('parseObstacle coerces numeric strings and falls back sanely when missing', () => {
    const obstacle = parseObstacle({ x: '1', y: '2', width: '3', height: '4' })
    expect(obstacle).toMatchObject({ x: 1, y: 2, width: 3, height: 4 })
  })
})
