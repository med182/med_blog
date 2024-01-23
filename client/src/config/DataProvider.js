// dataProvider.js
import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const apiUrl = "http://localhost:8000/admin"; // ajustez l'URL de votre API

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // Ajoutez vos propres en-têtes d'autorisation ici si nécessaire
  const token = localStorage.getItem("accessToken");
  options.headers.set("Authorization", `Bearer ${token}`);

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(apiUrl, httpClient);

export default dataProvider;
