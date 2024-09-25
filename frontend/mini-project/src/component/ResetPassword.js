import React from 'react'
import { useState } from 'react'
import '../css/forgotPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, validateUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

  const [formData, setFormData]=useState({
    email:'',
    newPassword:'',
    oldPassword:''
  })
  const [errors, setErrors]=useState({})
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const validationMessage=useSelector((state)=>state.user.validationMessage)
  const validationState=useSelector((state)=>state.user.validation)
  const validEmail=new RegExp('^[^\\s@]+@[^\\s@]+\.[^\\s@]+$')

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        console.log(formData)
        e.preventDefault();
        const newErrors={};

        if(!formData.email)
            newErrors.email="*email is required"
        else if(!validEmail.test(formData.email))
            newErrors.email="*enter a valid email"
        if(!formData.newPassword||!formData.oldPassword)
            newErrors.password="*enter a password"

        setErrors(newErrors);

        if(Object.keys(newErrors).length===0)
        {
          let credentials={
            email:formData.email,
            password:formData.oldPassword
          }
            dispatch(validateUser(credentials))
            if(validationState)
            {
              credentials={
                email:formData.email,
                password:formData.newPassword
              }
              dispatch(resetPassword(credentials))
              if(validationMessage==='Login Successful')
              {
                navigate('/login')
              }
            }
        }
    }

  return (
    <div className='fp-main'>
      <h2 className='logo' style={{paddingTop:'20px', paddingLeft:'50px'}}>SUNFLY</h2>
      <form className='fp-form' onSubmit={handleSubmit}>
                    <div className='form-floating mb-4'>
                            <input type="text" placeholder='Email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={formData.email} onChange={handleChange}></input>
                            <label for='email'>Email</label>
                    </div>
                    <div className='form-floating mb-4'>
                            <input type="password" placeholder='Old Password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='oldPassword' value={formData.oldPassword} onChange={handleChange}></input>
                            <label for='password'>Old Password</label>
                    </div>
                    <div className='form-floating mb-4'>
                            <input type="password" placeholder='New Password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='newPassword' value={formData.newPassword} onChange={handleChange}></input>
                            <label for='password'>New Password</label>
                    </div>
                    <div className='' style={{marginBottom:'1rem'}}>
                    {errors.email&&<><span className='rp-error'>{errors.email}</span><br /></>}
                    {errors.password&&<><span className='rp-error'>{errors.password}</span><br /></>}
                    {validationMessage&&<p style={{fontSize:'18px', color:'white'}}>{validationMessage}</p>}
                    </div>
                    <button className='btn btn-primary fp-reset-button'>Create New Password</button>
                </form>
    </div>
  )
}

export default ResetPassword