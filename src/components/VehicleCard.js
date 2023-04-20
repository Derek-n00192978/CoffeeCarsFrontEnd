import { Link } from 'react-router-dom';
//import { useState } from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import Item from '@mui/material/ListItem'
import Grid from '@mui/material/Grid';




const VehicleCard = (props) => {
  const [errors, setErrors] = useState({});
  
  const [ authUser, setAuthUser ] = useState(null);
  console.log("AuthUser: ", authUser);
  const [liked, setLiked] = useState({
    "color": "default"
  });
    let make = <>{props.vehicle.make}</>
    let model = <>{props.vehicle.model}</>
    let name = <>{props.vehicle.user?.fName}</>
    //just hardcoding the ID for user Friday
    //you need to get the current user for real
   // let curUser = 640b18fb68d3690bfd5284e2;
  
    // let image = <>{props.vehicle.image_path}</>
    //let id = <>{props.vehicle._id}</>

  
  console.log("=======Vehicle props:========")
  console.log(props.vehicle);
  console.log(props.vehicle._id);
  console.log("Vehicle likes")
 //console.log(props.vehicle.likes);

 //experiment
 
  let tempObj = props.vehicle.likes
  if (tempObj.length > 0) {
  console.log("Vehicle IDs that are liked by user_id:")
  for(let i=0; i < tempObj.length; i++){
      console.log(tempObj[i].user_id)
      //compare the user_ids that like this particular car with the logged in user_id
      //if they match -> change colour of thumbs up icon
    }
  }

 /*tempObj.map((data, idx) => (
     //console.log("Liked vehicle id: ", data.vehicle_id)
     if (props.vehicle._id == data.vehicle_id) {
       console.log("you like the vehicle: ")
     }
   ))
*/
 //experiment ends


    if(props.authenticated){
      make = <p><Link to={`/vehicles/${props.vehicle._id}`}>{props.vehicle.make}</Link></p>
      // image =  <>{props.vehicle.image_path}</>
    }

    ////
    const updateColor = (newColor) => {
      
      console.log("settingColor: ", newColor);
      setLiked(previousState => {
        return { ...previousState, color: newColor }
      });
      console.log("setColor: ", newColor);
    }

    const onLike = (e) => { 
      let user = localStorage.getItem("user");
      console.log(user + " liked " + props.vehicle._id); 
      let token = localStorage.getItem('token');
      let data = {
        "user_id" : user,
        "vehicle_id": props.vehicle._id
      }
      axios.post('http://localhost:3001/api/likeVehicle', data, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": 'application/json' 
        }
      })
      .then(response => {
        console.log(response.data);
        updateColor("primary");
        // navigate('/events');
      })
      .catch(err=> {
        console.log(err.response.data)
        console.error(err);
        setErrors(err.response.data.errors);
      });
    }
          
    return ( 
      <>  
        <div className='column3' data-vehicle-id={props.vehicle._id}> 
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Item>
                <Card style={{ width: '17rem' }}>
                
                <CardContent>
                  <h2>{props.vehicle.user?.fName}</h2>                 
                                      
                  <CardMedia
                    className='MuiCardMedia-img'
                    component="img"
                    height="194"
                    image={`https://ca2-n00192978.s3.eu-west-1.amazonaws.com/${props.vehicle.image_path}`}
                    alt="vehicle thumbnail">
                  </CardMedia>
                  
                  <Typography gutterBottom variant="h5" component="div">
                    {make}
                  </Typography>
                            
                  <Typography gutterBottom variant="h5" component="div">
                    <p><b>Make:</b>{props.vehicle.make}</p>
                    <p><b>Model:</b>{model}</p>    
                  </Typography>   
                </CardContent>

                <CardActions disableSpacing>
                  <IconButton onClick={onLike} aria-label="add to favorites">
                    <ThumbUpIcon color={liked.color} />
                  </IconButton>
                  
                </CardActions>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </div>
    </>
  )
};
export default VehicleCard;