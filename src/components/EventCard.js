import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
///////Pagination//////////////////////////
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const EventCard = (props) => {
  const [errors, setErrors] = useState({});
  const [liked, setLiked] = useState({
    "color": "default"
  });
    let date = <p><b>Date:</b> {props.event.date}</p>
    let title = <p><b>Title:</b>{props.event.title}</p>
    let description = <p><b>Description:</b>{props.event.description}</p>
    let image = <>{props.event.image_path}</>

    if(props.authenticated){
        title = <p><b>Title:</b><Link to={`/events/${props.event._id}`}>{props.event.title}</Link></p>
        image = <></>
        }

    const updateColor = (newColor) => {
      
      console.log("settingColor: ", newColor);
      setLiked(previousState => {
        return { ...previousState, color: newColor }
      });
      console.log("setColor: ", newColor);
    }

    const onLike = (e) => { 
      let user = localStorage.getItem("user");
      console.log(user + " liked " + props.event._id); 
      let token = localStorage.getItem('token');
      let data = {
        "user_id" : user,
        "event_id": props.event._id
      }
      axios.post('http://localhost:3001/api/likeEvents', data, {
          headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": 'application/json' 
          }
      })
      .then(response => {
        console.log(response.data);
        updateColor("warning");
        // navigate('/events');
      })
      .catch(err=> {
        console.log(err.response.data)
        console.error(err);
        setErrors(err.response.data.errors);
      });
    }    
    return (
        <div className='column1'>
            <Card style={{ width: '100%' }}>
                <CardMedia
                    image={`https://ca2-n00192978.s3.eu-west-1.amazonaws.com/${props.event.image_path}`}
                    component="img"
                    height="194"
                    alt="event thumbnail"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {description}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {date}
                    </Typography>    
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={onLike}aria-label="add to favorites">
                    <ThumbUpIcon color={liked.color}/>
                    </IconButton>
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <br></br>
        </div>
    )
};
export default EventCard;