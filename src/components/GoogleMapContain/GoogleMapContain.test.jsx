import { render, screen } from '@testing-library/react'
import GoogleMapContain from './GoogleMapContain'
import '@testing-library/jest-dom'

describe('<GoogleMapContain />', () => {
  it('renders a heading', () => {
    render(<GoogleMapContain />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})