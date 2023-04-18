import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
/////////////////////////////////////
// import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Item from '@mui/material/ListItem'
import Grid from '@mui/material/Grid';


const HomeCard = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ user, setUser] = useState(null);
  let token = localStorage.getItem('token');
  let fName = localStorage.getItem('fName');
  let image = <>{props.user.image_path}</>
    
  const deleteCallback = (id) => {
    navigate('/events');
  };
    
    
   
////////////////////////////////////////////////////////
  //   useEffect(() => {
  //     axios.get(`http://localhost:3001/api/users/${id}`, {
  //             headers: {
  //                 "Authorization": `Bearer ${token}`
  //             }
  //         })
  //          .then((response) => {
  //             console.log("::::::::USER INFO:::::")
  //              console.log(response.data);
  //              console.log(":::::::::::::::::::")

  //              setUser(response.data);
  //          })
  //          .catch((err) => {
  //              console.error(err);
  //              console.log(err.response.data.message);                 
  //          });
  //     console.log("mounted");     
  // }, [token, id]);

  if(user) return "Loading...";
  
  //////////////////////////////////////////////////////    
    return (     
    <>       
      <div className='column1'>  
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              <Card style={{ width: '25rem' }}>
                <CardContent>
                  <p>{user}</p>
                  <p> Hi {fName} welcome to CoffeeCarsQRCodes.</p>
                  <h2>{props.user.id}</h2>
                  <h2>{props.user.fName}</h2>
                  <Avatar 
                    src={props.user.fName}  
                  />  
                <CardMedia
                  className='MuiCardMedia-img'
                  component="img"
                  height="77"
                  image={image}
                />       
                </CardContent>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </div>
      
      <div className='column1'>  
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              <Card style={{ width: '25rem' }}>
                <CardContent>
                  <p>{user}</p>
                  <p> Here are some of the vehicles {fName} liked.</p>               

                </CardContent>           
              </Card>
            </Item>
          </Grid>
        </Grid>
      </div>
      
      <div className='column1'>  
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              <Card style={{ width: '25rem' }}>
                <CardContent>
                  <p>{user}</p>
                  <p> Here are some of the Events {fName} liked.</p>               

                </CardContent>           
              </Card>
            </Item>
          </Grid>
        </Grid>
      </div>
    </>  
    )
};
export default HomeCard;