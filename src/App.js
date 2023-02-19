import { Routes, Route } from "react-router-dom"
import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import Reset from "./pages/Reset";


function App() {

  const [user, setUser] = useState({})

  return (
    <>
    <Routes>
        <Route exact path="/" element={ <Home user={user}/> } />
        <Route exact path="/login" element={ <Login setUser={setUser}/> } />
        <Route exact path="/register" element={ <Register setUser={setUser}/> } />
        <Route exact path="/reset/:id" element={ <Reset setUser={setUser}/> } />

     </Routes>
     </>
  );
}

export default App;
