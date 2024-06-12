import { render, screen } from '@testing-library/react'
import BookApNav from './BookApNav'
import '@testing-library/jest-dom'

describe('<BookApNav />', () => {
  it('renders a heading', () => {
    render(<BookApNav />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})