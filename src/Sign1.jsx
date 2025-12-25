import { useEffect, useRef } from "react";

function SignCanvas(Sign2) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;
    const mouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - canvas.offsetLeft;
      offsetY = e.clientY - canvas.offsetTop;
    };
    const mouseMove = (e) => {
      if (!isDragging) return;
      canvas.style.left = e.clientX - offsetX + "px";
      canvas.style.top = e.clientY - offsetY + "px";
    };
    const mouseUp = () => {
      isDragging = false;
    };
    canvas.addEventListener("mousedown", mouseDown);
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [Sign2]);

  return (
    <canvas
      ref={canvasRef}
      className="sign_input"
      width={300}
      height={150}
      style={{
        position: "absolute",
        border: "1px solid black",
        cursor: "grab",
        backgroundColor: "black",
      }}
    />
  );
}

export default SignCanvas;
