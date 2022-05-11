import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import HomeStartImages from './HomeStartImages';
import '../App.css';


export default function HomeComponent(){
    return(
        <div className="bgHome">
            <HomeStartImages/>
        </div>
    )
}

