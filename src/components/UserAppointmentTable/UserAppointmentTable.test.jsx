import { render, screen } from '@testing-library/react'
import UserAppointmentTable from './UserAppointmentTable'
import '@testing-library/jest-dom'

describe('<UserAppointmentTable />', () => {
  it('renders a heading', () => {
    render(<UserAppointmentTable />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})