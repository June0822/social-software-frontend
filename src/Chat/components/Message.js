import React from 'react';
import styled from 'styled-components';

const LeftDialog = styled.div`
    display: flex;
    height: 60px;
    margin-bottom: 10px;
`
const RightDialog = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 60px;
    margin-bottom: 10px;
    margin-right: 10px;
`
const ProPhoto = styled.img`
    height: 100%;;
    border-radius: 50%;
`
const MessageArea = styled.div`
    height: 70%;
    display: flex;
    align-items: center;
    background: ${props => props.props ? '#8FBC8B' : '#DCDCDC'};
    border-radius: 15px 15px ${props => props.props ? '5px' : '15px'} ${props => props.props ? '15px' : '5px'};
    padding-left: 10px;
    padding-right: 10px;
`
const TimeArea = styled.div`
    display:  flex;
    align-items: center;
    color: Gray;
    font-family: DejaVu Sans Mono, monospace;
    font-size: 14px;
`
const transformTimeFormat = (s, diff) => {
    var year = s.substring(0, 4);
    var date = s.substring(5, 10).replace('-','/');
    var time = s.substring(11, 16);

    let present = new Date();
    var presentYear = present.toString().substring(11, 15);

    if(year != presentYear){
        return (year+date);
    }
    if(diff < 24) { // in one day
        return time;
    }
    return date;

} 
const Message = ({User, item, receiver}) => {

    if(item.Sender == User){
        return(
            <RightDialog>
                <MessageArea props={item.Sender == User}>{item.Message}</MessageArea>
                <TimeArea>{transformTimeFormat(item.Time, item.DateDiff)}</TimeArea>
            </RightDialog>
        )
    }

    return(
        <LeftDialog>
            <ProPhoto src={process.env.REACT_APP_IMG_PATH+receiver.PhotoSrc}/>
            <div style={{marginLeft: '10px'}}>
                <MessageArea props={item.Sender == User}>{item.Message}</MessageArea>
                <TimeArea>{transformTimeFormat(item.Time, item.DateDiff)}</TimeArea>
            </div>
            
        </LeftDialog>
    )
};

export default Message;