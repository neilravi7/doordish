import { Container, Row, Col } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState, useEffect } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';
import Image from "react-bootstrap/Image";
import { fetchCustomer, fetchCustomerOrders, updateCustomerProfile } from "../../services/ProductServices";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";


const CustomerProfilePage = () => {

    const {user} = useAuth();

    const [customerData, setCustomerData] = useState(
        {
            first_name: '',
            last_name: '',
            image_url: '',
            phone: '',
            address: '',
        }
    );

    const getCustomerData = async () => {
        /**
         * Need customer ID here which is not got in user context
         */
        const response = await fetchCustomer(user.user_id);

        setCustomerData({
            first_name: response.data.first_name || ' ',
            last_name: response.data.last_name || ' ',
            image_url: response.data.image_url || ' ',
            phone: response.data.phone || ' ',
            address: response.data.address || ' ',
        })
    }

    const [orders, setOrders] = useState([]);

    const getCustomerOrders = async () => {
        const response = await fetchCustomerOrders();
        setOrders(response.data.orders);
    }

    useEffect(() => {
        getCustomerData();
        getCustomerOrders();
    }, []);


    // Form configurations
    const { Formik } = formik;
    const validationSchema = yup.object().shape({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        image_url: yup.string().required('Image URL is required'),
        phone: yup.string().required('Phone number is required'),
        address: yup.string().required('Cuisine type is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const response = await updateCustomerProfile(user.user_id, values);
        if (!response.isError) {
            toast.success("User Profile updated");
        } else {
            toast.error("unable to update user");
        }
        const updatedInfo = await fetchCustomer(user.user_id);
        setCustomerData(updatedInfo.data);
        setSubmitting(false);
    };

    return (
        <div className="p-3">
            <Container fluid className="py-5 text-center">
                <Row className="justify-content-center">
                    <Col md={3}>
                        <div className="bg-primary text-light rounded-pill px-4 py-3 text-uppercase fw-bold border mb-3">Profile</div>
                        <Card className="border-0 p-2">
                            <Image variant="top" src={customerData.image_url} rounded />
                            <Card.Body>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Name:</strong>
                                        <strong className="display-3 fs-6 lh-1 mt-2">{customerData.first_name} {customerData.last_name}</strong></li>
                                    <li className="d-flex justify-content-between py-3 border-bottom">
                                        <strong className="text-muted">Address:</strong>
                                        <strong className="display-3 fs-6 lh-1 mt-2">{customerData.address}</strong>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Tabs
                            variant="pills"
                            defaultActiveKey="orders"
                            id="fill-tab-example"
                            className="bg-white rounded px-4 py-3 fw-bold border mb-3"
                            fill
                        >
                            <Tab eventKey="profile" title="Update Profile">
                                <>
                                    <Formik
                                        validationSchema={validationSchema}
                                        onSubmit={handleSubmit}
                                        enableReinitialize={true}
                                        initialValues={customerData}
                                    >
                                        {
                                            (
                                                { handleSubmit, handleChange, values, touched, errors, isSubmitting }
                                            ) => (
                                                <Form noValidate onSubmit={handleSubmit} className="p-3 rounded-3 bg-white border shadow bg-opacity-75">
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <FloatingLabel controlId="floatingInputfirst" label="Owner first name" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="first_name"
                                                                    placeholder="Owner first name"
                                                                    required
                                                                    value={values.first_name}
                                                                    onChange={handleChange}
                                                                    isValid={touched.first_name && !errors.first_name}
                                                                    isInvalid={!!errors.first_name}
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FloatingLabel controlId="floatingInputlast" label="Owner last name" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="last_name"
                                                                    placeholder="Owner last name"
                                                                    required
                                                                    value={values.last_name}
                                                                    onChange={handleChange}
                                                                    isValid={touched.last_name && !errors.last_name}
                                                                    isInvalid={!!errors.last_name}
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <FloatingLabel controlId="floatingInputPhone" label="Phone" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="phone"
                                                                    placeholder="Phone"
                                                                    required
                                                                    value={values.phone}
                                                                    onChange={handleChange}
                                                                    isValid={touched.phone && !errors.phone}
                                                                    isInvalid={!!errors.phone}
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FloatingLabel controlId="floatingInputImage" label="Restaurant image url" className="mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name="image_url"
                                                                    placeholder="Restaurant image url"
                                                                    required
                                                                    value={values.image_url}
                                                                    onChange={handleChange}
                                                                    isValid={touched.image_url && !errors.image_url}
                                                                    isInvalid={!!errors.image_url}
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Col md={12}>
                                                            <FloatingLabel controlId="floatingInputAddress" label="Address" className="mb-3">
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="address"
                                                                    style={{ height: '100px' }}
                                                                    placeholder="Customer address"
                                                                    required
                                                                    value={values.address}
                                                                    onChange={handleChange}
                                                                    isValid={touched.address && !errors.address}
                                                                    isInvalid={!!errors.address}
                                                                />
                                                            </FloatingLabel>
                                                        </Col>
                                                    </Row>

                                                    <div className="d-flex mt-3 justify-content-center">
                                                        <Button variant="dark" size="lg" className="w-50 rounded-pill" type="submit" disabled={isSubmitting}>
                                                            {isSubmitting ? 'Updating...' : 'Update'}
                                                        </Button>
                                                    </div>

                                                    {/* <hr className="my-4" />
                                                    {submissionStatus.submitted && (

                                                        <div className={`mt-3 alert ${submissionStatus.success ? 'alert-success' : 'alert-danger'}`}>
                                                            {submissionStatus.success
                                                                ? 'Your Information Updated!!'
                                                                : submissionStatus.error || 'Profile updating failed. Please try again.'}
                                                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    )} */}
                                                </Form>
                                            )
                                        }
                                    </Formik>
                                </>
                            </Tab>
                            <Tab eventKey="orders" title="My Orders">
                                <Accordion defaultActiveKey={0} flush className="shadow rounded border">
                                    {orders.length !== 0 ? (
                                        orders.map((order, index) => (
                                            <>
                                                <Accordion.Item eventKey={index} key={order.display_id}>
                                                    <Accordion.Header>#{order.display_id} {order.status !== "canceled" ? (<Badge bg="success" className="ms-5">{order.status}</Badge>) : (<Badge bg="danger" className="ms-5">{order.status}</Badge>)}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Row>
                                                            <Col md={6}>
                                                                <div className="p-4">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className="border-0 bg-light">
                                                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                                                </th>
                                                                                <th scope="col" className="border-0 bg-light">
                                                                                    <div className="py-2 text-uppercase">Price</div>
                                                                                </th>
                                                                                <th scope="col" className="border-0 bg-light">
                                                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {order.line_items.map((foodItem, index) => (
                                                                                <tr key={foodItem.id}>
                                                                                    <th scope="row" className="border-0">
                                                                                        <div className="p-2">
                                                                                            <img src={foodItem.image_url} alt=""
                                                                                                width="50" className="img-fluid rounded shadow-sm" />
                                                                                            <div className="ms-3 d-inline-block align-middle">
                                                                                                <h5 className="mb-0"> <a href="/" className="text-dark d-inline-block align-middle">{foodItem.name}</a></h5>
                                                                                            </div>
                                                                                        </div>
                                                                                    </th>
                                                                                    <td className="border-0 align-middle"><strong>{foodItem.price}</strong></td>
                                                                                    <td className="border-0 align-middle"><strong>{foodItem.quantity}</strong></td>
                                                                                    <td className="border-0 align-middle"><a href="/" className="text-dark"><i className="bi bi-trash"></i></a></td>
                                                                                </tr>
                                                                            ))}

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </Col>
                                                            <Col md={6}>
                                                                <div className="p-4">
                                                                    <ul className="list-unstyled mb-4">
                                                                        <li className="d-flex justify-content-between py-3 border-bottom">
                                                                            <strong className="text-muted">Status</strong>
                                                                            <strong>{order.status}</strong>
                                                                        </li>
                                                                        <li className="d-flex justify-content-between py-3 border-bottom">
                                                                            <strong className="text-muted">Payment Status</strong>
                                                                            <strong>{order.payment_status}</strong>
                                                                        </li>
                                                                        <li className="d-flex justify-content-between py-3 border-bottom">
                                                                            <strong className="text-muted">Shipping and handling</strong>
                                                                            <strong>${order.shipping_charges / 100}</strong>
                                                                        </li>
                                                                        <li className="d-flex justify-content-between py-3 border-bottom">
                                                                            <strong className="text-muted">Tax</strong>
                                                                            <strong>${order.tax_and_gst / 100}</strong>
                                                                        </li>
                                                                        <li className="d-flex justify-content-between py-3 border-bottom">
                                                                            <strong className="text-muted">Total</strong>
                                                                            <h5 className="fw-bold">${order.total / 100}</h5>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </>
                                        ))
                                    ) : ("No Orders Found")}
                                </Accordion>
                            </Tab>
                            {/* <Tab eventKey="contact" title="Contact">
                                Tab content for Contact
                            </Tab> */}
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default CustomerProfilePage;