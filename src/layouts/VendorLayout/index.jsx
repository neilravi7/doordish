import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import VendorMenu from '../../components/vendor/VendorMenu';
import { useAuth } from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import NavDropdown from 'react-bootstrap/NavDropdown';


const VendorLayout = () => {
    const { isLoggedIn, logOut, user }= useAuth();

    const handleLogout = () => {
        logOut();
        toast.success("Logout successfully.");
    }

    return (
        <>
            <Navbar expand="lg" className='shadow' sticky="top" bg='light' >
                <Container className='p-2'>
                    <Navbar.Brand href="/vendor/home"><b className='text-primary'>DOOR</b>DISH</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="m-auto my-2 my-lg-0 justify-content-end flex-grow-1"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {/* Location Forms */}
                            
                            {
                                !isLoggedIn ? (
                                    <></>
                                ):(
                                    <>
                                        <Nav.Item><Link className="text-decoration-none btn rounded-pill btn-outline-primary me-2" to={'/vendor/home'}>Dashboard</Link></Nav.Item>
                                        <Nav.Item><Link className="text-decoration-none btn rounded-pill btn-outline-primary me-2" to={'/vendor/menu'}>Menu</Link></Nav.Item>
                                        <Nav.Item><Link className="text-decoration-none btn rounded-pill btn-outline-primary me-2" to={'vendor/orders'}>Orders</Link></Nav.Item>
                                        <Nav.Item><Button variant='primary' className='rounded-pill ms-2'><FaUserCircle /> {user.email} </Button></Nav.Item>
                                        <Nav.Item><Button variant='dark' className='rounded-pill ms-2' onClick={handleLogout} data-toggle="tooltip" data-placement="top" title="Logout"><MdLogout /></Button></Nav.Item>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                {/* main content goes here */}
                <Outlet></Outlet>
            </main>
        </>
    );
}

export default VendorLayout;