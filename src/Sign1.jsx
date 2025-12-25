import { useRef } from "react";

// import { useRef } from "react";

function SignCanvas() {
  const abc=useRef(false);
  const canvas=useRef(null);
  const Down = () => {
    abc.current=true;
  } 
  const Move = (e) => {
    if(abc.current){
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

export default SignCanvas;
