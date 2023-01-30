import React, { useState } from 'react';
import styled from 'styled-components';

import { BiSend } from "react-icons/bi";

const MyChatInput = styled.div`
    display: flex;
    height: 10%;
    align-items: center;
`
const MySpan = styled.span`
    color: black;
    font-size: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        color: #8FBC8B;
    };
`
const Input = styled.input`
    background: #ffffff;
    cursor: text;
    height: 50%;
    width: 90%;
    border-radius: 20px 20px 20px 20px;
    border: 1px soild;
    margin-left: 15px;
    padding-left: 10px;
    &:focus {
        outline: none;
    }
`

const ChatInput = ({User, receiver, setIsReaded}) => {

    const [content, setContent] = useState('');

    const contentChange = (e) => {
        setContent(e.target.value)
    }

    const setNOU = () => {
        const tempMessage = {
            User: User,
            Receiver: receiver.ReceiverName,
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
    const handleClick = () => {
        if(content.length==0) {
            alert('please write something');
            return;
        }
        const tempMessage = {
            User: User,
            Receiver: receiver.ReceiverName,
            Message: content
        }
        fetch(process.env.REACT_APP_API+'chat/messages', { 
            method: 'POST', 
            body: JSON.stringify(tempMessage),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(setContent(''))
        .then(setNOU())
        .then(setIsReaded(false));
    }

    return (
        <MyChatInput>
            <Input type="text" maxLength="150" minLength="1" placeholder="write something ..." value={content} onChange={contentChange}/>
            <MySpan><BiSend onClick={handleClick}/></MySpan>
        </MyChatInput>
    )
};

export default ChatInput;