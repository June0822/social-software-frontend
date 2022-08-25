import '../../MainPage/main.css';
import styled from "styled-components";
import { getAuthToken } from '../../Login/components/Cookies';

const MyFollowArea = styled.div`
    display: flex;
    align-items: center;
    height: 70px;
    margin-left: 10px;
    margin-right: 10px;
    border-top: 2px solid gray;
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


export default function ({UserId, UserName, isFollow, User, setUsers}) {
    
    const delay = (n) => new Promise( r => setTimeout(r, n*1000));

    function FollowBtnClick () {
        fetch(process.env.REACT_APP_API+'Follower',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ('Bearer ' + getAuthToken())
            },
            body:JSON.stringify({
                Active: User,
                Passive: UserId,
                Action: (isFollow=='Y' ? 'Unfollow' : 'Follow')
            })
        })
        .then(res => res.json())
        .then( async () => {
            await delay(1);
            fetch(process.env.REACT_APP_API+'Follower',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': ('Bearer ' + getAuthToken())
                }
            })
            .then(res => res.json())
            .then(data => setUsers(data))
        })
    }
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