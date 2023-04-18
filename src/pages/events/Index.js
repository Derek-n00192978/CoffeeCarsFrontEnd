import axios from 'axios';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
///////////////////Pagination///////////////////////
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import EventCard from '../../components/EventCard';

const Index = (props) => {
    const [ events, setEvents ] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/events')
             .then((response) =>{
                console.log(response.data);
                setEvents(response.data)
             })
             .catch((err) => {
                console.error(err);
             })
        console.log("mounted");     
    }, []);
    if(!events) return 'Loading...';

    const deleteCallback = (id) => {
        let eventsNew = events.filter(event => {
            return event._id !== id;
        });

        setEvents(eventsNew);
    };

    const eventsList =events.map((event) => {
        return <EventCard key={event.id} event={event} authenticated={props.authenticated} callback={deleteCallback}/>;
    });
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>{ eventsList }</TableRow>
            </TableHead>
            </Table>
            </TableContainer>
            {/* Pagination start*/}
            <div className='fullWidth'>
                <Stack spacing={2}>
                <Pagination count={5} color="warning" />
                </Stack>
            </div>
            {/*Pagination end*/}
        </>
    );
   
};

export default Index;