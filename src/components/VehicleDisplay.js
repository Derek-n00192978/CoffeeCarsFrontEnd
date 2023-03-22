import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share'
import DeleteBtn from './DeleteBtn';

const VehicleDisplay = (props) => {
    let make = <p><b>Make:</b> {props.vehicle.make}</p>
    let model = <p></p>
    let year = <p></p>
    let fuel = <p></p>
    let forSale = <p></p>
    let name = <><b></b>{props.vehicle.user.fName}</>
    let image = <>{props.vehicle.image_path}</>

    if(props.authenticated){
        make = <p><b>Make:</b>{props.vehicle.make}</p>
        model = <p><b>Model:</b>{props.vehicle.model}</p>
        year = <p><b>Year:</b>{props.vehicle.year}</p>
        name = <><b></b>{props.vehicle.user.fName}</>
        image =<>{props.vehicle.image_path}</>
    }
    // if ( forSale = true){
    //     alert("Yes")
    // }else{
    //     alert("No")
    // }
    return (
            <>
                <Card style={{ width: '100%' }}>
                <CardMedia
                    className='MuiCardMedia-img'
                    component="img"
                    height="194"
                    image={props.vehicle.image_path}
                   
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {props.vehicle.make}-{props.vehicle.model}-{props.vehicle.year}
                        </Typography>
                        
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Avatar 
                        img="../assets/css/images/adrian-n-FkYPXuil5V8-unsplash.jpg" 
                        alt={name} 
                        src="../assets/css/images/image0.jpeg" />
                        
                        <Typography gutterBottom variant="h5" component="div">
                            {year}
                        </Typography>
                        
                        <Typography gutterBottom variant="h5" component="div">
                        <p><b>Make:</b>{props.vehicle.make}</p>
                            <p><b>Model:</b>{props.vehicle.model}</p>
                            <p><b>Fuel Type:</b>{props.vehicle.fuel}</p>
                            <p><b>Description:</b>{props.vehicle.description}</p>
                            <p><b>ForSale:</b>{props.vehicle.forSale}</p>
                        </Typography>
                        <Button 
                            component={Link} 
                            to={`/vehicles/${props.vehicle._id}/edit`}
                            startIcon={<EditIcon />}
                            variant='outlined'
                        >
                            Edit
                        </Button>
                        <DeleteBtn 
                            id={props.vehicle._id} 
                            resource='vehicle' 
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
                </>
            )
};
export default VehicleDisplay;