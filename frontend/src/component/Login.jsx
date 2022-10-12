import React from 'react'
import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [success, setSuccess] = useState(true)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleClick = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(user)
    try{
        const respone = await fetch("http://localhost:8087/api/users/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
              body: JSON.stringify(user),
            })
        const data = await respone.json()
        if(data){
            localStorage.setItem("currentUser", data.username)
            navigate("/")

        }    
        
    }
    catch(err){
        console.log(err)
        setSuccess(false)
    }
  }



  return (
    <div className="registerContainer">
      <div className="wrapper-login">
        <div className="title-login">
          <h1 className="text-login">Just a step away!</h1>
        </div>
        <div className="logo-login">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name='username'
              value={user.username}
              placeholder="username"
              onChange={handleClick}
              required
            />
            <input
              className="input"
              type="password"
              name='password'
              value={user.password}
              onChange={handleClick}
              placeholder="password"
              required
            />
            <button className="registerButton" type='submit'>Login</button>
            {!success && <span className="wrong">something went wrong</span>}
          </form>
        </div>
      </div>
    </div>
  )
}
