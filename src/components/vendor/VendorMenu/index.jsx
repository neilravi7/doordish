import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { TiThMenu } from "react-icons/ti";
import {motion} from "framer-motion";

function VendorMenu() {
  {/* it's an canvas to show vendor or manager menu as a sidebar */}
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false);};
  const handleShow = () => setShow(true);

  return (
    <>
      <motion.button whileTap={{ scale: 0.6 }} className="form-control btn btn-md btn-outline-dark" onClick={handleShow}>
        <TiThMenu />
      </motion.button>
      {/* <Button variant="outline-dark" onClick={handleShow}>
        Login
      </Button> */}

      <Offcanvas show={show} onHide={handleClose} backdrop="static" className="bg-img">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='fs-4 m-auto'>Vendor Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default VendorMenu;
