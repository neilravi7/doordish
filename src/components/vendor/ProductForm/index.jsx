import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import { createProduct, getCategory, updateProduct } from '../../../services/ProductServices';
import { toast } from 'react-toastify';

const ProductForm = ({ productData, setProductData, performCreate=true}) => {
    const productId = useParams().productId;

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await getCategory();
            if(!response.isError){
                setCategory(response.data);
            }
            else{
                console.log(response.message);
            }
        }
        fetchCategories();
      }, []
    );

    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        image_url: '',
        price: '',
        is_available: true,
        category: '',
    });

    useEffect(() => {
        if (productData) {
            setFormValues({
                name: productData.name || '',
                description: productData.description || '',
                image_url: productData.image_url || '',
                price: productData.price || '',
                is_available: productData.is_available || true,
                category: productData.category?.id || '',
            });
        }
    }, [productData]);

    const { Formik } = formik;
    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        image_url: yup.string().required('Image URL is required'),
        price: yup.string().required('Price number is required'),
        is_available: yup.boolean().required('Availability is required'),
        category: yup.string().required('category is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        // console.log("values : ", values);
        setSubmitting(false);
        
        var response=undefined;
        
        if(performCreate){
            response = await createProduct(values);
        }else{
            response = await updateProduct(values, productId);
        }

        if(!response.isError){
            toast.success(response.message);
            setProductData(response.data);
            console.table("productDatainfpom", productData);
        }
        else{
            toast.error(response.message);
        }
    };

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                initialValues={formValues}
            >
                {
                    (
                        { handleSubmit, handleChange, values, touched, errors, isSubmitting }
                    ) => (
                        <Form noValidate onSubmit={handleSubmit} className="p-4 border rounded-3 bg-light bg-opacity-50 shadow">
                            <Row className="mb-3">
                                <Col>
                                    <FloatingLabel controlId="productName" label="Prodcut Name" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Product Name"
                                            required
                                            value={values.name}
                                            onChange={handleChange}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <FloatingLabel controlId="productDescription" label="Description" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            placeholder="Description"
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
                                <Col >
                                    <FloatingLabel controlId="productImage" label="Product Image Url" className="mb-3">
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
                                <Col>
                                    <FloatingLabel controlId="productPrice" label="Price" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="price"
                                            placeholder="Price"
                                            required
                                            value={values.price}
                                            onChange={handleChange}
                                            isValid={touched.price && !errors.price}
                                            isInvalid={!!errors.price}
                                        />
                                        <Form.Control.Feedback type="invalid" className='mt-3 text-start'>All fields are required.</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col>
                                    <FloatingLabel controlId="floatingSelect" label="Product Category">
                                        <Form.Select aria-label="Floating label select example"
                                        name='category'
                                        value={values.category}
                                        required
                                        onChange={handleChange}
                                        isValid={touched.category && !errors.category}
                                        isInvalid={!!errors.category}
                                        >
                                            <option>Open Category Menu </option>
                                            {
                                                category.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )) 
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <div className="d-flex mt-2 justify-content-center">
                                <Button variant="dark" size="lg" className="form-control rounded-pill" type="submit" disabled={isSubmitting}>
                                    {productId ? (isSubmitting ? 'Saving...' : 'Save') : (isSubmitting ? 'Creating...' : 'Create Product')}
                                </Button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    );

}

export default ProductForm;