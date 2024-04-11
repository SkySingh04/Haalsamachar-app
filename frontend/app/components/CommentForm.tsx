import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const CommentForm = ({blogId, userId}  : {blogId : Number , userId  : Number} ) => {
    return (
        <div>
            <SimpleMDE className='' />;
            <h1>{String(blogId)}</h1>
            <h1>{String(userId)}</h1>
        </div>
    )
}

export default CommentForm
