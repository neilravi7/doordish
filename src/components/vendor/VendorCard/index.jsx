import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import '../VendorCard/css/card.css';


const dish = "https://raw.githubusercontent.com/amolkapadi/dishcarddesign/main/img/dish6.jpg";

const VendorCard = () => {
    {/* Vendor Card Component used on home page to show vendors details to customer */}

    return (
        <Col>
            <Card className="rounded shadow mt-3">
                <div className="position-relative bg-light overflow-hidden">
                    <Card.Img variant="top" src={dish} rounded />
                    <div className="bg-success rounded text-white position-absolute start-0 top-0 m-3 py-1 px-3">Bakery</div>
                </div>
                <Card.Body>
                    <Card.Title className='text-start'>Tiramisu Cake</Card.Title>
                    <Card.Text>
                        <div className="text-start">
                            <span className="text-success me-1">${2000 / 100}</span>
                            <span className="text-danger text-decoration-line-through">${2000 / 100 + 20} </span>
                        </div>
                    </Card.Text>
                    <div className="d-flex">
                        <div className="flex-grow-1 text-start">
                            <Link to={`/store/menu/food/item/show/${1}`} className='border btn btn-outline-dark fw-medium'>Show</Link>
                        </div>
                        <div className='text-end'>
                            <Link to={"/app/cart"} className='border btn btn-dark fw-medium text-white'>Remove</Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};
export default VendorCard;
