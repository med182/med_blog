import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let navigate = useNavigate();

  const changePassword = () => {
    axios
      .put(
        "http://localhost:8000/auth/changepassword",
        { oldPassword: oldPassword, newPassword: newPassword },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate("/login");
        }
      });
  };

  return (
    <div>
      <h1>Changer votre mot de passe</h1>
      <input
        type="text"
        placeholder="Ancien Mot De Passe..."
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Nouveau Mot De Passe..."
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button onClick={changePassword}>Valider</button>
    </div>
  );
}

export default ChangePassword;

// $2b$10$jIfKXdnhxi9vy2nZE8O0g.549IOSfkpc.i0KE4M7vLvxpfECxvrPG
// $2b$10$QxzHKJhfVVx1K0KuH5xsj.4fq51lHUwHXaMxyDU09n0Mc9ENMkdTC
