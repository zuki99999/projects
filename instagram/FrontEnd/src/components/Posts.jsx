import React from 'react'
import Post from './post';


function Posts() {
  return (
    <div className=''>
        <div>

        {
    [1,2,3,4,5].map(()=>{
        return(

            <Post/>
        )
    })}

 </div>

    </div>
  )
}

export default Posts;
