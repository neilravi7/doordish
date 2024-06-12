import { Container, Row, Col } from "react-bootstrap";
import SignUpForm from "../../components/Auth/AuthCanvas/SignupForm";

const SignUpPage = () => {
    
    return(
        <Container className="col-xl-10 col-xxl-8px-4" >
            <Row className="align-items-center g-lg-5 py-3">
                <Col md={10} lg={7} className="mx-auto text-center text-lg-start">
                <h1 className="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
                <p className="col-lg-10 fs-4">Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                </Col>
                <Col md={10} lg={5} className="mx-auto">
                    <SignUpForm></SignUpForm>
                </Col>
            </Row>
        </Container>
    );

};
export default SignUpPage;