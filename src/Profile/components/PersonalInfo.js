import { useEffect, useState } from "react";
import styled from "styled-components";

import "../main.css"
import { getAuthToken } from "../../Login/components/Cookies";

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
    background-color: white;
    border: 2px solid LimeGreen;
    color: SeaGreen;
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
    color:Black;
    font-weight : bold;
`
const MyFollowBar = styled.div`
    margin-top: 5px;
    color:DimGray;
    font-weight : bold;
`
export default function PersonalInfo (props) {

    const {user, name, setName, bio, setBio, following, followers, coverPhotoSrc, setCoverPhotoSrc, profilePhotoSrc, setProfilePhotoSrc} = props;

    const [editProfileShow, setEditProfileShow] = useState(false);
    const [tempName, setTempName] = useState(name);
    const [tempBio, setTempBio] = useState(bio);
    const [tempCover, setTempCover] = useState([,process.env.REACT_APP_IMG_PATH+coverPhotoSrc]);//[file, tempUrl]
    const [tempProfile, setTempProfile] = useState([,process.env.REACT_APP_IMG_PATH+profilePhotoSrc]);

    const handleShow = () => {
        setEditProfileShow(true)
    };
    const handleClose = () => {
        setEditProfileShow(false);
        setTempName(name);
        setTempBio(bio);
        setTempCover([,process.env.REACT_APP_IMG_PATH+coverPhotoSrc]);
        setTempProfile([,process.env.REACT_APP_IMG_PATH+profilePhotoSrc]);
    };

    const saveData = (nickname, bio) => {
        fetch(process.env.REACT_APP_API+'Profile', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': ('Bearer ' + getAuthToken())
            },
            body: JSON.stringify({
                Nickname: nickname,
                Bio: bio
            })
        })
        // .then(res => res.json())
        // .then(data => alert(data))
        
        if(tempCover[0]!==undefined){

            const formData = new FormData();
            formData.append('formFile', tempCover[0])

            fetch(process.env.REACT_APP_API+'Profile/SaveCoverFile', {
                method: 'POST',
                headers: {
                    'Authorization': ('Bearer ' + getAuthToken())
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => setCoverPhotoSrc(res))
        }
        if(tempProfile[0]!==undefined){

            const formData = new FormData();
            formData.append('formFile', tempProfile[0])

            fetch(process.env.REACT_APP_API+'Profile/SaveProfileFile', {
                method: 'POST',
                headers: {
                    'Authorization': ('Bearer ' + getAuthToken())
                },
                body: formData
            })
            .then(res => res.json())
            .then(res => setProfilePhotoSrc(res))
        }
    }

    const handleSave = (event, tempName, tempBio) => {
        setEditProfileShow(false);
        saveData(tempName, tempBio);
        setName(tempName);
        setBio(tempBio);
    }

    useEffect(()=>{
        setTempName(name);
        setTempBio(bio);
        setTempCover([,process.env.REACT_APP_IMG_PATH+coverPhotoSrc]);
        setTempProfile([,process.env.REACT_APP_IMG_PATH+profilePhotoSrc]);
    }, [name, bio, coverPhotoSrc, profilePhotoSrc]);

    const propsObj = {
        user: user,
        show: editProfileShow,
        handleClose: handleClose,
        handleSave: handleSave,
        tempName: tempName,
        setTempName: setTempName,
        tempBio: tempBio,
        setTempBio: setTempBio,
        tempCover: tempCover,
        setTempCover: setTempCover,
        tempProfile: tempProfile,
        setTempProfile: setTempProfile
    }

    return(
        <div>
            <div style={{height:"30px"}}></div>
            <div style={{position: "relative", height: "270px"}}>
                <CoverPhoto src={process.env.REACT_APP_IMG_PATH+coverPhotoSrc} />
                <ProPhoto src={process.env.REACT_APP_IMG_PATH+profilePhotoSrc}/>
                <BtnArea><EditBtn onClick={handleShow}>Edit profile</EditBtn></BtnArea>
                <EditProfile {...propsObj}/>
            </div>
            <MyProfile>
                <MyUser>{user}<span style={{fontSize:"20px", color:"DimGray"}}>&ensp;@{name}</span></MyUser>
                <MyBio>{bio}</MyBio>
                <MyFollowBar>{following} Following&ensp;&ensp;&ensp;{followers} Followers</MyFollowBar>
            </MyProfile>
        </div>
    );
}