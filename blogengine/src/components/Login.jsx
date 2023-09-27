import React, {useState} from 'react'
import './LoginRegister.css'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('https://blog-app-mern-backend.vercel.app/login', {email, password})
    .then(res => {
      if (res.data === "Success"){
        // to reload the page 
        window.location.href = "/"
      }
    })
    .catch(err => console.log(err))
  }

  

  return (
    <div>
      <div className='signup-container'>
        <h2 >Login</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
            
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
        <p>Don't have an account? </p>
        <button className='login-btn'><Link to='/register' >Register</Link></button> 
      </div>

    </div>
  )
}

export default Login
