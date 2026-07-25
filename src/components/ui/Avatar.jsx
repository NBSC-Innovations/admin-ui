export function Avatar({ name = '', size = 32 }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('')
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-navy-800 font-semibold text-gold-400"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials || '?'}
    </div>
  )
}