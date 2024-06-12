/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/UserProfilePage/UserProfilePage.test.tsx

Created with;
$ npx generate-react-cli component UserProfilePage --type=page

*/

import React from 'react'
import UserProfilePage from './UserProfilePage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/UserProfilePage'
    }
  },
  location: {},
  match: {},
}

describe('<UserProfilePage />', () => {
  it('renders a heading', () => {
    render(<UserProfilePage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})