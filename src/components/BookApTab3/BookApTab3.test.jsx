import { render, screen } from '@testing-library/react'
import BookApTab3 from './BookApTab3'
import '@testing-library/jest-dom'

describe('<BookApTab3 />', () => {
  it('renders a heading', () => {
    render(<BookApTab3 />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})