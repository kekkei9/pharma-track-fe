import React from 'react'
import { useNavigate } from 'react-router-dom'
import './BookApPage.scss'
import BookApNav from '../../components/BookApNav/BookApNav'
import BookApTab1 from '../../components/BookApTab1/BookApTab1'


const BookApPage = (props) => {
  const navigate = useNavigate()

  return <div className="BookApPage">
    <BookApNav current = {0}/>
    <BookApTab1/>
  </div>
}

export default BookApPage
