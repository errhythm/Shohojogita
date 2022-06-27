import axios from 'axios';
import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {authState,setAuthState,seteventState} = useContext(AuthContext);

    let navigate = useNavigate();

    const login = async() => {
        const data = { username: username, password: password };
        await axios.post("http://localhost:3001/auth/login",data).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            } 
            else{
                localStorage.setItem("accessToken",response.data.token);
                setAuthState((p)=>{
                    return {username: response.data.username, id:response.data.id, status: true}});
                navigate("/");
            }
        });
    }
    return (
        <div className='loginContainer'>
            <input type="text" placeholder="Username" onChange={(event)=>{
                setUsername(event.target.value);
            }}/>
            <input type="password" placeholder="Password" onChange={(event)=>{
                setPassword(event.target.value);
            }}/>

            <button onClick={login}> Login </button>
        </div>
    )
}

export default Login
