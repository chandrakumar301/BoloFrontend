import React from 'react'
import './App.css'
import { useEffect } from 'react'
const ToolBar = ({setDown,Down,setConstrain}) => {

  useEffect(()=>{
    if(Down===true){
    // alert("chandra");
    // setDown(false);
  }
  })
  // const Signee=()=>{
  //   setConstrain(false);
  // }
  
  const handleDownload = () => {
    setDown(true);
  };

  return (
    <div className='chandra'>
      <div className='Nav'>
        <h2>Project Name</h2>
        <button>Preview</button>
        <button className='signFirst' onClick={()=>{setConstrain(true)}}>Sign First</button>
        <button>Save</button>
        <button>Send</button>
        <button className='PDF' onClick={handleDownload}>Download</button>
      </div>
    </div>
  )
}

export default ToolBar;
