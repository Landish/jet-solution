import { ComponentProps, ReactNode } from 'react'
import { cn } from '@app/utils'

interface ButtonProps extends ComponentProps<'button'> {
  size?: 'default' | 'circle'
}

export function Button({ size = 'default', ...props }: ButtonProps): ReactNode {
  return (
    <button
      {...props}
      className={cn(
        'h-14 rounded-full bg-white text-base  font-bold  text-blue shadow transition-colors',
        'hover:bg-blue hover:text-white',
        'disabled:pointer-events-none disabled:opacity-50',
        size === 'circle'
          ? 'flex w-14 items-center justify-center'
          : 'min-w-60',
        props.className,
      )}
    />
  )
}
