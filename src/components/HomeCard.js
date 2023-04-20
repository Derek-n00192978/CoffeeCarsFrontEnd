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

 // console.log("TEST TEST----------");
 // let favID = props.user._id
 // console.log(favID)

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
      <div className='column50'>  
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              <Card style={{ width: '25rem' }}>
                <CardContent>
                  <p> Hi {fName} welcome to CoffeeCarsQRCodes.</p>       
                </CardContent>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </div>
      <br></br>
      <div className='column1'>  
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Item>
              <Card style={{ width: '25rem' }}>
                <CardContent>
                  <p>Vehicles {fName} liked.</p>               
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
                  <p>Events {fName} liked.</p>               
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