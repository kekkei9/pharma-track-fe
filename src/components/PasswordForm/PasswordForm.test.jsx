import { render, screen } from '@testing-library/react'
import PasswordForm from './PasswordForm'
import '@testing-library/jest-dom'

describe('<PasswordForm />', () => {
  it('renders a heading', () => {
    render(<PasswordForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})