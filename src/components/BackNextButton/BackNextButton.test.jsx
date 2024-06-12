import { render, screen } from '@testing-library/react'
import BackNextButton from './BackNextButton'
import '@testing-library/jest-dom'

describe('<BackNextButton />', () => {
  it('renders a heading', () => {
    render(<BackNextButton />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})