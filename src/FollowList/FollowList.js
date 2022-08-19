import { useState } from "react"
import styled from "styled-components"
import Follower from "./components/Follower"

const MyFollowList = styled.div`
    border: solid 1px LightGray;
    text-align: center;
`

export default function FollowList() {

    const [users, SetUsers] = useState([]);

    const getData = () => {
        fetch(process.env.REACT_APP_API)
    }

    return(
        <MyFollowList>
            <p>Who you want to follow</p>
        </MyFollowList>
    )
}