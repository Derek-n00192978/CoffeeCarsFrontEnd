import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

/////////////////////////////////////////////
import VehicleDisplay from "../../components/VehicleDisplay";

const Show = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ vehicle, setVehicle] = useState(null);
    let token = localStorage.getItem('token');

    const deleteCallback = (id) => {
        navigate('/vehicles');
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/vehicles/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
             .then((response) => {
                 console.log(response.data);
                 setVehicle(response.data);
             })
             .catch((err) => {
                 console.error(err);
                 console.log(err.response.data.message);                 
             });
        console.log("mounted");     
    }, [token, id]);

    if(!vehicle) return "Loading...";

    return (
        <VehicleDisplay key={vehicle.id} vehicle={vehicle} authenticated={props.authenticated} callback={deleteCallback}/>
    );
};

export default Show;