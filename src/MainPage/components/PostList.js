import React, { useEffect, useState }  from "react";
import Post from './Post'

export default function PostsList( {data} ) {
    return (
        <React.Fragment>
            <div className='d-flex justify-content-center'>
                <div >
                    {
                        data.map((item)=> {
                            const { PostId, UserName, Content, CreateDate, CreateTime, DateDiff} = item;
                            return <Post key={PostId} UserName={UserName} Content={Content} CreateDate={CreateDate} CreateTime={CreateTime} TimeDiff={DateDiff}/>
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
};