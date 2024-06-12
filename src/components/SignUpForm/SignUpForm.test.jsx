import { render, screen } from '@testing-library/react'
import SignUpForm from './SignUpForm'
import '@testing-library/jest-dom'

describe('<SignUpForm />', () => {
  it('renders a heading', () => {
    render(<SignUpForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})