export function sqft(v) {
  return Number.isInteger(v) ? `${v}` : v.toFixed(1)
}

export const MATERIAL_COLORS = {
  cedar:       '#c8a96e',
  pine:        '#ddc99a',
  cypress:     '#9a7248',
  'in-ground': '#a1887f',
}

// ─── Cost estimates ───────────────────────────────────────────────────────────

export const PLANT_COST = {
  // $5 — seeds / easy annuals (price as one packet)
  Lettuce: 5, Spinach: 5, Radish: 5, Beans: 5, Carrot: 5, Corn: 5, Onion: 5,
  // $10 — common nursery starts
  Tomato: 10, Basil: 10, Kale: 10, Zucchini: 10, Pepper: 10,
  Mint: 10, Thyme: 10, Rosemary: 10, Strawberry: 10, Sunflower: 10,
  // $15 — perennials / specialty
  Lavender: 15, 'Purple Coneflower': 15, Lantana: 15, 'Rock Rose': 15,
  'Blackfoot Daisy': 15, 'Mexican Feathergrass': 15, 'Autumn Sage': 15,
  // $30 — woody shrubs / large natives
  'Texas Sage': 30, Sotol: 30, 'Flame Acanthus': 30, Esperanza: 30,
}

// Every pricing assumption lives here — tune against real jobs in one place.
export const PRICING = {
  // 2×6 boards, retail $/linear ft
  lumberPerLf: { pine: 1.75, cedar: 3.5, cypress: 3.0 },
  lumberDefaultLf: 2.5,
  hardwarePerBed: 12,        // corner brackets, screws
  soilPerCuFtBagged: 5,      // ~$7.5 per 1.5 cu ft bag, mid-grade raised-bed mix
  soilPerCuYdBulk: 60,       // delivered bulk mix, $/cu yd
  bulkSoilDelivery: 75,      // flat delivery fee on bulk soil
  bulkThresholdCuFt: 27,     // at ≥1 cu yd, bulk beats bags
  rowAmendmentDepthFt: 0.25, // in-ground rows get ~3" of compost tilled in, not a full fill
  install: {
    materialsMarkup: 0.15,   // procurement + handling on materials
    perBed: 45,              // assembly + placement labor
    perSqFt: 2.5,            // site prep, leveling, soil fill, planting
    rowPerBed: 20,           // layout + edging — no assembly
    rowPerSqFt: 3.5,         // sod removal, tilling, amending — more work than filling a box
    delivery: 60,            // crew + materials trip
  },
}

// In-ground row: planted straight into amended native soil, no lumber box
export function isRow(bed) {
  return bed.material === 'in-ground'
}

// Raised beds fill to their depth; in-ground rows just till in a few inches
// of compost, whatever the stored depth says
export function soilVolume(bed) {
  const depth = isRow(bed) ? PRICING.rowAmendmentDepthFt : (bed.depth ?? 1)
  return bed.width * bed.height * depth
}

// Lumber is bought by the linear foot of perimeter × stacked 2×6 layers
export function lumberCost(bed) {
  if (isRow(bed)) return 0
  const rate = PRICING.lumberPerLf[bed.material] ?? PRICING.lumberDefaultLf
  const layers = Math.max(1, Math.round((bed.depth ?? 1) / 0.5))
  const linearFt = 2 * (bed.width + bed.height) * layers
  return Math.round(linearFt * rate + PRICING.hardwarePerBed)
}

// Per-bed soil at bagged retail — the whole-yard estimate switches to bulk
// automatically (see yardMaterials)
export function soilCost(bed) {
  return Math.round(soilVolume(bed) * PRICING.soilPerCuFtBagged)
}

// Plants: seed-tier ($5) → one packet flat; others → count × unit
// Multiple plant types share the bed equally (each gets 1/n of the space)
export function plantsCost(bed) {
  const extra = bed.extra_plants ?? []
  const n = Math.max(1, extra.length)
  return extra.reduce((sum, plant) => {
    const unitCost = PLANT_COST[plant.name] ?? 10
    if (unitCost <= 5) return sum + 5
    const full = Math.floor(bed.width / plant.spacing_ft) * Math.floor(bed.height / plant.spacing_ft)
    const count = Math.max(1, Math.floor(full / n))
    return sum + count * unitCost
  }, 0)
}

