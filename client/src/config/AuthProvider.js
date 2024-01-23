// authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";

const authProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    // Logique d'authentification
  } else if (type === AUTH_LOGOUT) {
    // Logique de déconnexion
  } else if (type === AUTH_ERROR) {
    // Logique en cas d'erreur d'authentification
  } else if (type === AUTH_CHECK) {
    // Vérifiez si l'utilisateur a le profil admin
    const { resource } = params;
    if (resource === "admin" && localStorage.getItem("role") === "admin") {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  return Promise.resolve();
};

export default authProvider;
