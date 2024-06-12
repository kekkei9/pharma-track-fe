import { render, screen } from '@testing-library/react'
import OpenDoctorCard from './OpenDoctorCard'
import '@testing-library/jest-dom'

describe('<OpenDoctorCard />', () => {
  it('renders a heading', () => {
    render(<OpenDoctorCard />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})