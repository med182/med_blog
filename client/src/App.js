import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import ChangePassword from "./pages/ChangePassword";
import ApiPage from "./pages/ApiPage";
import MovieIcon from "@mui/icons-material/Movie";
// import AdminPanel from "./admin/AdminPanel";

// import Logo from "./images/logo_cine.png";

const App = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
    role: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            role: "",
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login"); // Utilisez la fonction navigate ici
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          <div className="logo">Cinéblog</div>
          <div className="links">
            {!authState.status ? (
              <>
                <Link to="/login">Se Connecter</Link>
                <Link to="/registration">Inscription</Link>
              </>
            ) : (
              <>
                <Link to="/">Acceuil</Link>
                <Link to="/createpost">Ajouter un Post</Link>
                <Link to="/api">
                  <MovieIcon /> Sorties de Films
                </Link>
                {authState.role === "admin" && <Link to="/admin">Admin</Link>}
              </>
            )}
          </div>
          <div className="loggedInContainer">
            <h1>{authState.username}</h1>
            {authState.status && (
              <button onClick={logout}>Se Déconnecter</button>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/api" element={<ApiPage />} />
          <Route
            path="/admin/*" // Assurez-vous que l'étoile (*) est bien présente ici
            // element={<AdminPanel />}
          />
        </Routes>

        <div className="footer">
          <div className="links">
            {/* Ajoutez ici les liens de votre footer */}
            <Link to="/about">À propos</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="loggedInContainer">
            {/* Ajoutez ici d'autres éléments de votre footer */}
            <p>Contactez-nous : contact@example.com</p>
          </div>
        </div>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
