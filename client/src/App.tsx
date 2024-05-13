import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
// import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";


const backendIp = process.env.REACT_APP_API_URL;

const SimpleRequestComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  console.log(backendIp);
  useEffect(() => {
    const fetchData = async () => {
      if (!backendIp) {
        console.error("Backend IP is not defined");
        return;
      }
      try {
        const response = await axios.get(`${backendIp}`);
        setMessage(response.data);
      } catch (error) {
        console.log(error);
        setMessage("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Server Response: {message}</p>
    </div>
  );
};

const App = () => {
  return (
    <div className="app">
      <Header />
    </div>
  );
};

export default App;
