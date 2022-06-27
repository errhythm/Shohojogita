import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import CreateEvent from './pages/CreateEvent';
import Event from './pages/Event';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Donations from "./pages/Donations";
import AllUsers from './pages/AllUsers';
import Reports from './pages/Reports';
import ListOfReports from './pages/ListOfReports';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
function App() {

  const [authState,setAuthState] = useState({username:"",id:0,status:false});
  const [donationState,setDonationState] = useState("");
  const [eventState,setEventState] = useState("");

  useEffect(() => {

    axios.get("http://localhost:3001/auth/auth",{headers:{
      accessToken: localStorage.getItem("accessToken"),
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({...authState,status:false});
      }
      else{
        setAuthState({username:response.data.username,id:response.data.id,status:true});
      }
    });
  }, [])

  const logout = () =>{
    localStorage.removeItem("accessToken");
    setAuthState({username:"",id:0,status:false});
    window.location.href = "/"
  }

  return (
    <div className="App">
    <AuthContext.Provider value={{authState,setAuthState,donationState,setDonationState,eventState,setEventState}}>
      <Router>
      <div className='navbar'>
        <Link to="/"> <h2>Shohojogita</h2></Link>
        {!authState.status ? (
        <div>
          
          <Link to="/login">Login</Link>
          <Link to="/registration"> Registration</Link>
        </div>
      ):(
        <div>
          <Link to="/createevent"> Create An Event</Link>
          <button onClick={logout}> Logout </button>
        </div>)}
        {authState.username === "admin" &&
          <div>
            <Link to="/allusers"> All Users </Link>
            <Link to="/complaints"> Complaints</Link>
          </div>
      }
        <Link to="/profile"><h1> {authState.username}</h1></Link>    
      </div>
      
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/createevent" exact element={<CreateEvent/>}/>
          <Route path="/event/:id" exact element={<Event/>}/>
          <Route path="/registration" exact element={<Registration/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/donations" exact element={<Donations/>}/>
          <Route path="/allusers" exact element={<AllUsers/>}/>
          <Route path="/reports" exact element={<Reports/>}/>
          <Route path="/complaints" exact element={<ListOfReports/>}/>
          <Route path="/profile" exact element={<Profile/>}/>
          <Route path="/editprofile" exact element={<EditProfile/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
