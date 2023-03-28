import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const  PageNotFound = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/')
        }, 3000);
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return(
        <>
            <h2>Page not found: {location.pathname}</h2>
            <p>Rediecting you home</p>
        </>
    );

    };
export default PageNotFound;