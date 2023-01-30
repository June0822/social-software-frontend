import { useState, useEffect } from "react";
import styled from "styled-components"

import { getAuthToken } from "../../../Login/components/Cookies";

import Contact from "./Contact";

const MyContactList = styled.div`
border: solid 1px LightGray;
height: 100vh;
`

const ContactList = ({User, setChat, chat, setReceiver, lastMessage, setLastMessage}) => {

    const [contacts, setContacts] = useState([]);

    const getData = () => {
        fetch(process.env.REACT_APP_API+'Follower/contact',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json",
                "Authorization": ('Bearer ' + getAuthToken())
            }
        })
        .then(res => res.json())
        .then(data => setContacts(data))
    }
    
    useEffect(() => {
        getData();
    }, [chat]);

    return(
        <MyContactList>
            {
                contacts.map( item => {
                    const {Passive, UserName, ProfilePhotoSrc="637981738299538287_ProPhoto2.png", Time="12:00", Message="Message...", NOU="99"} = item
                    return <Contact key={Passive} ContactName={UserName} ProfilePhotoSrc={ProfilePhotoSrc} Time={Time} Message={Message} NOU={NOU} setChat={setChat} User={User} setReceiver={setReceiver} chat={chat}/>
                })
            }
        </MyContactList>
    );

};

export default ContactList;