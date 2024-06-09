import { useDebugValue } from 'react'
import {useSelector} from 'react-redux'

export default function Profile() {
    const {currentUser} = useSelector(state => state.user)
    return (
        <div className='p-3 max-w-lg mx-auto'> 
            <h1 className='text-3xl font-semibold text-center my-5'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <img src={currentUser.avatar} alt="Profile Pic"  className='rounded-full self-center h-24 w-24 object-cover cursor-pointer mt-2' />
                <input type='text' placeholder='username' className='rounded-lg border p-3' id='username'  />
                <input type='email' placeholder='email' className='rounded-lg border p-3' id='email'  />
                <input type='password' placeholder='password' className='rounded-lg border p-3' id='password'  />
                <button className='bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80'>update</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span className='text-red-600 cursor-pointer'>Delete account</span>
                <span className='text-red-600 cursor-pointer'>Sign out</span>
            </div>
        </div>
    )
}
