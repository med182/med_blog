import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup' 
// import {useNavigate} from 'react-router-dom';
import axios from 'axios'

function Registration() {

   
    
    const initialValues ={
   
        username:"",
        password:"",
    
    }
    
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required("Ce champ est requis."),
        password: Yup.string()
          .min(4, "Le mot de passe doit comporter au moins 4 caractères.")
          .max(12, "Le mot de passe ne peut pas comporter plus de 12 caractères.")
          .required("Ce champ est requis.")
          .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*\W).+$/,
            'Le mot de passe doit contenir au moins un chiffre, une majuscule et un caractère spécial.'
          ),
      })
    
      const onSubmit = (data) => {
        axios.post("http://localhost:8000/auth", data)
          .then(() => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Une erreur s'est produite lors de l'inscription :", error);
          });
      }

  return (
    <div> <Formik initialValues={initialValues} 
                  onSubmit={onSubmit} 
                  validationSchema={validationSchema}>
    <Form className='formContainer'>
        <label>Pseudo :</label>
        <ErrorMessage name="username" component="span" className='error'/>
        <Field id="inputCreatePost"
                name="username"
                placeholder="(Votre Pseudo ...)"
        />
        <label>Mot de Passe :</label>
        <ErrorMessage name="password" component="span" className='error' />
        <Field 
                autoComplete="off"
                type="password"
                id="inputCreatePost"
                name="password"
                placeholder="(Votre mot de Passe ...)"
        />
 

        <button type='Submit'>S'inscrire</button>

       

    </Form>
</Formik></div>
  )
}

export default Registration