import { render, screen } from '@testing-library/react'
import DoctorCardList from './DoctorCardList'
import '@testing-library/jest-dom'

describe('<DoctorCardList />', () => {
  it('renders a heading', () => {
    render(<DoctorCardList />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})