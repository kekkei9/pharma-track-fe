import { render, screen } from '@testing-library/react'
import StaffAppointmentTable from './StaffAppointmentTable'
import '@testing-library/jest-dom'

describe('<StaffAppointmentTable />', () => {
  it('renders a heading', () => {
    render(<StaffAppointmentTable />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})