import { useEffect, useState } from "react"
import styled from "styled-components"
import { getAuthToken } from "../Login/components/Cookies"
import Follower from "./components/Follower"

const MyFollowList = styled.div`
    margin-top: 10px;
    border: solid 1px LightGray;
    text-align: center;
`

export default function FollowList() {

    const [users, SetUsers] = useState([]);

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
        .then(data => SetUsers(data))
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <MyFollowList>
            <p>Who you want to follow</p>
            {
                users.map( item => {
                    const { UsertId, UserName, isFollow} = item;
                    return <Follower key={UsertId} UsertId={UsertId} UserName={UserName} isFollow={isFollow}/>
                })
            }
        </MyFollowList>
    )
}