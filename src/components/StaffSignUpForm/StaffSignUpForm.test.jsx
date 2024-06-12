import { render, screen } from '@testing-library/react'
import StaffSignUpForm from './StaffSignUpForm'
import '@testing-library/jest-dom'

describe('<StaffSignUpForm />', () => {
  it('renders a heading', () => {
    render(<StaffSignUpForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})