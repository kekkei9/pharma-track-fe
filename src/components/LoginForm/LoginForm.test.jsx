import { render, screen } from '@testing-library/react'
import LoginForm from './LoginForm'
import '@testing-library/jest-dom'

describe('<LoginForm />', () => {
  it('renders a heading', () => {
    render(<LoginForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})