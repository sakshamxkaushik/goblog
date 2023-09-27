import React, { useState } from 'react'
import './LoginRegister.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('https://blog-app-mern-backend.vercel.app/register', {username, email, password})
    .then(res => navigate('/login'))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='signup-container'>
        <h2>Sign Up</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">
                    Username: 
                </label><br />
                <input type="text" onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">
                    Email: 
                </label><br />
                <input type="email" onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">
                    Password: 
                </label><br />
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <button className='signup-btn' >Submit</button>

            
        </form>
        <br></br>
        <p>Already have an account? </p>
        <button className='login-btn'><Link to='/login' >Login</Link></button> 
      </div>

    </div>
  )
}

export default Register
