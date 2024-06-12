import React from 'react'
import { useNavigate } from 'react-router-dom'
import BookApTab3 from '../../components/BookApTab3/BookApTab3'
import BookApNav from '../../components/BookApNav/BookApNav'
import './BookApPage3.scss'

const BookApPage3 = (props) => {
  const navigate = useNavigate()

  return <div className="BookApPage3">
    <BookApNav current = {2}/>
    <BookApTab3/>
  </div>
}

export default BookApPage3
