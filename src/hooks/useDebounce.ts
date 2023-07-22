type Fn = (...args: any[]) => void
export function debounce<F = Fn>(fn: F, ms: number) {
  let timer: unknown | null
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer as number)
    }
    timer = setTimeout(() => {
      ;(fn as any)(...args)
      timer = null
    }, ms)
  }
}

export function useDebounce<F = Fn>(fn: F, time: number) {
  return debounce(fn, time)
}
