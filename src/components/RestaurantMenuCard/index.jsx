import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { motion } from "framer-motion";
import Image from 'react-bootstrap/Image';
import dish4 from '../../assets/images/dish4.jpg';
import { toast } from 'react-toastify';
import { addToCart } from '../../services/ProductServices';
import { CartContext } from '../../context/CartProvider';
import { getCustomerCart } from '../../services/ProductServices';
import { useContext } from 'react';

const RestaurantMenuCard = ({ item }) => {

    const { userCart, setUserCart } = useContext(CartContext);

    const addToUserCart = async (item) => {
        /**
         * Add an item into the user cart
         * Also check if item already added in to the cart
         * Update context variable of cart.
        */

        const itemData = {
            food_item: item.id,
            quantity: "1",
        };

        // Check if item already exists in the cart.
        const itemExists = userCart.find(cartItem => cartItem.id === item.id);

        if (!itemExists) {
            // Adding an item in to the cart.
            const response = await addToCart(itemData);

            if (!response.isError) {
                toast.success(response.message);
                const cartList = await getCustomerCart();
                if (!cartList.isError) {
                    setUserCart(cartList.data);
                    console.log(userCart.length);
                }
            } else {
                toast.error(response.message);
            }

        } else {
            // Show info to User
            toast.info("Item already added in to cart");

        }


    }
    return (
        <Col md={4} >
            <motion.div whileHover={{ scale: 1.1 }}>
                <Card className="rounded mb-4 bg-dark bg-gradient">
                    <div className="d-flex">
                        <div className="position-relative overflow-hidden bg-dark bg-gradient p-2">

                            <Image className="border border-primary border-5" variant="top" height={150} width={150} src={dish4} roundedCircle />

                            {/* <div className="bg-warning rounded text-white position-absolute start-0 top-0 m-3 py-1 px-3">{item.category.name}</div> */}
                        </div>

                        <Card.Body className='mt-2'>
                            <Card.Title><span className="text-light">{item.name}</span> </Card.Title>
                            <Card.Text>
                                <div>
                                    <span className="text-light me-1">${item.price / 100}</span>
                                    {/* <span className="text-danger text-decoration-line-through">${item.price / 100 + 20} </span> */}
                                </div>
                            </Card.Text>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <Button
                                        variant="primary"
                                        className='fw-medium w-25 rounded-pill'
                                        onClick={() => addToUserCart(item)}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </Card>
            </motion.div>
        </Col>
    );
}

export default RestaurantMenuCard;