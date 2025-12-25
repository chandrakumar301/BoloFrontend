
import "./App.css";
import Right from "./Right.jsx";
import React from "react";
import { useState } from "react";
import ToolBar from "./ToolBar.jsx";
import Drag from "./Drag.jsx";
import Text1 from "./Text1.jsx";
function App() {
  const [TextValue,setTextValue]=useState(null);
  const [Date,setDate]=useState(null);
  const [Image,setImage]=useState(null);
  const [Sign2,setSign2]=useState(null);
  const [RadioValue,setRadioValue]=useState(null);
  const[inputValue,setInputValue]=useState("");
  const [List,setList]=useState([]);
  
  return (
    <div className="MainApp">
      <ToolBar />
        <div className="app">
          <div className="HAndDrag">
          <h1>BoloEsign</h1>
          <Drag setList={setList} setTextValue={setTextValue} setDate={setDate} setImage={setImage} setSign2={setSign2} setRadioValue={setRadioValue} />
          </div>
          <div className="RightOne" >
            <h2 style={{ marginLeft: '600px'}}>Editor</h2>
              <Right List={List} setTextValue={setTextValue} setInputValue={setInputValue} TextValue={TextValue}
               Date={Date} Image={Image} Sign={Sign2} RadioValue={RadioValue} inputValue={inputValue} 
              setDate={setDate} setImage={setImage} setSign2={setSign2} setRadioValue={setRadioValue} />
        </div>
        </div>
    </div>
  );
}

export default App;
