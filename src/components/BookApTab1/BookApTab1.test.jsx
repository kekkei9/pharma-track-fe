import { render, screen } from '@testing-library/react'
import BookApTab1 from './BookApTab1'
import '@testing-library/jest-dom'

describe('<BookApTab1 />', () => {
  it('renders a heading', () => {
    render(<BookApTab1 />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})