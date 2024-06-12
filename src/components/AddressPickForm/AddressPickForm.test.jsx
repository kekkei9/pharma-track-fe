import { render, screen } from '@testing-library/react'
import AddressPickForm from './AddressPickForm'
import '@testing-library/jest-dom'

describe('<AddressPickForm />', () => {
  it('renders a heading', () => {
    render(<AddressPickForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})