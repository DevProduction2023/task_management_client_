import React, { useContext } from 'react'
import { StateContext } from '../../context/adminContext'

function Users() {
    const { users } = useContext(StateContext);
    return (
        <table className='w-full flex flex-col'>
            <thead >
                <tr className='flex w-full border rounded-md shadow-md py-2 px-5 text-gray-600 text-center bg-white sticky top-px'>
                    <th className='w-1/4 text-left '>Email</th>
                    <th className='w-1/4 '>Password</th>
                    <th className='w-1/4 '>SignUp Time</th>
                    <th className='w-1/4 '>User Ip</th>
                </tr>
            </thead>
            <tbody>
                <tr></tr>
                {
                    users && users.map((item, index) => (
                        <tr key={index} className='flex w-full border rounded-md  py-2 px-5 text-gray-600 text-center first:text-left  my-1'>
                            {/* <td className='w-1/4 text-left'></td> */}
                            <td className='w-1/4 border-r-2 text-left'>{item?.email}</td>
                            <td className='w-1/4 border-r-2'>{item?.pass}</td>
                            <td className='w-1/4 border-r-2'>{item?.signupTime?.slice(0, 10)}</td>
                            <td className='w-1/4 border-r-2'>{item?.userIp}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Users