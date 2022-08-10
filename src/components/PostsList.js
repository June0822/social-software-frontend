import styled from "styled-components";
import React, { useEffect, useState }  from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MyPost = styled.div`
    max-width: 600px;
    min-width : 400px;
    grid-template-columns: 50px 1fr;
    border-right: solid 1px LightGray;
    border-left: solid 1px LightGray;
    border-bottom: solid 1px LightGray;
    padding: 10px;
`
const Title = styled.div`
    font-weight : bold;
`

const Content = styled.div`
    min-height : 30px;
`

const Image = styled.img`
    border-radius: 50%;
    background-color: white;
    width: 50px;
    height: 50px;
    cursor: pointer;
    object-fit: cover;

`

const Icon = styled.img`
    margin-left : 50px;
    width: 15px;
    height: 15px;
`

function Post(props) {
    return(
        <Container fluid>
            <MyPost>
                <Row>
                    <Col xs={1} style={{minWidth:'50px', marginRight:'10px'}}>
                      <Image src={process.env.REACT_APP_IMG_PATH+'Black_color.png'}/>
                    </Col>
                    <Col>
                        <Title>{props.Title}</Title>
                        <Content>{props.Content}</Content>
                        <div>
                            <Icon src={process.env.PUBLIC_URL + '/icon/chat.png'}/>
                            <Icon src={process.env.PUBLIC_URL + '/icon/heart.png'}/>
                        </div>
                    </Col>
                </Row>
            </MyPost>
        </Container>
    )
}

export default function PostsList() {
    const [data,setData]=useState([]);
    const getData=()=>{
      fetch(process.env.REACT_APP_API+'Post'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setData(myJson)
        });
    }
    useEffect(()=>{
      getData()
    },[])

    return (
        <React.Fragment>
            <div className='d-flex justify-content-center'>
                <div >
                    {
                        data && data.length>0 && data.map((item)=>
                            <Post key={item.PostId} Title={item.Title} Content={item.Content} />
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    );
};