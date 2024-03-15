import { calculateResult, formulaFormatted } from '@/utils/utils'

describe('utils', () => {
  describe('calculateResult', () => {
    it('should calculate result: (-1 + 19) / 3 = 6', () => {
      const result = calculateResult({ number: 19, selectedNumber: -1 })
      expect(result).toBe(6)
    })

    it('should calculate result: (0 + 19) / 3 = 19', () => {
      const result = calculateResult({ number: 19, selectedNumber: 0 })
      expect(result).toBe(19)
    })

    it('should calculate result: (1 + 19) / 3 = 19', () => {
      const result = calculateResult({ number: 19, selectedNumber: 1 })
      expect(result).toBe(19)
    })
  })
  describe('formulaFormatted', () => {
    it('should format correct result: [ ( -1 + 19 ) / 3 ] = 6', () => {
      const result = formulaFormatted({ number: 19, selectedNumber: -1 })
      expect(result).toBe(`[ ( -1 + 19 ) / 3 ] = 6`)
    })
  })
})
