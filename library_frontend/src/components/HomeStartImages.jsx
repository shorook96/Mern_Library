import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../App.css';
import book1 from '../assets/images/2.png';
import book2 from '../assets/images/3.png';
import book3 from '../assets/images/4.png';
import book4 from '../assets/images/5.png';
import book5 from '../assets/images/6.png';
import book6 from '../assets/images/7.png';
import shelf from '../assets/images/shelf.png';

export default function HomeStartImages(){
    return(
          
        <Container>
            <Row>
            
            <Col md={7} ></Col>
            <Col md={5} >
                
                <Row >
                <Col sm={12} md={4}  className='text-center'><img src={book1} alt='img1' className='img-fluid'/></Col>
                <Col sm={12} md={4} className='text-center'><img src={book2} alt='img2' className='img-fluid'/></Col>
                <Col sm={12} md={4} className='text-center'><img src={book3} alt='img3' className='img-fluid'/></Col>
                </Row>
                <Row>
                <Col   className=' '><img src={shelf} alt='img4' className='img-fluid align-text-top'/></Col>
                </Row>
                <Row >
                <Col sm={12} md={4}  className=' text-center'><img src={book4} alt='img4' className='img-fluid'/></Col>
                <Col sm={12} md={4} className=' text-center'><img src={book5} alt='img5' className='img-fluid'/></Col>
                <Col sm={12} md={4} className=' text-center'><img src={book6} alt='img6' className='img-fluid'/></Col>
                </Row>
                <Row>
                <Col ><img src={shelf} alt='img4' className='img-fluid align-text-top'/></Col>
                </Row>
                
            </Col>
            </Row>
        </Container>
    )
}

