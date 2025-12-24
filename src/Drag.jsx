import React from 'react'
import './App.css'
import Text from './Text1.jsx'
function Drag({setTextValue,setDate,setImage,setSign,setRadioValue}) {
    const Text=()=>{
      // alert("Text Box Dragged");
      setTextValue("text");
    }
    const Image1=()=>{
        // alert("Image Box Dragged");
        setImage("image1");
        
    }
    const Sign1=()=>{
        // alert("Sign Box Dragged");
        setSign("sign1");
    }
    const Date1=()=>{
        // alert("Date Box Dragged");
        setDate("date1");
    }
    const Radio1=()=>{
        // alert("Radio Box Dragged");
        setRadioValue("radio1");
    }
  return (
    <div className='initial'>
        <h2>Drag Components</h2>
      <div className='dragItems'>
        <div className='item1' onDragEnd={Text} draggable="true">📝Text Box</div>
        <div className='item2' onDragEnd={Sign1} draggable="true">✍️Signature Box</div>
        <div className='item3' onDragEnd={Date1} draggable="true">📅Date Box</div>
        <div className='item4' onDragEnd={Image1} draggable="true">🖼️Image Box</div>
        <div className='item5' onDragEnd={Radio1} draggable="true">🔘Radio Button</div>
      </div>
    </div>
  )
}

export default Drag
