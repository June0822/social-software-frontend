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
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";


export default function Home() {

    const [token, setToken] = useState();
    const [user, setUser] = useState();

    const [connection, setConnection ] = useState(null);
    const [chat, setChat ] = useState([]);

    const [receiver, setReceiver] = useState({
        ReceiverName: 'Chat',
        PhotoSrc: ''
    });

    const [isReaded, setIsReaded] = useState(true);
    const [newMessage, setNewMessage] = useState([]);
    const [lastMessage, setLastMessage] = useState({
        ReceiverName: 'Chat',
        Message: ''
    }); 

    useEffect(() => {
        if (connection) {
            console.log("connection = " + connection);
            connection.start()
                .then(result => {
                    console.log('Connected!  Connection ID: ' + connection.connectionId+result);
    
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

                connection.off('ReceiveMessage');

                connection.on('ReceiveMessage', message => {
                    const jsonMessage = JSON.stringify(message.user).replaceAll('"', ''); //{"user":"XXX","receiver":"XXX","message":"XXX"}
                    console.log("me = "+user + " , sender = " + jsonMessage + " , talker = " + receiver.ReceiverName + " , boolean = "+(jsonMessage===receiver.ReceiverName || jsonMessage===user).toString())
                    if(jsonMessage===receiver.ReceiverName || jsonMessage===user){
        
                        if(jsonMessage===receiver.ReceiverName) {
                            setIsReaded(true)
                        };
                        
                        const tempMessage = {
                            User: jsonMessage===receiver.ReceiverName ? user : receiver.ReceiverName,
                            Receiver: jsonMessage===receiver.ReceiverName ? receiver.ReceiverName : user,
                            Message: ''
                        }
                        fetch(process.env.REACT_APP_API+'chat/GetChatRecord', {           
                            method: 'POST', 
                            body: JSON.stringify(tempMessage),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(res => res.json())
                        .then(data => setChat(data))
                    }
        
                });
        }
    }, [connection, receiver]);

    useEffect(() => {
        if (connection) {
        
        }
    })

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
                            <Route exact path={user+'/chat'} element={<Chat User={user} AllMessage={chat} receiver={receiver} newMessage={newMessage} isReaded={isReaded} setIsReaded={setIsReaded}/>} />
                            <Route exact path={user+'/profile'} element={<Profile user={user}/>} />
                            <Route exact path={user+'/setting'} element={<Setting setToken={setToken} user={user} connection={connection}/>} />
                        </Routes>
                    </Col>
                    <Col sm={0} xl={3}>
                        <Routes>
                            <Route exact path={user+'/home'} element={<FollowList User={user}/>} />
                            <Route exact path={user+'/notification'} element={<FollowList User={user}/>} />
                            <Route exact path={user+'/chat'} element={<ContactList User={user} chat={chat}setChat={setChat} setReceiver={setReceiver} />} />
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