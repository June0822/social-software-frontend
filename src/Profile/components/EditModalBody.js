import styled from "styled-components";

const MyEditModalBody = styled.div`
    margin: 10px;
`

const InputArea = styled.div`
    border: 2px solid;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
`

const InputTitle = styled.div`
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
export default function EditModalBody () {
    return(
        <MyEditModalBody>
            <InputArea>
            <InputTitle>Name</InputTitle>
                <Input type="text" rows="1" cols="50" maxLength="10" minLength="1" />
            </InputArea>
            <InputArea>
            <InputTitle>Bio</InputTitle>
                <Input type="text" rows="3" cols="50" maxLength="150" minLength="1" />
            </InputArea>
        </MyEditModalBody>
    );
}