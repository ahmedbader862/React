import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { auth } from '../../Contexts/AuthContext';
import { useSelector } from 'react-redux';







export default function Register() {


    
    const curentLange = useSelector((state) => state.lange.lange);  

    const  text = useSelector((state) => state.lange[curentLange]);  
   
    let navigate = useNavigate()
    let { setLogin } = useContext(auth)
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')

    function handleRegister(values) {
        setLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then(({ data }) => {
                console.log(data)

                setMsg('')
                setLoading(false)
                localStorage.setItem('userToken', data.token)
                setLogin(data.token)
                navigate('/login')
            })

            .catch((err) => {
                setMsg(err?.response?.data?.message)
                setLoading(false)
            })


    }





    let validationSchema = Yup.object({
        name: Yup.string().min(2, 'min length is 2').max(10, 'max length is 10').required('name is required'),
        email: Yup.string().email().required('email is required'),
        password: Yup.string()
        .matches(/^(?=[^A-Z]*[A-Z][^A-Z]*).*$/, 'Password must contain exactly one uppercase letter')
        .required('Password is required'),
      
      rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
      
        phone: Yup.string().matches(/^01[0-25][0-9]{8}$/).required('phone is required')
    })



    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },

        validationSchema,
        onSubmit: handleRegister
    })

    return (
       <>
        <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
  <h2 className="text-2xl font-semibold mb-6">{text.registerNow}</h2>

  {msg && (
    <div className="w-1/2 mx-auto p-4 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
      <span className="font-medium">{msg}</span>
    </div>
  )}

  <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
    {/* Name Input */}
    <div className="relative w-full mb-5">
      <label htmlFor="name" className="absolute left-3 top-[-10px] text-sm text-black bg-white px-1">
        {text.firstName}
      </label>
      <input
        id="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className="block w-full px-4 py-2 text-sm bg-transparent border border-black rounded focus:outline-none focus:border-gray-800"
      />
    </div>
    {formik.errors.name && formik.touched.name && (
      <div className="p-3 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
        <span className="font-medium">{formik.errors.name}</span>
      </div>
    )}

    {/* Email Input */}
    <div className="relative w-full mb-5">
      <label htmlFor="email" className="absolute left-3 top-[-10px] text-sm text-black bg-white px-1">
        {text.emailAdress}
      </label>
      <input
        id="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className="block w-full px-4 py-2 text-sm bg-transparent border border-black rounded focus:outline-none focus:border-gray-800"
      />
    </div>
    {formik.errors.email && formik.touched.email && (
      <div className="p-3 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
        <span className="font-medium">{formik.errors.email}</span>
      </div>
    )}

    {/* Password Input */}
    <div className="relative w-full mb-5">
      <label htmlFor="password" className="absolute left-3 top-[-10px] text-sm text-black bg-white px-1">
        {text.password}
      </label>
      <input
        id="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className="block w-full px-4 py-2 text-sm bg-transparent border border-black rounded focus:outline-none focus:border-gray-800"
      />
    </div>
    {formik.errors.password && formik.touched.password && (
      <div className="p-3 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
        <span className="font-medium">{formik.errors.password}</span>
      </div>
    )}

    {/* Confirm Password Input */}
    <div className="relative w-full mb-5">
      <label htmlFor="rePassword" className="absolute left-3 top-[-10px] text-sm text-black bg-white px-1">
        {text.confirmPassword}
      </label>
      <input
        id="rePassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.rePassword}
        className="block w-full px-4 py-2 text-sm bg-transparent border border-black rounded focus:outline-none focus:border-gray-800"
      />
    </div>
    {formik.errors.rePassword && formik.touched.rePassword && (
      <div className="p-3 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
        <span className="font-medium">{formik.errors.rePassword}</span>
      </div>
    )}

    {/* Phone Input */}
    <div className="relative w-full mb-5">
      <label htmlFor="phone" className="absolute left-3 top-[-10px] text-sm text-black bg-white px-1">
        {text.phoneNumber} (123-456-7890)
      </label>
      <input
        id="phone"
        type="tel"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        className="block w-full px-4 py-2 text-sm bg-transparent border border-black rounded focus:outline-none focus:border-gray-800"
      />
    </div>
    {formik.errors.phone && formik.touched.phone && (
      <div className="p-3 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
        <span className="font-medium">{formik.errors.phone}</span>
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full px-5 py-2.5 text-sm font-medium text-white bg-black border border-black rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500"
    >
      {text.submit}
    </button>
  </form>

  {/* Links */}
  <p className="text-center py-5">
    {text.alreadyHaveAccount}{' '}
    <Link to="/login" className="font-bold underline hover:text-gray-600">
      {text.loginNow}
    </Link>
  </p>
  {/* <p className="text-center pb-5">
    <Link to="/forget" className="font-bold underline hover:text-gray-600">
      {text.forgetPassword}
    </Link>
  </p> */}
</div>

        </>
    )
}
