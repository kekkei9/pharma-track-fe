import { render, screen } from '@testing-library/react'
import PickerForm from './PickerForm'
import '@testing-library/jest-dom'

describe('<PickerForm />', () => {
  it('renders a heading', () => {
    render(<PickerForm />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})