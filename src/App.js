import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Home from './components/Home';
import SimpleMemoryIndex from './components/simple-memory';
import { Routes, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/matching-cards'} element={<SimpleMemoryIndex />} />
      </Routes>
    </div>
  );
}

export default App;
