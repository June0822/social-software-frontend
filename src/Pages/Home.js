import React, {useState, useEffect, useRef } from "react";

import PostsList from "../MainPage/MainPage";
import Notification from "../Notification/Notification"
import Chat from "../Chat/Chat";
import Profile from "../Profile/Profile"
import SideNavbar from "../MainPage/components/SideNavbar";
import Login from "../Login/Login";
import FollowList from "../FollowList/FollowList";
import Setting from "../Setting/Setting";
import Contacts from "../Chat/components/Contacts";
import ContactList from "../Chat/components/ContactList/ContactList";

import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Login from "../components/Login";
import { HashRouter , Route, Routes } from "react-router-dom";


export default function Home() {

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);


    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!  Connection ID: ' + connection.connectionId);
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                }).then(() => {
                        fetch(process.env.REACT_APP_API+'chat/AddConnectionId', { 
                            method: 'POST', 
                            body: JSON.stringify({User:user, ConnectionId: connection.connectionId}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                    }
                )
                .catch(e => console.log('Connection failed: ', e));
                

        }
    }, [connection]);

    if (!token) {
        return <HashRouter><Login setToken={setToken} setUser={setUser} setConnection={setConnection}/></HashRouter>
    }

    return(
        <HashRouter>
            <Container style={{overflow:'hidden'}}>
                <Row>
                    <Col sm={0} xl={3}>
                        <SideNavbar user={user}/>
                    </Col>
                    <Col sm={12} xl={6}>
                        <Routes>
                            <Route exact path={user+'/home'} element={<PostsList user={user}/>} />
                            <Route exact path={user+'/notification'} element={<Notification/>} />
                            <Route exact path={user+'/chat'} element={<Chat User={user} connection={connection} myChat={chat} latestChat={latestChat}/>} />
                            <Route exact path={user+'/profile'} element={<Profile user={user}/>} />
                            <Route exact path={user+'/setting'} element={<Setting setToken={setToken} user={user} connection={connection}/>} />
                        </Routes>
                    </Col>
                    <Col sm={0} xl={3}>
                        <Routes>
                            <Route exact path={user+'/home'} element={<FollowList User={user}/>} />
                            <Route exact path={user+'/notification'} element={<FollowList User={user}/>} />
                            <Route exact path={user+'/chat'} element={<ContactList />} />
                            <Route exact path={user+'/profile'} element={<FollowList User={user}/>} />
                            {/* <Route exact path='/setting' element={<Setting/>} /> */}
                        </Routes>
                        {/* <FollowList User={user}/> */}
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    )
};