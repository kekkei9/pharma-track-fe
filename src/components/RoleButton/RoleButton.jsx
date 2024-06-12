import React from 'react'
import './RoleButton.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const RoleButton = (props) => {
        const navigate = useNavigate()

  return <div className="RoleButton tw-flex tw-flex-row tw-justify-center tw-space-x-40 ">
      <div>
      <Button className='button1' type="primary" shape="round" style={{width:"150px", height:"40px"}} 
                onClick={() => navigate(-1)} >
              QUAY LẠI
      </Button>
      </div>
      
      <div>
      <Button className='button2' type="primary" shape="round" style={{backgroundColor:"blue", width:"150px", height:"40px"}} >
              TIẾP TỤC
      </Button>
      </div>
  </div>
}

export default RoleButton
