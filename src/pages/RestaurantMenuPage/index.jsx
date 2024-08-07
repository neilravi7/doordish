import { Container, Row } from "react-bootstrap";
import RestaurantMenuCard from "../../components/RestaurantMenuCard";
import { getAllProducts } from "../../services/ProductServices";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartProvider";
import {motion} from "framer-motion";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const RestaurantMenuPage = () => {
    
    const { userCart } = useContext(CartContext);
    const vendorId = useParams().vendorId;
    const [products, setProducts] = useState(() => []);

    useEffect(() => {
        const getMenuItems = async () => {
            const response = await getAllProducts(vendorId);
            if (!response.isError) {
                setProducts(response.data);
            }
            else {
                toast.error("Unable to get menu items.");
            }
        }
        getMenuItems();
    }, [])
    return (
        <Container fluid>
            <Row className="my-2 py-5 px-5 justify-content-center" >

                {
                    products.length == 0 ?
                        (
                            <>
                                <div className="d-flex justify-content-center">You have not added any product</div>
                            </>
                        )
                        :
                        (
                            products.map(
                                (item) => (<RestaurantMenuCard item={item} key={item.id}></RestaurantMenuCard>)
                            )
                        )
                }
                {userCart.length > 0 ? (
                    <Navbar sticky="bottom">
                        <Container>
                            <motion.div whileHover={{ scale: 1.1 }} className="col-md-3 m-auto mb-2 bg-success bg-gradient text-white rounded">
                                <div className="d-flex p-2">
                                    <div className="p-2 flex-fill lead fw-normal">{userCart.length} ITEM | ${}</div>
                                    {/* <div className="p-2 flex-fill">Flex item</div> */}
                                    <div className="p-2 flex-fill">
                                        <Link to={"/cart"} className='m-3 text-white text-decoration-none lead fw-normal'>SHOW CART</Link>
                                    </div>
                                </div>

                            </motion.div>
                        </Container>
                    </Navbar>
                ) : (null)}
            </Row>
        </Container>
    )
}

export default RestaurantMenuPage;