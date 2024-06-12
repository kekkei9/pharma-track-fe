import { render, screen } from '@testing-library/react'
import BookApTab2 from './BookApTab2'
import '@testing-library/jest-dom'

describe('<BookApTab2 />', () => {
  it('renders a heading', () => {
    render(<BookApTab2 />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})