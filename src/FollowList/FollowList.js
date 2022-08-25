import { useEffect, useState } from "react"
import styled from "styled-components"
import { getAuthToken } from "../Login/components/Cookies"
import Follower from "./components/Follower"

const MyFollowList = styled.div`
    margin-top: 10px;
    border: solid 1px LightGray;
    text-align: center;
    background-color: WhiteSmoke;
`

export default function FollowList({User}) {

    const [users, setUsers] = useState([]);

    const getData = () => {
        fetch(process.env.REACT_APP_API+'Follower',{
            method:"GET",
            headers:{
                "Content-Type": "application/json",
                "accept": "application/json",
                "Authorization": ('Bearer ' + getAuthToken())
            }
        })
        .then(res => res.json())
        .then(data => setUsers(data))
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <MyFollowList>
            <p style={{fontFamily: "'Trebuchet MS', sans-serif", fontSize: "20px"}}>Who you want to follow</p>
            {
                users.map( item => {
                    const { UserId, UserName, isFollow} = item;
                    return <Follower key={UserId} UserId={UserId} UserName={UserName} isFollow={isFollow} User={User} setUsers={setUsers}/>
                })
            }
        </MyFollowList>
    )
}