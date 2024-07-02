import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';
import dish from "../../../assets/images/dish5.jpg";
import VendorMenu from '../VendorMenu';
// import Image from 'react-bootstrap/Image';


// const dish = "https://raw.githubusercontent.com/amolkapadi/dishcarddesign/main/img/dish6.jpg";


const ProductCard = (item) => {
    {/* VendorFoodCard Component is used to show food items or products details to customer and vendor both. */}
    return (
        <Col>
            <Card className="shadow mt-3">
                <div className="position-relative bg-light overflow-hidden">
                    <Card.Img variant="top" src={dish}  />
                    <div className="bg-success rounded-pill text-white position-absolute start-0 top-0 m-3 py-1 px-3">{item.item.category.name}</div>
                </div>
                <Card.Body>
                    <Card.Title className='text-start'>{item.item.name}</Card.Title>
                    <Card.Text>
                        <div className="text-start">
                            <span className="text-success me-1">${item.item.price/ 100}</span>
                            <span className="text-danger text-decoration-line-through">${item.item.price / 100 + 20} </span>
                        </div>
                    </Card.Text>
                    <div className="d-flex">
                        <div className="flex-grow-1 text-start">
                            <Link to={`/vendor/product/${item.item.id}`} className='border btn btn-outline-dark fw-medium me-2'>View</Link>
                            {/* <Link to={`/store/menu/food/item/show/${item.item.id}`} className='border btn btn-outline-dark fw-medium me-2'>Edit</Link> */}
                        </div>
                        <div className='text-end'>
                            <Link to={"/app/cart"} className='border btn btn-outline-dark fw-medium'>Remove</Link>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};
export default ProductCard;
