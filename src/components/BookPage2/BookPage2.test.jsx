import { render, screen } from '@testing-library/react'
import BookPage2 from './BookPage2'
import '@testing-library/jest-dom'

describe('<BookPage2 />', () => {
  it('renders a heading', () => {
    render(<BookPage2 />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})