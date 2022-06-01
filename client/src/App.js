import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import MainPage from "./components/MainPage";
import UsersPage from "./components/UsersPage";
import NotExistingPage from "./components/NotExistingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route index element={<Login />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sign-up" element={<Registration />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="*" element={<NotExistingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;