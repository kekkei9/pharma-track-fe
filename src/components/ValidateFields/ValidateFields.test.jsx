import { render, screen } from '@testing-library/react'
import ValidateFields from './ValidateFields'
import '@testing-library/jest-dom'

describe('<ValidateFields />', () => {
  it('renders a heading', () => {
    render(<ValidateFields />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})