import { render, screen } from '@testing-library/react'
import StepComponent from './StepComponent'
import '@testing-library/jest-dom'

describe('<StepComponent />', () => {
  it('renders a heading', () => {
    render(<StepComponent />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})