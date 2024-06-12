import React from 'react'
import './CustomDatePicker.scss'
import { DatePicker } from 'antd';

const CustomDatePicker = ({ title, placeholder , style }) => {

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return <div className="CustomDatePicker">
    <div className='tw-text-base tw-ml-3'>{title}</div>
    <DatePicker onChange={onChange} 
      placeholder={placeholder} 
      style = {Object.assign({
        borderRadius: '10px',
        padding: '7px 12px',
        border: 'solid #D9D9D9',
        width: '400px',
        marginTop: '6px',
      }, style)}
    />
</div>
}

export default CustomDatePicker
