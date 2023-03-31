import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
///////////////////////////////////////////////
import LoginForm from "../components/LoginForm";
import HomeCard from "../components/HomeCard";

const Home = (props) => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    let token = localStorage.getItem('token');
    let fName = localStorage.getItem('fName');
    

    const deleteCallback = (id) => {
        navigate('/users');
    };
    //////////////////////////////////////////////
    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) =>{
                console.log(response.data);
                setUser(response.data)
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data.message);
             })
        console.log("mounted");     
    }, [token, id]);

    if(!user) return 'Loading...';
    
    ////////////////////////////////////////////////////////    

    //const usersList =user.map((user) => {
    //    return  <HomeCard key={user._id} user={user} authenticated={props.authenticated} callback={deleteCallback}/>;
    // }
    //);
    //////////////////////////////////////////////
    return (
        <>
            <div className="row">
            <div className="column1">
            
            {(!props.authenticated) ? (
                <LoginForm onAuthenticated={props.onAuthenticated}/>
            ): (
                <div className="home">
                 <HomeCard key={user.id} user={user} authenticated={props.authenticated} callback={deleteCallback}/>  
                
                </div> 
            )} 
            
            </div>
            <div className="column2">
                <p> </p>
            </div>         
            </div>
            <br></br>
        </>
    )
}
export default Home;