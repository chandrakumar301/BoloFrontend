import React from 'react'
import './App.css'
import Text1 from './Text1.jsx'
import App from './App.jsx'
import Drag from './Drag.jsx'
import Date1 from './Date1.jsx'
import Image1 from './Image1.jsx'
import Sign1 from './Sign1.jsx'
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
const Right = ({List,TextValue,Date,Image,Sign2,Down,setDown}) => {
    // const downloadPDF = () => {
if(Down){
    const element = document.querySelector(".editorPage");
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 190;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save("Chandu.pdf");
      setDown(false);
    });
}
  
    
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
          return (<Sign1 Sign2={Sign2} />);
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
