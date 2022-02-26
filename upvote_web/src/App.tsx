import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [version, setVersion] = useState();
  axios.get("http://127.0.0.1:8000/api/userposts/tim").then((result) => {
    console.log(result.data);
  });
  return <div className="App"></div>;
}

export default App;
