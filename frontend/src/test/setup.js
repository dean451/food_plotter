import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// We run with test.globals: false, so @testing-library/react's automatic
// afterEach(cleanup) registration (which relies on a global `afterEach`)
// never kicks in — without this, each test's render leaks into the next.
afterEach(() => cleanup())
