import { render, screen } from '@testing-library/react'
import DepartmentPick from './DepartmentPick'
import '@testing-library/jest-dom'

describe('<DepartmentPick />', () => {
  it('renders a heading', () => {
    render(<DepartmentPick />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})