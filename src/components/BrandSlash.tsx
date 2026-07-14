type Props = {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const heights = {
  sm: 'h-3',
  md: 'h-5',
  lg: 'h-10',
  xl: 'h-24',
}

/** Фирменный диагональный срез VANGUARD — красный → фиолетовый */
export function BrandSlash({ className = '', size = 'md' }: Props) {
  return (
    <span
      className={`brand-slash inline-block w-[3px] shrink-0 ${heights[size]} ${className}`}
      aria-hidden="true"
    />
  )
}