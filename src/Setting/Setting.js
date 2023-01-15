import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const LogoutArea = styled.div`
    margin-top: 10px;
    display: flex;
    align-items:center;
	justify-content:center;
`

export default function Setting({setToken, user, connection}) {

    const handleLogout = async() => {
        setToken(null);

        console.log("Connection closed");

        await fetch(process.env.REACT_APP_API+'chat/RemoveConnectionId', { 
            method: 'POST', 
            body: JSON.stringify({User:user, ConnectionId: connection.connectionId}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return(
        <LogoutArea>
            <Button variant="danger" onClick={()=>handleLogout()}>Logout</Button>
        </LogoutArea>
    );
}