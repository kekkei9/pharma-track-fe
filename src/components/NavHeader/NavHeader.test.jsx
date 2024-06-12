import { render, screen } from '@testing-library/react'
import NavHeader from './NavHeader'
import '@testing-library/jest-dom'

describe('<NavHeader />', () => {
  it('renders a heading', () => {
    render(<NavHeader />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})