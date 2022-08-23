import '../../MainPage/main.css';
import styled from "styled-components";
import { getAuthToken } from '../../Login/components/Cookies';

const MyFollowArea = styled.div`
    display: flex;
    align-items: center;
    height: 70px;
    margin-left: 10px;
    margin-right: 10px;
`

const MyOwner = styled.div`
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight : bold;
    width:30%;
`

const FollowBtn = styled.button`
    height: 30px; 
    float: right; 
    border-radius: 20px / 50%;
    background-color: ${props => props.isFollow ? 'LimeGreen' : 'white'};
    border: 2px solid LimeGreen;
    color: ${props => props.isFollow ? 'white' : 'SeaGreen'};
    font-weight : bolder;
    font-size: 14px;
`

function FollowBtnClick () {
    fetch(process.env.REACT_APP_API+'Follower',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': ('Bearer ' + getAuthToken())
        },
        body:{
            
        }
    })
}

export default function ({UsertId, UserName, isFollow}) {
    return(
        <MyFollowArea>
            <img className='img' src={process.env.REACT_APP_IMG_PATH+'Black_color.png'}/>
            <MyOwner>{UserName}</MyOwner>
            <div style={{width:"50%"}}>
                <FollowBtn isFollow={isFollow=='Y'} onClick={FollowBtnClick}>&nbsp;{isFollow=='Y' ? 'Following' : 'Follow'}&nbsp;</FollowBtn>
            </div>
        </MyFollowArea>
    )
}