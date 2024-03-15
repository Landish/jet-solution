import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CalculateNumbers {
  selectedNumber: number
  number: number
}

export function calculateResult({
  selectedNumber,
  number,
}: CalculateNumbers): number {
  const sumValues = (num: number[]): number => num.reduce((a, b) => a + b)

  const result = (numbers: number[]): number => {
    const res = sumValues(numbers)
    return res % 3 === 0 ? res / 3 : number
  }

  return result([selectedNumber, number])
}

export function formulaFormatted({ number, selectedNumber }: CalculateNumbers) {
  return `[ ( ${selectedNumber} + ${number} ) / 3 ] = ${calculateResult({
    number,
    selectedNumber,
  })}`
}

export function logger(message: string, ...args: unknown[]): void {
  /**
   * Don't log anything if we're running tests or production
   */
  if (process.env.NODE_ENV === 'test') return

  console.group(message)
  console.log(...args)
  console.groupEnd()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
