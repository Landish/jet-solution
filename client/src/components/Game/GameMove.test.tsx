import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TestProviders } from '@app/test-utils'
import { GameMove } from '@app/components'

describe('<GameMove />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render game move data', async () => {
    render(
      <TestProviders>
        <GameMove
          move={{
            isFirst: false,
            isCorrectResult: true,
            number: 19,
            selectedNumber: -1,
            user: '123',
          }}
        />
      </TestProviders>,
    )

    expect(screen.queryByTestId('GameMove')).toBeInTheDocument()
    expect(screen.queryByText('[ ( -1 + 19 ) / 3 ] = 6')).toBeInTheDocument()
  })

  it('should render correct icon', async () => {
    render(
      <TestProviders>
        <GameMove
          move={{
            isFirst: false,
            isCorrectResult: true,
            number: 19,
            selectedNumber: -1,
            user: 'CPU',
          }}
        />
      </TestProviders>,
    )

    expect(screen.queryByTestId('IconCPU')).toBeInTheDocument()
    expect(screen.queryByTestId('IconPlayer')).not.toBeInTheDocument()
  })

  it('should render correct formula', async () => {
    render(
      <TestProviders>
        <GameMove
          move={{
            isFirst: false,
            isCorrectResult: true,
            number: 19,
            selectedNumber: -1,
            user: 'CPU',
          }}
        />
      </TestProviders>,
    )
    expect(screen.queryByText('[ ( -1 + 19 ) / 3 ] = 6')).toBeInTheDocument()
  })
})
