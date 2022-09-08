import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';
import {setMyToken} from './components/Cookies'

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

async function loginUser(credentials) {
    console.log(process.env.REACT_APP_API);
    return fetch(process.env.REACT_APP_API+'Auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => {
        console.log(data)
        return data.json();
    })
}

export default function Login({ setToken, setUser}) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username: username,
            password: password
        });
        if (token.length<30) {
            alert(token);
            return
        }
        else {
            console.log("token:"+token)
            setMyToken(token);
            setUser(username);
            setToken(token);
        }
    }

    return(
        <LoginWrapper>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </LoginWrapper>
    )
}