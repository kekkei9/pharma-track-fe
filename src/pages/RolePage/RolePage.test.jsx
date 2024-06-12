/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/RolePage/RolePage.test.tsx

Created with;
$ npx generate-react-cli component RolePage --type=page

*/

import React from 'react'
import RolePage from './RolePage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/RolePage'
    }
  },
  location: {},
  match: {},
}

describe('<RolePage />', () => {
  it('renders a heading', () => {
    render(<RolePage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})