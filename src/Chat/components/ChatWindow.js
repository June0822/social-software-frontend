import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import Message from './Message';

const MyChatWindow = styled.div`
    height: 90%;
    max-height: 90%;
    border-bottom: solid 1px LightGray;
`
const ChatTitle = styled.div`
    height : 50px;
    border-bottom: solid 1px LightGray;
    display: flex;
    align-items: center;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 30px;
    font-weight : bold;
    margin-bottom: 10px;
`

const UnreadLine = styled.div`
    display: ${props => props.props ? 'flex' : 'none'};
    justify-content:center;
    align-items: center;
    font-family: 'Trebuchet MS', sans-serif;
    color: white;
    background: #C0C0C0;
    border-radius: 20px 20px 20px 20px;
    visibility: ${props => props.props ? 'visible' : 'hidden'};
    margin: 10px;
`

const MessageArea = styled.div`
    height: 82vh;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 10px;
    }
  
    ::-webkit-scrollbar-thumb {
      background-color: #B0DDAC;
      border-radius:10px;
    }
  
    ::-webkit-scrollbar-track {
      background-color: #F5F5F5;
    }
`

const ChatWindow = ({User, AllMessage, receiver, newMessage, isReaded}) => {

    const textareaRef = useRef(null);

    var index = 0;

    useEffect(() => {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }, [AllMessage]);

    return(
        <MyChatWindow>
            <ChatTitle>&nbsp;&nbsp;{receiver.ReceiverName}</ChatTitle>
            <MessageArea ref={textareaRef}>
                {AllMessage.map( item => {
                    index++;
                    return <div>
                                <Message key={item.MessageId} User={User} item={item} receiver={receiver}/>
                                <UnreadLine key={0} props={isReaded && AllMessage.length !=0 && AllMessage[0].NOU!=0 &&index == AllMessage.length-AllMessage[0].NOU}>UNREAD MESSAGES</UnreadLine>
                        </div>
                })}
            </MessageArea>
        </MyChatWindow>
    )
};

export default ChatWindow;