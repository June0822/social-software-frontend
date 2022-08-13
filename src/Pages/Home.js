import React from "react";
import PostsList from "../MainPage/MainPage";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Login from "../components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default function Home() {
    return(
        <BrowserRouter>
            {/* <Login /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Container style={{overflow:'hidden'}}>
                <Row>
                    <Col sm={0} xl={3}>
                        <p style={{textAlign : 'center', background: 'LightCyan'}}>status bar</p>
                    </Col>
                    <Col sm={12} xl={6}>
                        <PostsList/>
                    </Col>
                    <Col sm={0} xl={3}>
                        <p style={{textAlign : 'center', background: 'Cornsilk'}}>friends</p>
                    </Col>
                </Row>
            </Container>
        </BrowserRouter>
    )
};