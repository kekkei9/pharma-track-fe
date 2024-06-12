/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/PayMentPage/PayMentPage.test.tsx

Created with;
$ npx generate-react-cli component PayMentPage --type=page

*/

import React from 'react'
import PayMentPage from './PayMentPage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/PayMentPage'
    }
  },
  location: {},
  match: {},
}

describe('<PayMentPage />', () => {
  it('renders a heading', () => {
    render(<PayMentPage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})