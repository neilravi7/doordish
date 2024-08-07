import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Col } from 'react-bootstrap';




// const dish = "https://raw.githubusercontent.com/amolkapadi/dishcarddesign/main/img/dish6.jpg";

const VendorCard = ({ item }) => {
    {/* Vendor Card Component used on home page to show vendors details to customer */ }

    return (
        <Col>
        <Link className="text-decoration-none" to={`/restaurant/${item.user}/items/`} >
            <Card className="rounded shadow mt-3">
                <div className="position-relative bg-light overflow-hidden">
                    <Card.Img variant="top" src={item.image_url} rounded width={130} height={130} />
                    <div className="bg-success rounded text-white position-absolute start-0 top-0 m-3 py-1 px-3">Bakery</div>
                </div>
                <Card.Body>
                    <Card.Title className='text-start'>{item.name}</Card.Title>
                    <Card.Text>
                        <div className="text-start">
                            <span className="text-dark me-1">{item.description}</span>
                        </div>
                    </Card.Text>
                    <div className="d-flex">
                        <Badge bg="primary">{item.cuisine_type}</Badge>
                    </div>
                </Card.Body>
            </Card>
        </Link>
        </Col>
    );
};
export default VendorCard;
