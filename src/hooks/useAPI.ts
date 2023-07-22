import { useMemo } from 'react'
import { API } from '../api'

export function useAPI() {
  return useMemo(() => new API(), [])
}
