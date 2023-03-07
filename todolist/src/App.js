import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './Modules/Nav';
import Home from './Pages/Home';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
