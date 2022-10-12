import React from 'react'
import './register.css'
import { LocationOn } from '@mui/icons-material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [success, setSuccess] = useState(true)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleClick = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const respone = await fetch("http://localhost:8087/api/users/register", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
              body: JSON.stringify(user),
            })
        const data = await respone.json()
        if(data){
            navigate("/login")
        }    
        console.log("waah::", data)
    }
    catch(err){
        console.log(err)
        setSuccess(false)
    }
  }

  

  return (
    <div className="registerContainer">
      <div className="wrapper">
        <div className="title">
          <h1 className="text">welcome to Travel Map</h1>
        </div>
        <div className="logo">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="username (minimum length 5)"
              name='username'
              value={user.username}
              required
              onChange={handleClick}
            />
            <input
              className="input"
              type="email"
              placeholder="email"
              name='email'
              value={user.email}
              required
              onChange={handleClick}
            />
            <input
              className="input"
              type="password"
              placeholder="password (minimum lenght 5)"
              name='password'
              value={user.password}
              required
              onChange={handleClick}
            />
            <button className="registerButton" type='submit'>Register</button>
            {!success && <span className="wrong">something went wrong</span>}
          </form>
          <button className="trylogin" onClick={()=>navigate("/login")}>Alreay Register? try Login</button>
        </div>
      </div>
    </div>
  )
}
