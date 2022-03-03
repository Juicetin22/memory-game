import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import SimpleMemoryIndex from "./components/simple-memory";
import NumberMemoryIndex from "./components/number-memory";
import MemoraddIndex from "./components/memoradd";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/matching-cards'} element={<SimpleMemoryIndex />} />
        <Route path={'/numbers'} element={<NumberMemoryIndex />} />
        <Route path={'/memoradd'} element={<MemoraddIndex />} />
      </Routes>
    </div>
  );
}

export default App;
