import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './Modules/Nav';
import Home from './Pages/Home';
import Todolist from './Pages/Todolist';
import Register from './Pages/Register';
import Todo from './Pages/Todo';
import Addtodo from './Pages/Addtodo';
import Members from './Pages/Members';
import Member from './Pages/Member';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todolist" element={<Todolist />} />
          <Route path="/todolist/:id" element={<Todo/>} />
          <Route path="Addtodo" element={<Addtodo/>} />
          <Route path="/members" element={<Members/>} />
          <Route path="/members/:id" element={<Member/>} />
        
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
