import { useState } from 'react';
import './App.css';
import Login from "./components/Auth/Login/Login"

function App() {
  const [token, setToken] = useState();

  if (!token)
    return <Login setToken={setToken} />

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
