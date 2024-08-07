import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from '../../context/CartProvider';
import { useContext } from 'react';
import { useCart } from '../../context/CartProvider';
import { useNavigate } from 'react-router-dom';



const CartButton = () => {
    const navigate = useNavigate();
    const { userCart } = useCart();
    const showCart = () => {
        navigate("/cart");
    }
    return (
        <Button variant="outline-dark" className='me-2 rounded-pill' onClick={() => showCart()}>
            <IoCartOutline /> <Badge bg="primary">{userCart.length}</Badge>
        </Button>
    )
}

export default CartButton;