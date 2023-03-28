import axios from 'axios';
import { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import IconButton from '@mui/material/IconButton';
// import CardActions from '@mui/material/CardActions';
// import ShareIcon from '@mui/icons-material/Share';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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
        <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
   <TableHead>
     <TableRow>{ eventsList }</TableRow>
   </TableHead>
   </Table>
   </TableContainer> 
    );
   
};

export default Index;