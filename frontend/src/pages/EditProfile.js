import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(8).max(16).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/editProfile",data,{headers:{
            accessToken: localStorage.getItem("accessToken"),
          }}).then((response)=>{
            console.log(response);
            
            
        }).catch((err)=>console.log(err));
        navigate('/profile');
    };

    return (
        <div>
            <Formik initialValues={initialValues} 
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
                <Form className='formContainer'>
                    <label>Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field id="inputCreateEvent" name="username"/>

                    <label>Password:</label>
                    <ErrorMessage name="password" component="span" />
                    <Field type="password" id="inputCreateEvent" name="password"/>
                    

                    <button type='submit'>Confirm Changes</button>
                </Form>
            </Formik>
        </div>
    )
}

export default EditProfile 
