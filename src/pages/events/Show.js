import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventDisplay from "../../components/EventDisplay";



const Show = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ event, setEvent] = useState(null);
    let token = localStorage.getItem('token');

    const deleteCallback = (id) => {
        navigate('/events');
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/events/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);
                 setEvent(response.data);
             })
             .catch((err) => {
                 console.error(err);
                 console.log(err.response.data.message);                 
             });
        console.log("mounted");     
    }, [token, id]);

    if(!event) return "Loading...";

    return (   
        <>  
        <EventDisplay className='row-cols-2' key={event.id} event={event} authenticated={props.authenticated} callback={deleteCallback}/>
        </>
    );
};

export default Show;