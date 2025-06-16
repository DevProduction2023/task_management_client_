import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerWithEmailAndPassword } from '../firebase/HandleLogin'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, error, auth] = useState("auth")
  const [passvisable, setPassvisable] = useState(false)
  const navigate = useNavigate()

  const handlePasswordVisiblity = () => {
    setPassvisable(!passvisable)
  }

  const handleRegister = async () => {
    if (email !== '' && password !== '') {
      const user = await registerWithEmailAndPassword({ name: name, email: email, password: password });
      if (user?.status === 201) {
        toast.success('User Register Successfully.')
        navigate('/list')
      }
    } else {
      if (email === '' && password === '') {
        toast.error('All fields are required.')

      }
      else if (password === '') {
        toast.warn('please enter a valid Password')
      }
      else {
        toast.warn('please enter a valid email Address')
      }
    }
  }

  return (
    <div className='min-h-[89vh]'>
      <div className='flex flex-col space-y-3 text-center w-[500px] border p-5 rounded-md shadow-md mx-auto my-5 px-12'>
        <span className='text-black-700 text-left text-xl font-semibold'>Register an account</span>
        <input onChange={(e) => setName(e.target.value)} type="text" className='border shadow-md rounded-md px-4 py-1 focus:outline-none focus:border-b-2 focus:border-blue-200' placeholder='Name' />
        <input className='border shadow-md rounded-md px-4 py-1 focus:outline-none focus:border-b-2 focus:border-blue-200' type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <span className='flex w-full'>
          <input className='w-full px-4 py-1 shadow-md border rounded-md focus:shadow-xl focus:outline-none ' type={passvisable ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <button className='-ml-9' onClick={handlePasswordVisiblity}>🔑</button>
        </span>
        <button onClick={handleRegister} className='border rounded-md bg-blue-500 text-white py-1 font-semibold focus:border-blue-500 focus:bg-white focus:text-blue-500 hover:shadow-md hover:bg-white hover:text-blue-500 hover:border-blue-400'>Register</button>
        <span>Already have an account? <Link className='text-blue-700' to='/login'>Sign In</Link></span>
      </div>
    </div>
  )
}

export default Register