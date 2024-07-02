import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const  VendorAuthLayout= () => {

    return (
        <>
            <section className="h-100 bg-img">
                <Container  className="h-100">
                    <Row className="justify-content-sm-center h-100">
                        <Col xxl={6} lg={5} md={7} sm={12}>
                            <div className="card text-center bg-transparent border-0">
                            <span className="fs-4"><b className="text-warning">DOOR</b><b className="text-dark">DISH</b></span>
                                <div className="card-body">
                                    {/* <h6 className="pb-3">Manage your restaurant</h6> */}
                                    <Outlet />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default VendorAuthLayout;