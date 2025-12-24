import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/`)
      .then(res => res.text())
      .then(data => setMsg(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
