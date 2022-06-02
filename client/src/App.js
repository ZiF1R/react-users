import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import MainPage from "./components/MainPage";
import UsersPage from "./components/UsersPage";
import NotExistingPage from "./components/NotExistingPage";
import { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
            <Route index element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="users" element={<UsersPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="sign-up" element={<Registration />} />
            <Route path="sign-in" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="*" element={<NotExistingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;