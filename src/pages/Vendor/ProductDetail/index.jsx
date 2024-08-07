import { Container } from "react-bootstrap";
import chef from '../../../assets/react.svg'
import AuthRedirect from "../../../components/AuthRedirect";
import ProductForm from "../../../components/vendor/ProductForm";
import { useParams } from "react-router-dom";
import { getProduct } from "../../../services/ProductServices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";

const ProductDetail = () => {

    const productId = useParams().productId;
    
    const [productData, setProductData] = useState();


    useEffect(() => {
        let isMounted = true; // Track whether the component is mounted
        const fetchProduct = async () => {
            const response = await getProduct(productId);
            if (isMounted) {
                if (!response.isError) {
                    setProductData(response.data);
                    console.table("productData in product details", productData);
                } else {
                    toast.error(response.message);
                }
            }
        };
        fetchProduct();

        return () => {
            isMounted = false; // Cleanup function to mark the component as unmounted
        };
    }, []);

    if (!productData) {
        return <div> Loading...</div>; // Render a loading state while product data is being fetched
    }

    return (
        <>
            <Container fluid className="col-xxl-10">
                <div className="container col-xxl-8 px-4 py-5">
                    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div className="col-10 col-sm-8 col-lg-6">
                            <Card className="shadow mt-3">
                                <div className="position-relative bg-light overflow-hidden">
                                    <Card.Img variant="top" src={chef} />
                                    <div className="bg-success rounded-pill text-white position-absolute start-0 top-0 m-3 py-1 px-3">{productData.category.name}</div>
                                </div>
                                <Card.Body>
                                    <Card.Title className='text-start'>{productData.name}</Card.Title>
                                    <Card.Text>
                                        <div className="text-start">
                                            <span className="text-success me-1 text-center">{productData.description}</span>
                                            <span className="text-success me-1">${productData.price / 100}</span>
                                            <span className="text-danger text-decoration-line-through">${productData.price / 100 + 20} </span>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </div>
                        <div className="col-lg-6">
                            <ProductForm productData={productData} setProductData={setProductData} performCreate={false}></ProductForm>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
export default AuthRedirect(ProductDetail);