import { ComponentProps, ReactNode } from 'react'
import { cn } from '@app/utils'

interface ContainerProps extends ComponentProps<'div'> {
  children: React.ReactNode
}

export function Container({ children, ...props }: ContainerProps): ReactNode {
  return (
    <div
      {...props}
      className={cn(
        'm-auto w-full max-w-screen-xl px-4 md:px-6 xl:px-24',
        props.className,
      )}
    >
      {children}
    </div>
  )
}
