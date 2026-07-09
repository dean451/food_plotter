// Bed, garden-set, and garden-plan definitions.
// RULE: no template, set, or plan may contain a harmful companion pair —
// BedTemplates surfaces a red warning if one sneaks in, and
// scripts can import this module to verify against the companions API.

export const BED_TEMPLATES = [
  // Veg
  { category: 'veg', label: 'Three Sisters', desc: 'Squash · Beans · Corn', plants: ['Zucchini', 'Beans', 'Corn'], name: 'Three Sisters Bed', width: 8, height: 4, depth: 1, material: 'cedar' },
  { category: 'veg', label: 'Tomato Patch', desc: 'Tomato · Basil', plants: ['Tomato', 'Basil'], name: 'Tomato Patch', width: 8, height: 4, depth: 1, material: 'cedar' },
  { category: 'veg', label: 'Salad Bowl', desc: 'Lettuce · Spinach · Radish', plants: ['Lettuce', 'Spinach', 'Radish'], name: 'Salad Bowl', width: 4, height: 4, depth: 0.5, material: 'cedar' },
  { category: 'veg', label: 'Root Row', desc: 'Carrot · Radish · Onion', plants: ['Carrot', 'Radish', 'Onion'], name: 'Root Veg Row', width: 10, height: 2, depth: 1, material: 'pine' },
  { category: 'veg', label: 'Pepper Bed', desc: 'Pepper · Basil', plants: ['Pepper', 'Basil'], name: 'Pepper Bed', width: 4, height: 4, depth: 1, material: 'cedar' },
  { category: 'veg', label: 'Brassica Row', desc: 'Kale · Spinach', plants: ['Kale', 'Spinach'], name: 'Brassica Row', width: 8, height: 2, depth: 1, material: 'pine' },
  { category: 'veg', label: 'Potato Patch', desc: 'Potato', plants: ['Potato'], name: 'Potato Patch', width: 6, height: 4, depth: 1, material: 'pine' },
  { category: 'veg', label: 'Cold Greens', desc: 'Arugula · Bok Choy · Spinach', plants: ['Arugula', 'Bok Choy', 'Spinach'], name: 'Cold Greens Bed', width: 6, height: 3, depth: 0.5, material: 'pine' },
  { category: 'veg', label: 'Perennial Patch', desc: 'Asparagus · Rhubarb', plants: ['Asparagus', 'Rhubarb'], name: 'Perennial Patch', width: 8, height: 4, depth: 1, material: 'cedar' },
  { category: 'veg', label: 'Brassica Feast', desc: 'Cabbage · Brussels Sprouts · Kale', plants: ['Cabbage', 'Brussels Sprouts', 'Kale'], name: 'Brassica Feast', width: 8, height: 4, depth: 1, material: 'cedar' },
  { category: 'veg', label: 'Southern Heat', desc: 'Okra · Sweet Potato', plants: ['Okra', 'Sweet Potato'], name: 'Southern Heat Bed', width: 8, height: 4, depth: 1, material: 'cedar' },
  // Herb
  { category: 'herb', label: 'Classic Herbs', desc: 'Basil · Rosemary · Thyme', plants: ['Basil', 'Rosemary', 'Thyme'], name: 'Classic Herb Garden', width: 3, height: 3, depth: 0.5, material: 'cypress' },
  { category: 'herb', label: 'Spice Roots', desc: 'Ginger · Lemongrass', plants: ['Ginger', 'Lemongrass'], name: 'Spice Roots Bed', width: 4, height: 4, depth: 1, material: 'cypress' },
  { category: 'herb', label: 'Tea Garden', desc: 'Mint · Thyme · Lavender', plants: ['Mint', 'Thyme', 'Lavender'], name: 'Tea Garden', width: 3, height: 3, depth: 0.5, material: 'cypress' },
  { category: 'herb', label: 'Kitchen Herbs', desc: 'Basil · Rosemary · Mint', plants: ['Basil', 'Rosemary', 'Mint'], name: 'Kitchen Herb Patch', width: 4, height: 2, depth: 0.5, material: 'cypress' },
  // Fruit
  { category: 'fruit', label: 'Berry Patch', desc: 'Strawberry · Thyme', plants: ['Strawberry', 'Thyme'], name: 'Berry Patch', width: 6, height: 4, depth: 1, material: 'cedar' },
  { category: 'fruit', label: 'Squash Row', desc: 'Zucchini · Corn', plants: ['Zucchini', 'Corn'], name: 'Squash Row', width: 10, height: 4, depth: 1, material: 'pine' },
  { category: 'fruit', label: 'Berry Bramble', desc: 'Raspberry · Currant · Gooseberry', plants: ['Raspberry', 'Currant', 'Gooseberry'], name: 'Berry Bramble', width: 10, height: 3, depth: 1, material: 'pine' },
  { category: 'fruit', label: 'Blueberry Row', desc: 'Blueberry', plants: ['Blueberry'], name: 'Blueberry Row', width: 8, height: 3, depth: 1.5, material: 'cedar' },
  { category: 'fruit', label: 'Citrus Corner', desc: 'Meyer Lemon', plants: ['Meyer Lemon'], name: 'Citrus Corner', width: 8, height: 6, depth: 1.5, material: 'cedar' },
  { category: 'fruit', label: 'Tropical Corner', desc: 'Banana · Pineapple', plants: ['Banana', 'Pineapple'], name: 'Tropical Corner', width: 8, height: 6, depth: 1, material: 'cypress' },
  { category: 'fruit', label: 'Orchard Corner', desc: 'Fig · Pomegranate', plants: ['Fig', 'Pomegranate'], name: 'Orchard Corner', width: 10, height: 6, depth: 1, material: 'cedar' },
  // Flower
  { category: 'flower', label: 'Pollinator Row', desc: 'Sunflower · Lavender', plants: ['Sunflower', 'Lavender'], name: 'Pollinator Border', width: 8, height: 3, depth: 0.5, material: 'pine' },
  { category: 'flower', label: 'Prairie Patch', desc: 'Black-Eyed Susan · Yarrow · Bee Balm', plants: ['Black-Eyed Susan', 'Yarrow', 'Bee Balm'], name: 'Prairie Patch', width: 8, height: 4, depth: 0.5, material: 'pine' },
  { category: 'flower', label: 'Cutting Annuals', desc: 'Zinnia · Sunflower', plants: ['Zinnia', 'Sunflower'], name: 'Cutting Annuals', width: 8, height: 3, depth: 0.5, material: 'pine' },
  { category: 'flower', label: 'Cut Flower Bed', desc: 'Sunflower · Lavender · Coneflower', plants: ['Sunflower', 'Lavender', 'Purple Coneflower'], name: 'Cut Flower Keyhole', width: 6, height: 6, depth: 1, material: 'cypress' },
  // Native TX
  { category: 'native', label: 'Pollinator Landing', desc: 'Lantana · Esperanza · Flame Acanthus', plants: ['Lantana', 'Esperanza', 'Flame Acanthus'], name: 'TX Pollinator Landing', width: 8, height: 4, depth: 0.5, material: 'cypress' },
  { category: 'native', label: 'Hummingbird Garden', desc: 'Autumn Sage · Rock Rose', plants: ['Autumn Sage', 'Rock Rose'], name: 'Hummingbird Garden', width: 4, height: 4, depth: 0.5, material: 'cypress' },
  { category: 'native', label: 'Xeriscape Trio', desc: 'Sotol · Blackfoot Daisy · Feathergrass', plants: ['Sotol', 'Blackfoot Daisy', 'Mexican Feathergrass'], name: 'Xeriscape Trio', width: 8, height: 6, depth: 0.5, material: 'cypress' },
  { category: 'native', label: 'Deer-Resistant', desc: 'Texas Sage · Autumn Sage · Coneflower', plants: ['Texas Sage', 'Autumn Sage', 'Purple Coneflower'], name: 'Deer-Resistant Border', width: 10, height: 3, depth: 0.5, material: 'cypress' },
]

