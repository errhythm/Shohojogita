import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {

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
        axios.post("http://localhost:3001/auth",data).then((response)=>{
            console.log(response);
            navigate('/login');
        }).catch((err)=>console.log(err));
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
                    

                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
