import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@app/components'

describe('<Button />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render button', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })
})
