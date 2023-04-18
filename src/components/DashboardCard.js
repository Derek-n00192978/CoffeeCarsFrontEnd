import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Item from '@mui/material/ListItem'
import Grid from '@mui/material/Grid';

const DashboardCard = (props) => {
    let name = <>{props.user.fName}</>
    let email = <>{props.user.email}</>
    let bio = <>{props.user.bio}</>
    let county = <>{props.user.county}</>
    let type = <>{props.user.type}</>
    let typeExtra = <>{props.user.typeExtra}</>
    let image = <>{props.user.image_path}</>
   

    
    return ( 
      <>
      <div className='column3'>  
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Card style={{ width: '17rem' }}>
            
            <CardContent>
                <Typography gutterCentre variant="h5" component="div">
                    {name}
                </Typography>
                <Avatar alt="Remy Sharp" src={props.user.image_path} />
                
                <CardMedia
                component="img"
                height="194"
                image={image}
                
                />
                   
            </CardContent>
            
            </Card>
    
         </Item>
        </Grid>
      </Grid>
      </div>
      /////////////////////////////////
      <div className='column3'>  
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item>
            <Card style={{ width: '17rem' }}>
            
            <CardContent>
                <Typography gutterCentre variant="h5" component="div">
                    {name}
                </Typography>
                <Avatar alt="Remy Sharp" src={props.user.image_path} />
                
                <CardMedia
                component="img"
                height="194"
                image={image}
                
                />
                   
            </CardContent>
            
            </Card>
    
         </Item>
        </Grid>
      </Grid>
      </div>


      </>
    
    )
};
export default DashboardCard;