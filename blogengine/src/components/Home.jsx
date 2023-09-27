import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Home.css'

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() =>{
    axios.get('https://blog-app-mern-backend.vercel.app/getPosts')
    .then(posts => {
      setPosts(posts.data)
      // console.log(posts.data)
      
    })
    .catch(err => console.log(err))

  }, [])


  return (
    <div>
      <div className='home-screen'>
        <h1>Blog Posts</h1>
      {
          posts.map(post =>(
            <Link to={`/post/${post._id}`}>
              <div className='container'>
                
                <div className="post">
                  <img src={`http://localhost:3001/Images/${post.file}`} alt="" />
                  <div className="post-text">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
      }
      </div>
      
    </div>
  )
}

export default Home
