import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/NavDropdown';


const Navigation = () => {
    return (
        <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home"><b className='text-primary'>DOOR</b>DISH</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0 justify-content-end flex-grow-1"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Location Forms */}
            {/* <div className='m-auto'>
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div> */}
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            
            <Link to={"/sign-in"} className={'me-3 btn border-dark'} > Login </Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default Navigation;