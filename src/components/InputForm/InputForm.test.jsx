import { render, screen } from '@testing-library/react'
import InputForm from './InputForm'
import '@testing-library/jest-dom'

describe('<InputForm />', () => {
  it('renders a heading', () => {
    render(<InputForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})