import React, { useEffect, useState, useRef }  from "react";
import AddPost from "./components/AddPost";
import PostsList from "./components/PostList";
import { getAuthToken } from "../Login/components/Cookies";

export default function MainPage({user}) {

    const [data, setData] = useState([]);

    const getData = () => {
        fetch(process.env.REACT_APP_API+'Post',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ('Bearer ' + getAuthToken())
            }
        })
        .then(res => res.json())
        .then(data => setData(data))
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <AddPost setData={setData} user={user} />
            <PostsList data={data} />
        </div>
    );
};