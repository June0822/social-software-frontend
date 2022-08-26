import { useState } from "react";
import styled from "styled-components";

import "../main.css"

import EditProfile from "./EditProfile";

const CoverPhoto = styled.img`
    position:absolute;
    width: 100%;
    min-height: 200px;
    z-index:1;
`
const ProPhoto = styled.img`
    position: absolute;
    top:130px;
    left:20px;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    border: 5px solid #fff;
    z-index:2;
`
const BtnArea = styled.div`
    position: absolute;
    top:210px;
    right:20px;
`
const EditBtn = styled.button`
    height: 40px; 
    float: right; 
    border-radius: 20px / 50%;
    background-color: ${props => props.isFollow ? 'LimeGreen' : 'white'};
    border: 2px solid LimeGreen;
    color: ${props => props.isFollow ? 'white' : 'SeaGreen'};
    font-weight : bolder;
    font-size: 18px;
`
const MyProfile = styled.div`
    margin-top: 5px;
    margin-left: 10px;
`
const MyUser = styled.div`
    margin-top: 5px;
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 24px;
    font-weight : 900;
`
const MyBio = styled.div`
    margin-top: 10px;
    font-family: 'Arial Narrow', sans-serif;
    color:DimGray;
    font-weight : bold;
`
const MyFollowBar = styled.div`
    margin-top: 5px;
    color:DimGray;
    font-weight : bold;
`
export default function PersonalInfo () {

    const [editProfileShow, setEditProfileShow] = useState(false);

    const handleShow = () => setEditProfileShow(true);
    const handleClose = () => setEditProfileShow(false);

    return(
        <div>
            <div style={{height:"30px"}}></div>
            <div style={{position: "relative", height: "270px"}}>
                <CoverPhoto src={process.env.REACT_APP_IMG_PATH+'CoverPhoto1.png'} />
                <ProPhoto src={process.env.REACT_APP_IMG_PATH+'ProPhoto1.png'}/>
                <BtnArea><EditBtn onClick={handleShow}>Edit profile</EditBtn></BtnArea>
                <EditProfile show={editProfileShow} handleClose={handleClose} />
            </div>
            <MyProfile>
                <MyUser>User1</MyUser>
                <MyBio>Bio</MyBio>
                <MyFollowBar>3 Following&ensp;&ensp;&ensp;0 Follower</MyFollowBar>
            </MyProfile>
        </div>
    );
}