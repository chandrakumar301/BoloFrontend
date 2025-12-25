import React from 'react'
import { useEffect } from 'react'
import './App.css'
function Radio() {
  useEffect(() => {
  const items = document.querySelectorAll(".radio_input");

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
}, []);
  return (
    <input className="radio_input" type="radio" style={{position:"absolute" ,height:"20px", width:"20px"}}/>
  )
}

export default Radio
