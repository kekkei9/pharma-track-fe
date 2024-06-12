import { render, screen } from '@testing-library/react'
import ClinicProfileForm from './ClinicProfileForm'
import '@testing-library/jest-dom'

describe('<ClinicProfileForm />', () => {
  it('renders a heading', () => {
    render(<ClinicProfileForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})