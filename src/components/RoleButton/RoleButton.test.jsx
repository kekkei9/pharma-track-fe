import { render, screen } from '@testing-library/react'
import RoleButton from './RoleButton'
import '@testing-library/jest-dom'

describe('<RoleButton />', () => {
  it('renders a heading', () => {
    render(<RoleButton />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})