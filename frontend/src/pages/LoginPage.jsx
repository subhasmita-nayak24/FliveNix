import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast } from '../utils/toastutil';

const LoginPage = () => {

  const [form, setform] = useState({ email: '', password: '' })
  const navigate = useNavigate()


  const inputChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      showErrorToast('All fields are required!');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: 'POST',
          headers: {
            "Content-type": 'application/json'
          },
          body: JSON.stringify(form)
        })

      const data = await response.json()
      if (data.success) {
        showSuccessToast('Login successful!');

        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({ username: data.username }));

        // Dispatch a custom event to notify the Navbar
        window.dispatchEvent(new Event('userLoggedIn'));

        // Delay navigation to allow the toast to display
        setTimeout(() => {
            navigate('/user/movie')
        }, 2000);
      } else {
        showErrorToast(data.message || 'Login failed!');
      }
    } catch (err) {
      showErrorToast('Something went wrong!');
      navigate('/error');
    }
  };
  // Redirect to signup 
  const handleRedirect = () => {
    navigate('/user/signup');
  };



  return (
    <div className='h-screen w-full'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'></header>
      <div className='flex  justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-gray-700/60 rounded-lg shadow-md'>
          <img className='w-6 h-6 cursor-pointer ' src="/cross.png" alt="cross" onClick={handleRedirect} />
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>
          <form className='space-y-4' onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                Email
              </label>
              <input type="email"
                id='email'
                name='email'
                value={form.email || ""}
                onChange={inputChange}
                className='w-full px-3 py-2 mt-1 border border-slate-400 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='you@example.com'
              />
            </div>

            <div>
              <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                Password
              </label>
              <input type="password"
                id='password'
                name='password'
                value={form.password || ""}
                onChange={inputChange}
                className='w-full px-3 py-2 mt-1 border border-slate-400 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='********'
              />
            </div>

            <button className='w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600'>
              Login
            </button>
          </form>
          <ToastContainer />

          <div className='text-center text-gray-300'>
            Don't have an account?{" "}
            <Link to={"/user/signup"} className='text-blue-300 hover:underline'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
