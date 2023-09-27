import React, { useContext, useState } from 'react'
import './Create.css'
import axios from 'axios'
import { userContext } from '../App'


function Create() {

  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const user = useContext(userContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('file', file)
    formData.append('email', user.email)

    axios.post('http://127.0.0.1:8080/api/create_blog', formData)
    .then(res => {
      if (res.data === "Success"){
        // to reload the page 
        window.location.href = "/"
      }
    })
    .catch(err => console.log(err))
  }


  return (
    <div className='post-container'>
      <div className='post-form'>
        <form onSubmit={handleSubmit} >
          <h2>Create Post</h2>
          <input type="text" placeholder='Enter Title*' onChange={e => setTitle(e.target.value)} />
          <textarea 
          placeholder='Add Description' 
          name="desc" 
          id="" 
          cols="30" 
          rows="10"
          onChange={e => setDescription(e.target.value)}
          ></textarea>

          <input type="file" className='post-file' placeholder='Select File' onChange={e => setFile(e.target.files[0])} />
          <button>Post</button>
        </form>
      </div>
    </div>
  )
}

export default Create
