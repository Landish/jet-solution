import { ComponentProps, ReactNode } from 'react'
import { cn } from '@app/utils'

interface ContainerProps extends ComponentProps<'div'> {
  children: React.ReactNode
  className?: string
}

export function Container({
  children,
  className,
  ...props
}: ContainerProps): ReactNode {
  return (
    <div
      className={cn(
        'm-auto w-full max-w-screen-xl px-4 md:px-6 xl:px-24',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
