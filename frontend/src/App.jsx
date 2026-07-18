import { useEffect, useRef, useState } from 'react'
import { parseBed, parseObstacle, clampBedToYard, plantsPerBedShared, plantingWindow, nextBedName, lumberCost, soilCost, plantsCost, soilVolume, isRow, yardMaterials, installEstimate, findOpenSpot, OBSTACLE_KINDS } from './utils.js'
import YardCanvas from './components/YardCanvas.jsx'
import BedSidebar from './components/BedSidebar.jsx'
import PlantPanel from './components/PlantPanel.jsx'
import BedTemplates from './components/BedTemplates.jsx'
import AddBedForm from './components/AddBedForm.jsx'
import YardStats from './components/YardStats.jsx'
import ZonePicker from './components/ZonePicker.jsx'
import RegionPicker from './components/RegionPicker.jsx'
import Toasts from './components/Toasts.jsx'
import QuoteSheet from './components/QuoteSheet.jsx'
import ObstacleBar from './components/ObstacleBar.jsx'
import YardMiniMap from './components/YardMiniMap.jsx'

function parseYard(y) {
  return {
    ...y,
    width: parseFloat(y.width),
    height: parseFloat(y.height),
    beds: (y.beds || []).map(parseBed),
    obstacles: (y.obstacles || []).map(parseObstacle),
  }
}

