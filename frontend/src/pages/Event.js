import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'
import { Link } from 'react-router-dom';
const Event = () => {
    let { id } = useParams();
    const [eventObject, setEventObject] = useState({});
    const [comments, setComments] = useState([]);
    const [donationObject, setDonationObject] = useState([]);
    const [newComment, setNewComment] = useState("")
    const { authState,setEventState } = useContext(AuthContext);
    

    useEffect(()=>{
        setEventState(id);
        axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
            setComments(response.data);
        });

        axios.get(`http://localhost:3001/events/byId/${id}`).then((response)=>{
            setEventObject(response.data[0]);
        });

        axios.get(`http://localhost:3001/donations/${id}`).then((response)=>{
            setDonationObject(response.data);
            console.log(response.data)
        });
       
    },[]);

    const addComment = () => {
        axios.post('http://localhost:3001/comments', {
            commentBody: newComment, EventId: id, UserId: authState.id},
            {
                headers:{
                    accessToken: localStorage.getItem('accessToken'),
                }
            })
            .then((response)=>{
                if(response.data.error){
                    alert("You are not logged in");
                }
                else{
                    const commentToAdd = {commentBody: newComment, username: response.data.username};
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }

        })
        window.location.reload();
    }


    return (
        <div className="eventPage">
            <div className='leftSide'>
                <div className='event' id="individual">
                    <div className='title'>
                        {eventObject.title}
                    </div>
                    <div className='body'>
                        {eventObject.description}
                    </div>
                    <div className='goal'>
                        Tk.{eventObject.goal}
                    </div>
                </div>
            </div>
        
            <div className='listOfComments'>
            <h2>Donations</h2>
            {donationObject.map((donation,key)=>{
                return (
                    <div key={key} className='comment'>{donation.message} <br />
                    <label> Username: {donation.username}</label>
                    <label> Amount: {donation.amount}</label>
                    </div>
                )
            })}
            </div>
            <div className='rightSide'>
                <Link to="/reports"><button>Report</button></Link>    
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Comment...' value={newComment} autoComplete="off" onChange={(event)=> {setNewComment(event.target.value)}}/>
                    <button onClick={addComment}>Add Comments</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment,key)=>{
                        return (
                            <div key={key} className='comment'>{comment.commentBody}
                            <label> Username: {comment.username}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Event;
