import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../../services/ApiEndPoint';
import {toast} from 'react-hot-toast'

export default function Login() {
  const navigate=useNavigate()
  const [value, setValue] = useState({
    email: "",
    password: ""
  })


  const handlechange =(e)=>{
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const request= await post('https://notes-server-two.vercel.app/auth/login',value)
      const reposne= request.data
      if(reposne.success){
        toast.success(reposne.message)
        navigate('/')
      }
      console.log('res',reposne)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      
      }
      console.log(error)
    }
  }



  return (
    <div className='container min-vh-100 d-flex justify-content-center align-items-center '>
      <div className='form-container border shadow p-5 rounded-4 bg-white'>
        <h2 className='text-center mb-4 fw-bold'>Login</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label htmlFor="email" className='form-label'>Email</label>

            <input type="email" name='email' className="form-control" value={value.email} onChange={handlechange} placeholder="Email" aria-label="Email" aria-describedby="basic-addon2" />
          </div>

          <div className='form-group mb-3'>

            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" name='password' value={value.password} onChange={handlechange} className='form-control' placeholder='Enter your password' id="password" />
          </div>

          <button className='btn btn-success w-100 mb-3'>Login</button>

          <div className='text-center'>
            <p>Don't have an account? <Link to={'https://notes-server-two.vercel.app/register'}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
