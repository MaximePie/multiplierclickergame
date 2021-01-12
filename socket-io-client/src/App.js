import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const isProduction = process.env.NODE_ENV === 'production';
const ENDPOINT = isProduction ? 'https://nodemulticlicker.herokuapp.com:19073' : "http://127.0.0.1:4001";

function App() {
  console.log(process.env);
  console.log(ENDPOINT);
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {transports: ['websocket', 'polling', 'flashsocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
  );
}

export default App;
