import { render, screen } from '@testing-library/react'
import DoctorCard from './DoctorCard'
import '@testing-library/jest-dom'

describe('<DoctorCard />', () => {
  it('renders a heading', () => {
    render(<DoctorCard />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})