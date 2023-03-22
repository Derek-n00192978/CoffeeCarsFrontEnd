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
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState (null); /// handleImage
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
        if(!isRequired(['make', 'model', 'year', 'fuel', 'description', 'forSale', 'type_id', 'image_path']))
        axios.post('http://localhost:3001/api/vehicles', form, {
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

    return (
        <>
            <h2>Create Vehicle Page</h2>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Make' 
                name='make' 
                onChange={handleForm}
                error={errors.make}
                helperText={errors.make?.message}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Model' 
                name='model' 
                onChange={handleForm}
                error={errors.model}
                helpertext={errors.model?.message}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Year' 
                name='year' 
                onChange={handleForm}
                error={errors.series}
                helpertext={errors.series?.message}
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
                    helpertext={errors.fuel?.message}
                    >
                    <MenuItem value='Petrol'>Petrol</MenuItem>
                    <MenuItem value='Diesel'>Diesel</MenuItem>
                    <MenuItem value='Mild-Hybrid'>Mild-Hybrid</MenuItem>
                    <MenuItem value='Hybrid'>Hybrid</MenuItem>
                    <MenuItem value='Fully Plud-in Electric'>Full electric</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Descriprion' 
                name='description' 
                onChange={handleForm}
                error={errors.description}
                helpertext={errors.description?.message}
                /> 
            </div>
            <div className="form-group">
                <FormControl variant="filled" fullWidth>
                <InputLabel id="forSale">Forsale</InputLabel>
                <Select 
                    labelId='forSale' 
                    name="forSale" 
                    label="forSale" 
                    onChange={handleForm}
                    error={errors.forSale}
                    helpertext={errors.forSale?.message}
                    >
                    <MenuItem value='true'>True</MenuItem>
                    <MenuItem value='false'>False</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="form-group">
                <FormControl variant="filled" fullWidth>
                <InputLabel id="type_id">Type</InputLabel>
                <Select 
                    labelId='type_id' 
                    name="type" 
                    label="type" 
                    onChange={handleForm}
                    error={errors.fuel}
                    value={form.fuel}
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
                        <input type="file" name="image_path" onChange={handleImage}/>
                    </tr>
                </tbody>
            </Table>
            
            <Button onClick={submitform}variant="contained">Submit</Button>
        </>
    );

};

export default Create;