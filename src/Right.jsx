import React from 'react'
import './App.css'
import Text1 from './Text1.jsx'
import App from './App.jsx'
import Drag from './Drag.jsx'
import Date1 from './Date1.jsx'
import Image1 from './Image1.jsx'
import Sign1 from './Sign1.jsx'
const Right = ({List,TextValue,Date,Image,Sign2}) => {
    // let offsetX=0;
    // let offsetY=0;
    // let drag=false;
    // const item=document.querySelector(".text_input");
    // item(".text_input").addEventListener("mouseup",(e)=>{
    //     drag=true;
    //     offsetX=e.clientX - e.target.offsetLeft;
    //     offsetY=e.clientY - e.target.offsetTop;
    //     item.cursor="grabbing";
    //     item.style.left=`${e.clientX - offsetX}px`;
    //     item.style.top=`${e.clientY - offsetY}px`;

    // });

//     List.map((item)=>{

//     if(item==="text"){
//         document.querySelector(".editorPage").innerHTML=`<input draggable="true" className="text_input"  style="height: 30px;
//   position: absolute;
//   -webkit-user-drag: element;
//   width: 100px;
//   margin-left: 20px;
//   border: 2px dotted black;
//   background-color: whitesmoke;
//   text-align: center;
//   font-size: 25px;
//   color: black;
//   resize: both;
//   min-width: 20px;
//   min-height: 20px;
//   cursor:grab;"type="text"/>`;
//         setTextValue(null);
//     }
//     else if(item==="date1"){
//         document.querySelector(".editorPage").innerHTML=`<input draggable="true" className="date_input" 
//         style="height: 30px;
//   -webkit-user-drag: element;
//   cursor: grab;
//   width: 150px;
//   margin-left: 20px;
//   border: 2px dotted black;
//   background-color: whitesmoke;
//   text-align: center;
//   font-size: 20px;
//   color: black;" type="date"/>`;
//         setDate(null);
//     }
//     else if(item==="image1"){
//         document.querySelector(".editorPage").innerHTML=`<input draggable="true" className="image_input" type="file" 
//         style="height: fit-content;
//   -webkit-user-drag: element;
//   cursor: pointer;
//   width:fit-content;
//   margin-left: 20px;
//   border: 2px dotted black;
//   background-color: whitesmoke;
//   text-align: center;
//   font-size: 15px;
//   color: black;"accept="image/"/>`;
//         setImage(null);
//     }
//     else if(item==="sign1"){
//         document.querySelector(".editorPage").innerHTML=`<input draggable="true" className="sign_input" type="text"/>`;
//         setSign(null);
//     }   
//     else if(item==="radio1"){
//         document.querySelector(".editorPage").innerHTML=`<input draggable="true" className="radio_input"  
//         style="height: 20px;
//   -webkit-user-drag: element;
//   cursor: pointer;
//   width: 20px;
//   margin-left: 20px;
//   border: 2px dotted black;
//   background-color: whitesmoke;
//   text-align: center;
//   font-size: 15px;
//   color: black;"type="radio"/>`;
//         setRadioValue(null);
//     }
//     });

  return (
        <div className="editorPage">
      {List.map((item) => {
        if (item === "text") {
          return (<Text1 TextValue={TextValue}/>);}

        if (item === "date1") {
          return (<Date1 Date={Date}/>);
          
        }
        if (item === "image1") {
          return (<Image1 Image={Image}/>);
        }
        if (item === "sign1") {
          return (<Sign1 Sign2={Sign2}/>);
        }
        if (item === "radio1") {
          return (<Radio />);
        }

        return null;
      })}
    </div>
  )
}

export default Right
