import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
/////////////////////////////////////////////
import LoginForm from "../../components/LoginForm";

//////////////////////////////////////////////
import DashboardDisplay from "../../components/DashboardDisplay";



const Show = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ user, setUser] = useState(null);
    let token = localStorage.getItem('token');


    const deleteCallback = (id) => {
        navigate('/');
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/auth`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);
                 setUser(response.data);
             })
             .catch((err) => {
                 console.error(err);
                 console.log(err.response.data.message);                 
             });
        console.log("mounted");     
    }, [token, id]);

    if(!user) return "Loading...";

    return (
        <>
        <div className="row">
        <div className="column1">
        
        {(!props.authenticated) ? (
            <LoginForm onAuthenticated={props.onAuthenticated}/>
        ): (
            <div className="home">
             <DashboardDisplay key={user.id} user={user} authenticated={props.authenticated} callback={deleteCallback}/>  
             
            <h4>Hi are logged in ---- Enjoy</h4>
            </div> 
        )} 
        
        </div>
        <div className="column2">
            <p> </p>
        </div>         
        </div>
    </>
    );
};

export default Show;