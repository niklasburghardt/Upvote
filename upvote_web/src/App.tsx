import axios from "axios";
import React, { useEffect, useState } from "react";
import httpCommon from "./http-common";
function App() {
  const [version, setVersion] = useState();
  const url = "http://localhost:8000/api/votables";
  const options = {
    method: "get",
    headers: {
      ContentType: "application/json",
    },
  };
  fetch(url, options).then((result) => {
    console.log(result);
  });
  return <div className="App">Nice</div>;
}

export default App;
