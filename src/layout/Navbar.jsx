import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logOut } from '../firebase/firebase'
import { toast } from 'react-toastify'

function Navbar({ user }) {
    const location = useLocation();
    const pathname = location.pathname.slice(1)

    const handleLogout = () => {
        let response = logOut()
        toast.success('User Logged out Successfully.', {
            position: 'top-center',
            autoClose: 2000,
            toastId: '00002'
        })
    }

    return (
        <ul className='flex justify-end px-8 py-1 shadow-md'>
            {
                user ? <div className='flex space-x-4 justify-end py-1 px-5'>
                    <li className='py-1 align-middle'>
                        <Link to={pathname && pathname !== 'list' ? '/list' : '/admin'}><button className='bg-blue-400 px-3 text-sm py-1 font-semibold text-white rounded-md hover:text-blue-500 hover:bg-white hover:border hover:border-blue-400'>{pathname && pathname !== 'list' ? "Home" : "Admin DashBoard"}</button></Link>
                        {/* <Link className='bg-blue-400 px-3 text-sm py-1 font-semibold text-white rounded-md hover:text-blue-500 hover:bg-white hover:border hover:border-blue-400 align-middle' ></Link> */}
                    </li>
                    <li className='py-1 align-middle'>
                        <button className='bg-blue-400 px-3 text-sm py-1 font-semibold text-white rounded-md hover:text-blue-500 hover:bg-white hover:border hover:border-blue-400' onClick={() => { handleLogout() }}>Logout</button>
                    </li>
                </div>
                    :
                    <li className='py-1 align-middle'>
                        <Link className='bg-blue-400 px-3 text-sm py-1 font-semibold text-white rounded-md hover:text-blue-500 hover:bg-white hover:border hover:border-blue-400' to={pathname && pathname === 'login' ? '/register' : '/login'}>{pathname && pathname === 'login' ? "Register" : 'Login'}</Link>
                    </li>
            }
        </ul>
    )
}

export default Navbar