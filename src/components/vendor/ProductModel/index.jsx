import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProductForm from '../ProductForm';
import { IoIosAddCircle } from "react-icons/io";
import CloseButton from 'react-bootstrap/CloseButton';

function ProductModel() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <IoIosAddCircle size={40} onClick={handleShow} />
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <ProductForm></ProductForm>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProductModel;