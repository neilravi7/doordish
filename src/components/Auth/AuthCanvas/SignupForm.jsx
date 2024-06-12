import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { motion } from "framer-motion";
import { register } from '../../../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const SignUpForm = () => {
    const { Formik } = formik;
    const navigate = useNavigate();
    // const sleep = ms => new Promise(r => setTimeout(r, ms));

    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        password1: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        password2: yup
            .string()
            .oneOf([yup.ref('password1'), null], 'Passwords must match')
            .required('Password confirmation is required'),
        is_vendor: yup.boolean().default(false),
        is_customer: yup.boolean().default(true), // Set default value to true
    });

    // Form handler
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log(values);
        // await sleep(10000);


        let response = await register(values);
        if(response.isError){
            toast.error(response.message);
            setSubmitting(false);
        }else{
            toast.success(response.message);
            toast.info("Please Sign In");
            setSubmitting(false);
            navigate("/sign-in");
        }
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                email: "",
                password1: "",
                password2: "",
                is_vendor: false,
                is_customer: true,
            }}
        >
            {
                (
                    { handleSubmit, handleChange, values, touched, errors, isSubmitting }
                ) => (

                    <Form noValidate onSubmit={handleSubmit} className="p-4 bg-opacity-50 border rounded-3 bg-light bg-opacity-50 shadow">
                        <input type="hidden" name="is_customer" value={values.is_customer} onChange={handleChange} />
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
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
                            <Form.Control.Feedback type="invalid" className='text-start'>Please provide valid email address.</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword1" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password1"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                                isValid={touched.password1 && !errors.password1}
                                isInvalid={!!errors.password1}
                            />
                            <Form.Control.Feedback type="invalid" className='text-start'>Password is required.</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" className='text-start'>Password should be 8 character long.</Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword2" label="Confirm Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password2"
                                placeholder="Confirm Password"
                                required
                                onChange={handleChange}
                                isValid={touched.password2 && !errors.password2}
                                isInvalid={!!errors.password2}
                            />
                            <Form.Control.Feedback type="invalid" className='text-start'>password do not match.</Form.Control.Feedback>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-flex mt-3 justify-content-center">
                            <motion.button whileTap={{ scale: 0.8 }} className="form-control btn btn-lg btn-dark rounded-pill" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (<span>
                                    <Spinner animation="grow" role="status" size="sm" /> Registering ...
                                </span>) : ('Create Account')}
                            </motion.button>
                        </div>
                        <hr className="my-2"/>
                        <small className="text-dark">Already have an account? <Link to={'/sign-in'}>SIGN-IN </Link>Here</small>
                    </Form>
                )
            }
        </Formik>
    );
}
export default SignUpForm;

