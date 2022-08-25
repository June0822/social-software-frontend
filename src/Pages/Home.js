import React, { useState } from "react";

import PostsList from "../MainPage/MainPage";
import Notification from "../Notification/Notification"
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile"
import SideNavbar from "../MainPage/components/SideNavbar";
import Login from "../Login/Login";
import FollowList from "../FollowList/FollowList";
import Setting from "../Setting/Setting";

import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Login from "../components/Login";
import { HashRouter , Route, Routes } from "react-router-dom";

export default function Home() {

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    if (!token) {
        return <Login setToken={setToken} setUser={setUser} />
    }

    return(
        <HashRouter>
            <Container style={{overflow:'hidden'}}>
                <Row>
                    <Col sm={0} xl={3}>
                        <SideNavbar />
                    </Col>
                    <Col sm={12} xl={6}>
                        <Routes>
                            <Route exact path='/home' element={<PostsList user={user}/>} />
                            <Route exact path='/notification' element={<Notification/>} />
                            <Route exact path='/chat' element={<Chat/>} />
                            <Route exact path='/profile' element={<Profile/>} />
                            <Route exact path='/setting' element={<Setting/>} />
                        </Routes>
                        
                    </Col>
                    <Col sm={0} xl={3}>
                        <FollowList User={user}/>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    )
};