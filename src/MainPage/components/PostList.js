import React from "react";
import Post from './Post'

export default function PostsList( {data, setData} ) {
    return (
        <React.Fragment>
            <div className='d-flex justify-content-center'>
                <div >
                    {
                        data.map((item)=> {
                            const { PostId, UserName, Content, CreateDate, CreateTime, DateDiff, ProfilePhotoSrc, isLiked, LikeCount} = item;
                            return <Post key={PostId} PostId={PostId} UserName={UserName} Content={Content} CreateDate={CreateDate} CreateTime={CreateTime} 
                                    TimeDiff={DateDiff} ProfilePhotoSrc={ProfilePhotoSrc===null ? 'Black_color.png' : ProfilePhotoSrc}
                                    isLiked={isLiked} LikeCount={LikeCount} />
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    );
};