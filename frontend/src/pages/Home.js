import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Home = () => {
    const [listOfEvents, setListOfEvents] = useState([]);
    const {authState,setDonationState} = useContext(AuthContext);
    let navigate = useNavigate();
    
    useEffect(() => {
      axios.get('http://localhost:3001/events').then((response)=>{
        setListOfEvents(response.data);
      })
    },[]);

    const deleteEvent = (id) =>{
      axios.post('http://localhost:3001/events/delete',{id: id}).then((response)=>{
        window.location.reload();
      })
    }
    return (
        <div>
        {listOfEvents.map((value,key)=>{
          return( 
            <div className='event' key={key} >
              <div className='title'>
              <div>{value.title}</div>
              {authState.username==="admin"&& <button onClick={()=>{
                deleteEvent(value.idevents);
              }}>Delete</button>}
               </div>
              <div className='body' onClick={()=>{
                navigate(`/event/${value.idevents}`)
              }}>{value.description}</div>
              <div className='goal'><div className='down'>Goal: Tk. {value.goal}<span></span>   
              </div>
              <Link to="/donations"><button onClick={()=>{setDonationState(value.idevents)}}>Donate</button></Link>
              </div>
            </div>
            
            )
        })}
        </div>
    )
}

export default Home
