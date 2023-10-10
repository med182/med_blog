import React, {useContext, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup' 
import axios from 'axios';
import  { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext';


function CreatePost() {

    const{authState}=useContext(AuthContext)
    
let navigate =useNavigate();
const initialValues ={
    title:"",
    postText:"",


}

useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
        navigate("/login");
    }
}, [])

const validationSchema = Yup.object().shape({
    title: Yup.string().required("Vous devez ajouter un titre !"),
    postText: Yup.string().required("Vous devez mettre un post!") ,
   
})

const onSubmit = (data)=>{
    axios.post("http://localhost:8000/posts", data, {headers: 
    { accessToken: localStorage.getItem("accessToken"),},
})
    .then((response)=>{
     navigate('/');

    });
}

  return (
    <div className='createPostPage'>
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Title :</label>
            <ErrorMessage name="title" component="span" />
            <Field id="inputCreatePost"
                    name="title"
                    placeholder="(Ex. Title ...)"
            />
            <label>Post :</label>
            <ErrorMessage name="postText" component="span" />
            <Field 
                    autoComplete="off"
                    id="inputCreatePost"
                    name="postText"
                    placeholder="(Ex. Post ...)"
            />


            <button type='Submit'>Create Post</button>

           

        </Form>
    </Formik>
    </div>
  )
}

export default CreatePost
