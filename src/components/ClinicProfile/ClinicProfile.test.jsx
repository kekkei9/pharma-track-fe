import { render, screen } from '@testing-library/react'
import ClinicProfile from './ClinicProfile'
import '@testing-library/jest-dom'

describe('<ClinicProfile />', () => {
  it('renders a heading', () => {
    render(<ClinicProfile />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})