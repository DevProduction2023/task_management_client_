import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../context/adminContext'
import { fetchTasksForPlaylist } from '../../firebase/fetchListData';


function Tasks() {
    const { taskLists } = useContext(StateContext);
    const [taskData, setTaskData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            const FetchedTasks = [];
            for (const item of taskLists) {
                if (taskLists.length > 1) {
                    for (const ele2 of item) {
                        const res = await fetchTasksForPlaylist(ele2?.uid, ele2?.title);
                        FetchedTasks.push({ title: ele2?.title, By: ele2?.createdBy, data: res });
                    }
                } else {
                    const res = await fetchTasksForPlaylist(item?.uid, item?.title);
                    FetchedTasks.push({ title: item?.title, By: item?.createdBy, data: res });
                }
            }
            let TaskArray = [];
            FetchedTasks.forEach(ele3 => {
                Object.values(ele3?.data).forEach(ele3Item => {
                    if (ele3Item?.items.length !== 0) {
                        ele3Item?.items.forEach(ele => {
                            TaskArray.push({ ...ele, list: ele3?.title, by: ele3?.By })
                        })
                    } else {
                        console.log()
                    }
                    setTaskData(TaskArray)
                    setLoading(false)
                })
            })

        };

        fetchTasks();

    }, [taskLists])

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
        <div>
            <table className='w-full flex flex-col'>
                <thead>
                    <tr className='flex w-full border rounded-md shadow-md py-2 px-5 text-gray-600 text-center bg-white sticky top-px'>
                        <th className='w-1/5 text-left'>Title</th>
                        <th className='w-1/5'>Description</th>
                        <th className='w-1/5'>List Title</th>
                        <th className='w-1/5'>CreatedBy</th>
                        <th className='w-1/5'>CreatedAt</th>
                    </tr>
                </thead>
                {
                    loading ? <tbody className='w-full text-center'><tr className='flex w-full border rounded-md py-2 px-5  my-1 font-bold text-blue-500 justify-center'>Loading </tr></tbody>
                        :
                        <tbody>
                            {
                                taskData?.map((ele, index) => (
                                    <tr key={index} className='flex w-full border rounded-md py-2 px-5 text-gray-600 text-center my-1'>
                                        <td className='w-1/5 text-left'>{ele?.title}</td>
                                        <td className='w-1/5'>{ele?.Task_des}</td>
                                        <td className='w-1/5'>{ele?.list}</td>
                                        <td className='w-1/5'>{ele?.by}</td>
                                        <td className='w-1/5'>{TimeFormat(ele?.createdAt)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                }
            </table>
        </div >

    )
}

export default Tasks