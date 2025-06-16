import React, { useContext, useEffect } from 'react'
import { StateContext } from '../../context/adminContext'



function TaskLists() {
    const { taskLists } = useContext(StateContext);

    const TimeFormat = (time) => {
        if (!time) return '';
        const date = new Date(time.seconds * 1000);
        return date.toLocaleDateString('en-us', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };

    return (
        <table className='w-full flex flex-col'>
            <thead>
                <tr className='flex w-full border rounded-md shadow-md py-2 px-5 text-gray-600 text-center bg-white sticky top-px'>
                    <th className='w-1/5 text-left'>TaskList Title</th>
                    <th className='w-1/5'>Creadted By</th>
                    <th className='w-1/5'>No of Tasks</th>
                    <th className='w-1/5'>Creation Time</th>
                    <th className='w-1/5'>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                <tr></tr>
                {
                    taskLists.map((item, itemIndex) => (
                        item.map((newitem, index) => (
                            <tr key={`${itemIndex}-${index}`} className='flex w-full border rounded-md py-2 px-5 text-gray-600 text-center my-1'>
                                <td className='w-1/5 text-left'>{newitem?.title}</td>
                                <td className='w-1/5'>{newitem?.createdBy}</td>
                                <td className='w-1/5'>{newitem?.totalTasks}</td>
                                <td className='w-1/5'>{TimeFormat(newitem?.createedAt)}</td>
                                <td className='w-1/5'>{TimeFormat(newitem?.updatedAt)}</td>
                            </tr>
                        ))
                    ))
                }

            </tbody>
        </table>
    )
}

export default TaskLists