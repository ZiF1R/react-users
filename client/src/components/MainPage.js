import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import "./MainPage.css";

function MainPage(props) {
  const navigate = useNavigate();
  const currentUser = props.currentUser;

  function logout() {
    props.setCurrentUser(null);
    navigate("/sign-in");
  }

  return (
    <>
      <nav className="nav">
        {
          currentUser === null ?
          (<>
            <Link className="nav__link" to="/sign-in">Sign in</Link>
            <Link className="nav__link" to="/sign-up">Sign up</Link>
          </>):
            (<>
              <Link className="nav__link" to="/users">Users</Link>
              <Button onClick={logout} style={{ right: 20, position: "absolute" }} variant="contained">
                Logout
              </Button>
            </>)
        }
      </nav>

      <main className="main-container">
        <Outlet />
      </main>
    </>
  )
}

export default MainPage;