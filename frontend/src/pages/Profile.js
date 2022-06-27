import React,{ useEffect,useContext,useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
    const [profileinfo, setProfileinfo] = useState([])
    const {authState} = useContext(AuthContext);
    const { id } = authState;
    useEffect(() => {
            axios.post("http://localhost:3001/auth/getProfile",{id:id},{headers:{
            accessToken: localStorage.getItem("accessToken"),
          }})
        .then((response)=>{
            console.log(response.data);
            setProfileinfo(response.data[0]);
        })
        
    }, [authState]);

        return (
            <div>
                Username: {profileinfo && profileinfo.username} <br />
                Password: {profileinfo && profileinfo.password} <br />
                <Link to="/editprofile"><button>Edit Profile</button></Link>   
            </div>
        )
    
}

export default Profile
