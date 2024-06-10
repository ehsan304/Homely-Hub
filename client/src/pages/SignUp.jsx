import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

export default function SignUp() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            
            const res = await fetch('/api/auth/signup',
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            )
            const data = await res.json()
            if (data.success === false) {
                setError(data.message)
                setLoading(false)
                
                return
            }
            setLoading(false)
            console.log(data)
            setError(null)
            
            navigate('/sign-in')
        } catch (error) {
            setLoading(false)
            setError(error.message)
            
        }
    }




    return (
        <div className='p-3 max-w-lg mx-auto'>

            <h1 className='font-semibold text-3xl text-center my-7'>Sign Up</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type='text' placeholder='username' id='username' className='rounded-lg border p-3' onChange={handleChange} />
                <input type='email' placeholder='email' id='email' className='rounded-lg border p-3' onChange={handleChange} />
                <input type='password' placeholder='password' id='password' className='rounded-lg border p-3' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'loading...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Already have an account?</p>
                <Link to='/sign-in'>
                    <span className='text-blue-700'>Sign In</span>
                </Link>
            </div>
            {error && <p className='text-red-500 mt-5'>{error} </p>}
        </div>
    )
}
