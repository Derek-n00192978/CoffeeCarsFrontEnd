import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';

const DashboardDisplay = (props) => {
    let fName = localStorage.getItem('fName');
    let id = localStorage.getItem('_id');
    let email = <p></p>
    let bio = <p></p>
    let county = <p></p>
    let type = <p></p>
    let typeExtra = <p></p>
    let vehicles = <p></p>
    let image = <p></p>

    if(props.authenticated){
        
        email = <p><b>Email:</b>{props.user.email}</p>
        bio = <p><b>Bio:</b>{props.user.bio}</p>
        county =<p><b>County:</b>{props.user.county}</p>
        type = <p><b>Type of Interest:</b>{props.user.type}</p>
        typeExtra = <p><b>Other Interests:</b>{props.user.typeExtra}</p>
        vehicles = <>{props.user.vehicles_id}</>
        image =<>{props.user.image_path}</>
        
    }
    return (
            <>
                <Card style={{ width: '23rem' }}>
                <CardMedia
                    md={{ height: 75 }}
                    image={props.user.image_path}
                    title="vehicle display card"
                />
                <CardContent>
                    
                    <Typography gutterBottom variant="h5" component="div">
                    <b>Name:</b>{fName}
                    
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {email}
                        </Typography>
                        
                        
                        <Typography gutterBottom variant="h5" component="div">
                            {bio}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {county}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {type}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {typeExtra}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {vehicles}
                        </Typography>
                        
                        
                        <Button 
                            component={Link} 
                            to={`/dashboard/{id}/edit`}
                            startIcon={<EditIcon />}
                            variant='outlined'
                            >
                                Edit
                        </Button>
                                     
                        
                        </CardContent>
                        
                    </Card>
                    
                </>
            )
};
export default DashboardDisplay;