import React,{ useEffect,useState } from 'react';
import axios from 'axios';

const ListOfReports = () => {
    const [listOfReports,setListOfReports] = useState([]);
    const [eventTitle,setEventTitle] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3001/reports").then((response)=>{
            setListOfReports(response.data)
            setEventTitle(response.events_idevents)
        })
    }, [])

    return (
        <div>
            {listOfReports.map((report,key)=>{
                return(
                    <div key={key} className='comment'>
                     {report.complaints} <br />
                    <label> Username: {report.username}</label> <br />
                    <label>Event Title: {report.event}</label> <br /> <br /> <br />
                    </div>
                )
            })}
        </div>
    )
}

export default ListOfReports
