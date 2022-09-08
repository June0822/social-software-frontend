import styled from "styled-components";
import NewPost from "./NewPost";
import "../main.css"

const Title = styled.p`
    font-size : 20px;
    font-weight : bold;
`

export default function AddPost({setData, user, ProfilePhotoSrc}) {
    return(
        <div className='d-flex justify-content-center'>
            <div className="post">
                <Title>Home</Title>
                <NewPost setData={setData} user={user}/>
            </div>   
        </div>
    )
};