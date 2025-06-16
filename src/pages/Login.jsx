import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'
import { onAuthStateChanged } from '../firebase/CheckAuth'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logInWithEmailAndPassword } from '../firebase/HandleLogin';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [passvisable, setPassvisable] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1000); // Adjust the width as needed for your definition of mobile
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);    // Event listener for screen size change
        return () => window.removeEventListener("resize", checkScreenSize);   // Clean up event listener
    }, []);



    const handleLogin = async () => {
        if (email !== '' && password !== '') {
            const check = await logInWithEmailAndPassword(email, password);

            if (check?.status === 200) {
                toast.success('User Login Successfully.');
                navigate('/list')
            } else {
                toast.error('Invalid email or password.')
            }

        } else {
            toast.error('All fields are required.')
        }
        // await onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         navigate('/list')
        //     } else {
        //         return;
        //     }
        // })
    }

    const handlePasswordVisiblity = () => {
        setPassvisable(!passvisable)
    }
    return (
        <div className='min-h-[89vh]'>
            {isMobile ? (
                <main className="py-8 px-4 lg:px-12">
                    <p className="text-lg lg:text-xl">
                        This page is designed for desktop users. For the best experience, please access it from a desktop or laptop device.
                    </p>
                </main>
            ) :
                <div className='flex flex-col space-y-3 text-center w-[550px] border p-5 py-10 rounded-md shadow-md mx-auto my-5 px-12 '>
                    <span className='text-black-700 text-left text-xl font-semibold'>Login your account</span>
                    <input className='px-4  py-1 shadow-md border rounded-md focus:shadow-xl focus:outline-none' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <span className='flex w-full'>
                        <input className='w-full px-4 py-1 shadow-md border rounded-md focus:shadow-xl focus:outline-none ' type={passvisable ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                        <button className='-ml-9' onClick={handlePasswordVisiblity}>🔑</button>
                    </span>

                    <button onClick={handleLogin} className='border rounded-md bg-blue-500 text-white py-1 font-semibold focus:border-blue-500 focus:bg-white focus:text-blue-500 hover:shadow-md hover:bg-white hover:text-blue-500 hover:border-blue-400'>Login</button>
                    <span className='text-left'>Don't have an account?<Link className='text-blue-600' to='/register'> Register</Link></span>
                </div>
            }
        </div>
    )
}

export default Login;