import { render, screen } from '@testing-library/react'
import CreateAntField from './CreateAntField'
import '@testing-library/jest-dom'

describe('<CreateAntField />', () => {
  it('renders a heading', () => {
    render(<CreateAntField />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})