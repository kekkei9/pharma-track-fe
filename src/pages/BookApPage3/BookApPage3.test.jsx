/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: Component: src/pages/BookApPage3/BookApPage3.test.tsx

Created with;
$ npx generate-react-cli component BookApPage3 --type=page

*/

import React from 'react'
import BookApPage3 from './BookApPage3'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const routeComponentPropsMock = {
  history: {
    location: {
      pathname: '/BookApPage3'
    }
  },
  location: {},
  match: {},
}

describe('<BookApPage3 />', () => {
  it('renders a heading', () => {
    render(<BookApPage3 {...routeComponentPropsMock}/>)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})