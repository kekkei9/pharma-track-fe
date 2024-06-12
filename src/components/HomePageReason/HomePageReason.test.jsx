import { render, screen } from '@testing-library/react'
import HomePageReason from './HomePageReason'
import '@testing-library/jest-dom'

describe('<HomePageReason />', () => {
  it('renders a heading', () => {
    render(<HomePageReason />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})