export default function random(initial = 0, final = 10): number {
  return Math.floor(Math.random() * (final - initial) + initial)
}
