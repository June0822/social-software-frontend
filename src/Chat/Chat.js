// import styled from "styled-components";

// import DialogWindow from "./components/DialogWindow";

// export default function Chat () {
//     return(
//         <div>
//             <DialogWindow/>
//         </div>
//     );
// }
import React, { useState, useEffect, useRef } from 'react';

import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const Chat = ({User, connection, myChat, latestChat}) => {
    
    latestChat.current = myChat;


    const sendMessage = async (user, message) => {
        const chatMessage = {
            User: user,
            Receiver: 'User2',
            Message: message
        };
        try {
            await  fetch(process.env.REACT_APP_API+'chat/messages', { 
            method: 'POST', 
            body: JSON.stringify(chatMessage),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={myChat}/>
        </div>
    );
};

export default Chat;