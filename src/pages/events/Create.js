import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField  from "@mui/material/TextField";
import InputLabel  from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'; 
import Table from 'react-bootstrap/Table';
//`import FormHelperText from "@mui/material/FormHelperText";


const Create = () => {
    const [form, setForm] = useState ({});
    const [image, setImage] = useState (null); /// handleImage
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
               
        setForm(prevState =>({
            ...prevState,
            [name]: value
        }));
        
    };
        /// handleImage
    const handleImage = (e) => {
        
        // console.log(e.target.files);
        setImage(e.target.files[0]);
            
    };

    const isRequired = (fields) => {
        let error = false;

        fields.forEach(field => {
            if(!form[field]){
                error = true;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: {
                        message: `${field} is required!!!`
                    }
                }));
            }
        })
    };
    const submitform = () => {
/// handleImage
    let multipartData = new FormData();
    multipartData.append('make', form.make);
    multipartData.append('model', form.model);
    multipartData.append('year', form.year);
    multipartData.append('fuel', form.fuel);
    multipartData.append('description', form.description);
    multipartData.append('forSale', form.forSale);
    multipartData.append('image_path', image);
////    
        let token = localStorage.getItem('token');
        if(!isRequired(['date', 'title', 'description', 'lat_long', 'image_path']))
        axios.post('http://localhost:3001/api/events', form, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'multipart/form-data' /// handleImage
            }
        })
             .then(response => {
                console.log(response.data);
                navigate('/events');
             })
             .catch(err=> {
                console.log(err.response.data)
                console.error(err);
                setErrors(err.response.data.errors);
             });  
    }

    return (
        <>
            <h2>Create Event Page</h2>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Date' 
                name='date' 
                onChange={handleForm}
                error={errors.date}
                helpertext={errors.date?.message}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Title' 
                name='title' 
                onChange={handleForm}
                error={errors.title}
                helpertext={errors.title?.message}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Description' 
                name='description' 
                onChange={handleForm}
                error={errors.description}
                helpertext={errors.description?.message}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Lat/long' 
                name='lat_long' 
                onChange={handleForm}
                error={errors.lat_long}
                helpertext={errors.lat_long?.message}
                /> 
            </div>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>Image Selector for Image Upload</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <input type="file" name="image_path" onChange={handleImage} />
                    </tr>
                </tbody>
            </Table>
            <Button onClick={submitform}variant="contained">Submit</Button>
        </>
    );

};

export default Create;