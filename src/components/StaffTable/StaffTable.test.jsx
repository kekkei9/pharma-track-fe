import { render, screen } from '@testing-library/react'
import StaffTable from './StaffTable'
import '@testing-library/jest-dom'

describe('<StaffTable />', () => {
  it('renders a heading', () => {
    render(<StaffTable />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})