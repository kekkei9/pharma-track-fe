import { render, screen } from '@testing-library/react'
import CreateClinicForm from './CreateClinicForm'
import '@testing-library/jest-dom'

describe('<CreateClinicForm />', () => {
  it('renders a heading', () => {
    render(<CreateClinicForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})