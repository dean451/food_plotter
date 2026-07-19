import { useEffect, useState } from 'react'

const QUERY = '(max-width: 768px)'

// Real device/viewport check (matchMedia), not a CSS breakpoint fought over
// with inline styles. Drives structural differences between mobile and
// desktop — e.g. a bottom sheet instead of a permanent sidebar column — not
// just resizing, so this needs to live in JS rather than pure CSS.
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = () => setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
