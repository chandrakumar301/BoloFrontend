import React from 'react'
import { useEffect } from 'react'
function Image1({Image}) {
  useEffect(() => {
  const items = document.querySelectorAll(".image_input");

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
}, [Image]);
  return (
    <input
      contentEditable="true"
        className="image_input"
        draggable
        style={{height:"30px" ,width:"140px" ,position:"absolute",cursor:"grab"}}
        type="file"
      />
    
  )
}

export default Image1
