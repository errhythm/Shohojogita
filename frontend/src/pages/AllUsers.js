import { useEffect,useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/allusers").then((response)=>{
            setAllUsers(response.data);
            console.log(response.data);
        })
    }, [])
    return (
        <div>
        All Users:
        {allUsers.map((user,key)=>{
            return (
                <div key={key}>
                    {user.username}
                </div>
            )
            
        })}
        </div>
    )
}

export default AllUsers
