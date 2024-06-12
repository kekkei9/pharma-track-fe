/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/AppointmentProfilePage/AppointmentProfilePage.test.tsx

Created with;
$ npx generate-react-cli component AppointmentProfilePage --type=page

*/

import React from 'react'
import AppointmentProfilePage from './AppointmentProfilePage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/AppointmentProfilePage'
    }
  },
  location: {},
  match: {},
}

describe('<AppointmentProfilePage />', () => {
  it('renders a heading', () => {
    render(<AppointmentProfilePage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})