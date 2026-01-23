import React, { useRef, useState, useEffect } from 'react';
import './App.css';

export default function SignComponent() {
  const editorRef = useRef(null);
  const boxRef = useRef(null);
  const [pdfData, setPdfData] = useState(null);
  const [sigData, setSigData] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);

  const [box, setBox] = useState({ left: 40, top: 60, width: 200, height: 60 });
  const dragState = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const resizeState = useRef({ resizing: false, startW: 0, startH: 0, startX: 0, startY: 0 });

  useEffect(() => {
    function onMove(e) {
      if (dragState.current.dragging && editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - dragState.current.offsetX;
        const y = e.clientY - rect.top - dragState.current.offsetY;
        setBox(b => ({ ...b, left: Math.max(0, Math.min(x, rect.width - b.width)), top: Math.max(0, Math.min(y, rect.height - b.height)) }));
      }
      if (resizeState.current.resizing && editorRef.current) {
        const rect = editorRef.current.getBoundingClientRect();
        const w = Math.max(20, resizeState.current.startW + (e.clientX - resizeState.current.startX));
        const h = Math.max(20, resizeState.current.startH + (e.clientY - resizeState.current.startY));
        setBox(b => ({ ...b, width: Math.min(w, rect.width - b.left), height: Math.min(h, rect.height - b.top) }));
      }
    }
    function onUp() {
      dragState.current.dragging = false;
      resizeState.current.resizing = false;
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  function onBoxMouseDown(e) {
    if (!editorRef.current) return;
    const rect = editorRef.current.getBoundingClientRect();
    dragState.current.dragging = true;
    dragState.current.offsetX = e.clientX - rect.left - box.left;
    dragState.current.offsetY = e.clientY - rect.top - box.top;
  }

  function onHandleMouseDown(e) {
    e.stopPropagation();
    resizeState.current.resizing = true;
    resizeState.current.startW = box.width;
    resizeState.current.startH = box.height;
    resizeState.current.startX = e.clientX;
    resizeState.current.startY = e.clientY;
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  async function handlePdfChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = await readFileAsDataUrl(f);
    setPdfData(url);
    setPreviewSrc(null);
  }

  async function handleSigChange(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = await readFileAsDataUrl(f);
    setSigData(url);
  }

  async function handleSign() {
    if (!pdfData || !sigData || !editorRef.current) {
      alert('Please upload a PDF and a signature image, and position the box.');
      return;
    }
    const rect = editorRef.current.getBoundingClientRect();
    const xPercent = (box.left / rect.width) * 100;
    const yPercent = (box.top / rect.height) * 100; // top-based percent
    const widthPercent = (box.width / rect.width) * 100;

    const body = {
      pdfBase64: pdfData,
      sigBase64: sigData,
      xPercent,
      yPercent,
      widthPercent,
      pageIndex: 0
    };

    try {
      const res = await fetch('http://localhost:5000/api/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error || 'Sign failed');

      const signedBase64 = json.signedPdfBase64;
      if (!signedBase64) throw new Error('No signed PDF returned');

      // auto-download
      const bin = atob(signedBase64);
      let len = bin.length;
      const buf = new Uint8Array(len);
      for (let i = 0; i < len; i++) buf[i] = bin.charCodeAt(i);
      const blob = new Blob([buf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'signed.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();

      // show preview
      setPreviewSrc('data:application/pdf;base64,' + signedBase64);
    } catch (err) {
      console.error(err);
      alert('Signing failed: ' + (err.message || err));
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
        <label>Upload PDF: <input type="file" accept="application/pdf" onChange={handlePdfChange} /></label>
        <label>Upload Signature: <input type="file" accept="image/*" onChange={handleSigChange} /></label>
        <button onClick={handleSign}>Sign PDF</button>
      </div>

      <div ref={editorRef} className="editorPage" style={{ position: 'relative' }}>
        {/* render uploaded PDF as background preview if available */}
        {pdfData ? (
          <iframe title="pdf-preview" src={pdfData} style={{ width: '100%', height: '100%', border: 'none' }} />
        ) : (
          <div style={{ padding: 12 }}>No PDF uploaded — upload to enable preview and signing.</div>
        )}

        <div
          ref={boxRef}
          className="signature-box"
          style={{ left: box.left, top: box.top, width: box.width, height: box.height }}
          onMouseDown={onBoxMouseDown}
        >
          <div className="resize-handle" onMouseDown={onHandleMouseDown} />
        </div>
      </div>

      {previewSrc && (
        <div className="preview-container">
          <h3>Signed PDF Preview</h3>
          <iframe src={previewSrc} title="signed-preview" />
        </div>
      )}
    </div>
  );
}
