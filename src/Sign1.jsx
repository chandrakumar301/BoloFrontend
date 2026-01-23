import { useRef } from "react";
import { useEffect } from "react";
import './App.css'
function Sign({Constrain, setSign2}) {
   useEffect(() => {
  const items = document.querySelectorAll(".sign_input");

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
    if (!isDragging)  return;
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
  const abc=useRef(false);
  const canvas=useRef(null);
  const Down = () => {
    abc.current=true;
  } 
  const Move = (e) => {
    if(abc.current && Constrain){
    const rect=canvas.current.getBoundingClientRect();
    const ctx=canvas.current.getContext("2d");
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;
    ctx.lineWidth=2;
    ctx.strokeStyle="white";
    ctx.lineCap="round";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    }
    else{
      return;
    }
  }
  const Up = () => {
    abc.current=false;
    // export canvas image to parent as base64 PNG
    try {
      const dataUrl = canvas.current.toDataURL('image/png');
      if (setSign2) setSign2(dataUrl);
    } catch (e) {
      // ignore
    }
  }


  return (
    <canvas
      className="sign_input"
      width={300}
      ref={canvas}
      height={150}
      onMouseDown={Down}
      onMouseMove={Move}
      onMouseUp={Up}
      style={{
        position: "absolute",
        border: "1px solid black",
        cursor: "inherit",
        backgroundColor: "black",
      }}
    />
  );
}

export default Sign;
