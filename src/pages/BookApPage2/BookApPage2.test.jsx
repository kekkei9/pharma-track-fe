/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/BookApPage2/BookApPage2.test.tsx

Created with;
$ npx generate-react-cli component BookApPage2 --type=page

*/

import React from 'react'
import BookApPage2 from './BookApPage2'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/BookApPage2'
    }
  },
  location: {},
  match: {},
}

describe('<BookApPage2 />', () => {
  it('renders a heading', () => {
    render(<BookApPage2 {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})