import styled from "styled-components";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../main.css';

const MyOwner = styled.div`
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 20px;
    font-weight : bold;
    width:20%;
`

const MyContent = styled.div`
    min-height : 30px;
`

const Icon = styled.img`
    margin-left : 30px;
    margin-right : 30px;
    width: 15px;
    height: 15px;
`

const MyPostTime = styled.span`
    display:  flex;
    align-items: center;
    width:80%;
    color: Gray;
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

export default function Post({PostId, UserName, Content, CreateDate, CreateTime, TimeDiff}) {
    return(
        <div className="post">
            <Row>
                <Col xs={1} style={{minWidth:'50px', marginRight:'10px'}}>
                    <img className="img" src={process.env.REACT_APP_IMG_PATH+'Black_color.png'}/>
                </Col>
                <Col>
                    <Row>
                        <MyOwner>{UserName}</MyOwner>
                        <MyPostTime>- {CalculateTimeDiff(TimeDiff)}</MyPostTime>
                    </Row>
                    <MyContent>{Content}</MyContent>
                    <div>
                        <Icon src={process.env.PUBLIC_URL + '/icon/chat.png'}/>
                        <Icon src={process.env.PUBLIC_URL + '/icon/heart.png'}/>
                    </div>
                </Col>
            </Row>
        </div>
    )
};