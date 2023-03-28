import { useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {
    
    const [form, setForm] = useState({
        
        
        email: "",
        password: ""
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

        console.log("Email", form.email);
        console.log("Password", form.password);

        axios.post('http://localhost:3001/api/users/login', {
        
            email: form.email,
            password: form.password
        })
             .then((response) => {
                console.log(response.data);
                setErrorMessage("");
                props.onAuthenticated(true, response.data)
                
             })
             .catch((err) => {
                console.error(err);
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
             })
    };   
    
    return (
        <>
           
            <br />
           
            <form>
            <div className="form-group">
                <label htmlFor="Email">Email:</label>
                <input type="text" name="email" value={form.email} onChange={handleForm} />
                <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
                <label htmlFor="Password">Password:</label>
                <input type="text" name="password" value={form.password} onChange={handleForm} />
                <small id="passHelp" className="form-text text-muted"></small>
            </div>
          
          
            <button onClick={submitForm}>Submit</button>
            <p style={styles}>{errorMessage}</p>
           
            </form> 
        </>
    );
};

export default LoginForm;