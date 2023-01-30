import { useState, useEffect } from "react"
import styled from "styled-components"

import { getAuthToken } from "../../../Login/components/Cookies";

const MySingleContact = styled.div`
    border-bottom: solid 1px LightGray;
    height: 60px;
    display: flex;
    cursor: pointer;
`
const ProPhoto = styled.img`
    height: 100%;;
    border-radius: 50%;
    border: 5px solid #fff;
`
const MyName = styled.div`
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight : bold;
    width: 80%;
`
const MyTime = styled.div`
    display:  flex;
    align-items: center;
    color: Gray;
    font-family: DejaVu Sans Mono, monospace;
    font-size: 14px;
`
const MyMessage = styled.div`
    display:  flex;
    align-items: center;
    font-family: 'Arial Narrow', sans-serif;
    color:gray;
    width: 80%;
`
//number of unread
const MyNOU = styled.div` 
    width: 25px;
    height: 25px;
    font-size: 10px;
    align-items: center;
    text-align: center;
    border: solid Crimson;
    border-radius: 50%;
    font-family: 'Arial Narrow', sans-serif;
    font-weight : bold;
    color:Crimson;
    visibility: ${props => props.props ? 'visible' : 'hidden'};
`

const transformTimeFormat = (s, diff) => {
    var year = s.substring(0, 4);
    var date = s.substring(5, 10).replace('-','/');
    var time = s.substring(11, 16);

    let present = new Date();
    var presentYear = present.toString().substring(11, 15);

    if(year != presentYear){
        return (year+date);
    }
    if(diff < 24) { // in one day
        return time;
    }
    return date;

} 

const Contact = ({ContactName, ProfilePhotoSrc, setChat, User, setReceiver, chat}) => {

    const [chatMessage, setChatMessage] = useState([]);
    const [myLastMessage, setMyLastMessage] = useState('');

    const getData = () => {
        const tempMessage = {
            User: User,
            Receiver: ContactName,
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
        .then(data => {
            setChatMessage(data);
        })
    }

    const setNOU = () => {
        const tempMessage = {
            User: User,
            Receiver: ContactName,
            Message: ''
        } 
        fetch(process.env.REACT_APP_API+'chat/SetNOU', { 
            method: 'POST', 
            body: JSON.stringify(tempMessage),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    useEffect(()=> {
        getData();
    }, [,chat]);

    const handleClick = () => {
        setNOU();
        getData();
        setChat(chatMessage);
        setReceiver({
            ReceiverName: ContactName,
            PhotoSrc: ProfilePhotoSrc
        })
    }

    return(
        <MySingleContact onClick={()=>handleClick()}>
            <ProPhoto src={process.env.REACT_APP_IMG_PATH+ProfilePhotoSrc}/>
            <div style={{width: "100%"}}>
                <div style={{display: "flex", width: "100%", height: "50%"}}>
                    <MyName>{ContactName}</MyName>
                    <MyTime>{chatMessage.length > 0 ? transformTimeFormat(chatMessage[chatMessage.length-1].Time, chatMessage[chatMessage.length-1].DateDiff) : ''}</MyTime>
                </div>
                <div style={{display: "flex", width: "100%", height: "50%"}}>
                    <MyMessage>
                        {chatMessage.length > 0 ? 
                            chatMessage[chatMessage.length-1].Message.length <= 20 ? 
                                chatMessage[chatMessage.length-1].Message : 
                                    chatMessage[chatMessage.length-1].Message.substring(0, 20) + '...'
                        : 'No message yet'}
                    </MyMessage>
                    <MyNOU props={chatMessage.length > 0 && chatMessage[0].NOU != 0}>{chatMessage.length > 0 ? chatMessage[0].NOU : 0}</MyNOU>
                </div>
            </div>
        </MySingleContact>
    );
};

export default Contact;