/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/StaffTablePage/StaffTablePage.test.tsx

Created with;
$ npx generate-react-cli component StaffTablePage --type=page

*/

import React from 'react'
import StaffTablePage from './StaffTablePage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/StaffTablePage'
    }
  },
  location: {},
  match: {},
}

describe('<StaffTablePage />', () => {
  it('renders a heading', () => {
    render(<StaffTablePage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})