export const GARDEN_SETS = [
  {
    key: 'starter',
    label: 'Starter Garden',
    desc: 'Easy wins for first-time gardeners',
    beds: ['Salad Bowl', 'Classic Herbs', 'Berry Patch'],
  },
  {
    key: 'salsa',
    label: 'Salsa Garden',
    desc: 'Everything for fresh salsa from the yard',
    beds: ['Tomato Patch', 'Pepper Bed', 'Classic Herbs'],
  },
  {
    key: 'kitchen',
    label: 'Kitchen Garden',
    desc: 'A complete year-round harvest setup',
    beds: ['Tomato Patch', 'Salad Bowl', 'Brassica Row', 'Kitchen Herbs'],
  },
  {
    key: 'three-sisters',
    // Root Row's onions stunt the beans in Three Sisters — greens are safe neighbors
    label: 'Three Sisters',
    desc: 'Classic companion planting tradition, with quick greens alongside',
    beds: ['Three Sisters', 'Salad Bowl'],
  },
  {
    key: 'herb-garden',
    label: 'Full Herb Garden',
    desc: 'Culinary, tea, and kitchen herbs',
    beds: ['Classic Herbs', 'Tea Garden', 'Kitchen Herbs'],
  },
  {
    key: 'pollinator',
    label: 'Pollinator Haven',
    desc: 'Bees, butterflies, and hummingbirds',
    beds: ['Pollinator Row', 'Cut Flower Bed', 'Hummingbird Garden'],
  },
  {
    key: 'tx-native',
    label: 'TX Native Landscape',
    desc: 'Low-water, zero-fuss Texas natives',
    beds: ['Pollinator Landing', 'Xeriscape Trio', 'Deer-Resistant'],
  },
  {
    key: 'cottage',
    label: 'Cottage Garden',
    desc: 'Flowers, fruit, and informal charm',
    beds: ['Berry Patch', 'Cut Flower Bed', 'Pollinator Row'],
  },
  {
    key: 'cold-kitchen',
    label: 'Cold-Climate Kitchen',
    desc: 'Hardy staples for northern gardens (zones 3–6)',
    beds: ['Potato Patch', 'Brassica Feast', 'Cold Greens', 'Perennial Patch'],
  },
  {
    key: 'northern-berry',
    label: 'Northern Berry Farm',
    desc: 'Cold-hardy fruit that shrugs off winter (zones 3–7)',
    beds: ['Berry Bramble', 'Blueberry Row', 'Perennial Patch'],
  },
  {
    key: 'prairie',
    label: 'Prairie Pollinators',
    desc: 'Tough perennial flowers plus cutting annuals (zones 3–9)',
    beds: ['Prairie Patch', 'Cutting Annuals'],
  },
  {
    key: 'southern-comfort',
    label: 'Southern Comfort',
    desc: 'Heat-loving crops and orchard fruit (zones 7–10)',
    beds: ['Southern Heat', 'Orchard Corner', 'Pepper Bed'],
  },
  {
    key: 'subtropical',
    label: 'Subtropical Oasis',
    desc: 'Citrus, tropical fruit, and spice roots (zones 9–11)',
    beds: ['Tropical Corner', 'Citrus Corner', 'Spice Roots'],
  },
]

