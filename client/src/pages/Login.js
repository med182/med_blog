import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  const [acceptedCGU, setAcceptedCGU] = useState(false);

  let navigate = useNavigate();

  const login = () => {
    if (!acceptedCGU) {
      alert("Veuillez accepter les conditions générales d'utilisation.");
      return;
    }
    const data = { username: username, password: password };
    axios.post("http://localhost:8000/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("role", response.data.role);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
          role: response.data.role,
        });

        navigate("/");
      }
    });
  };

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  return (
    <div className="loginContainer">
      <input
        type="text"
        placeholder="Pseudo"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <div className="password-input-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          onClick={() => setShowPassword(!showPassword)}
          className="password-icon"
        />
      </div>
      <div className="checkbox-container">
        <label className="cgu-label">
          <input
            type="checkbox"
            checked={acceptedCGU}
            onChange={() => setAcceptedCGU(!acceptedCGU)}
          />

          <span className="cgu-text">
            {" "}
            J'accepte les{" "}
            <Link to="/cgu" className="cgu-link">
              conditions générales d'utilisation
            </Link>
          </span>
        </label>
      </div>
      <button onClick={login} disabled={!acceptedCGU}>
        Se connecter
      </button>
    </div>
  );
}

export default Login;