export default function App() {
  const [yard, setYard] = useState(null)
  const [plants, setPlants] = useState([])
  const [me, setMe] = useState(null)
  const [selectedBedId, setSelectedBedId] = useState(null)
  const [selectedObstacleId, setSelectedObstacleId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authStep, setAuthStep] = useState('idle')
  const [authEmail, setAuthEmail] = useState('')
  const [devLink, setDevLink] = useState(null)
  const [showGardens, setShowGardens] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [editingYard, setEditingYard] = useState(false)
  const [yardDraft, setYardDraft] = useState({ name: '', width: '', height: '' })
  const [showQuote, setShowQuote] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastSeq = useRef(0)
  // When the main canvas scrolls out of view, the right column swaps the bed
  // sidebar for a read-only mini yard that follows you down the template list
  const canvasWrapRef = useRef(null)
  const [canvasAway, setCanvasAway] = useState(false)

  useEffect(() => {
    const el = canvasWrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setCanvasAway(!entry.isIntersecting))
    obs.observe(el)
    return () => obs.disconnect()
  }, [yard?.token])

  function dismissToast(id) {
    setToasts((ts) => ts.filter((t) => t.id !== id))
  }

  function showToast(message, opts = {}) {
    const id = ++toastSeq.current
    setToasts((ts) => [...ts, { id, message, ...opts }])
    setTimeout(() => dismissToast(id), opts.duration ?? 6000)
  }

  useEffect(() => {
    ; (async () => {
      try {
        const [plantsData, meData] = await Promise.all([
          fetch('/api/v1/plants').then((r) => r.json()),
          fetch('/api/v1/auth/me').then((r) => r.json()).catch(() => ({})),
        ])
        setPlants(plantsData.map((p) => ({ ...p, spacing_ft: parseFloat(p.spacing_ft) })))
        const user = meData.email ? meData : null
        setMe(user)

        const urlToken = window.location.pathname.slice(1).replace(/[?#].*$/, '') || null
        if (urlToken) {
          const r = await fetch(`/api/v1/yards/${urlToken}`)
          if (r.ok) {
            setYard(parseYard(await r.json()))
          } else {
            await doSpawnYard(user)
          }
        } else if (user?.yards?.length) {
          const firstToken = user.yards[0].token
          window.history.replaceState(null, '', '/' + firstToken)
          const r = await fetch(`/api/v1/yards/${firstToken}`)
          if (r.ok) setYard(parseYard(await r.json()))
        } else {
          await doSpawnYard(user)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function doSpawnYard(user) {
    const r = await fetch('/api/v1/yards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yard: { name: 'My Garden', width: 30, height: 20 } }),
    })
    const data = await r.json()
    const newYard = parseYard(data)
    setYard(newYard)
    window.history.replaceState(null, '', '/' + newYard.token)
    if (user) {
      setMe((prev) => prev ? { ...prev, yards: [...(prev.yards ?? []), { token: newYard.token, name: newYard.name }] } : prev)
    }
    return newYard
  }

  async function goToYard(token) {
    const r = await fetch(`/api/v1/yards/${token}`)
    if (r.ok) {
      setYard(parseYard(await r.json()))
      setSelectedBedId(null)
      window.history.pushState(null, '', '/' + token)
      setShowGardens(false)
    }
  }

  useEffect(() => {
    async function onPopState() {
      const token = window.location.pathname.slice(1).replace(/[?#].*$/, '') || null
      if (!token || token === yard?.token) return
      const r = await fetch(`/api/v1/yards/${token}`)
      if (r.ok) {
        setYard(parseYard(await r.json()))
        setSelectedBedId(null)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [yard?.token])

  useEffect(() => {
    document.title = yard?.name ? `${yard.name} — Food Plotter` : 'Food Plotter'
  }, [yard?.name])

  // Cmd/Ctrl+Z triggers the most recent undo toast on screen (text fields keep native undo)
  useEffect(() => {
    function onKeyDown(e) {
      if (!(e.metaKey || e.ctrlKey) || e.key !== 'z' || e.shiftKey) return
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
      const undoable = [...toasts].reverse().find((t) => t.onAction)
      if (!undoable) return
      e.preventDefault()
      dismissToast(undoable.id)
      undoable.onAction()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [toasts])

  useEffect(() => {
    function onKeyDown(e) {
      if (!yard) return
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return
      if (selectedObstacleId && (e.key === 'Delete' || e.key === 'Backspace')) {
        handleObstacleDelete(selectedObstacleId)
        return
      }
      if (!selectedBedId) return
      const bed = yard.beds.find((b) => b.id === selectedBedId)
      if (!bed) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleBedDelete(bed.id)
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault()
        handleBedDuplicate(bed)
      } else if (e.key.startsWith('Arrow')) {
        e.preventDefault()
        const dx = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
        const dy = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0
        const pos = clampBedToYard({ ...bed, x: bed.x + dx, y: bed.y + dy }, yard.width, yard.height)
        if (pos.x !== bed.x || pos.y !== bed.y) handleBedMove({ ...bed, ...pos })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // handleBedDelete/handleBedDuplicate/handleBedMove/handleObstacleDelete are
    // intentionally omitted: they only close over `yard` and the two selection
    // ids, both already listed here, so the listener is rebuilt with fresh
    // closures whenever those actually change. Adding the handlers themselves
    // would just reinstall the listener on every render, since they're plain
    // functions redefined each time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBedId, selectedObstacleId, yard])

  function updateYardBeds(updater) {
    setYard((prev) => ({ ...prev, beds: updater(prev.beds) }))
  }

  function patchBed(bedId, attrs) {
    fetch(`/api/v1/yards/${yard.token}/beds/${bedId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bed: attrs }),
    })
      .then((res) => { if (!res.ok) throw new Error(`PATCH bed ${bedId}: ${res.status}`) })
      .catch(async (err) => {
        console.error(err)
        // Optimistic update failed — resync from the server so the UI doesn't lie
        showToast("Couldn't save that change — reverted to the last saved layout", { tone: 'error' })
        const r = await fetch(`/api/v1/yards/${yard.token}`)
        if (r.ok) setYard(parseYard(await r.json()))
      })
  }

  function handleBedAdd(bed) {
    updateYardBeds((beds) => [...beds, bed])
  }

  function handleBedMove(movedBed) {
    const x = parseFloat(movedBed.x.toFixed(2))
    const y = parseFloat(movedBed.y.toFixed(2))
    updateYardBeds((beds) => beds.map((b) => b.id === movedBed.id ? { ...b, x, y } : b))
    patchBed(movedBed.id, { x, y })
  }

  function handleBedResize(bed) {
    const width = parseFloat(bed.width.toFixed(2))
    const height = parseFloat(bed.height.toFixed(2))
    const x = parseFloat(bed.x.toFixed(2))
    const y = parseFloat(bed.y.toFixed(2))
    updateYardBeds((beds) => beds.map((b) => b.id === bed.id ? { ...b, width, height, x, y } : b))
    patchBed(bed.id, { width, height, x, y })
  }

  function handleBedRotate(bedId, rotation) {
    const bed = yard.beds.find((b) => b.id === bedId)
    if (!bed) return
    const { x, y } = clampBedToYard({ ...bed, rotation }, yard.width, yard.height)
    updateYardBeds((beds) => beds.map((b) => b.id === bedId ? { ...b, rotation, x, y } : b))
    patchBed(bedId, { rotation, x, y })
  }

  async function handleBedDuplicate(bed) {
    const { id, created_at, updated_at, extra_plants, ...attrs } = bed
    const extraPlantIds = (extra_plants ?? []).map((p) => p.id)
    const { x: newX, y: newY } = clampBedToYard({ ...bed, x: bed.x + 1, y: bed.y + 1 }, yard.width, yard.height)
    const res = await fetch(`/api/v1/yards/${yard.token}/beds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bed: { ...attrs, name: nextBedName(bed.name, yard.beds), x: newX, y: newY, extra_plant_ids: extraPlantIds } }),
    })
    handleBedAdd(parseBed(await res.json()))
  }

  // Recreate a deleted bed from its old attributes (it gets a fresh id)
  async function restoreBed(bed) {
    const { name, x, y, width, height, rotation, material, depth, emoji, plant_id } = bed
    const extra_plant_ids = (bed.extra_plants ?? []).map((p) => p.id)
    const res = await fetch(`/api/v1/yards/${yard.token}/beds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bed: { name, x, y, width, height, rotation, material, depth, emoji, plant_id, extra_plant_ids } }),
    })
    handleBedAdd(parseBed(await res.json()))
  }

  function handleBedDelete(bedId) {
    const bed = yard.beds.find((b) => b.id === bedId)
    if (!bed) return
    updateYardBeds((beds) => beds.filter((b) => b.id !== bedId))
    if (selectedBedId === bedId) setSelectedBedId(null)
    fetch(`/api/v1/yards/${yard.token}/beds/${bedId}`, { method: 'DELETE' }).catch(console.error)
    showToast(`Deleted "${bed.name}"`, { actionLabel: 'Undo', onAction: () => restoreBed(bed) })
  }

  async function clearBeds() {
    await fetch(`/api/v1/yards/${yard.token}/beds`, { method: 'DELETE' })
    updateYardBeds(() => [])
    setSelectedBedId(null)
  }

  async function handleClearBeds() {
    const removed = yard.beds
    const n = removed.length
    await clearBeds()
    showToast(`Removed ${n} bed${n !== 1 ? 's' : ''} from "${yard.name}"`, {
      actionLabel: 'Undo',
      duration: 10000,
      onAction: async () => { for (const bed of removed) await restoreBed(bed) },
    })
  }

  function handleClearObstacles() {
    const removed = yard.obstacles ?? []
    const n = removed.length
    setSelectedObstacleId(null)
    updateObstacles(() => [])
    showToast(`Removed ${n} marked feature${n !== 1 ? 's' : ''} from "${yard.name}"`, {
      actionLabel: 'Undo',
      duration: 10000,
      onAction: () => updateObstacles((obs) => [...obs, ...removed]),
    })
  }

  // Obstacles live as one JSON array on the yard — every change optimistically
  // updates state and PATCHes the whole array. `updater` receives the latest
  // obstacles so undo actions can't clobber edits made after the delete.
  function updateObstacles(updater) {
    setYard((prev) => {
      const obstacles = updater(prev.obstacles ?? []).map((o) => ({
        ...o,
        x: parseFloat(o.x.toFixed(2)), y: parseFloat(o.y.toFixed(2)),
        width: parseFloat(o.width.toFixed(2)), height: parseFloat(o.height.toFixed(2)),
      }))
      fetch(`/api/v1/yards/${prev.token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ yard: { obstacles } }),
      })
        .then((res) => { if (!res.ok) throw new Error(`PATCH obstacles: ${res.status}`) })
        .catch(async (err) => {
          console.error(err)
          showToast("Couldn't save that change — reverted to the last saved layout", { tone: 'error' })
          const r = await fetch(`/api/v1/yards/${prev.token}`)
          if (r.ok) setYard(parseYard(await r.json()))
        })
      return { ...prev, obstacles }
    })
  }

  function handleObstacleAdd(kindKey) {
    const kind = OBSTACLE_KINDS[kindKey]
    const w = Math.min(kind.w, yard.width)
    const h = Math.min(kind.h, yard.height)
    const { x, y } = findOpenSpot(yard.beds, yard.width, yard.height, w, h, yard.obstacles ?? [])
    updateObstacles((obs) => [...obs, { id: crypto.randomUUID(), kind: kindKey, x, y, width: w, height: h }])
  }

  function handleObstacleMove(obstacle) {
    updateObstacles((obs) => obs.map((o) => o.id === obstacle.id ? obstacle : o))
  }

  function handleObstacleResize(obstacle) {
    updateObstacles((obs) => obs.map((o) => o.id === obstacle.id ? obstacle : o))
  }

  function handleObstacleDelete(obstacleId) {
    const obstacle = (yard.obstacles ?? []).find((o) => o.id === obstacleId)
    if (!obstacle) return
    if (selectedObstacleId === obstacleId) setSelectedObstacleId(null)
    updateObstacles((obs) => obs.filter((o) => o.id !== obstacleId))
    const label = (OBSTACLE_KINDS[obstacle.kind] ?? OBSTACLE_KINDS.shed).label.toLowerCase()
    showToast(`Removed the ${label}`, { actionLabel: 'Undo', onAction: () => updateObstacles((obs) => [...obs, obstacle]) })
  }

  function handleAddPlantToBed(bed, plant) {
    const newExtraPlants = [
      ...(bed.extra_plants ?? []),
      { id: plant.id, name: plant.name, emoji: plant.emoji, spacing_ft: plant.spacing_ft, season: plant.season },
    ]
    const newIds = newExtraPlants.map((p) => p.id)
    updateYardBeds((beds) => beds.map((b) => b.id === bed.id ? { ...b, extra_plants: newExtraPlants } : b))
    patchBed(bed.id, { extra_plant_ids: newIds })
  }

  function handleRemovePlantFromBed(bed, plantId) {
    const newExtraPlants = (bed.extra_plants ?? []).filter((p) => p.id !== plantId)
    const newIds = newExtraPlants.map((p) => p.id)
    updateYardBeds((beds) => beds.map((b) => b.id === bed.id ? { ...b, extra_plants: newExtraPlants } : b))
    patchBed(bed.id, { extra_plant_ids: newIds })
  }

  const selectedBed = (() => {
    const bed = yard?.beds.find((b) => b.id === selectedBedId) ?? null
    if (!bed) return null
    const enrichedExtraPlants = (bed.extra_plants ?? []).map((ep) => {
      const full = plants.find((p) => p.id === ep.id)
      return full ? { ...full, ...ep } : ep
    })
    return { ...bed, extra_plants: enrichedExtraPlants }
  })()

  const selectedPlantCompanions = (() => {
    if (!selectedBed?.extra_plants?.length) return null
    const map = {}
    for (const plant of selectedBed.extra_plants) {
      for (const c of (plant.companions ?? [])) {
        if (!map[c.id] || c.relationship === 'harmful') map[c.id] = c.relationship
      }
    }
    return Object.keys(map).length ? map : null
  })()

  function exportGardenPlan(yard) {
    const rows = []
    const row = (...cols) => rows.push(cols.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    const blank = () => rows.push('')

    row(`GARDEN PLAN — ${yard.name}`)
    row(`Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`)
    blank()

    row('LUMBER')
    row('Bed', 'Material', 'Width (ft)', 'Length (ft)', 'Depth (ft)', 'Layers of 2×6', 'Linear Ft Needed', 'Notes')
    yard.beds.filter((bed) => !isRow(bed)).forEach((bed) => {
      const layers = Math.max(1, Math.round(bed.depth / 0.5))
      const linearFt = 2 * (bed.width + bed.height) * layers
      row(bed.name, bed.material, bed.width, bed.height, bed.depth, layers, linearFt,
        `${layers} layer${layers !== 1 ? 's' : ''} of 2×6 ${bed.material} — cut 2 at ${bed.width} ft, 2 at ${bed.height} ft`)
    })
    if (yard.beds.some(isRow)) {
      row('(in-ground rows need no lumber)')
    }
    blank()

    row('SOIL')
    row('Bed', 'Cu Ft', 'Cu Yd', '2 cu ft Bags', 'Notes')
    let totalCuFt = 0
    yard.beds.forEach((bed) => {
      const vol = soilVolume(bed)
      totalCuFt += vol
      row(bed.name, vol.toFixed(1), (vol / 27).toFixed(2), Math.ceil(vol / 2),
        isRow(bed) ? 'in-ground row — till ~3 in of compost into native soil' : '')
    })
    row('TOTAL', totalCuFt.toFixed(1), (totalCuFt / 27).toFixed(2), Math.ceil(totalCuFt / 2),
      "Recommend a quality raised bed mix (e.g. Mel's mix or compost blend)")
    blank()

    row('ESTIMATED COSTS')
    row('Bed', 'Lumber', 'Soil (bagged)', 'Plants', 'Total')
    yard.beds.forEach((bed) => {
      const lumber = lumberCost(bed), soil = soilCost(bed), plantsC = plantsCost(bed)
      row(bed.name, `$${lumber}`, `$${soil}`, plantsC ? `$${plantsC}` : '—', `$${lumber + soil + plantsC}`)
    })
    const m = yardMaterials(yard.beds)
    const inst = installEstimate(yard.beds)
    row('DIY TOTAL', '', m.soilMode === 'bulk' ? 'bulk soil (cheaper at this volume)' : '', '', `$${m.total}`)
    row('PROFESSIONALLY INSTALLED (est.)', '', 'materials + labor + delivery', '', `$${inst.total}`)
    blank()

    row('PLANTS BY BED')
    row('Bed', 'Plant', 'Spacing (ft)', 'Count', yard.hardiness_zone ? `When to Plant (zone ${yard.hardiness_zone})` : 'When to Plant', 'Notes')
    const plantTotals = {}
    yard.beds.forEach((bed) => {
      const eps = bed.extra_plants ?? []
      if (eps.length === 0) { row(bed.name, '(no plants assigned)', '', '', '', ''); return }
      eps.forEach((plant) => {
        const count = plantsPerBedShared(bed, plant, eps.length)
        row(bed.name, plant.name, plant.spacing_ft, count, plantingWindow(plant.season, yard.hardiness_zone),
          eps.length > 1 ? `sharing bed with ${eps.length - 1} other plant type${eps.length > 2 ? 's' : ''}` : '')
        plantTotals[plant.name] = (plantTotals[plant.name] || 0) + count
      })
    })
    blank()

    row('PLANT TOTALS')
    row('Plant', 'Total Count')
    Object.entries(plantTotals).sort((a, b) => a[0].localeCompare(b[0])).forEach(([name, count]) => row(name, count))
    blank()

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${yard.name.toLowerCase().replace(/\s+/g, '-')}-garden-plan.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleRequestLink(e) {
    e.preventDefault()
    const res = await fetch('/api/v1/auth/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: authEmail, yard_token: yard?.token }),
    })
    const data = await res.json()
    setAuthStep('sent')
    if (data.dev_link) setDevLink(data.dev_link)
  }

  async function handleLogout() {
    await fetch('/api/v1/auth/logout', { method: 'DELETE' })
    setMe(null)
    setShowGardens(false)
    setAuthStep('idle')
  }

  function startEditYard() {
    setYardDraft({ name: yard.name, width: String(yard.width), height: String(yard.height) })
    setEditingYard(true)
  }

  async function saveYard(e) {
    e.preventDefault()
    const name   = yardDraft.name.trim() || yard.name
    const width  = Math.max(1, parseFloat(yardDraft.width)  || yard.width)
    const height = Math.max(1, parseFloat(yardDraft.height) || yard.height)
    const res = await fetch(`/api/v1/yards/${yard.token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yard: { name, width, height } }),
    })
    if (res.ok) {
      const updated = parseYard(await res.json())
      // Pull any beds stranded outside the resized yard back inside
      const oversized = []
      const beds = updated.beds.map((b) => {
        const pos = clampBedToYard(b, updated.width, updated.height)
        if (Math.max(b.width, b.height) > Math.max(updated.width, updated.height) ||
            Math.min(b.width, b.height) > Math.min(updated.width, updated.height)) {
          oversized.push(b.name)
        }
        if (pos.x !== b.x || pos.y !== b.y) {
          patchBed(b.id, pos)
          return { ...b, ...pos }
        }
        return b
      })
      // Obstacles too: shrink any bigger than the new yard, then pull inside
      let obstaclesMoved = false
      const obstacles = (updated.obstacles ?? []).map((o) => {
        const width = Math.min(o.width, updated.width)
        const height = Math.min(o.height, updated.height)
        const x = Math.max(0, Math.min(updated.width - width, o.x))
        const y = Math.max(0, Math.min(updated.height - height, o.y))
        if (x !== o.x || y !== o.y || width !== o.width || height !== o.height) obstaclesMoved = true
        return { ...o, x, y, width, height }
      })
      setYard({ ...updated, beds, obstacles })
      if (obstaclesMoved) {
        fetch(`/api/v1/yards/${updated.token}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ yard: { obstacles } }),
        }).catch(console.error)
      }
      if (oversized.length) {
        showToast(`${oversized.join(', ')} ${oversized.length === 1 ? 'is' : 'are'} bigger than the new yard — resize or remove`, { tone: 'error', duration: 8000 })
      }
    }
    setEditingYard(false)
  }

  async function renameYard(name) {
    const res = await fetch(`/api/v1/yards/${yard.token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yard: { name } }),
    })
    if (res.ok) setYard(parseYard(await res.json()))
  }

  async function saveZone(hardiness_zone) {
    const res = await fetch(`/api/v1/yards/${yard.token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yard: { hardiness_zone } }),
    })
    if (res.ok) setYard(parseYard(await res.json()))
  }

  async function saveRegion(region) {
    const res = await fetch(`/api/v1/yards/${yard.token}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yard: { region } }),
    })
    if (res.ok) setYard(parseYard(await res.json()))
  }

  function copyShareLink() {
    navigator.clipboard.writeText(window.location.href)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>

  const exportDisabled = !yard || yard.beds.length === 0

  return (
    // colorScheme: the site CSS opts into dark mode, but the app UI is designed
    // light — without this, unstyled buttons/inputs get white-on-white text
    <div style={{ padding: 24, fontFamily: 'sans-serif', maxWidth: 1400, margin: '0 auto', colorScheme: 'light', color: '#222' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', marginBottom: 20,
        background: '#f4f8f4', border: '1px solid #d0e8d0', borderRadius: 10, fontSize: 13,
      }}>
        <span style={{ fontWeight: 800, fontSize: 15, color: '#2e7d32', marginRight: 2 }}>🌱 Food Plotter</span>

        <div style={{ flex: 1 }} />

        <button
          onClick={copyShareLink}
          style={{
            padding: '4px 10px', fontSize: 12, border: '1px solid #ccc', borderRadius: 6,
            background: copiedUrl ? '#e8f5e9' : '#fff', cursor: 'pointer', color: '#444',
          }}
        >
          {copiedUrl ? '✓ Copied' : '📋 Share link'}
        </button>

        {/* Auth */}
        {me ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowGardens((s) => !s)}
              style={{ padding: '4px 10px', fontSize: 12, border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer' }}
            >
              {me.email} ▾
            </button>
            {showGardens && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 4px)', background: '#fff',
                border: '1px solid #ddd', borderRadius: 8, minWidth: 180, boxShadow: '0 4px 12px rgba(0,0,0,.12)',
                zIndex: 100, overflow: 'hidden',
              }}>
                <div style={{ padding: '6px 12px 4px', fontSize: 10, color: '#999', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                  My Gardens
                </div>
                {(me.yards ?? []).map((y) => (
                  <button
                    key={y.token}
                    onClick={() => goToYard(y.token)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', fontSize: 13,
                      border: 'none', cursor: 'pointer',
                      background: y.token === yard?.token ? '#f0f8f0' : '#fff',
                      fontWeight: y.token === yard?.token ? 700 : 400,
                    }}
                  >
                    {y.name}
                  </button>
                ))}
                {(me.yards ?? []).length < 10 && (
                  <button
                    onClick={async () => { await doSpawnYard(me) }}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', fontSize: 13,
                      border: 'none', borderTop: '1px solid #eee', cursor: 'pointer', background: '#fff', color: '#2e7d32',
                    }}
                  >
                    + New garden
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px', fontSize: 13,
                    border: 'none', borderTop: '1px solid #eee', cursor: 'pointer', background: '#fff', color: '#888',
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : authStep === 'idle' ? (
          <button
            onClick={() => setAuthStep('input')}
            style={{ padding: '4px 12px', fontSize: 12, border: '1px solid #2e7d32', borderRadius: 6, background: '#fff', color: '#2e7d32', cursor: 'pointer', fontWeight: 600 }}
          >
            💾 Save to account
          </button>
        ) : authStep === 'input' ? (
          <form onSubmit={handleRequestLink} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="your@email.com" required autoFocus
              style={{ padding: '4px 8px', fontSize: 12, border: '1px solid #ccc', borderRadius: 6, width: 180 }}
            />
            <button type="submit" style={{ padding: '4px 10px', fontSize: 12, border: 'none', borderRadius: 6, background: '#2e7d32', color: '#fff', cursor: 'pointer' }}>
              Send link
            </button>
            <button type="button" onClick={() => setAuthStep('idle')} style={{ padding: '4px 8px', fontSize: 12, border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer', color: '#555' }}>
              Cancel
            </button>
          </form>
        ) : (
          <span style={{ fontSize: 12, color: '#444' }}>
            ✓ Check your email for a sign-in link
            {devLink && <a href={devLink} style={{ marginLeft: 6, fontSize: 11, color: '#888' }}>[dev: click here]</a>}
          </span>
        )}
      </div>

      {/* Yard */}
      {yard && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
            {editingYard ? (
              <form onSubmit={saveYard} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  autoFocus
                  value={yardDraft.name}
                  onChange={(e) => setYardDraft((d) => ({ ...d, name: e.target.value }))}
                  placeholder="Garden name"
                  style={{ fontSize: 18, fontWeight: 700, padding: '2px 6px', border: '1px solid #ccc', borderRadius: 4, width: 160 }}
                />
                <input
                  type="number" min="1" max="200" step="1"
                  value={yardDraft.width}
                  onChange={(e) => setYardDraft((d) => ({ ...d, width: e.target.value }))}
                  title="Width (ft)"
                  style={{ width: 54, padding: '2px 6px', fontSize: 13, border: '1px solid #ccc', borderRadius: 4 }}
                />
                <span style={{ color: '#888', fontSize: 13 }}>×</span>
                <input
                  type="number" min="1" max="200" step="1"
                  value={yardDraft.height}
                  onChange={(e) => setYardDraft((d) => ({ ...d, height: e.target.value }))}
                  title="Height (ft)"
                  style={{ width: 54, padding: '2px 6px', fontSize: 13, border: '1px solid #ccc', borderRadius: 4 }}
                />
                <span style={{ color: '#888', fontSize: 12 }}>ft</span>
                <button type="submit" style={{ padding: '3px 10px', fontSize: 12, border: 'none', borderRadius: 4, background: '#2e7d32', color: '#fff', cursor: 'pointer' }}>Save</button>
                <button type="button" onClick={() => setEditingYard(false)} style={{ padding: '3px 8px', fontSize: 12, border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer', color: '#555' }}>Cancel</button>
              </form>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ margin: 0 }}>{yard.name}</h2>
                <span style={{ fontSize: 12, color: '#aaa' }}>{yard.width} × {yard.height} ft</span>
                <button
                  onClick={startEditYard}
                  style={{ fontSize: 11, border: 'none', background: 'none', color: '#aaa', cursor: 'pointer', padding: '2px 4px' }}
                  title="Rename or resize yard"
                >✎</button>
                <ZonePicker zone={yard.hardiness_zone} onChange={saveZone} />
                <RegionPicker region={yard.region} onChange={saveRegion} />
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {yard.beds.length > 0 && (
                <button
                  onClick={handleClearBeds}
                  title="Remove every bed (you can undo)"
                  style={{
                    padding: '5px 16px',
                    background: '#3d2b1a',
                    border: '3px solid #c8a96e',
                    borderRadius: 5, color: '#e8d5a3',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: '#ef5350', fontWeight: 800 }}>✕</span> Clear Beds
                </button>
              )}
              {(yard.obstacles ?? []).length > 0 && (
                <button
                  onClick={handleClearObstacles}
                  title="Remove everything marked on the yard — house, driveway, etc. (you can undo)"
                  style={{
                    padding: '5px 16px',
                    background: '#455a64',
                    border: '3px solid #90a4ae',
                    borderRadius: 5, color: '#cfd8dc',
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: '#ef5350', fontWeight: 800 }}>✕</span> Clear Obstacles
                </button>
              )}
              <button
                onClick={() => setShowQuote(true)}
                disabled={exportDisabled}
                title={exportDisabled ? 'Add a bed first' : 'DIY materials cost vs professional installation'}
                style={{
                  padding: '5px 16px',
                  background: exportDisabled ? '#4a5d23' : '#33691e',
                  border: `3px solid ${exportDisabled ? '#8a9a5b' : '#aed581'}`,
                  borderRadius: 5, color: exportDisabled ? '#9aa87a' : '#dcedc8',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                  cursor: exportDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                🧾 Get Quote
              </button>
              <button
                onClick={() => exportGardenPlan(yard)}
                disabled={exportDisabled}
                title={exportDisabled ? 'Add a bed first' : 'Download garden plan as CSV — lumber, soil, and plant counts'}
                style={{
                  padding: '5px 16px',
                  background: exportDisabled ? '#6b5340' : '#3d2b1a',
                  border: `3px solid ${exportDisabled ? '#a08060' : '#c8a96e'}`,
                  borderRadius: 5, color: exportDisabled ? '#9a8070' : '#e8d5a3',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                  cursor: exportDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                🌱 Export Plan ⛏️
              </button>
            </div>
          </div>

          <YardStats yard={yard} />

          <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr 250px', gap: 16, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
              <PlantPanel
                bed={selectedBed} plants={plants}
                zone={yard.hardiness_zone}
                region={yard.region}
                onAddPlant={handleAddPlantToBed}
                onRemovePlant={handleRemovePlantFromBed}
                maxHeight="calc(100vh - 56px)"
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <div ref={canvasWrapRef}>
              <YardCanvas
                yard={yard} beds={yard.beds} obstacles={yard.obstacles}
                selectedBedId={selectedBedId}
                onSelectBed={(id) => { setSelectedBedId(id); setSelectedObstacleId(null) }}
                selectedObstacleId={selectedObstacleId}
                onSelectObstacle={(id) => { setSelectedObstacleId(id); setSelectedBedId(null) }}
                onBedMove={handleBedMove}
                onBedDelete={handleBedDelete}
                onBedRotate={handleBedRotate}
                onBedResize={handleBedResize}
                onObstacleMove={handleObstacleMove}
                onObstacleResize={handleObstacleResize}
                onObstacleDelete={handleObstacleDelete}
                selectedPlantCompanions={selectedPlantCompanions}
                selectedBed={selectedBed}
              />
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ObstacleBar onAdd={handleObstacleAdd} />
                <AddBedForm yard={yard} onAdd={handleBedAdd} />
                <BedTemplates yard={yard} plants={plants} zone={yard.hardiness_zone} region={yard.region} onAdd={handleBedAdd} onClearBeds={clearBeds} onRenameYard={renameYard} />
              </div>
            </div>
            <div style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
              {canvasAway ? (
                <YardMiniMap yard={yard} width={250} />
              ) : (
                <BedSidebar
                  bed={selectedBed}
                  zone={yard.hardiness_zone}
                  region={yard.region}
                  onRemovePlant={handleRemovePlantFromBed}
                  maxHeight="calc(100vh - 56px)"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close gardens dropdown */}
      {showGardens && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99 }} onClick={() => setShowGardens(false)} />
      )}

      {showQuote && yard && <QuoteSheet yard={yard} onClose={() => setShowQuote(false)} />}

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
