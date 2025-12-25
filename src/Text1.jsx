import React, { useEffect } from "react";
//import "./App.css";

function Text({setInputValue,inputValue ,TextValue}) {

  useEffect(() => {
  const items = document.querySelectorAll(".text_input");

  items.forEach((item) => {
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    const mouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - item.offsetLeft;
      offsetY = e.clientY - item.offsetTop;
      item.style.cursor = "grabbing";
    };
    const mouseMove = (e) => {
    if (!isDragging) return;
      item.style.left = e.clientX - offsetX + "px";
      item.style.top = e.clientY - offsetY + "px";
    };
    const mouseUp = () => {
      isDragging = false;
      item.style.cursor = "grab";
    };
      item.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      item.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  });
}, [TextValue]);


  return (
      <input
      contentEditable="true"
        className="text_input"
        placeholder="Enter Text"
        value={inputValue}
        draggable
        style={{height:"30px" ,width:"100px" ,position:"absolute"}}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
  );
}

export default Text;
