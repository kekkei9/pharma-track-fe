import { render, screen } from '@testing-library/react'
import CustomButton from './CustomButton'
import '@testing-library/jest-dom'

describe('<CustomButton />', () => {
  it('renders a heading', () => {
    render(<CustomButton />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})