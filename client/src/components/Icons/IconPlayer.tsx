import { ReactNode } from 'react'

export function IconPlayer(): ReactNode {
  return (
    <svg width="40" height="40" fill="none" data-testid="IconPlayer">
      <circle cx="20" cy="20" r="20" fill="#205A6D" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M20 20c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
