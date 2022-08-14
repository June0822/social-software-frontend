import styled from "styled-components"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";

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

const SubmitBtn = styled.button`
    width: 70px;
    height: 40px; 
    float: right; 
    border-radius: 30% / 50%;
    background-color: LimeGreen;
    border: 0px ;
    color: white;
    font-weight : bold;
    font-size: 18px;
`

export default function NewPost({setData}) {

    const [content, setContent] = useState("");

    const delay = (n) => new Promise( r => setTimeout(r, n*1000));

    function contentChange(e) {
        setContent(e.target.value)
    }

    function AddPost() {
        fetch(process.env.REACT_APP_API+'Post',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body:JSON.stringify({
                PostId : 1,
                Content : content,
                Owner : 1,
                CreateDate : 'now'
            })
        })
        .then(res => res.json())
        .then(result => {
            alert("Post succeed")
        },
        (expect) => {
            alert('Post failed');
        })
        .then( async () => {
            await delay(1);
            fetch(process.env.REACT_APP_API+'Post')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setData(data)})
            }
        ).then(
            setContent('')
        )


    }

    return (
        <div>
            <Row>
                <Col xs={1} style={{minWidth:'50px', marginRight:'10px'}}>
                    <img className="img" src={process.env.REACT_APP_IMG_PATH+'Black_color.png'}/>
                </Col>
                <Col>
                    <Input type="text" rows="3" cols="50" maxLength="150" minLength="1" placeholder="How's your day?" value={content} onChange={contentChange} />
                </Col>
            </Row>
            <SubmitBtn onClick={AddPost}>Post</SubmitBtn>
        </div>
    )
};