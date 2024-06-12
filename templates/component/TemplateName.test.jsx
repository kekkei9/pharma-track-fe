import { render, screen } from '@testing-library/react'
import TemplateName from './TemplateName'
import '@testing-library/jest-dom'

describe('<TemplateName />', () => {
  it('renders a heading', () => {
    render(<TemplateName />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})