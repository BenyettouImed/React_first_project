import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  
  const {id} = useParams()
  const deletePost = useStoreActions((actions)=>actions.deletePost);
  const getPostById = useStoreState((state)=>state.getPostById)
  const post = getPostById(id)
  /* const post = posts.find(post => (post.id).toString() === id); */ /* find returns the first matching element while filter returns an array of all matching elements */
  const navigate = useNavigate()

  const handleDelete = async (id) =>{
    deletePost(id);
    navigate('/');
  }

  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
             <>
              <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
                <p className='postBody'>{post.body}</p>
                <Link to={`/edit/${post.id}`} ><button className='editButton'>Edit Post</button></Link>
                <button className='deleteButton' onClick={()=>handleDelete((post.id))}>Delete Post</button>
             </> 
            }
            {!post &&
              <>
                <h2>Post Not Found</h2>
                <p>
                  <Link to={'/'}>Visit our home page</Link>
                </p>
              </>
            }
        </article>
    </main>
  )
}

export default PostPage