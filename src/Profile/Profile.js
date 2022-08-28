
import PersonalInfo from "./components/PersonalInfo";
import MyPosts from "./components/MyPosts";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { getAuthToken } from "../Login/components/Cookies";

const MyProfile = styled.div`
    max-width: 660px;
    border: 1px solid #ddd;
`

export default function Profile ({user}) {

    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [coverPhotoSrc, setCoverPhotoSrc] = useState('Black_color.png');
    const [profilePhotoSrc, setProfilePhotoSrc] = useState('Black_color.png');

    const getData = () => {
        fetch(process.env.REACT_APP_API+'Profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ('Bearer ' + getAuthToken())
            }
        })
        .then(res => res.json())
        .then(data => {
            setName(data[0].Nickname);
            setBio(data[0].Bio);
            setFollowing(data[0].Following);
            setFollowers(data[0].Followers);
            setCoverPhotoSrc(data[0].CoverPhotoSrc);
            setProfilePhotoSrc(data[0].ProfilePhotoSrc);
        })
    }

    useEffect(()=>{
        getData();
    }, []);

    const propsObj = {
        user: user,
        name: name,
        setName: setName,
        bio: bio,
        setBio: setBio,
        following: following,
        followers: followers,
        coverPhotoSrc: coverPhotoSrc,
        setCoverPhotoSrc: setCoverPhotoSrc,
        profilePhotoSrc: profilePhotoSrc,
        setProfilePhotoSrc: setProfilePhotoSrc
    }

    return(
        <MyProfile>
            <PersonalInfo {...propsObj}/>
            {/* <MyPosts /> */}
        </MyProfile>
    );
}