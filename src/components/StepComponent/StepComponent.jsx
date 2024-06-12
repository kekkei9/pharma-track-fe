import React from 'react'
import './StepComponent.scss'


const StepComponent = ({ step, content, style }) => {
  return <div className = 'StepComponent tw-flex-1 tw-px-12 tw-py-5 tw-rounded-none tw-select-none'
    style = {Object.assign({
      background: '#D9D9D9' ,
      color: '#808192',
    }, style)}>
    <div className = 'tw-text-2xl'>{step}</div>
    <div className = "tw-text-xl tw-font-bold ">{content}</div>      
  </div>
}

export default StepComponent
