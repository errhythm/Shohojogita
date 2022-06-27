import React,{ useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const Donations = () => {

    const {donationState} = useContext(AuthContext);
    let navigate = useNavigate();
    const initialValues = {
        username: "",
        description: "",
        amount: ""
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        message: Yup.string().required(),
        amount: Yup.number().positive().required(),
    })

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3001/donations",{data,EventId:donationState},
        {headers:{accessToken: localStorage.getItem("accessToken")}})
        .then((response)=>{
          console.log(response);
          window.location.reload();
        })
        
        navigate("/");
    }
    return (
        <div>
        <Formik initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
            <Form className='formContainer'>
                <label>Username:</label>
                <ErrorMessage name="username" component="span" />
                <Field id="inputCreateEvent" name="username"/>
                
                <label>Message:</label>
                <ErrorMessage name="message" component="span" />
                <Field  id="inputCreateEvent" name="message"/>

                <label>Amount:</label>
                <ErrorMessage name="amount" component="span" />
                <Field  id="inputCreateEvent" name="amount"/>
                

                <button type='submit'>Donate</button>
            </Form>
        </Formik>
        </div>
    )
}

export default Donations
