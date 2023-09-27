import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { userContext } from '../App'
import axios from 'axios'


function Navbar() {

  const user = useContext(userContext)
  const navigate = useNavigate()

  const handleLogout = () =>{
    axios.get('https://blog-app-mern-backend.vercel.app/logout')
    .then (res => {
      if (res.data === "Success")
      // navigate to the same page (refresh)
      navigate(0)
    }).catch(err => console.log (err))
  }


  return (
    <div className='navbar'>
        <div className='navbar-left'><Link to='/'><h3>Blog App</h3></Link></div>
        <div className='nav-center'>
            <ul>
                <Link to='/' >Home</Link>
                {
                  user.username 
                  ?
                  <Link to='/create' >Create</Link>
                  :
                  <></>

                }
                <Link to='/' >Contact</Link>
            </ul>

        </div>

        {
          user.username
          ?
          <div>
            
            <input className='btn_logout' onClick={handleLogout} type="button" value="Logout" />
          </div>
          :

          <div className="nav-right">
            <Link to='/login' className='registerLink'>Register / Login</Link>
          </div>
        }

    </div>
  )
}

export default Navbar
