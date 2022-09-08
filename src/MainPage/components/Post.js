import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../main.css';

import { getAuthToken } from "../../Login/components/Cookies";

import { BsChatLeft as CommentIcon, BsHeartFill as FillHeart, BsHeart as OutlineHeart} from "react-icons/bs";
import { useState } from "react";
const MyOwner = styled.div`
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight : bold;
    width:20%;
`
const MyContent = styled.div`
    min-height : 30px;
`
const IconArea = styled.div`
    display:  flex;
    font-family: DejaVu Sans Mono, monospace;
`
const Icon = styled.div`
    display:  flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-left : 30px;
    margin-right : 20px;
    color: ${props => props.props==='Y' ? props.color : 'Gray'};
`
const HeartArea = styled.div`
    display:  flex;
    &:hover {
        cursor: pointer;
        color: rgb(200, 30, 57 );
        & > ${Icon} {
            border-radius: 50%;
            background-color: ${props => props.props==='Y' ? 'white' : 'Pink'};
            color: rgb(200, 30, 57 );
        }
    }
`
const Span = styled.span`
    ${props => props.props==='Y' ? 'color:rgb(200, 30, 57 )' : ''};
`
const MyPostTime = styled.span`
    display:  flex;
    align-items: center;
    width:80%;
    color: Gray;
    font-family: DejaVu Sans Mono, monospace;
`
const CommentArea = styled.div`
    display:  flex;
    &:hover {
        cursor: pointer;
        color: DodgerBlue;
        & > ${Icon} {
            border-radius: 50%;
            background-color: PaleTurquoise;
            color: DodgerBlue;
        }
    }
`

function CalculateTimeDiff(Hours) {
    var num = 0;
    var string = "";
    var Days = Math.floor(Hours / 24);

    switch (true) {
        case (Days>=365) :
            num = Math.floor(Days/365);
            string =  num < 1 ? " year ago" : " years ago"
            return (num+string)
        case (Days>=31) :
            num = Math.floor(Days/31);
            string =  num < 1 ? " month ago" : " months ago"
            return (num+string)
        case (Days>=7) :
            num = Math.floor(Days/7);
            string =  num < 1 ? " week ago" : " weeks ago"
            return (num+string)
        case (Days>=1) :
            num = Days/1;
            string =  num < 1 ? " day ago" : " days ago"
            return (num+string)
        default:
            return Hours+" h";
    }
}

export default function Post({PostId, UserName, Content, CreateDate, CreateTime, TimeDiff, ProfilePhotoSrc, isLiked, LikeCount}) {
    
    const IconSize = 12;

    const [liked, setLiked] = useState(isLiked);
    const [likedCount, setLikedCount] = useState(LikeCount);

    const like = () => {
        fetch(process.env.REACT_APP_API+'Post/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ('Bearer ' + getAuthToken())
            },
            body: JSON.stringify({
                PostId: PostId,
                Action: liked==='Y' ? 'cancel' : 'like'
            })
        })
        .then(()=>{
            setLikedCount(likedCount + (liked==='Y' ? -1 : 1))
            setLiked(liked==='Y' ? 'N' : 'Y')
        })
    }

    return(
        <div className="post">
            <Row>
                <Col xs={1} style={{minWidth:'50px', marginRight:'10px'}}>
                    <img className="img" src={process.env.REACT_APP_IMG_PATH+ProfilePhotoSrc}/>
                </Col>
                <Col>
                    <Row>
                        <MyOwner>{UserName}</MyOwner>
                        <MyPostTime>- {CalculateTimeDiff(TimeDiff)}</MyPostTime>
                    </Row>
                    <MyContent>{Content}</MyContent>
                    <IconArea>
                        <CommentArea>
                            <Icon><CommentIcon size={IconSize}/></Icon>
                            <Span> 0 </Span>
                        </CommentArea>
                        <HeartArea props={liked} onClick={()=>like()}>
                            <Icon  props={liked} color={'rgb(200, 30, 57 )'}>{liked==='Y' ? <FillHeart size={20}/> : <OutlineHeart size={IconSize}/>}</Icon>
                            <Span props={liked}>{likedCount}</Span>
                        </HeartArea>
                    </IconArea>
                </Col>
            </Row>
        </div>
    )
};