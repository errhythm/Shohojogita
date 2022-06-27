import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    let navigate = useNavigate();
    const initialValues = {
        title: "",
        description: "",
        goal: ""
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        goal: Yup.number().positive().required(),
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:3001/events',data).then((response)=>{
            navigate('/');
        }) 
    }

    
    return (
        <div className='createEventPage'>
            <Formik initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}>
                <Form className='formContainer'>
                    <label>Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field id="inputCreateEvent" name="title"/>
                    <label>Description:</label>
                    <ErrorMessage name="description" component="span" />
                    <Field id="inputCreateEvent" name="description"/>
                    <label>Goal:</label>
                    <ErrorMessage name="goal" component="span" />
                    <Field id="inputCreateEvent" name="goal"/>

                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}
export default CreateEvent
