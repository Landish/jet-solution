import { ComponentProps, ReactNode } from 'react'

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
      className={`w-full px-4 md:px-6 max-w-screen-xl m-auto xl:px-24 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
