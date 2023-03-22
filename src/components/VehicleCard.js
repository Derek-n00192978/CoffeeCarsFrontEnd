import { Link } from 'react-router-dom';
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
import { green } from '@mui/material/colors';

const VehicleCard = (props) => {
    let make = <>{props.vehicle.make}</>
    let model = <>{props.vehicle.model}</>
    let name = <>{props.vehicle.user.fName}</>
    let image = <>{props.vehicle.image_path}</>
   
    if(props.authenticated){
        make = <p><Link to={`/vehicles/${props.vehicle._id}`}>{props.vehicle.make}</Link></p>
        image =  <>{props.vehicle.image_path}</>
      }
          
    return ( 
      <div className='column3'>  
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Card style={{ width: '17rem' }}>
            
            <CardContent>
                <h2>{props.vehicle.user.fName}</h2>
                {/* <h2>{props.vehicle.user._id}</h2> */}
                
                <Avatar sx={{ bgcolor: green[100]}}
                aria-label={name}
                src={props.vehicle.user.fName}
                alt={name}
                />
                
                <CardMedia
                
                className='MuiCardMedia-img'
                component="img"
                height="194"
                image ={props.vehicle.image_path}
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
            <IconButton aria-label="add to favorites">
            <ThumbUpIcon />
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
export default VehicleCard;