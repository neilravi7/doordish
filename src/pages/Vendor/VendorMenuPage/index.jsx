import { Container } from "react-bootstrap";
import ProductCard from "../../../components/vendor/ProductCard";
import ProductModel from "../../../components/vendor/ProductModel";
import AuthRedirect from "../../../components/AuthRedirect";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/ProductServices";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
const VendorMenu = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchAllFoodItems = async () => {
            const response = await getAllProducts(user.user_id);
            if (!response.isError) {
                setProducts(response.data);
            } else {
                toast.error("unable to fetch products");
            }
        };
        fetchAllFoodItems();
    }, []);
    return (
        <>
            <Container className="col-xxl-10 col-xxl-8 px-4 py-4"> {/* container-bg-light */}
                <div className="d-flex">
                    <div className="mt-2 flex-grow-1"><h4 className="text-start"> Product List</h4></div>
                    <ProductModel></ProductModel>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4 py-2 ms-body">
                    {products.length == 0 ?
                        (<><div className="d-flex justify-content-center">You have not added any product</div></>) :
                        (products.map((item) => (<ProductCard item={item} key={item.id}></ProductCard>)))}
                </div>
            </Container>
        </>
    )
}
export default AuthRedirect(VendorMenu);