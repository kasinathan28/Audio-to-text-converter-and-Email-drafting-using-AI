import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./modules/index/Index.js";
import Auth from "./modules/auth/Auth.js";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element ={<Index/>}/>
      <Route path="/auth" element ={<Auth/>}/>
    </Routes>
  </Router>
  );
}

export default App;
