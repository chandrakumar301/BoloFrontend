import React from 'react'
import './App.css'
// import { useEffect } from 'react'
import Text from './Text1.jsx'
import App from './App.jsx'
import Drag from './Drag.jsx'
const Right = ({TextValue,Date,Image,Sign,RadioValue,inputValue,setInputValue}) => {
  return (
    <div className='editorPage' >
        {TextValue === "text" && <Text setInputValue={setInputValue} inputValue={inputValue}/>}
        {Date === "date1" && <input draggable="true" className="date_input" type="date"/> }
        {Image === "image1" && <input draggable="true" className="image_input" type="file" accept="image/*" /> }
        {Sign === "sign1" && <input draggable="true" className="sign_input" type="text" />}
        {RadioValue === "radio1" && <input draggable="true" className="radio_input" type="radio" />}
        
    </div>
  )
}

export default Right
