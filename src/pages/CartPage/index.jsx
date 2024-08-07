import { Container, Row, Col, Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import { BsFillCartXFill } from 'react-icons/bs';
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import dishImage from "../../assets/images/dish4.jpg"
import { useState, useEffect } from "react";
import { getCustomerCart, createCheckoutSession, updateCart } from "../../services/ProductServices";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CartPage = () => {

    // Calculate cart value
    const calculateCartTotal = (cart) => {
        /**
         * Calculate cart value from userCart Context
        */
        let total = 0;
        for (const item of cart) {
            // Calculate the total for each item (price * quantity) and add it to the total
            total += item.price * item.quantity;
        }
        return total;
    };
    const calculateTotalCartValue = (cart) => {
        /**
         * Calculate Cart total value and taxes:
        */
        let cartValue = calculateCartTotal(cart);
        const TAX = cartValue * 15 / 100;
        cartValue = cartValue + TAX + 1000;
        return cartValue;
    }


    const [customerCart, setCustomerCart] = useState(() => []);
    const [cartDetails, setCartDetails] = useState(() => ({
        cartTotal: 0,
        shipping: 10,
        tax: 0,
        cartTotalValue: 0
    }));

    const [quantities, setQuantities] = useState(() => []);

    useEffect(() => {
        const fetchCustomerCart = async () => {
            const responseCart = await getCustomerCart();
            setCustomerCart(responseCart.data);
            setCartDetails(
                {
                    cartTotal: calculateCartTotal(responseCart.data) / 100,
                    shipping: 10,
                    tax: (calculateCartTotal(responseCart.data) * 15 / 100) / 100,
                    cartTotalValue: calculateTotalCartValue(responseCart.data) / 100
                }
            )
            setQuantities(() => responseCart.data.map((item) => item.quantity));

        }
        fetchCustomerCart();
        console.log("cart variables brake down", customerCart, quantities, cartDetails);
    }, []);


    const handleDecreaseQuantity = async (item, index) => {
        /**
         * Decrease the quantity of item and also update state variable and cart.
        */
        const newQuantities = [...quantities];
        if (quantities[index] > 1) {
            const itemData = {
                food_item: item.id,
                quantity: quantities[index] - 1,
            };
            // update user cart on server
            const response = await updateCart(itemData);
            if (!response.isError) {
                const updatedUserCart = await getCustomerCart()
                setCustomerCart(updatedUserCart.data);
                newQuantities[index] -= 1;
                setQuantities(newQuantities);
                setCartDetails(
                    {
                        cartTotal: calculateCartTotal(updatedUserCart.data) / 100,
                        shipping: 10,
                        tax: (calculateCartTotal(updatedUserCart.data) * 15 / 100) / 100,
                        cartTotalValue: calculateTotalCartValue(updatedUserCart.data) / 100
                    }
                )
            }
        } else {
            toast.info(`${item.name} removed from cart`);
        }
    }

    const handleIncreaseQuantity = async (item, index) => {
        /**
         * Increase the quantity of an item by one and also update state variable and cart
        */
        const newQuantities = [...quantities];
        if (quantities[index] !== 5) {
            const itemData = {
                food_item: item.id,
                quantity: quantities[index] + 1,
            };
            // update user cart on server
            const response = await updateCart(itemData);
            if (!response.isError) {
                newQuantities[index] += 1;
                const updatedUserCart = await getCustomerCart()
                setCustomerCart(updatedUserCart.data);
                setQuantities(newQuantities);
                setCartDetails(
                    {
                        cartTotal: calculateCartTotal(updatedUserCart.data) / 100,
                        shipping: 10,
                        tax: (calculateCartTotal(updatedUserCart.data) * 15 / 100) / 100,
                        cartTotalValue: calculateTotalCartValue(updatedUserCart.data) / 100
                    }
                )

            }
        } else {
            toast.info(`Can't order more then 5`);
        }
    }

    const [checkoutInProgress, setCheckOutInProgress] = useState(false);
    const performCheckout = async () => {
        /**
        * Start an checkout session.
        */
        setCheckOutInProgress(true);
        const response = await createCheckoutSession();
        if (!response.isError) {
            setCheckOutInProgress(false);
            window.location.href = response.data.checkout_url;
        } else {
            setCheckOutInProgress(false);
            toast.error("unable to fetched cart details");
        }
    }

    const handleRemoveItem = (itemId) => {
        toast.info("Removed item from cart functionality not implemented yet.");
        console.log(`${itemId} will be removed from the cart`);
    }

    return (
        <Container fluid className="py-5 text-center  rounded-3 bg-opacity-10 text-dark" >
            <Row className="g-2 justify-content-center">
                {customerCart.length !== 0 ? (<><Col md={5}>
                    <div className="mb-2 bg-dark rounded-pill px-4 py-3 text-uppercase fw-bold text-light">Cart Items</div>
                    {customerCart.map((item, index) => (
                        <div className="mt-3 d-flex bg-white mb-2 shadow rounded" key={item.id + '_' + index}>
                            <div className="p-2">
                                <Card.Img variant="left" src={dishImage} height={70} width={71} />
                            </div>
                            <div className="p-2 flex-fill my-4">
                                <Card.Body>
                                    <Card.Title>
                                        <strong className="text-muted fs-6">
                                            {item.name}
                                        </strong>
                                    </Card.Title>
                                    <Card.Text>
                                        <i className="text-muted fs-6">${item.price / 100}</i>
                                    </Card.Text>
                                </Card.Body>
                            </div>
                            <div className="p-2 flex-fill my-1">
                                <Card.Title><strong className="text-muted fs-6">Quantity</strong></Card.Title>
                                <div className="d-flex align-items-center justify-content-center mt-1">
                                    <Button variant="light" className="border" onClick={() => handleDecreaseQuantity(item, index)}>-</Button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <Button variant="light" className="border" onClick={() => handleIncreaseQuantity(item, index)}>+</Button>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    <Button variant="danger" size="sm" className="border mt-4 me-4" onClick={() => handleRemoveItem(item.id)}>
                                        <BsFillCartXFill></BsFillCartXFill>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                </Col>
                    <Col md={5} >
                        <div className="bg-dark rounded-pill px-4 py-3 text-uppercase fw-bold text-light">Order summary </div>
                        <div className="p-5 position-sticky bg-white rounded mt-2 shadow">
                            <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                            <ul className="list-unstyled mb-4">
                                <li className="d-flex justify-content-between py-3 border-dark border-bottom "><strong className="text-muted">Order Subtotal
                                </strong><strong>${cartDetails.cartTotal}</strong></li>
                                <li className="d-flex justify-content-between py-3 border-dark border-bottom"><strong className="text-muted">Shipping and
                                    handling</strong><strong>${cartDetails.shipping}</strong></li>
                                <li className="d-flex justify-content-between py-3 border-dark border-bottom"><strong
                                    className="text-muted"> GST And Taxes </strong><strong>${cartDetails.tax}</strong></li>
                                <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                    <h5 className="fw-bold">${cartDetails.cartTotalValue}</h5>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <Button variant="dark" className="form-control rounded-pill py-2 d-md-block" onClick={() => performCheckout()}>
                                    {checkoutInProgress ? (
                                        <span className="text-start">
                                            <Spinner animation="grow" role="status" size="sm" />
                                            Processing...
                                        </span>) : ('Proceed to checkout')}
                                </Button>
                            </div>
                        </div>
                    </Col></>) : (<><Col lg={12}>
                        <motion.div
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 30
                            }}
                        >
                            <h5>Your Cart is empty!</h5>
                        </motion.div>
                        <h3 className="display-5  lh-1 mb-3">Your cart is empty</h3>
                        <Link to={"/"}>
                            <motion.div whileTap={{ scale: 0.8 }} className="btn btn-lg btn-success">Find restaurant near you</motion.div>
                        </Link>
                    </Col></>)}


            </Row>

        </Container>
    )
}
export default CartPage;