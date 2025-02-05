import { useEffect } from 'react'

let didHydrateOnce = false

// if set on the root tamagui provider, we now can know when things are fully hydrated
// we cheat a bit why just resetting as we render components below

export function useDidHydrateOnceRoot() {
  if (process.env.TAMAGUI_TARGET !== 'web') {
    return
  }

  useEffect(() => {
    const tm = setInterval(() => {
      if (Date.now() - last > 32) {
        didHydrateOnce = true
        clearInterval(tm)
      }
    }, 16)
    return () => {
      clearInterval(tm)
    }
  }, [])
}

let last = Date.now()

export function useDidHydrateOnce() {
  if (process.env.TAMAGUI_TARGET !== 'web') {
    return true
  }
  if (!didHydrateOnce) {
    last = Date.now()
  }
  return didHydrateOnce
}
