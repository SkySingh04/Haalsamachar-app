import React from 'react'

const Comments = ({blogId} : {blogId : Number}) => {
  return (
    <div>
                <h1>{String(blogId)}</h1>
    </div>
  )
}

export default Comments
