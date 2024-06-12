import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import '@testing-library/jest-dom'

describe('<Footer />', () => {
  it('renders a heading', () => {
    render(<Footer />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})