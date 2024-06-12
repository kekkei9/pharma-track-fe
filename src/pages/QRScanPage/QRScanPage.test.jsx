/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/QrScanPage/QrScanPage.test.tsx

Created with;
$ npx generate-react-cli component QrScanPage --type=page

*/

import React from 'react'
import QrScanPage from './QrScanPage'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/QrScanPage'
    }
  },
  location: {},
  match: {},
}

describe('<QrScanPage />', () => {
  it('renders a heading', () => {
    render(<QrScanPage {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})