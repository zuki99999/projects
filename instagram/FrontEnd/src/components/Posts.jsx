import React from 'react'
import Post from './post'

function Posts
() {
  return (
    <>
      {[1,2,3,4,5,8,7,6,4,9].map((item, index)=>{
        return(
          <div key={index}>
            <Post/>
          </div>
        )
      })}
      
    </>
  )
}

export default Posts

