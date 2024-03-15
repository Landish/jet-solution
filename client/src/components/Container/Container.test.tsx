import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('<Container />', () => {
  it('should render children', () => {
    render(
      <Container>
        <div className="children">Children</div>
      </Container>,
    )
    const children = screen.getByText(/children/i)
    expect(children).toBeInTheDocument()
  })
})
