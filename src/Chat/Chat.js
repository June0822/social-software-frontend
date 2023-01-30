import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const MyChat = styled.div`
    height: 100%;
    border: solid 1px LightGray;
    background: #F5F5F5;
`

const Chat = ({User, AllMessage, receiver, newMessage, isReaded, setIsReaded}) => {


    return (
        <MyChat >
            <ChatWindow User={User} AllMessage={AllMessage} receiver={receiver} newMessage={newMessage} isReaded={isReaded}/>
            <ChatInput  User={User} receiver={receiver} setIsReaded={setIsReaded}/>
        </MyChat>
    );
};

export default Chat;