// How many of a plant fit in a bed given how many types are sharing it
export function plantsPerBedShared(bed, plant, totalTypes) {
  const n = Math.max(1, totalTypes)
  const full = Math.floor(bed.width / plant.spacing_ft) * Math.floor(bed.height / plant.spacing_ft)
  return Math.max(1, Math.floor(full / n))
}

export function bedCost(bed) {
  return lumberCost(bed) + soilCost(bed) + plantsCost(bed)
}

// Whole-yard DIY materials, with soil priced bulk when the volume justifies it
export function yardMaterials(beds) {
  const lumber = beds.reduce((s, b) => s + lumberCost(b), 0)
  const plants = beds.reduce((s, b) => s + plantsCost(b), 0)
  const soilCuFt = beds.reduce((s, b) => s + soilVolume(b), 0)
  const bagged = Math.round(soilCuFt * PRICING.soilPerCuFtBagged)
  const bulk = Math.round((soilCuFt / 27) * PRICING.soilPerCuYdBulk + PRICING.bulkSoilDelivery)
  const useBulk = soilCuFt >= PRICING.bulkThresholdCuFt && bulk < bagged
  const soil = useBulk ? bulk : bagged
  return { lumber, plants, soil, soilCuFt, soilMode: useBulk ? 'bulk' : 'bagged', total: lumber + plants + soil }
}

// Professionally installed: materials + markup + labor + delivery.
// Raised beds bill assembly + fill; in-ground rows bill ground prep instead.
export function installEstimate(beds) {
  const materials = yardMaterials(beds)
  const { materialsMarkup, perBed, perSqFt, rowPerBed, rowPerSqFt, delivery } = PRICING.install
  const markup = Math.round(materials.total * materialsMarkup)
  const labor = Math.round(beds.reduce((s, b) => {
    const area = b.width * b.height
    return s + (isRow(b) ? rowPerBed + rowPerSqFt * area : perBed + perSqFt * area)
  }, 0))
  return { materials, markup, labor, delivery, total: materials.total + markup + labor + delivery }
}

