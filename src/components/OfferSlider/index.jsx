import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import offerOne from "../../assets/images/offers/offer1.jpg";
import offerTwo from "../../assets/images/offers/offer2.jpg";
import offerThree from "../../assets/images/offers/offer3.jpg";
import offerFour from "../../assets/images/offers/offer4.jpg";

import Image from 'react-bootstrap/Image';
import { Col, Row } from 'react-bootstrap';

function OfferSlider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} >
            <Carousel.Item>
                <Row className="g-4">
                    <Col xs={12} md={4}>
                        <Image src={offerOne} thumbnail />
                    </Col>
                    <Col xs={12} md={4}>
                        <Image src={offerTwo} thumbnail />
                    </Col>
                    <Col xs={12} md={4}>
                        <Image src={offerThree} thumbnail />
                    </Col>
                </Row>
            </Carousel.Item>
            <Carousel.Item>
                <Row className="g-4">
                    <Col xs={12} md={4}>
                        <Image src={offerFour} thumbnail />
                    </Col>
                    <Col xs={12} md={4}>
                        <Image src={offerTwo} thumbnail />
                    </Col>
                    <Col xs={12} md={4}>
                        <Image src={offerThree} thumbnail />
                    </Col>
                </Row>
            </Carousel.Item>
        </Carousel>
    );
}

export default OfferSlider;
