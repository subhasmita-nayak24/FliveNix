import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showErrorToast, showSuccessToast} from '../utils/toastutil';

function SignUp() {
    const navigate = useNavigate()

    const [formInfo, setFormInfo] = useState({email: '', username: '', password: '' })

    const inputChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        if (!formInfo.email || !formInfo.username || !formInfo.password) {
            showErrorToast('All fields are required!');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`,
                {
                    method: 'POST',
                    headers: {
                        "Content-type": 'application/json'
                    },
                    body: JSON.stringify(formInfo)
                }
            )
            const data = await response.json();

        if (data.success) {
            showSuccessToast('Signup successful!');

            // Delay navigation to allow the toast to display
            setTimeout(() => {
                navigate('/user/login');
            }, 2000); // Adjust the delay time (2 seconds here) as needed
        } else {
            showErrorToast(data.message || 'Signup failed!');
        }
    } catch (err) {
        showErrorToast('Something went wrong!');
        navigate('/error');
    }
};

    // Redirect to homepage 
    const handleRedirect = () => {
        navigate('/');
    };

    return (
        <div className='h-screen w-full'>

            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'></header>

            <div className='flex  justify-center items-center mt-20 mx-3'>

                <div className='w-full max-w-md p-8 space-y-6 bg-gray-700/60 rounded-lg shadow-md'>
                    <img className='w-6 h-6 cursor-pointer' src="/cross.png" alt="cross" onClick={handleRedirect} />
                    <h1 className='text-center text-white text-2xl font-bold mb-4'> Sign Up</h1>

                    <form className='space-y-4' onSubmit={handleSignup}>

                        <div>
                            <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                                Email
                            </label>
                            <input
                                type="email"
                                id='email'
                                name='email'
                                value={formInfo.email || ""}
                                onChange={inputChange}
                                placeholder='you@example.com'
                                className='w-full px-3 py-2 mt-1 border border-slate-400 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                            />
                        </div>


                        <div>
                            <label htmlFor="username" className='text-sm font-medium text-gray-300 block'>
                                Username
                            </label>
                            <input
                                type="text"
                                name='username'
                                id='username'
                                value={formInfo.username || ""}
                                onChange={inputChange}
                                className='w-full px-3 py-2 mt-1 border border-slate-400 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='johndoe'
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                id='password'
                                value={formInfo.password || ''}
                                onChange={inputChange}
                                className='w-full px-3 py-2 mt-1 border border-slate-400 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                            />
                        </div>

                        <button type='submit' className='w-full py-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600'>
                            Sign Up
                        </button>
                    </form>
                    <ToastContainer />
                    <div className='text-center text-gray-300'>
                        Already a member?{" "}
                        <Link to={"/user/login"} className='text-blue-300 hover:underline'>Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp