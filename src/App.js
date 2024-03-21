import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./modules/index/Index.js";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element ={<Index/>}/>
    </Routes>
  </Router>
  );
}

export default App;
