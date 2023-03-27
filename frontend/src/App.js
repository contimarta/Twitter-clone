import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./App.css";
import { peepList } from "./utils/DataServices.js";
import Main from "./components/Main/Main.jsx";
import { getToken } from "./utils/DataServices.js";

const App = () => {
  const [peeps, setPeeps] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState({});

  const isLoggedInFunction = ()=>{
    const token = getToken();
    if(token){setIsLoggedIn(true)}
  }
  const uploadPeeps = async () => {
    const data = await peepList();

    if (!data?.error) {
      setPeeps(data);
      setError({});
    }
    if (data?.error) {
      setError(data);
      setPeeps([]);
    }
  };

  useEffect(() => {
    uploadPeeps();
    isLoggedInFunction()
  }, []);

  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      {Object.keys(error).length === 0 ? (
      <Main isLoggedIn={isLoggedIn} peeps={peeps} uploadPeeps={uploadPeeps}/>
      ) : (
        <p className="no-peeps">No peeps to display! Try again later.</p>
      )}
      <Footer/>
    </>
  );
};

export default App;
