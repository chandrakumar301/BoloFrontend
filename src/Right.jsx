import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import Text1 from "./Text1.jsx";
import Date1 from "./Date1.jsx";
import Image1 from "./Image1.jsx";
import Sign1 from "./Sign1.jsx";

const Right = ({
  List,
  TextValue,
  Date,
  Image,
  Sign2,         
  Down,
  setDown,
  setConstrain,
  Constrain
}) => {

  const pdfRef = useRef(null);
  const signRef = useRef(null);
  const [signedPdfBase64, setSignedPdfBase64] = useState(null);

  // 🔴 Calculate coordinates relative to editor PDF container
  const calculateCoordinates = () => {
    const box = signRef.current.getBoundingClientRect();
    const pdf = pdfRef.current.getBoundingClientRect();

    const left = box.left - pdf.left;
    const top = box.top - pdf.top;
    const width = box.width;
    const height = box.height;

    const coords = {
      xPercent: left / pdf.width,
      yPercent: top / pdf.height,
      wPercent: width / pdf.width,
      hPercent: height / pdf.height
    };

    console.log("Coordinates to send:", coords);
    return coords;
  };

  // 🔴 Send coordinates + signature to backend and preview signed PDF
  useEffect(() => {
    if (Down && Sign2) {
      const coords = calculateCoordinates();

      fetch("http://localhost:5000/api/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pdfBase64: "",       // Optional: send current PDF as base64 if needed
          sigBase64: Sign2,
          xPercent: coords.xPercent,
          yPercent: coords.yPercent,
          widthPercent: coords.wPercent * 100, // backend expects 0-100
          pageIndex: 0
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log("Signed PDF response:", data);
        setSignedPdfBase64(data.signedPdfBase64); // store for preview
        
        // 🔴 AUTO-DOWNLOAD PDF
        downloadPDF(data.signedPdfBase64);
        
        alert("PDF signed and downloaded successfully!");
      })
      .catch(err => {
        console.error("Error signing PDF:", err);
        alert("Error downloading PDF. Please try again.");
      });

      setDown(false);
    }
  }, [Down]);

  // 🔴 Function to download PDF
  const downloadPDF = (base64Data) => {
    try {
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${base64Data}`;
      link.download = `signed-document-${new Date().getTime()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download PDF");
    }
  };

  return (
    <div>
      {/* PDF Editor */}
      <div ref={pdfRef} className="editorPage">
        {List.map((item, index) => {
          if (item === "text") {
            return <Text1 key={index} TextValue={TextValue} />;
          }

          if (item === "date1") {
            return <Date1 key={index} Date={Date} />;
          }

          if (item === "image1") {
            return <Image1 key={index} Image={Image} />;
          }

          if (item === "sign1") {
            return (
              <div ref={signRef}>
                <Sign1
                  Sign2={Sign2}
                  setConstrain={setConstrain}
                  Constrain={Constrain}
                />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Preview Signed PDF */}
      {signedPdfBase64 && (
        <div className="pdfPreview" style={{ marginTop: "20px" }}>
          <h3>Signed PDF Preview:</h3>
          <iframe
            src={`data:application/pdf;base64,${signedPdfBase64}`}
            width="100%"
            height="600px"
            title="Signed PDF Preview"
          />
        </div>
      )}
    </div>
  );
};

export default Right;
