import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useState } from "react";

import { ImHome3 as HomeIcon } from "react-icons/im";
import { AiFillBell as NotificationIcon } from "react-icons/ai";
import { IoIosChatbubbles as ChatIcon } from "react-icons/io";
import { VscAccount as ProfileIcon } from "react-icons/vsc";
import { FiSettings as SettingIcon} from "react-icons/fi";


const MySpan = styled.span`
    color: ${props => props.props ? 'green' : 'black'};
    font-size: 20px;
    display: flex;
    align-items: center;
    &:hover {
        color: green;
    };
`
const MyDiv = styled.div`
    width: 100%;
`

const NavLinkStyle = {
    textDecoration: 'none',
    marginTop: '30px',
}


export default function SideNavbar () {

    const [status, setStatus] = useState([true, false, false, false, false]);

    return (
        <MyDiv>
            <Nav className="flex-column">
                <NavLink to="/home" style={NavLinkStyle} onClick={() => setStatus([true, false, false, false, false])}>
                    <MySpan props={status[0]}>
                        <HomeIcon/>&emsp;&emsp;Home
                    </MySpan>
                </NavLink>
                <NavLink to="/notification" style={NavLinkStyle} onClick={() => setStatus([false, true, false, false, false])}>
                    <MySpan props={status[1]}>
                        <NotificationIcon />&emsp;&emsp;Notifications
                    </MySpan>
                </NavLink>
                <NavLink to="/chat" style={NavLinkStyle} onClick={() => setStatus([false, false, true, false, false])}>
                    <MySpan props={status[2]}>
                        <ChatIcon />&emsp;&emsp;Messages
                    </MySpan>
                </NavLink>
                <NavLink to="/profile" style={NavLinkStyle} onClick={() => setStatus([false, false, false, true, false])}>
                    <MySpan props={status[3]}>
                        <ProfileIcon />&emsp;&emsp;Profile
                    </MySpan>
                </NavLink>
                <NavLink to="/setting" style={NavLinkStyle} onClick={() => setStatus([false, false, false, false, true])}>
                    <MySpan props={status[4]}>
                        <SettingIcon />&emsp;&emsp;Setting
                    </MySpan>
                </NavLink>
            </Nav>
        </MyDiv>
    );
}