import styled from "styled-components";
import React, { useEffect, useState }  from "react";

const MyPost = styled.div`
        max-width: 600px;
        grid-template-columns: 50px 1fr;
        border-right: solid 1px LightGray;
        border-left: solid 1px LightGray;
        border-bottom: solid 1px LightGray;
        padding: 15px;
    `
const Title = styled.div`
    font-weight : bold;
`

const Content = styled.div`
    min-height : 50px;
`
function Post(props) {
    return(
        <MyPost>
            <Title>{props.Title}</Title>
            <Content>{props.Content}</Content>
        </MyPost>
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
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
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