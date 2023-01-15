import { useState, useEffect } from "react"
import styled from "styled-components"

import { getAuthToken } from "../../Login/components/Cookies";

const MySingleContact = styled.div`
    border-bottom: solid 1px LightGray;
    height: 60px;
    display: flex;
`
const ProPhoto = styled.img`
    height: 100%;;
    border-radius: 50%;
    border: 5px solid #fff;
`
const MyName = styled.div`
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight : bold;
    width: 80%;
`
const MyTime = styled.div`
    display:  flex;
    align-items: center;
    color: Gray;
    font-family: DejaVu Sans Mono, monospace;
    font-size: 14px;
`
const MyMessage = styled.div`
    display:  flex;
    align-items: center;
    font-family: 'Arial Narrow', sans-serif;
    color:gray;
    width: 80%;
`
//number of unread
const MyNOU = styled.div` 
    width: 25px;
    height: 25px;
    font-size: 10px;
    align-items: center;
    text-align: center;
    border: solid Crimson;
    border-radius: 50%;
    font-family: 'Arial Narrow', sans-serif;
    font-weight : bold;
    color:Crimson;
`
export default function SingleContact({UserName, ProfilePhotoSrc, Time, Message, NOU}) {

    return(
        <MySingleContact>
            <ProPhoto src={process.env.REACT_APP_IMG_PATH+ProfilePhotoSrc}/>
            <div style={{width: "100%"}}>
                <div style={{display: "flex", width: "100%", height: "50%"}}>
                    <MyName>{UserName}</MyName>
                    <MyTime>{Time}</MyTime>
                </div>
                <div style={{display: "flex", width: "100%", height: "50%"}}>
                    <MyMessage>{Message}</MyMessage>
                    <MyNOU>{NOU}</MyNOU>
                </div>
            </div>
            
        </MySingleContact>
    )
}