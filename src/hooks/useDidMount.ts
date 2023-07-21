import { useEffect } from 'react'

export type Callback = () => (() => void) | undefined | void

export function useDidMount(callback: Callback): void {
  useEffect(() => {
    if (typeof callback !== 'function') return () => {}
    const cancel = callback()
    return () => {
      if (cancel && typeof cancel === 'function') {
        cancel()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
