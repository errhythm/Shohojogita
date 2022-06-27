import React,{ useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Reports = () => {

    const { eventState } = useContext(AuthContext);
    let navigate = useNavigate();

    const initialValues = {
        username: "",
        event:"",
        complaints: "",
    };

    const validationSchema = Yup.object().shape({
        complaints: Yup.string().required(),
    });

    const onSubmit = (data) => {
        console.log(eventState);
        axios.post("http://localhost:3001/reports",{data,eventId: eventState}).then((response)=>{
            console.log(response);
            
        }).catch((err)=>console.log(err));
        navigate('/');
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
                    <label>Event:</label>
                    <ErrorMessage name="event" component="span" />
                    <Field id="inputCreateEvent" name="event"/>
                    <label>Complaints:</label>
                    <ErrorMessage name="complaints" component="span" />
                    <Field id="inputCreateEvent" name="complaints"/>
                    <button type='submit'>Report</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Reports
