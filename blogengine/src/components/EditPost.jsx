import React, { useEffect, useState } from 'react'
import './Create.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()

  const {id} = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
 

    axios.put('https://blog-app-mern-backend.vercel.app/'+id, {title, description})
    .then(res => {
      if (res.data === "Success"){
        // navigate - doesnt reload the page 
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() =>{
    axios.get(`https://blog-app-mern-backend.vercel.app/${id}`)
    .then(result => {
        setTitle(result.data.title)
        setDescription(result.data.description)
    })
    .catch(err => console.log(err))
  }, [])


  return (
    <div className='post-container'>
      <div className='post-form'>
        <form onSubmit={handleSubmit} >
          <h2>Edit Post</h2>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea 
          value={description}
          name="desc" 
          id="" 
          cols="30" 
          rows="10"
          onChange={e => setDescription(e.target.value)}
          ></textarea>

          {/* <input type="file" className='post-file' placeholder='Select File' onChange={e => setFile(e.target.files[0])} /> */}
          <button>Finish</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
