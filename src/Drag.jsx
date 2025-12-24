import React from 'react'
import './App.css'
import Text from './Text1.jsx'
function Drag({setList,setTextValue,setDate,setImage,setSign,setRadioValue}) {
    const Text=()=>{
      setList((prevList)=>[...prevList,"text"]);
      setTextValue("text");
    }
    const Image1=()=>{
      setList((prevList)=>[...prevList,"image1"]);
        setImage("image1");
        
    }
    const Sign1=()=>{
      setList((prevList)=>[...prevList,"sign1"]);
      setSign("sign1");
    }
    const Date1=()=>{
      setList((prevList)=>[...prevList,"date1"]);
      setDate("date1");
    }
    const Radio1=()=>{
      setList((prevList)=>[...prevList,"radio1"]);
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
