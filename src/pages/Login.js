
import LoginForm from "../components/LoginForm";
const Login = (props) => {
    
    let user = <>{props.user.fName}</>
    
    if(props.authenticated){
        
        user = <p>{props.user.fName}</p>        
    }
 
    return (
        <>
            <h1>This is the login page</h1>
            {(props.authenticated) ? (
                <LoginForm onAuthenticated={props.onAuthenticated}/>
            ): (
                <p>You {user} are Logged in</p>
            )}
        </>
    )
};
export default Login;