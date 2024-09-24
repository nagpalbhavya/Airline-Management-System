import React, { useState, useEffect } from 'react'
import "../css/login.css"
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, validateUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {

    const [formData, setFormData]=useState({
        email:'',
        password:''
    })

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const validation=useSelector((state)=>state.user.validation)
    const validationMessage=useSelector((state)=>state.user.validationMessage)
    const error=useSelector((state)=>state.user.error);

    // useEffect(()=>{
    //     if()
    //     {
    //         //history.push
    //     }
    // })

    const validEmail=new RegExp('^[^\\s@]+@[^\\s@]+\.[^\\s@]+$')

    const [errors, setErrors]=useState({})

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
        if(!formData.password)
            newErrors.password="*enter a password"

        setErrors(newErrors);

        if(Object.keys(newErrors).length===0)
        {
            dispatch(validateUser(formData))
            if(validation)
            setFormData({email:'',password:''})
        }
    }

  return (
    <div className='login-cont'>
                <Link to="/" style={{textDecoration:'none', color:'black'}}><h3 className='login-logo'>SUNFLY</h3></Link>
        <div className='login-main'>
            <div className='login-left-side'>
            <div className='login-register-headings'>
                    <h3>Welcome back</h3>
                    <p>New here ? Let's get you <span>registered</span>!</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-floating mb-4'>
                            <input type="text" placeholder='Email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={formData.email} onChange={handleChange}></input>
                            <label for='email'>Email</label>
                    </div>
                    <div className='form-floating mb-4'>
                            <input type="password" placeholder='Password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' value={formData.password} onChange={handleChange}></input>
                            <label for='password'>Password</label>
                    </div>
                    <div className='' style={{marginBottom:'1rem'}}>
                    {errors.email&&<><span className='error'>{errors.email}</span><br /></>}
                    {errors.password&&<><span className='error'>{errors.password}</span><br /></>}
                    {console.log(validationMessage)}
                    {validationMessage&&<p style={{fontSize:'18px'}}>{validationMessage}</p>}
                    </div>

                    <div className='forgot-reset-password'>
                       <Link to="/reset-password" style={{color:'black'}}><p style={{marginBottom:'5px'}}>forgot password</p></Link>
                       <Link to="/reset-password"><p style={{marginBottom:'20px', color:'black'}}>reset password</p></Link>
                    </div>
                    <button className='btn btn-primary login-button'>Login</button>
                </form>
            </div>
            <div className='login-right-side'>
            <div className='logo'><Logo/></div>
                <button className='login-back-to-website-button' onClick={()=>{navigate("/")}}>Back to website</button>
                {/* add logo, back to website button */}
                <img src="registerImage.png" className='register-image'/>
            </div>
        </div>
    </div>
  )
}

export default Login