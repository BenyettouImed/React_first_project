import React from 'react'
import { useEffect,/* useContext */ } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from 'date-fns'
const EditPost = () => {
  
  
  const editTitle = useStoreState((state)=>state.editTitle);
  const editBody = useStoreState((state)=>state.editBody);

  const editPost = useStoreActions((actions)=>actions.editPost)
  const setEditTitle = useStoreActions((actions)=>actions.setEditTitle)
  const setEditBody = useStoreActions((actions)=>actions.setEditBody)

    const {id} = useParams()
    const getPostById = useStoreState((state)=>state.getPostById)
    const post = getPostById(id)
    const navigate = useNavigate()
    useEffect(()=>{
        if (post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])
    const handleEdit = async (id)=>{
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id,title:editTitle,datetime,body:editBody}
        editPost(updatedPost);
        navigate(`/post/${id}`);
        /* try{
          const response = await api.put(`/posts/${id}`,updatedPost);
          setPosts(posts.map(post => parseInt(post.id) === parseInt(id) ? {...response.data} : post )) // the 3 dots here mean that the post with post.id===id will have the same properties as response.data
          setEditTitle('');
          setEditBody('');
          navigate('/');
        }
        catch(err){
          console.log(err);
        } */
      }
  return (
    <main className='NewPost'>
    {editTitle && 
    <>
        <h2>Edit Post:</h2>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input type="text"  id="postTitle" required value={editTitle} onChange={(e)=>setEditTitle(e.target.value)} />
            <label htmlFor="postBody">Post:</label>
            <textarea id="postBody" required value={editBody} onChange={(e)=>setEditBody(e.target.value)}/>
              <button type='button' onClick={()=>handleEdit((post.id))}>Submit</button>

        </form>
    </> 
    }
    {!editTitle &&
    <>
    
        <h2>Post Not Found</h2>
        <p>
            <Link to={'/'}>Visit Our Home Page</Link>
        </p>
    </>
        
    }
    </main>
  )
}

export default EditPost
