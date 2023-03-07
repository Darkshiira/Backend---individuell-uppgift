import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './Modules/Nav';
import Home from './Pages/Home';
import Todolist from './Pages/Todolist';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todolist" element={<Todolist />} />
        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
