import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthRedirect = (WrappedComponent) => {
    const WithAuthRedirect = (props) =>{
        const { isLoggedIn } = useAuth();
        const navigate = useNavigate();
        useEffect(()=>{
            if(!isLoggedIn){
                navigate("/sign-in");
            }
        },[isLoggedIn, navigate]);
        return <WrappedComponent {...props} />   
    }
    return WithAuthRedirect;
}
export default AuthRedirect;