import React from 'react';
import {useState} from 'react'

function App() {
  const [myData, setData] = useState("Loading...")
  const rootUrl = "http://localhost:8000/api"
  const getData = () => {
    const getUrl = `${rootUrl}/token/`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: '{"username": "niklas", "password": "schloss1312"}'
    }
    fetch(getUrl, options).then(result => {
      setData(result)
      console.log(result)
    })
  }
  return (
    <div className="App">
        <button onClick={getData}>Get Votables</button>
        <div>
          {JSON.stringify(myData)}
        </div>
    </div>
  );
}

export default App;
