import { render, screen } from '@testing-library/react'
import GetAddress from './GetAddress'
import '@testing-library/jest-dom'

describe('<GetAddress />', () => {
  it('renders a heading', () => {
    render(<GetAddress />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})