import { useCallback, useEffect, useRef } from 'react'
import { random } from '../functions'

export default function useRandomInterval(
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
): () => void {
  const timeoutId = useRef<number | null>(null)
  const savedCallback = useRef(callback)
  useEffect(() => {
    savedCallback.current = callback
  })
  useEffect(() => {
    const isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number'
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay as number, maxDelay as number)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => window.clearTimeout(timeoutId.current as number)
  }, [minDelay, maxDelay])
  const cancel = useCallback(function () {
    window.clearTimeout(timeoutId.current as number)
  }, [])
  return cancel
}
