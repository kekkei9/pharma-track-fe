import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookApPage2.scss'
import BookApNav from '../../components/BookApNav/BookApNav'
import BookApTab2 from '../../components/BookApTab2/BookApTab2'


const BookApPage2 = (props) => {
  const navigate = useNavigate()

  return <div className="BookApPage2">
    <BookApNav current = {1}/>
    <BookApTab2/>
  </div>
}

export default BookApPage2
