import RegisterForm from "../components/RegisterForm";
const Register = (props) => {
    
    
    return (
        <>
            <div className="row">
            <div className="column1">
            
            <h4>Register form below</h4>
            {(!props.authenticated) ? (
                <RegisterForm onAuthenticated={props.onAuthenticated}/>
            ): (
                <p>Hi are registered to use this web application -- Login and Enjoy.</p>
            )}
            </div>
            <div className="column2"></div>
            </div>
            
        </>
    )
};
export default Register;