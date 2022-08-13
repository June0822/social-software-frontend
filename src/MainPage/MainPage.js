import React, { useEffect, useState }  from "react";
import AddPost from "./components/AddPost";
import PostsList from "./components/PostList";

export default function MainPage() {

    const [data, setData] = useState([]);

    const getData = () => {
        fetch(process.env.REACT_APP_API+'Post')
        .then(res => res.json())
        .then(data => {
            setData(data)})
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <AddPost setData={setData}/>
            <PostsList data={data}/>
        </div>
    );
};