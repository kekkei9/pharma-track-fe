import { render, screen } from '@testing-library/react'
import Header from './Header'
import '@testing-library/jest-dom'

describe('<Header />', () => {
  it('renders a heading', () => {
    render(<Header />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})