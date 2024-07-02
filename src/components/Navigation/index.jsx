import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


const Navigation = () => {
  const {isLoggedIn, logOut }= useAuth(); // currentLocation
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logOut();
    toast.success("Logout successfully.");
    navigate("/home");
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/home"><b className='text-primary'>DOOR</b>DISH</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 my-lg-0 justify-content-end flex-grow-1"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* Location Forms goes here */}           
            {
              !isLoggedIn ? 
              (<Link to={"/sign-in"} className={'me-3 btn btn-dark rounded-pill'} > Login </Link>)
              :
              (<><Button variant="dark" className="me-3 rounded-pill" onClick={handleLogout}>Logout</Button></>)
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navigation;


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