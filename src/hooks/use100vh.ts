import { useState, useEffect } from 'react'

function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function measureHeight(): number | null {
  if (!isClient()) return null
  return window.innerHeight
}

function useWasRenderedOnClientAtLeastOnce() {
  const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] =
    useState(false)

  useEffect(() => {
    if (isClient()) {
      setWasRenderedOnClientAtLeastOnce(true)
    }
  }, [])
  return wasRenderedOnClientAtLeastOnce
}

export function use100vh(): number | null {
  const [height, setHeight] = useState<number | null>(measureHeight)
  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

  useEffect(() => {
    if (!wasRenderedOnClientAtLeastOnce) return () => {}

    function setMeasuredHeight() {
      const measuredHeight = measureHeight()
      setHeight(measuredHeight)
    }

    window.addEventListener('resize', setMeasuredHeight)
    return () => {
      window.removeEventListener('resize', setMeasuredHeight)
    }
  }, [wasRenderedOnClientAtLeastOnce])
  return wasRenderedOnClientAtLeastOnce ? height : null
}

export function use100vhInCssVariable(name = '--full-vh') {
  const [ref, setRef] = useState<HTMLStyleElement | null>(null)
  const height = use100vh()
  useEffect(() => {
    const styleEl = document.createElement('style') as HTMLStyleElement
    styleEl.innerText = `:root { ${name}: ${
      height ? `${height}px` : '100vh'
    }; }`
    document.head.append(styleEl)
    setRef(styleEl)
    return () => {
      document.head.removeChild(styleEl)
      setRef(null)
    }
  }, [])
  useEffect(() => {
    if (!ref) return
    ref.innerText = `:root { ${name}: ${height ? `${height}px` : '100vh'}; }`
  }, [height])
}
