import React from "react";
import {Route, Routes} from "react-router"
import Home from "./routes/Home";
import Brand from "./routes/Brand";


function App() {
  return(
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/brand/:brandName" element={<Brand/>}/>
    </Routes>
  );
}

export default App;
