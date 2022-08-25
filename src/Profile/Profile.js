
import PersonalInfo from "./components/PersonalInfo";
import MyPosts from "./components/MyPosts";
import styled from "styled-components";

const MyProfile = styled.div`
    max-width: 660px;
    border: 1px solid #ddd;
`

export default function Profile () {
    return(
        <MyProfile>
            <PersonalInfo />
            <MyPosts />
        </MyProfile>
    );
}