export function formatCost(n) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${n}`
}

// ─── USDA hardiness zones ─────────────────────────────────────────────────────

export const ZONE_CHOICES = [
  '3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b',
  '8a', '8b', '9a', '9b', '10a', '10b', '11a', '11b',
]

// Average annual extreme winter low per zone, with an anchor city for flavor
export const ZONE_INFO = {
  '3a':  { emoji: '🥶', temp: '−40 to −35°F', eg: 'International Falls, MN' },
  '3b':  { emoji: '🥶', temp: '−35 to −30°F', eg: 'Fargo, ND' },
  '4a':  { emoji: '❄️', temp: '−30 to −25°F', eg: 'Minneapolis, MN' },
  '4b':  { emoji: '❄️', temp: '−25 to −20°F', eg: 'Burlington, VT' },
  '5a':  { emoji: '⛄', temp: '−20 to −15°F', eg: 'Des Moines, IA' },
  '5b':  { emoji: '⛄', temp: '−15 to −10°F', eg: 'Chicago, IL' },
  '6a':  { emoji: '🧣', temp: '−10 to −5°F',  eg: 'Denver, CO' },
  '6b':  { emoji: '🧣', temp: '−5 to 0°F',    eg: 'Kansas City, MO' },
  '7a':  { emoji: '🍂', temp: '0 to 5°F',     eg: 'Boston, MA' },
  '7b':  { emoji: '🍂', temp: '5 to 10°F',    eg: 'Richmond, VA' },
  '8a':  { emoji: '🌤', temp: '10 to 15°F',   eg: 'Dallas, TX' },
  '8b':  { emoji: '🌤', temp: '15 to 20°F',   eg: 'Seattle, WA' },
  '9a':  { emoji: '☀️', temp: '20 to 25°F',   eg: 'Austin, TX' },
  '9b':  { emoji: '☀️', temp: '25 to 30°F',   eg: 'Orlando, FL' },
  '10a': { emoji: '🌴', temp: '30 to 35°F',   eg: 'Los Angeles, CA' },
  '10b': { emoji: '🌴', temp: '35 to 40°F',   eg: 'Miami, FL' },
  '11a': { emoji: '🥥', temp: '40 to 45°F',   eg: 'Key West, FL' },
  '11b': { emoji: '🥥', temp: '45 to 50°F',   eg: 'Honolulu, HI' },
}

// "8b" → 8.5, "8a" → 8.0; null for anything unparseable
export function zoneToNum(zone) {
  const m = /^(\d{1,2})([ab])$/i.exec((zone ?? '').trim())
  if (!m) return null
  return parseInt(m[1], 10) + (m[2].toLowerCase() === 'b' ? 0.5 : 0)
}

// A plant fits if no yard zone is set, the plant has no zone data, or the yard
// zone falls inside the plant's [zone_min, zone_max] range.
export function plantFitsZone(plant, yardZone) {
  const z = zoneToNum(yardZone)
  if (z === null) return true
  const lo = zoneToNum(plant.zone_min)
  const hi = zoneToNum(plant.zone_max)
  if (lo === null || hi === null) return true
  return z >= lo && z <= hi
}

// ─── Ecological region ─────────────────────────────────────────────────────────
// Distinct from hardiness zone: zone captures winter cold tolerance, region
// captures whether a plant is actually native to where you garden. A Texas
// Hill Country native and a Vermont native can share a hardiness zone and
// still have nothing to do with each other ecologically.

export const REGION_CHOICES = [
  'south_central', 'northeast', 'upper_midwest', 'pacific_northwest',
]

export const REGION_INFO = {
  south_central:     { emoji: '🌵', label: 'South Central / Texas Hill Country' },
  northeast:         { emoji: '🍁', label: 'Northeast / New England' },
  upper_midwest:     { emoji: '🌾', label: 'Upper Midwest & Prairie' },
  pacific_northwest: { emoji: '🌲', label: 'Pacific Northwest' },
}

// Region only ever narrows "native" category plants. Everything else (annual
// vegetables, herbs, etc.) is judged on zone alone — region has no opinion on
// whether a tomato belongs in your yard. A native plant fits if the yard has
// no region set, the plant has no region tag, or the two match.
export function plantFitsRegion(plant, yardRegion) {
  if (plant.category !== 'native') return true
  if (!yardRegion || !plant.region) return true
  return plant.region === yardRegion
}

// Rough spring/fall planting anchors by whole zone (frost dates shift ~2 weeks per zone)
const SPRING_START = {
  3: 'late May', 4: 'mid May', 5: 'early May', 6: 'mid April',
  7: 'early April', 8: 'mid March', 9: 'mid February', 10: 'January', 11: 'January',
}
const FALL_START = {
  3: 'early July', 4: 'mid July', 5: 'late July', 6: 'early August',
  7: 'late August', 8: 'September', 9: 'October', 10: 'October', 11: 'any month',
}

// Human planting window for a plant's season in the yard's zone
export function plantingWindow(season, yardZone) {
  const z = zoneToNum(yardZone)
  const zn = z === null ? null : Math.min(11, Math.max(3, Math.floor(z)))
  switch (season) {
    case 'spring':    return zn ? `${SPRING_START[zn]}, after last frost` : 'spring, after last frost'
    case 'summer':    return zn ? `${SPRING_START[zn]} or later, once soil warms` : 'late spring, once soil warms'
    case 'fall':      return zn ? `${FALL_START[zn]} for a fall harvest` : 'late summer for a fall harvest'
    case 'winter':    return zn ? `${FALL_START[zn]}, overwinters` : 'fall, overwinters'
    case 'perennial': return 'spring or fall, plant once'
    default:          return ''
  }
}

// Visual bounding box of a bed on the yard. Beds rotate around their center,
// so at 90°/270° the footprint swaps width/height around the same center.
export function bedFootprint(bed) {
  const rotated = (bed.rotation ?? 0) % 180 !== 0
  const vw = rotated ? bed.height : bed.width
  const vh = rotated ? bed.width : bed.height
  return {
    x: bed.x + bed.width / 2 - vw / 2,
    y: bed.y + bed.height / 2 - vh / 2,
    width: vw,
    height: vh,
  }
}

// Clamp a bed's stored position so its visual footprint stays inside the yard.
export function clampBedToYard(bed, yardWidth, yardHeight) {
  const fp = bedFootprint(bed)
  const fx = Math.max(0, Math.min(yardWidth - fp.width, fp.x))
  const fy = Math.max(0, Math.min(yardHeight - fp.height, fp.y))
  return { x: bed.x + (fx - fp.x), y: bed.y + (fy - fp.y) }
}

// ─── Obstacles (house, driveway, …) ──────────────────────────────────────────
// Non-plantable rectangles on the yard. Beds can't sit on them and they don't
// count toward plantable area.

export const OBSTACLE_KINDS = {
  house:    { label: 'House',    emoji: '🏠', fill: '#cfd8dc', stroke: '#90a4ae', w: 12, h: 10 },
  driveway: { label: 'Driveway', emoji: '🚗', fill: '#e0e0e0', stroke: '#9e9e9e', w: 10, h: 18 },
  patio:    { label: 'Patio',    emoji: '🪑', fill: '#d7ccc8', stroke: '#a1887f', w: 8,  h: 8 },
  shed:     { label: 'Shed',     emoji: '🛖', fill: '#c5b8a5', stroke: '#8d6e63', w: 6,  h: 4 },
  tree:     { label: 'Tree',     emoji: '🌳', fill: '#dcedc8', stroke: '#7cb342', w: 6,  h: 6 },
  pool:     { label: 'Pool',     emoji: '🌊', fill: '#b3e5fc', stroke: '#4fc3f7', w: 10, h: 6 },
}

export function rectsOverlap(a, b) {
  return a.x < b.x + b.width && b.x < a.x + a.width &&
         a.y < b.y + b.height && b.y < a.y + a.height
}

// Obstacle area that actually sits inside the yard (obstacles may hang off the
// edge after a yard resize). Overlapping obstacles double-count — good enough
// for an estimate, and the canvas flags beds, not obstacle-on-obstacle.
export function obstaclesArea(obstacles, yardWidth, yardHeight) {
  return (obstacles ?? []).reduce((sum, o) => {
    const w = Math.max(0, Math.min(o.x + o.width, yardWidth) - Math.max(o.x, 0))
    const h = Math.max(0, Math.min(o.y + o.height, yardHeight) - Math.max(o.y, 0))
    return sum + w * h
  }, 0)
}

export function plantableArea(yard) {
  return Math.max(0, yard.width * yard.height - obstaclesArea(yard.obstacles, yard.width, yard.height))
}

export function parseObstacle(o) {
  return {
    ...o,
    x: parseFloat(o.x) || 0,
    y: parseFloat(o.y) || 0,
    width: parseFloat(o.width) || 1,
    height: parseFloat(o.height) || 1,
  }
}

// First open spot for a new w×h bed, scanning left-to-right, top-to-bottom.
// Tries to keep a 1 ft walking gap around existing beds, then settles for a
// snug fit; (0,0) if the yard is truly full.
export function findOpenSpot(beds, yardWidth, yardHeight, w, h, obstacles = []) {
  const rects = [...beds.map(bedFootprint), ...obstacles]
  const collides = (x, y, pad) => rects.some((r) =>
    x < r.x + r.width + pad && r.x - pad < x + w &&
    y < r.y + r.height + pad && r.y - pad < y + h
  )
  for (const pad of [1, 0]) {
    for (let y = 0; y + h <= yardHeight; y++) {
      for (let x = 0; x + w <= yardWidth; x++) {
        if (!collides(x, y, pad)) return { x, y }
      }
    }
  }
  return { x: 0, y: 0 }
}

// "Salad Bowl" → "Salad Bowl 2" (then 3, 4…) when the name is already taken
export function nextBedName(name, beds) {
  if (!beds.some((b) => b.name === name)) return name
  const base = name.replace(/ \d+$/, '')
  let n = 2
  while (beds.some((b) => b.name === `${base} ${n}`)) n++
  return `${base} ${n}`
}

export function parseBed(b) {
  return {
    ...b,
    x: parseFloat(b.x) || 0,
    y: parseFloat(b.y) || 0,
    width: parseFloat(b.width),
    height: parseFloat(b.height),
    depth: parseFloat(b.depth),
    rotation: parseInt(b.rotation) || 0,
    extra_plants: (b.extra_plants ?? []).map((p) => ({ ...p, spacing_ft: parseFloat(p.spacing_ft) })),
  }
}
