import styled from "styled-components";

import {MdAddAPhoto as InputIcon} from "react-icons/md";

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
    z-index:3;
`

const InputCoverPhoto = styled.div`
    position: absolute;
    width: 100%;
    min-height: 200px;
    z-index:2;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputProfilePhoto = styled.div`
    position: absolute;
    top:130px;
    left:20px;
    height: 140px;
    width: 140px;
    z-index:4;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InputArea = styled.label`
    width: 50px;
    height: 50px;
    background-color: rgb(0, 0, 0, 0.2);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`

const Input = styled.input`
    display: none;    
`

export default function EditModalTitle (props) {

    const {user, tempCover, setTempCover, tempProfile, setTempProfile} = props

    function handleCoverFileSelected(event){
        event.preventDefault();

        if(event.target.files.length===0) return;

        setTempCover([event.target.files[0], URL.createObjectURL(event.target.files[0])]);

    }
    function handleProfileFileSelected(event){
        event.preventDefault();

        if(event.target.files.length===0) return;

        setTempProfile([event.target.files[0], URL.createObjectURL(event.target.files[0])]);

    }

    return(
        <div style={{position: "relative", height: "270px"}}>
            <CoverPhoto src={tempCover[1]} />
            <InputCoverPhoto>
                <InputArea >
                    <InputIcon />
                    <Input type='file' onChange={(event)=>handleCoverFileSelected(event)}/>
                </InputArea>
            </InputCoverPhoto>
            <ProPhoto src={tempProfile[1]}/>
            <InputProfilePhoto>
                <InputArea >
                    <InputIcon />
                    <Input type='file' onChange={(event)=>handleProfileFileSelected(event)}/>
                </InputArea>
            </InputProfilePhoto>
        </div>
    )
}