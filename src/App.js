import {Route, Routes} from "react-router"
import Home from "./routes/Home";
import Brand from "./routes/Brand";
import Layout from "./components/Layout";
import "./css/App.css"


function App() {
  return(
      <Routes>
        <Route path="/" element={<Layout/>}> 
          {/* by default incarc home pentru layout */}
          <Route index element={<Home/>}/> 
          <Route path="/brand/:brandName" element={<Brand/>}/>
        </Route>
      </Routes>  
  );
}

export default App;
