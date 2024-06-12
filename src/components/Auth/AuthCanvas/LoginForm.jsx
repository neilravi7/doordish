import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import { login } from '../../../services/AuthServices';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { Formik } = formik;
    const navigate = useNavigate();
    // Schema
    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required(),
    });

    // Submit handler
    const handleSubmit = async (values, { setSubmitting }) => {
        let response = await login(values);
        if (response.isError) {
            setSubmitting(false);
            toast.error(`Login failed ${response.message}`);

        } else {
            setSubmitting(false);
            toast.success(response.message);
            navigate("/home");
        }
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {
                (
                    { handleSubmit, handleChange, values, touched, errors, isSubmitting }
                ) => (

                    <Form noValidate onSubmit={handleSubmit} className="p-4 bg-opacity-50 border rounded-3 bg-light-subtle">

                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-2">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good.</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                        <div className="d-flex mt-3 justify-content-center">
                            <motion.button whileTap={{ scale: 0.8 }} className="form-control btn btn-lg btn-dark rounded-pill" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (<span>
                                    <Spinner animation="grow" role="status" size="sm" /> Logging in...
                                </span>) : ('Login')}
                            </motion.button>
                        </div>
                        <hr className="my-2"/>
                        <small className="text-muted">Do not have an account? <Link to={'/sign-up'}>SIGN-UP</Link> Here </small>
                    </Form>
                )
            }
        </Formik>
    );
}
export default LoginForm;