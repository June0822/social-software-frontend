import { useState } from "react";
import styled from "styled-components";

const MyEditModalBody = styled.div`
    margin: 10px;
`

const InputArea = styled.div`
    border: 2px solid;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    color: ${props => props.isFocus ? 'Green' : 'Silver'};
`

const InputTitle = styled.span`
    color: Gray;
`

const Input = styled.textarea`
    resize: none;
    cursor: text;
    border: 0 none;
    height: 100%;
    width: 100%;
    &:focus {
        outline: none;
    }
`
const Limit = styled.div`
    max-width: 540px;
    text-align: right;
    margin: 0 auto;
    font-size: 15px;
    color: gray;
    padding: 2px 5px;
    font-family: Noto Sans TC,sans-serif;
`


export default function EditModalBody (props) {

    const {tempName, setTempName, tempBio, setTempBio} = props

    const [focusName, setFocusName] = useState(false);
    const [focusBio, setFocusBio] = useState(false);

    const nameChange = (e) => {
        setTempName(e.target.value)
    }
    const bioChange = (e) => {
        setTempBio(e.target.value)
    }

    return(
        <MyEditModalBody>
            <InputArea isFocus={focusName}>
                <InputTitle>Name</InputTitle>
                    <Input type="text" rows="1" cols="50" maxLength="10" minLength="1" onFocus={()=>setFocusName(true)} onBlur={()=>setFocusName(false)} 
                    value={tempName}  onChange={nameChange}/>
            </InputArea>
            <Limit>{10-tempName.length} / 10</Limit>
            <InputArea isFocus={focusBio}>
                <InputTitle>Bio</InputTitle>
                    <Input type="text" rows="3" cols="50" maxLength="150" minLength="1" onFocus={()=>setFocusBio(true)} onBlur={()=>setFocusBio(false)} 
                    value={tempBio}  onChange={bioChange}/>
            </InputArea>
            <Limit>{150-tempBio.length} / 150</Limit>
        </MyEditModalBody>
    );
}