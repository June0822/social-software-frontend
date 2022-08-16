import React from "react";
import PostsList from "../MainPage/MainPage";
import Notification from "../Notification/Notification"
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile"
import SideNavbar from "../MainPage/components/SideNavbar";

import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Login from "../components/Login";
import { HashRouter , BrowserRouter, Route, Routes } from "react-router-dom";

export default function Home() {
    return(
        <HashRouter>
            <Container style={{overflow:'hidden'}}>
                <Row>
                    <Col sm={0} xl={3}>
                        <SideNavbar />
                        {/* <p style={{textAlign : 'center', background: 'LightCyan'}}>status bar</p> */}
                    </Col>
                    <Col sm={12} xl={6}>
                        <Routes>
                            <Route exact path='/home' element={<PostsList/>} />
                            <Route exact path='/notification' element={<Notification/>} />
                            <Route exact path='/chat' element={<Chat/>} />
                            <Route exact path='/profile' element={<Profile/>} />
                        </Routes>
                        
                    </Col>
                    <Col sm={0} xl={3}>
                        <p style={{textAlign : 'center', background: 'Cornsilk'}}>friends</p>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    )
};