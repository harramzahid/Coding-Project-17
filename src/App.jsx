import React, { useState } from "react";
import Gallery from "./Gallery";

const App = () => {
  // Define global state if needed
  const [globalState, setGlobalState] = useState(null);

  return (
    <div>
      <header>
        <h1>Tour Comparison App</h1>
      </header>
      {/* Render Gallery Component */}
      <Gallery />
    </div>
  );
};

export default App;
