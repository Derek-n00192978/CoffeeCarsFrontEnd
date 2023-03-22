import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fName: "",
        password: "",
        
        email: ""
        
    });
    const [errorMessage, setErrorMessage] = useState("");
    

    const styles = { color: "red", backgroundColor:"lightblue"}
        
    const handleForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        

        setForm(prevState =>({
            ...prevState,
            [name]: value
        }));
        
    };
    const submitForm = (e) => {

        e.preventDefault();
        console.log("fName", form.fName);
        console.log("password", form.password);
        
        console.log("email", form.email);


        if(form.fName && form.email && form.password){
            axios.post('http://localhost:3001/api/users/register', {

            fName: form.fName,
            lName: form.lName,
            password: form.password,
            
            email: form.email
            
        })
             .then((response) => {
                console.log(response.data);
                navigate('/');
                setErrorMessage("");
                
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
             })
        }



        
    };
   
    
    
    return (
        <>
        
        
            <br />
        <form>
            <div className="form-group">
                <label htmlFor="fName">Name:</label>
                <input type="text" name="fName" value={form.fName} onChange={handleForm} />
                <small id="firstHelp" className="form-text text-muted"></small>
            </div>
           
            <div className="form-group">
                <label htmlFor="Password">Password:</label>
                <input type="text" name="password" value={form.password} onChange={handleForm} />
                <small id="passHelp" className="form-text text-muted"></small>
            </div>
           
            <div className="form-group">
                <label htmlFor="Email">Email:</label>
                <input type="text" name="email" value={form.email} onChange={handleForm} />
                <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <button onClick={submitForm}>Submit</button>
            <p style={styles}>{errorMessage}</p>
           
            </form>    
        </>
    );
};

export default RegisterForm;