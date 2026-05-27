interface MaterialIconProps {
  name: string
  size?: number
  color?: string
  weight?: number
  fill?: 0 | 1
  style?: React.CSSProperties
}

export default function MaterialIcon({
  name,
  size = 20,
  color = 'currentColor',
  weight = 400,
  fill = 0,
  style = {},
}: MaterialIconProps) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontFamily: "'Material Symbols Outlined'",
        fontSize: size,
        color,
        lineHeight: 1,
        userSelect: 'none',
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      {name}
    </span>
  )
}
