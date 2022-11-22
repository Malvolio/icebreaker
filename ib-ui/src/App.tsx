import { useState } from "react";
import "./App.css";
import PageFrame from "./PageFrame";

function App() {
  const [count, setCount] = useState(0);

  return (
    <PageFrame headline={`Welcome to Icebreaker.biz`}>
      <div className="flex flex-col items-center justify-between">
        <h3>Scan a badge to begin</h3>
      </div>
    </PageFrame>
  );
}

export default App;
