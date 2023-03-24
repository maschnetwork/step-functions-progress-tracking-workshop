import "./App.css";
import React, { useCallback, useEffect, useState } from "react";

import WebsocketConnector from "./Components/WebsocketConnector";
import CardOrderLog from "./Components/CardOrderLog";

function App() {
  // Setting the state
  const [ws, setWs] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [msgs, setMsgs] = useState([]);

  // WebSocket handler
  const connectToWs = (event) => {
    event.preventDefault();
    const wsUrl = event.target.elements.formWebsocketUrl.value;
    if (wsUrl) {
      const newWebsocket = new WebSocket(wsUrl);

      setWs(newWebsocket);
      newWebsocket.onerror = () => {
        console.log("Error occured in WebSocket connection. Terminating...");
        setIsConnected(false);
      };

      newWebsocket.onopen = () => {
        console.log("WebSocket connection opened");
        setIsConnected(true);
      };

      newWebsocket.onmessage = (event) => {
        console.log("Message received:", event.data);
        const msg = event.data;
        setMsgs((prevMsgs) => [...prevMsgs, msg]);
      };

      newWebsocket.onclose = () => {
        console.log("WebSocket connection closed");
        setIsConnected(false);
      };
    }
  };

  const onSend = useCallback(() => {
    ws.send(JSON.stringify({ action: "onMsg" }));
  }, [ws]);

  const onDisconnectClick = () => {
    if (isConnected) {
      ws.close();
    }
  };

  return (
    <div>
      <WebsocketConnector
        isConnected={isConnected}
        connectToWs={connectToWs}
        onDisconnectClick={onDisconnectClick}
        onSend={onSend}
      />
      <CardOrderLog msgs={msgs} />
    </div>
  );
}

export default App;
