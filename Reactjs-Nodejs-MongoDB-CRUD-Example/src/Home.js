import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return ( 
            <div >

            
            <AppNavbar />

            
            <Container fluid >

            
            <Button color = "link" > < Link to = "/promotions" > Manage promotions List </Link></Button >

            
            <Button > < Link to = "/makeData" > 10000 rows </ Link></Button >

            
            </Container> 
             </div>
        );
    }
}

export default Home;