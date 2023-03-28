import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';

import DeleteBtn from './DeleteBtn';
const EventDisplay = (props) => {
    let date = <p><b>date:</b> {props.event.date}</p>
    let title = <p></p>
    let description = <p></p>
    let lat_long = <p></p>
    let image = <>{props.event.image_path}</>
    

    if(props.authenticated){
        date = <p><b>Date:</b>{props.event.date}</p>
        title = <p><b>Title:</b>{props.event.title}</p>
        description = <p><b>Description:</b>{props.event.description}</p>
        lat_long =<p><b>Lat/Long:</b>{props.event.lat_long}</p>
        image =<>{props.image.image_path}</>
                
    }
    return (
            <div className='cols-2'>
            <Card style={{ width: '25rem' }}>
                <CardMedia
                className='MuiCardMedia-img'
                component="img"
                height="194"
                image={props.event.image_path}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    <p> <b>Title:</b>{props.event.title}</p>
                    <p> <b>Description:</b>{props.event.description}</p>
                    <p> <b>Date:</b>{props.event.date}</p>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    <p><b>Lat/Long:</b>{props.event.lat_long}</p>
                    </Typography>
                    
                    <Button 
                        component={Link} 
                        to={`/events/${props.event._id}/edit`}
                        startIcon={<EditIcon />}
                        variant='outlined'
                    >
                        Edit
                    </Button>
                <DeleteBtn 
                    id={props.event._id} 
                    resource='event' 
                    callback={props.callback}
                    variant="danger"
                    /> 
                    
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
            <br></br>
        </div>    
        
    )
};
export default EventDisplay;