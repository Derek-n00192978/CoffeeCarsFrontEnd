import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TextField  from "@mui/material/TextField";
import InputLabel  from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table'; 


const Edit = () => {
    const [ vehicle, setVehicle] = useState(null);
    const [form, setForm] = useState ({});
    const [image, setImage] = useState (null); /// handleImage

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    
    let token = localStorage.getItem('token');

    useEffect(() => {
    axios.get(`http://localhost:3001/api/vehicles/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
    })
             .then((response) =>{
                console.log(response.data);
                setVehicle(response.data);
                setForm(response.data);
               
             })
             .catch((err) => {
                console.log(err.response.data.message);
             })        
        console.log("mounted");
    }, [token, id]);

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

        
        if(!isRequired(['make', 'model', 'year', 'fuel', 'description', 'forSale', 'type_id', 'image_path']))
        axios.put(`http://localhost:3001/api/vehicles/${id}/edit`, multipartData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'multipart/form-data' /// handleImage
            }
        })
             .then(response => {
                console.log(response.data);
                navigate('/vehicles');
             })
             .catch(err=> {
                console.log(err.response.data)
                console.error(err);
                setErrors(err.response.data.errors);
             });  
    }
    if(!vehicle) return "loading...";
    return (
        <>
            <h2>Edit Page</h2>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Make' 
                name='make' 
                onChange={handleForm}
                error={errors.make}
                value={form.make}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Model' 
                name='model' 
                onChange={handleForm}
                error={errors.model}
                value={form.model}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Year' 
                name='year' 
                onChange={handleForm}
                error={errors.year}
                value={form.year}
                /> 
            </div>
            <div className="form-group">
                <FormControl variant="filled" fullWidth>
                <InputLabel id="fuel-select">Fuel</InputLabel>
                <Select 
                    labelId='fuel-select' 
                    name="fuel" 
                    label="fuel" 
                    onChange={handleForm}
                    error={errors.fuel}
                    value={form.fuel}
                    >
                    <MenuItem value='Petrol'>Petrol</MenuItem>
                    <MenuItem value='Disel'>Disel</MenuItem>
                    <MenuItem value='Mild-Hybrid'>Mild-Hybrid</MenuItem>
                    <MenuItem value='Hybrid'>Hybrid</MenuItem>
                    <MenuItem value='Full Electric'>Full electric</MenuItem>
                </Select>
                </FormControl>
            </div>

            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='ForSale' 
                name='forSale' 
                onChange={handleForm}
                error={errors.forSale}
                value={form.forSale}
                /> 
            </div>
            
           
            <div className="form-group">
                <FormControl variant="filled" fullWidth>
                <InputLabel id="type_id">Type</InputLabel>
                <Select 
                    labelId='type_id' 
                    name="type" 
                    label="type" 
                    onChange={handleForm}
                    error={errors.type}
                    value={form.type}
                    >
                    <MenuItem value='1'>Car</MenuItem>
                    <MenuItem value='2'>MotorCycle</MenuItem>
                    <MenuItem value='3'>Tractor</MenuItem>
                    <MenuItem value='4'>Train</MenuItem>
                    <MenuItem value='5'>Truck</MenuItem>
                    <MenuItem value='6'>Other</MenuItem>
                </Select>
                </FormControl>
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

export default Edit;
