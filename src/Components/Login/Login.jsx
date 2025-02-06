import { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { Helmet } from 'react-helmet';
import { auth } from '../../Contexts/AuthContext';
import { useSelector } from 'react-redux';







export default function Login() {

  const curentLange = useSelector((state) => state.lange.lange);  

  const  text = useSelector((state) => state.lange[curentLange]);  

   
  let navigate = useNavigate()
  let { setLogin } = useContext(auth)
  // let [Loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')


function handleLogin(values) {
    if (values.email === "admin@gmail.com" && values.password === "A12345") {  // اصحالي يا برنس
        navigate('/admin');
   
      }
    
    
    
    else {
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .then(({ data }) => {
                setMsg('');
                localStorage.setItem('userToken', data.token);
                setLogin(data.token);
                navigate('/');
            })
            .catch((err) => {
                setMsg(err?.response?.data?.message);
            });
    }
}




  let validationSchema = Yup.object({
    email: Yup.string().email().required('email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'failed').required('password is required'),
  })



  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
    onSubmit: handleLogin
  })

  return (
   <>
    <Helmet>
  <title></title>
</Helmet>
<div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
  <h2 className="text-2xl font-semibold mb-6">{text.signIn} :</h2>

  {msg && (
    <div className="w-1/2 mx-auto p-4 mb-4 text-sm text-black border border-black rounded-lg bg-gray-100" role="alert">
      <span className="font-medium">{msg}</span>
    </div>
  )}

  <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
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
    {text.registerMS}{' '}
    <Link to="/register" className="font-bold underline hover:text-gray-600">
      {text.registerNow}
    </Link>
  </p>
  <p className="text-center pb-5">
    <Link to="/forget" className="font-bold underline hover:text-gray-600">
      {text.forgetPassword}
    </Link>
  </p>
</div>


    </>
  )
}
