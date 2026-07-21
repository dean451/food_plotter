import { describe, it, expect, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useIsMobile from './useIsMobile.js'

function stubMatchMedia(matches) {
  const listeners = new Set()
  const mql = {
    matches,
    addEventListener: (_, cb) => listeners.add(cb),
    removeEventListener: (_, cb) => listeners.delete(cb),
  }
  window.matchMedia = vi.fn().mockReturnValue(mql)
  return { mql, fire: (next) => { mql.matches = next; listeners.forEach((cb) => cb()) } }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useIsMobile', () => {
  it('reflects the current viewport on mount', () => {
    stubMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('updates when the viewport crosses the breakpoint', () => {
    const { fire } = stubMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    act(() => fire(true))
    expect(result.current).toBe(true)
  })
})
