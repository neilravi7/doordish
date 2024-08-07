import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import dosa from '../../assets/images/category/Dosa.png';
import pureVeg from "../../assets/images/category/Pure_Veg.png";
import khichdi from "../../assets/images/category/Khichdi.png";
import paratha from "../../assets/images/category/Paratha.png";
import pasta from "../../assets/images/category/Pasta.png";
import pizza from "../../assets/images/category/Pizza.png";
import thepla from "../../assets/images/category/Thepla.png";
import chinese from "../../assets/images/category/Chinese.png";


import Image from 'react-bootstrap/Image';
import { Col, Row } from 'react-bootstrap';

function CategorySlider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark" className='px    -5'>
            <Carousel.Item>
                <Row className="g-4">
                    <Col xs={12} md={2}>
                        {/* <Image src={dosa} roundedCircle height={130} width={130} /> */}
                    </Col>
                    <Col xs={12} md={2}>
                        <Image src={thepla} roundedCircle height={130} width={130} />

                    </Col>
                    <Col xs={12} md={2}>
                        <Image src={pizza} roundedCircle height={130} width={130} />

                    </Col>
                    <Col xs={12} md={2}>
                        <Image src={pasta} roundedCircle height={130} width={130} />

                    </Col>
                    <Col xs={12} md={2}>
                        <Image src={pureVeg} roundedCircle height={130} width={130} />
                    </Col>
                    
                    <Col xs={12} md={2}>
                        {/* <Image src={khichdi} roundedCircle height={130} width={130} /> */}
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row className="g-4">
                    <Col xs={12} md={2}></Col>
                    <Col xs={12} md={2}>
                        <Image src={paratha} roundedCircle height={130} width={130} />

                    </Col>
                    <Col xs={12} md={2}>
                        <Image src={chinese} roundedCircle height={130} width={130} />
                    </Col>
                    <Col xs={12} md={2}></Col>

                </Row>
            </Carousel.Item>
        </Carousel>
    );
}

export default CategorySlider;
