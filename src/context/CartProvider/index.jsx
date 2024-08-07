import { createContext, useContext, useState, useEffect } from "react";
import { getCustomerCart } from "../../services/ProductServices";
// import { useAuth } from "../AuthProvider";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    
    const [ userCart, setUserCart ] = useState(() => []);

    useEffect(() => {
        const fetchUserCart = async () => {
            const cart = await getCustomerCart();
            if(cart.isError){
                setUserCart(() => []);
            }else{
                setUserCart(cart.data);
            }
        }
        fetchUserCart();
    },[]);

    return (
        <CartContext.Provider 
            value={{
                userCart,
                setUserCart,
            }}
        >
            { children }
        </CartContext.Provider>
    )
}

const useCart = () => {
    return useContext(CartContext);
}

export { CartContext, useCart };

export default CartProvider;