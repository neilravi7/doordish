import { createContext, useContext, useState, useEffect } from "react";
import { deleteToken, getAccessToken, getUser } from "../../services/AuthServices";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const initialUserData = {
        first_name: "",
        last_name: "",
        email: "",
        is_vendor: false,
        is_customer: false,
        hasInfo: false
    };

     // set user login data
     const [user, setUser] = useState(() => {
        const fillUserDetails = async () => {
            const user = await getUser()
            if(!user){
                setUser(initialUserData);
            }else{
                setUser(user);
            }
        }
        fillUserDetails();
     });

    //  User location preference.
    const [currentLocation, setCurrentLocation] = useState(false);
    
    // Set user login state
    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const setUserLoggedIn = async () => {
            const token = await getAccessToken();
            setLoggedIn(token !== null);
            const user = await getUser();
            setUser(user);
        }
        setUserLoggedIn();
    },[]);
    
    // Helper function to change login state.
    const updateUserLogin = (loggedIn) => {
        setLoggedIn(loggedIn);
    };

    // Logout function
    const logOut = async () => {
        await deleteToken();
        setLoggedIn(false);
        setUser(initialUserData);
    };

    // console.log("AuthContext");
    // console.log("isLoggedIn: ", isLoggedIn)
    // console.log("user: ", user)

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                updateUserLogin,
                currentLocation,
                setCurrentLocation,
                user,
                setUser,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
