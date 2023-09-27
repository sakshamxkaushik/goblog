import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Post.css'
import { userContext } from '../App'

function Post() {

  //useParams - we will use it to take the id from url
  const {id} = useParams()
  const [post, setPost] = useState({})
  const navigate = useNavigate()
  const user = useContext(userContext)

  useEffect(() =>{
    axios.get(`https://blog-app-mern-backend.vercel.app/getPostById/${id}`)
    .then(result => setPost(result.data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (id) =>{
    axios.delete(`https://blog-app-mern-backend.vercel.app/deletePost`, {id: id}).then(result => {
      navigate('/')
    })
    .catch(err => console.log(err))
  }
 
  return (
    <div className="post-all">

    <div className='post-all-container'>
      <div className='post-content'>
      <h2>{post.title}</h2>
        <img src={`http://localhost:3001/Images/${post.file}`} alt="" />

          {
            user.email === post.email
            ?
            <div className="btns">
              <Link className='post-edit' to={`/editPost/${post._id}`} >Edit</Link>
              <Link className='post-del' onClick={e => handleDelete(post._id)}>Delete</Link>
              
            </div>
            : <></>
          }

          <p>{post.description}</p>

      </div>
    </div>
  </div>
  )
}

export default Post
