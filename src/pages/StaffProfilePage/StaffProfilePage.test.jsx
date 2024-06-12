/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/StaffProfilePage/StaffProfilePage.test.tsx

Created with;
$ npx generate-react-cli component StaffProfilePage --type=page

*/

import React from 'react'
import StaffProfilePage from './StaffProfilePage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/StaffProfilePage'
    }
  },
  location: {},
  match: {},
}

describe('<StaffProfilePage />', () => {
  it('renders a heading', () => {
    render(<StaffProfilePage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})