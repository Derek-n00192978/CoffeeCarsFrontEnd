import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';

const EventCard = (props) => {
    let date = <p><b>Date:</b> {props.event.date}</p>
    let title = <p><b>Title:</b>{props.event.title}</p>
    let description = <p><b>Description:</b>{props.event.description}</p>
    let image = <>{props.event.image_path}</>

    if(props.authenticated){
        title = <p><b>Title:</b><Link to={`/events/${props.event._id}`}>{props.event.title}</Link></p>
        image =  <>{props.event.image_path}</>
        }
    return (
        <div className='column1'>
            <Card style={{ width: '100%' }}>
                <CardMedia
                    image={props.event.image_path}
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
export default EventCard;