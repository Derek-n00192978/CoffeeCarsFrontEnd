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
/////////////////////////////////////////////////////////
// import DashboardDisplay from "../../components/DashboardDisplay";


const Edit = () => {
    const [ user, setUser] = useState(null);
    const [form, setForm] = useState ({});
    const [image, setImage] = useState (null); /// handleImage

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    
    let token = localStorage.getItem('token');

    useEffect(() => {
    axios.get(`http://localhost:3001/api/users/63f4f0f3722d9aa06b789bab`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
    })
             .then((response) =>{
                console.log(response.data);
                setUser(response.data);
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
        multipartData.append('name', form.fName);
        multipartData.append('email', form.email);
        multipartData.append('bio', form.bio);
        multipartData.append('county', form.county);
        multipartData.append('type', form.type);
        multipartData.append('TypeExtra', form.typeExtra);
        multipartData.append('image_path', image);
////

        
        if(!isRequired(['name', 'email', 'bio', 'county', 'type', 'typeExtra', 'image_path']))
        axios.put(`http://localhost:3001/api/users/${id}/edit`, multipartData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'multipart/form-data' /// handleImage
            }
        })
             .then(response => {
                console.log(response.data);
                navigate('/');
             })
             .catch(err=> {
                console.log(err.response.data)
                console.error(err);
                setErrors(err.response.data.errors);
             });  
    }
    if(!user) return "loading...";
    return (
        <>
            <h2>Edit Page</h2>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='Name' 
                name='name' 
                onChange={handleForm}
                error={errors.fName}
                value={form.fName}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='email' 
                name='email' 
                onChange={handleForm}
                error={errors.email}
                value={form.email}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='bio' 
                name='bio' 
                onChange={handleForm}
                error={errors.bio}
                value={form.bio}
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
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='typeExtra' 
                name='typeExtra' 
                onChange={handleForm}
                error={errors.typeExtra}
                value={form.typeExtra}
                /> 
            </div>
            <div className='form-group'>
            <TextField 
                variant='filled' 
                label='County' 
                name='county' 
                onChange={handleForm}
                error={errors.county}
                value={form.county}
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

export default Edit;