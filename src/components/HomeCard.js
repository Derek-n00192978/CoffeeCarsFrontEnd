import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
/////////////////////////////////////
// import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import Item from '@mui/material/ListItem'
import Grid from '@mui/material/Grid';
import { green } from '@mui/material/colors';

const HomeCard = (props) => {
  const { id } = useParams();
    const navigate = useNavigate();
    const [ user, setUser] = useState(null);
    let token = localStorage.getItem('token');
    let name = <>{props.user.fName}</>
    let image = <>{props.user.image_path}</>
    
    const deleteCallback = (id) => {
        navigate('/events');
    };
    
    
    if(props.authenticated){
        name = <>{props.user.fName}</> 
                
    }
////////////////////////////////////////////////////////
    useEffect(() => {
      axios.get(`http://localhost:3001/api/users/${id}`, {
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

  if(user) return "Loading...";
  //////////////////////////////////////////////////////    
    return (     
            // <div>
            //    <p> Hi {name} welcome to CoffeeCarsQRCodes.</p>
            // </div>
            ////////////////////////////////
            <div className='column1'>  
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Card style={{ width: '25rem' }}>
            
            <CardContent>
            <p>{user}</p>
            <p> Hi {name} welcome to CoffeeCarsQRCodes.</p>
                <h2>{props.user.id}</h2>
                <h2>{props.user.fName}</h2>
                <Avatar sx={{ bgcolor: green[100]}}
                aria-label="${name}"
                src={props.user.fName}
                alt={name}
                />
                
                <CardMedia
                className='MuiCardMedia-img'
                component="img"
                height="77"
                image={image}
               
                />
                     
            </CardContent>
            <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
            <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
            <ShareIcon />
            </IconButton>
            </CardActions>
            </Card>
         </Item>
        </Grid>
      </Grid>
      </div>
    )
};
export default HomeCard;