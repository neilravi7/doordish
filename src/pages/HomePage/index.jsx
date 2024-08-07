import { Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import hero from '../../assets/images/dish4.jpg'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import OfferSlider from "../../components/OfferSlider";
import CategorySlider from "../../components/CategorySlider";
import VendorCard from "../../components/vendor/VendorCard";
import { getAllVendors } from "../../services/ProductServices";

const HomePage = () => {
    const { isLoggedIn, currentLocation, user } = useContext(AuthContext);

    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchVendors = async () => {
            const response = await getAllVendors();
            if(!response.isError){
                setVendors(response.data);
            }
        }
        if(isLoggedIn){
            fetchVendors();
        }
        // console.log("vendors: ", vendors.length);
    }, []);
    
    return (
        <>
            <Container fluid>
                <div className="container col-xxl-8 px-4 py-5">
                    {!isLoggedIn ?
                        (<>
                            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                                <div className="col-10 col-sm-8 col-lg-6">
                                    {/* <img
                                src="bootstrap-themes.png"
                                className="d-block mx-lg-auto img-fluid"
                                alt="Bootstrap Themes"
                                width={700}
                                height={500}
                                loading="lazy"
                            /> */}
                                    <Image src={hero} width={300} height={250}></Image>
                                </div>
                                <div className="col-lg-6">
                                    <h1 className="display-5 fw-bold lh-1 mb-3">
                                        Responsive left-aligned hero with image
                                    </h1>
                                    {/* <p className="lead">
                                Quickly design and customize responsive mobile-first sites with
                                Bootstrap, the world’s most popular front-end open source toolkit,
                                featuring Sass variables and mixins, responsive grid system, extensive
                                prebuilt components, and powerful JavaScript plugins.
                            </p> */}
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                        {/* <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">
                                    Primary
                                </button>
                                <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                                    Default
                                </button> */}

                                    </div>
                                </div>
                            </div>
                        </>)
                        :
                        (<>
                            {/* Categories slider */}
                            <Row className="my-2 rounded bg-dark bg-opacity-10" >
                                <Col lg={12}><CategorySlider></CategorySlider></Col>                                
                            </Row>

                            {/* Offer card's slider */}
                            <Row className="my-2 py-5 px-3 rounded">
                                <Col lg={12}><OfferSlider></OfferSlider></Col>                                
                            </Row>

                            {/* Marketplace restaurant's */}
                            <Row className="my-3 rounded-3">
                                    {/* <h3 className="text-start">Top restaurant chains in Ahmadabad </h3> */}
                                    {
                                        vendors.length !== 0 ? (
                                            vendors.map((item, index) => (
                                                <Col lg={4} md={6} className="mb-4" key={item.id+"_"+index}>
                                                    <VendorCard item={item} key={item.id} />
                                                </Col>
                                            ))
                                        ) : (
                                            <div className="col-md-6 m-auto">
                                                <div className="form-group m-3 p-3">
                                                    <h3>No outlet found in this area.</h3>
                                                </div>
                                                <p className="col-md-8 fs-5 m-auto text-start">No vendors found on this location.</p>
                                            </div>
                                        )
                                    }
                                </Row>
                        </>)}

                </div>
            </Container>
        </>
    )
}
export default HomePage;