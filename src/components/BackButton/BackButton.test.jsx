import { render, screen } from '@testing-library/react'
import BackButton from './BackButton'
import '@testing-library/jest-dom'

describe('<BackButton />', () => {
  it('renders a heading', () => {
    render(<BackButton />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})