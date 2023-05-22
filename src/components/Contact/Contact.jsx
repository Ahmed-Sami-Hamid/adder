import React from 'react'

// Icons
import {CiMail} from "react-icons/ci"
// Style
import Style from './Contact.module.css'
const Contact = () => {
  return (
    <>
      <a href="mailto:ahmedsamideveloper@gmail.com">
        <div className={Style.contactWrapper}>
          <CiMail className={Style.icon}/>
        </div>
      </a>
    </>
  )
}

export default Contact