import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Registration() {
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
    repeatedPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Ce champ est requis."),
    password: Yup.string()
      .min(4, "Le mot de passe doit comporter au moins 4 caractères.")
      .max(12, "Le mot de passe ne peut pas comporter plus de 12 caractères.")
      .required("Ce champ est requis.")
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/,
        "Le mot de passe doit contenir au moins un chiffre, une majuscule et un caractère spécial."
      ),

    repeatedPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Les mots de passe ne correspondent pas. "
      )
      .required("Ce champ est requis."),

    email: Yup.string()
      .email("Adresse e-mail invalide.")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Adresse e-mail invalide.")
      .required("Ce champs est requis."),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/auth", data)
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Affiche le message d'erreur renvoyé par le serveur
          alert(error.response.data.error);
        } else {
          console.error(
            "Une erreur s'est produite lors de l'inscription :",
            error
          );
        }
      });
    navigate("/login");
  };

  return (
    <div>
      {" "}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Email :</label>
          <ErrorMessage name="email" component="span" className="error" />
          <Field
            autoComplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
            placeholder="(Votre adresse e-mail ...)"
          />
          <label>Pseudo :</label>
          <ErrorMessage name="username" component="span" className="error" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Votre Pseudo ...)"
          />
          <label>Mot de Passe :</label>
          <ErrorMessage name="password" component="span" className="error" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="(Votre mot de Passe ...)"
          />
          <label>Confirmer le Mot de Passe :</label>
          <ErrorMessage
            name="repeatedPassword"
            component="span"
            className="error"
          />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="repeatedPassword"
            placeholder="(Répétez le mot de Passe ...)"
          />

          <button type="Submit">S'inscrire</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
