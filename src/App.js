import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import './assets/css/app.css';

/* importing from the pages folder */
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Vehicles Pages
import VehiclesIndex from './pages/vehicles/Index'; 
import VehiclesShow from './pages/vehicles/Show';
import VehiclesCreate from './pages/vehicles/Create';
import VehiclesEdit from './pages/vehicles/Edit';

//Events Pages
import EventsIndex from './pages/events/Index'; 
import EventsShow from './pages/events/Show';
import EventsCreate from './pages/events/Create';
import EventsEdit from './pages/events/Edit';

//Dashboard Pages
import DashboardEdit from './pages/dashboards.js/Edit';
import DashboardShow from './pages/dashboards.js/Show';

//Page Not Found
import PageNotFound from './pages/PageNotFound';

//import components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
      if (localStorage.getItem('token')){
          setAuthenticated(true);
      }
  }, []);
  let protectedRoutes; 

  const onAuthenticated = (auth, data) => {
      setAuthenticated(auth);
      if (auth){
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.id);
          localStorage.setItem('fName', data.fName);
      }
      else{
          localStorage.removeItem('token');
          
      }
  };
  if(authenticated){
    //Protected Route
    protectedRoutes = (
      <>
        <Route path='/' element={<Home/>} />
        <Route path='/vehicles/:id' element={<VehiclesShow/>} /> 
        <Route path='/vehicles/create' element={<VehiclesCreate/>} />
        <Route path='/vehicles/:id/edit' element={<VehiclesEdit/>}/>
        <Route path='/events/:id' element={<EventsShow/>} /> 
        <Route path='/events/create' element={<EventsCreate/>} />
        <Route path='/events/:id/edit' element={<EventsEdit/>}/>
        <Route path='/dashboard/:id' element={<DashboardShow/>}/>
        <Route path='/dashboard/:id/edit' element={<DashboardEdit/>}/>
       
      </>
    )
  }
  return (
    <Router>
      <Container className='container' maxWidth="md">
          <NavBar className='nav' onAuthenticated={onAuthenticated} authenticated={authenticated}/>
            <Routes>
                <Route path="/" element={<Home onAuthenticated={onAuthenticated} authenticated={authenticated} />} /> 
                
                <Route path="/vehicles" element={<VehiclesIndex authenticated={authenticated} />} />

                <Route path="/events" element={<EventsIndex authenticated={authenticated} />} />
                
                
                
                <Route path='/login' element={<Login onAuthenticated={onAuthenticated} authenticated={authenticated}/>} />
                <Route path='/register' element={<Register onAuthenticated={onAuthenticated} authenticated={authenticated}/>} /> 
                
                <Route path='/dashboard' element={<DashboardShow onAuthenticated={onAuthenticated} authenticated={authenticated}/>} />
                                            
                {protectedRoutes}
                {/*Different route */}
                <Route path='*' element={<PageNotFound/>} />
            </Routes>
           <VehiclesIndex authenticated={authenticated}/>
           <hr />
           <EventsIndex authenticated={authenticated}/> 
           
          <Footer className='footer' />
      </Container>  
    </Router> 
  )
}
/* exporting the App */
export default App;
