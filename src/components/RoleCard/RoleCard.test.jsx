import { render, screen } from '@testing-library/react'
import RoleCard from './RoleCard'
import '@testing-library/jest-dom'

describe('<RoleCard />', () => {
  it('renders a heading', () => {
    render(<RoleCard />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})