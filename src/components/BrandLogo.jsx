export default function BrandLogo({
  size = 38,
  radius = 10,
  fontSize = 16,
  shadow = '0 10px 25px rgba(22, 119, 255, 0.35)',
  bg = '#1677ff',
  color = '#fff',
  label = 'G',
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        display: 'grid',
        placeItems: 'center',
        boxShadow: shadow,
        flexShrink: 0,
      }}
    >
      <span style={{ color, fontWeight: 900, fontSize, lineHeight: 1 }}>{label}</span>
    </div>
  )
}