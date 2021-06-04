export default function range(
  start: number,
  end: number | undefined = undefined,
  step = 1
): unknown[] {
  const output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}
