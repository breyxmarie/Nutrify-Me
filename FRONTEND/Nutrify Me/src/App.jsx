import { useState } from "react";
import MainHome from "./components/User Not Log In/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Routes>
          <Route path="home" element={<MainHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
