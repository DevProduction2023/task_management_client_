import React, { useEffect, useRef, useState } from 'react'
import DragDrop from './Drap&Drop';
import { onAuthStateChanged } from '../firebase/CheckAuth'
import { auth } from '../firebase/firebase';
import { Bounce, toast } from 'react-toastify';
import { addtodolistbyName } from '../firebase/AddList';
import { addTaskToTaskColumn } from '../firebase/addtask';
import { fetchUserPlaylists, fetchTasksForPlaylist } from '../firebase/fetchListData';

function ListAndTask() {
    const [user, setUser] = useState(null)
    const [toDoList, setToDoList] = useState(null)
    const [listTitle, setListTitle] = useState(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDes, setTaskDes] = useState('');
    const [taskDue_date, setDueDate] = useState('');
    const [taskPriority, setPriority] = useState('low');
    const [selectTaskid, setSelectTaskId] = useState(null);
    const [selectTaskid01, setSelectTaskId01] = useState(null);
    const [TaskColumbs, setTaskcol] = useState(null);
    const [hoverListId, setHoverListId] = useState('')
    const [dragtask, setDragTask] = useState('');
    const [dragtaskTaskPriority, setDragTaskPriority] = useState('');
    const [updatelist, setUpdateList] = useState(false)
    const hoverTimeout = useRef(null);
    const [isTaskAddedToLists, setListTaskAddStatus] = useState(false)

    const addNewToDoList = async () => {
        if (listTitle !== '' && listTitle !== null) {
            await addtodolistbyName(listTitle);
            setListTitle('')
            toast.success('To-do list added successfully.')
            const fetchData = async () => {
                const res = await fetchUserPlaylists();
                setToDoList(res);
                setSelectTaskId(res && res[0]?._id)
                setSelectTaskId01(res && res[1]?._id)
                setTaskcol(null)
            }
            fetchData()
        } else {
            toast.error('List title empty. please enter List name.')
        }
    }

    const handleListChange = (listid) => {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            if (listid === selectTaskid) return
            else setHoverListId(listid);
            console.log(listid) // Call the taskPriority function after 1 second
        }, 1000);
    };




    // useEffect(() => {
    //     let timeofcall = 1;
    //     const dragTaskAddToPlayList = async () => {
    //         if (user !== null && dragtaskTaskPriority !== '' && dragtask !== '' && hoverListId !== '') {
    //             await addTaskToTaskColumn({ uid: user?.uid, toDoListName: hoverListId, columnName: dragtaskTaskPriority, taskTitle: dragtask?.title, taskDes: dragtask?.Task_des, DueDate: dragtask?.due_date, taskPriority: taskPriority })
    //             setDueDate('')
    //             setTaskTitle('')
    //             setTaskDes('')
    //             toast.success(`Task Add To ${hoverListId}`)
    //             setListTaskAddStatus(true)
    //         } else {
    //             return;
    //         }
    //     }

    //     if (timeofcall >= 1) {
    //         dragTaskAddToPlayList();
    //         timeofcall = --timeofcall;
    //     } else {
    //         return;
    //     }



    // }, [dragtask, hoverListId])


    const handleAddTask = async () => {
        if ((taskTitle !== '') && (taskDue_date !== '') && (taskDes !== '')) {
           const addTask =  await addTaskToTaskColumn({ listId: selectTaskid, taskTitle: taskTitle, taskDes: taskDes, DueDate: taskDue_date, taskPriority: taskPriority });
            console.log("add List", addTask)
           toast.success(`Task Added to List: ${selectTaskid}`);
        //    if(addTask?.status === 200) toast.success(`Task Added to List: ${selectTaskid}`);
        //    else if(addTask?.status === 400) toast.warn(`Error: ${addTask?.msg}`);
        //    else toast.error(`Internal Server Error..`)
            setDueDate('')
            setTaskTitle('')
            setTaskDes('')

            const fetchDataOfTasks = async () => {
                const res = await fetchTasksForPlaylist(selectTaskid);
                setTaskcol(res)
            }
            fetchDataOfTasks()

        } else {
            if (selectTaskid === null || selectTaskid === undefined) {
                toast.error('please add a List first.')
            }
            else toast.error("All Input fields are required.")
        }
    }

    useEffect(() => {
        // let usertemp = null;
        // const unsubscribe = onAuthStateChanged(auth, async (user) => {
        //     if (user) {
        //         setUser(user);
        //         toast.success('User Log In Successfully', {
        //             position: 'top-center',
        //             autoClose: 2000,
        //             transition: Bounce,
        //             toastId: '1'
        //         })
        //         usertemp = user.uid;
        //         const res = await fetchUserPlaylists();
        //         setToDoList(res);
        //         setSelectTaskId(res && res[0]?.id); // Set the first playlist's id as the selected task id
        //     } else {
        //         setUser('');
        //     }
        // });

        // return () => unsubscribe();
        const fetch = async () => {
            console.log("fetch user lists...")
            const res = await fetchUserPlaylists();
            setToDoList(res);
            setSelectTaskId(res && res[0]?._id);
        }
        fetch();
        // Set the first playlist's id as the selected task id
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (selectTaskid || updatelist) {
                // alert(updatelist)
                { console.log("setectedId useeffect 02", selectTaskid) }
                const res = await fetchTasksForPlaylist(selectTaskid);
                console.log("tasks test: ", res)
                setTaskcol(res);
                setUpdateList(false)
            } else {
                return;
            }
        };

        fetch();
    }, [selectTaskid, selectTaskid01, updatelist]);

    console.log("selectId:", selectTaskid, "01: ", selectTaskid01);


    return (
        <div className='mx-12 my-5 '>
            <div className='flex justify-between space-x-1 '>
                <div className='w-1/2 border-2 border-gray-400 rounded-md p-3'>
                    <span className='flex justify-between'>
                        <h1 className='px-2 font-semibold text-gray-600'>To-Do Lists</h1>
                        <span className='flex space-x-1'>
                            <input onChange={(e) => setListTitle(e.target.value)} value={listTitle} placeholder='Enter List Title' type="text" className='border border-black/40 rounded-md px-3 py-1 shadow-black focus:outline-none focus:border-blue-500 focus:drop-shadow-xl text-gray-600' />
                            <button onClick={addNewToDoList} className=' border border-gray-200 px-3 py-1 rounded-md  text-white bg-blue-600 font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500 active:border-blue-500 active:text-white active:bg-blue-500' >Add</button>
                        </span>

                    </span>

                    <span className='flex my-2'>
                        <hr className='h-1 bg-gray-600 rounded-md mx-2 w-[15%]' />
                        <hr className='h-1 bg-gray-600 rounded-md w-[3%]' />
                    </span>
                    <ul className='grid grid-rows-5 grid-flow-col space-y-1 space-x-1' onMouseUp={() => setDragTask('')}>
                        <li className='hidden'></li>
                        {
                            toDoList === null ? '' :
                                toDoList.map((item, index) => (
                                    <div key={item?.id}>
                                        <li onMouseEnter={() => handleListChange(item?._id)} onMouseLeave={() => { setHoverListId(''), clearTimeout(hoverTimeout.current); }} onClick={() => setSelectTaskId(item?._id)} className={`border cursor-pointer hover:bg-blue-500 hover:text-white rounded-md px-2 py-1 hover:ring-1 hover:ring-blue-400 ${selectTaskid === item?._id ? "bg-blue-500 text-white ring-1 ring-blue-500 font-semibold" : ''}`}>{item.title}</li>
                                    </div>
                                ))
                        }
                    </ul>
                </div>

                <div className='w-1/2 grid border-2 border-gray-400 rounded-md p-3'>
                    <h1 className='px-2 font-semibold text-gray-600'>Add New Task</h1>
                    <span className='flex my-2'>
                        <hr className='h-1 bg-gray-600 rounded-md mx-2 w-[15%]' />
                        <hr className='h-1 bg-gray-600 rounded-md w-[3%]' />
                    </span>
                    <ul>
                        <li className='flex flex-col space-y-4 py-3'>
                            <input onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle} type="text" name="taskTitle" id="" placeholder='Task Title' className='border-b-2 border-black/40 rounded-md px-3 py-1 shadow-black focus:outline-none focus:border-blue-500 focus:drop-shadow-xl text-gray-600' />
                            <textarea name="" id="" onChange={(e) => setTaskDes(e.target.value)} value={taskDes} placeholder='Description' className='border-b-2 border-black/40 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500 focus:drop-shadow-xl text-gray-600'></textarea>
                        </li>
                        <li className='flex px-3 mt-5 space-x-2'>
                            <label className='py-1 font-semibold text-gray-700' htmlFor="date">Due Date</label>
                            <input value={taskDue_date} onChange={(e) => setDueDate(e.target.value)} className='border-2 px-2 py-1 rounded-md border-black/40 focus:outline-none focus:border-blue-500 ' type="date" name="date" id="" placeholder='Task Title' />
                            <label className='py-1 font-semibold text-gray-700' htmlFor="task">Task Priority</label>
                            <select defaultValue={'low'} value={taskPriority} onChange={(e) => setPriority(e.target.value)} className='border-2 px-2 py-1 rounded-md border-black/40 focus:outline-none focus:border-blue-500 text-gray-600 font-semibold' name="Task Priority" id="">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button onClick={handleAddTask} className='border border-gray-200 px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-white hover:text-blue-500 hover:border-blue-500 active:border-blue-500 active:text-white active:bg-blue-500 '>Add</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {
                    TaskColumbs === null ? '' : <DragDrop taskColumbs={TaskColumbs && TaskColumbs} ListName={selectTaskid && selectTaskid} userUid={user && user?.uid} ListId={hoverListId} onChangeONDragTask={setDragTask} taskPriority={setDragTaskPriority} listTaskAddedStatus={isTaskAddedToLists} onlistTaskAddedStatu={setListTaskAddStatus} updateList={setUpdateList} />
                }

            </div>
        </div>
    )
}

export default ListAndTask