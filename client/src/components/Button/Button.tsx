import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'default' | 'circle'
}

export function Button({ size = 'default', ...props }: ButtonProps): ReactNode {
  const className = `bg-white rounded-full h-14 text-blue font-bold text-base shadow ${
    size === 'default' ? 'min-w-60' : 'w-14 flex items-center justify-center'
  } hover:bg-blue hover:text-white transition-colors disabled:pointer-events-none disabled:opacity-50 ${
    props.className
  }`

  return <button {...props} className={className} />
}
