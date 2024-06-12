import { render, screen } from '@testing-library/react'
import LoginProviders from './LoginProviders'
import '@testing-library/jest-dom'

describe('<LoginProviders />', () => {
  it('renders a heading', () => {
    render(<LoginProviders />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})