// Full garden plans as a grid of bed templates (rows of template labels).
// Positions are computed by layoutPlan() for the actual yard — never hardcoded.
// Every plan's combined plant list must be free of harmful companion pairs:
// beds land well within companion range of each other, so distance won't save us.
export const GARDEN_PLANS = [
  {
    key: 'food-first',
    label: 'Food First',
    desc: 'Tomatoes, peppers, berries, and greens — kitchen staples with zero companion clashes',
    accent: '#4caf50',
    rows: [
      ['Tomato Patch', 'Berry Patch', 'Pepper Bed'],
      ['Brassica Row', 'Salad Bowl', 'Kitchen Herbs'],
    ],
  },
  {
    key: 'homestead',
    label: 'Homestead Harvest',
    desc: 'Corn, beans, and squash the traditional way, with greens and berries alongside',
    accent: '#689f38',
    rows: [
      ['Squash Row', 'Three Sisters', 'Salad Bowl'],
      ['Brassica Row', 'Berry Patch', 'Kitchen Herbs'],
    ],
  },
  {
    key: 'northern-harvest',
    label: 'Northern Harvest',
    desc: 'Cold-hardy staples — brassicas, potatoes, berries, and perennial crowns (fits zones 4–7)',
    accent: '#0288d1',
    rows: [
      ['Brassica Feast', 'Potato Patch', 'Salad Bowl'],
      ['Blueberry Row', 'Cold Greens', 'Perennial Patch'],
    ],
  },
  {
    key: 'pollinator-haven',
    label: 'Pollinator Haven',
    desc: 'A sweep of nectar-rich pollinator beds up top, low border rows at the front',
    accent: '#f9a825',
    rows: [
      ['Pollinator Landing', 'Pollinator Landing', 'Pollinator Landing'],
      ['Pollinator Row', 'Pollinator Row', 'Pollinator Row'],
    ],
  },
  {
    key: 'subtropical-grove',
    label: 'Subtropical Grove',
    desc: 'Citrus, orchard fruit, spice roots, and heat-loving crops (fits zones 8b–10b)',
    accent: '#00897b',
    rows: [
      ['Citrus Corner', 'Orchard Corner'],
      ['Southern Heat', 'Spice Roots'],
    ],
  },
  {
    key: 'tx-native',
    label: 'TX Native Landscape',
    desc: 'Tall xeriscape at the back, natives in the middle, low border up front',
    accent: '#8d6e63',
    rows: [
      ['Xeriscape Trio', 'Xeriscape Trio', 'Xeriscape Trio'],
      ['Pollinator Landing', 'Pollinator Landing', 'Pollinator Landing'],
      ['Pollinator Row', 'Pollinator Row', 'Pollinator Row'],
    ],
  },
]
