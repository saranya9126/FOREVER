import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            }
            else {
                toast.error(response.data.message)
            }
        }

        catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }

    }
        return (
            <div className='min-h-screen flex items-center justify-center w-full'>
                <div className='bg-white shadow-md rounded-lg max-w-md px-8 py-6'>
                    <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                    <form onSubmit={onSubmitHandler}>
                        <div className='mb-3 min-w-72'>
                            <p className='text-sm font-medium mb-2 text-gray-700'>Email Address </p>
                            <input onChange={(e) => setEmail(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-md w-full outline-none' type="email" placeholder='your@email.com' required />
                        </div>

                        <div className='mb-3 min-w-72'>
                            <p className='text-sm font-medium mb-2 text-gray-700'>Password </p>
                            <input onChange={(e) => setPassword(e.target.value)} className='px-3 py-2 border border-gray-300 rounded-md w-full outline-none' type="password" placeholder='Enter your password' required />
                        </div>

                        <button className='mt-2 w-full px-4 py-2 bg-black text-white rounded-md cursor-pointer' type='submit'>Login</button>
                    </form>
                </div>
            </div>
        )
    }

    export default Login