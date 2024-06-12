import { render, screen } from '@testing-library/react'
import CustomDatePicker from './CustomDatePicker'
import '@testing-library/jest-dom'

describe('<CustomDatePicker />', () => {
  it('renders a heading', () => {
    render(<CustomDatePicker />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})