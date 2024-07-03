import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from "react-toastify";
import { useAuth } from '../../../context/AuthProvider';
import { updateVendorProfile } from '../../../services/ProductServices';

const VendorProfileForm = ({ vendorData, setVendorData }) => {
    const { user } = useAuth();
    
    const { Formik } = formik;
    
    const validationSchema = yup.object().shape({
        first_name: yup.string().required('First name is required'),
        last_name: yup.string().required('Last name is required'),
        image_url: yup.string().required('Image URL is required'),
        name: yup.string().required('Restaurant name is required'),
        description: yup.string().required('Description is required'),
        phone: yup.string().required('Phone number is required'),
        cuisine_type: yup.string().required('Cuisine type is required'),
        address: yup.string().required('Address is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("handle submit called");
        const response = await updateVendorProfile(values, user.user_id);
        setSubmitting(false);
        if(!response.isError){
            toast.success(response.message);
            setVendorData(response.data);
        }else{
            toast.error(response.message);
        }
    };

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                initialValues={{
                    first_name: vendorData.first_name || '',
                    last_name: vendorData.last_name || '',
                    image_url: vendorData.image_url || '',
                    name: vendorData.name || '',
                    description: vendorData.description || '',
                    phone: vendorData.phone || '',
                    cuisine_type: vendorData.cuisine_type || '',
                    address: vendorData.address || '',
                }}
            >
                {
                    (
                        { handleSubmit, handleChange, values, touched, errors, isSubmitting }
                    ) => (
                        <Form noValidate onSubmit={handleSubmit} className="p-4 border rounded-3 bg-light text-dark bg-opacity-75 shadow">
                            <h4 className='mb-3 text-start'>Restaurant Profile</h4>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <FloatingLabel controlId="first_name" label="Owner first name" className="mb-3">
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
                                    <FloatingLabel controlId="last_name" label="Owner last name" className="mb-3">
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
                                    <FloatingLabel controlId="restaurant_name" label="Restaurant Name" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Restaurant Name"
                                            required
                                            value={values.name}
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                    </FloatingLabel>
                                </Col>

                                <Col md={6}>
                                    <FloatingLabel controlId="phone" label="Phone" className="mb-3">
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
                            </Row>

                            <Row className="mb-3">

                                <Col md={6}>
                                    <FloatingLabel controlId="cuisine_type" label="Cuisine Type" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="cuisine_type"
                                            placeholder="Cuisine Type"
                                            required
                                            value={values.cuisine_type}
                                            onChange={handleChange}
                                            isValid={touched.cuisine_type && !errors.cuisine_type}
                                            isInvalid={!!errors.cuisine_type}
                                        />
                                        <Form.Control.Feedback type="invalid" className='text-start'>All Fields Are Required.</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>

                                <Col md={6}>
                                    <FloatingLabel controlId="restaurant_image_url" label="Restaurant image url" className="mb-3">
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
                                    <FloatingLabel controlId="description" label="Description" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            style={{ height: '100px' }}
                                            placeholder="Restaurant Description"
                                            required
                                            value={values.description}
                                            onChange={handleChange}
                                            isValid={touched.description && !errors.description}
                                            isInvalid={!!errors.description}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={12}>
                                    <FloatingLabel controlId="address" label="Address" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            name="address"
                                            style={{ height: '100px' }}
                                            placeholder="Restaurant address"
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
                                    {isSubmitting ? 'Updating...' : 'Update Store Information'}
                                </Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    );

}

export default VendorProfileForm;
