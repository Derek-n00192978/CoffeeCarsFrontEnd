import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
///////////////////////////////////////////////
import LoginForm from "../components/LoginForm";
import HomeCard from "../components/HomeCard";

const Home = (props) => {
    
    const { id } = useParams();
    const navigate = useNavigate();
    const [ users, setUsers ] = useState(null);
    const [ authUser, setAuthUser ] = useState(null);

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
                console.log("Axios response.All users: ");
                console.log(response.data);
                

                setUsers(response.data)
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data.message);
             })
        console.log("mounted");     
    }, [token, id]);


    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/auth`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
             .then((response) =>{
                console.log(response.data);
                setAuthUser(response.data)
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data.message);
             })
    }, [token]);

    if(!users) return 'Loading...';
    
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
                 <HomeCard key={users.id} authUser={authUser} authenticated={props.authenticated} callback={deleteCallback}/>  
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