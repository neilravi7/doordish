import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const useAuthVendor = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!user.is_vendor){
            navigate("/home");
        }
    });
} 
export default useAuthVendor;