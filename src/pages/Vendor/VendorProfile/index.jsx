import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useAuth } from "../../../context/AuthProvider";
import { getVendorData } from "../../../services/ProductServices";
import VendorProfileForm from "../../../components/vendor/VendorProfileForm";
import AuthRedirect from "../../../components/AuthRedirect";
const VendorProfile = () => {
    const [vendorData, setVendorData] = useState({
        first_name: '',
        last_name: '',
        image_url: '',
        name: '',
        description: '',
        phone: '',
        cuisine_type: '',
        address: '',
    });

    const sanitizeData = (data) => {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value === null ? ' ' : value])
        );
    };

    const { user } = useAuth();

    useEffect(() => {
        const fetchVendor = async () => {
            const response = await getVendorData(user.user_id);
            if (!response.isError) {
                setVendorData(sanitizeData(response.data));
            }
        };
        fetchVendor();
    }, [user.user_id]);

    return (
        <Container fluid className="col-xxl-10">
            <Row className="justify-content-center">
                <Col xl={4} className="mt-3">
                    <Card className='bg-light shadow'>
                        <Card.Img variant="top" height={225} src={vendorData.image_url} className='p-3' />
                        <Card.Body>
                            <Card.Title>{vendorData.name}</Card.Title>
                            <Card.Text>
                                {vendorData.description}
                            </Card.Text>
                            <Card.Text>
                                {vendorData.cuisine_type}
                            </Card.Text>
                            <Card.Text>
                                {vendorData.address}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={8} className="mt-3">
                    <VendorProfileForm
                        vendorData={vendorData} setVendorData={setVendorData}
                    >
                    </VendorProfileForm>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthRedirect(VendorProfile); 