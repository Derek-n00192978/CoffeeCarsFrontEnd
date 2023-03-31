import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
///////Pagination//////////////////////////
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import VehicleCard from '../../components/VehicleCard';

const Index = (props) => {
    const [ vehicles, setVehicles ] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/vehicles')
             .then((response) =>{
                console.log(response.data);
                setVehicles(response.data)
             })
             .catch((err) => {
                console.error(err);
             })
        console.log("mounted");     
    }, []);
    if(!vehicles) return 'Loading...';

    const deleteCallback = (id) => {
        let vehiclesNew = vehicles.filter(vehicle => {
            return vehicle._id !== id;
        });

        setVehicles(vehiclesNew);
    };

    const vehiclesList =vehicles.map((vehicle) => {
        return <VehicleCard key={vehicle._id} vehicle={vehicle} authenticated={props.authenticated} callback={deleteCallback}/>;
    });
    return (
        <> 
        {/*Pagination start*/}
      <div className='fullWidth'>
      <Stack spacing={2}>
        <Pagination count={5} color="primary" />
      </Stack>
      {/*Pagination end*/}
      </div>
        <TableContainer>
             <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>{ vehiclesList }</TableRow>
        </TableHead>
        </Table>
        </TableContainer>
        </>          
    ); 
};
export default Index;