import { render, screen } from '@testing-library/react'
import HomePageMain from './HomePageMain'
import '@testing-library/jest-dom'

describe('<HomePageMain />', () => {
  it('renders a heading', () => {
    render(<HomePageMain />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})