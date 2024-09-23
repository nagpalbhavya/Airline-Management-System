import React, { useState, useEffect } from 'react'
import "../css/register.css"
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [formData, setFormData]=useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:''
    })

    const dispatch=useDispatch();
    //const navigate=useNavigate();
    const userStatus=useSelector((state)=>state.user.status)
    const error=useSelector((state)=>state.user.error);
    const registrationMessage=useSelector((state)=>state.user.message)
    const registrationSuccess=useSelector((state)=>state.user.registrationSuccess)

    useEffect(()=>{
        if(registrationSuccess)
        {
            //history.push
        }
    })

    const validPhone=new RegExp('^\\d{10}$')
    const validEmail=new RegExp('^[^\\s@]+@[^\\s@]+\.[^\\s@]+$')

    const [errors, setErrors]=useState({})

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        console.log(formData)
        e.preventDefault();
        const newErrors={};

        if(!formData.firstName)
            newErrors.firstName='*first name is required'
        if(!formData.lastName)
            newErrors.lastName='*last name is required'
        if(!formData.phone)
            newErrors.phone="*phone number is required"
        else if(!validPhone.test(formData.phone))
            newErrors.phone="*phone number must be 10 digits and contain only numbers"
        if(!formData.email)
            newErrors.email="*email is required"
        else if(!validEmail.test(formData.email))
            newErrors.email="*enter a valid email"
        if(!formData.password)
            newErrors.password="*enter a password"

        setErrors(newErrors);

        if(Object.keys(newErrors).length===0)
        {
            dispatch(addUser(formData))
            if(registrationSuccess)
            setFormData({firstName:'',lastName:'',phone:'',email:'',password:''})
        }
    }

    const inputClassName='form-control';

  return (
    <div className='cont'>
        <div className='main'>
            <div className='left-side'>
                <div className='logo'><Logo/></div>
                <button className='back-to-website-button'>Back to website</button>
                {/* add logo, back to website button */}
                <img src="registerImage.png" className='register-image'/>
            </div>
            <div className='right-side'>
                <div className='register-headings'>
                    <h3>Create an Account</h3>
                    <p>Already have an account? <span>Log In</span></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='first-last-name'>
                        <div className='form-floating mb-4'>
                            <input type="text" placeholder='First name' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} name='firstName' value={formData.firstName} onChange={handleChange}></input>
                            <label for='firstName'>First name</label>
                        </div>
                        <div className='form-floating'>
                            <input type="text" placeholder='Last name' className={`form-control ${errors.lastName? 'is-invalid' : ''}`} name='lastName' value={formData.lastName} onChange={handleChange}></input>
                            <label for='lastName'>Last name</label>
                        </div>
                    </div>
                            <div className='form-floating mb-4'>
                            <input type="text" placeholder='Phone number' className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name='phone' value={formData.phone} onChange={handleChange}></input>
                            <label for='phoneNumber'>Phone number</label>
                    </div>
                    <div className='form-floating mb-4'>
                            <input type="text" placeholder='Email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} name='email' value={formData.email} onChange={handleChange}></input>
                            <label for='email'>Email</label>
                    </div>
                    <div className='form-floating mb-4'>
                            <input type="password" placeholder='Password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} name='password' value={formData.password} onChange={handleChange}></input>
                            <label for='password'>Password</label>
                    </div>
                    <div className='' style={{marginBottom:'1rem'}}>
                    {errors.firstName&&<><span className='error'>{errors.firstName}</span><br /></>}
                    {errors.lastName&&<><span className='error'>{errors.lastName}</span><br /></>}
                    {errors.phone&&<><span className='error'>{errors.phone}</span><br /></>}
                    {errors.email&&<><span className='error'>{errors.email}</span><br /></>}
                    {errors.password&&<><span className='error'>{errors.password}</span><br /></>}
                    {console.log(userStatus) }
                    {registrationMessage&&<p style={{fontSize:'18px'}}>{registrationMessage}</p>}
                    </div>
                    <button className='btn btn-primary create-account-button'>Create account</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register