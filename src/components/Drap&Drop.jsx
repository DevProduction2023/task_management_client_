import React, { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { updatedragTodoList } from '../firebase/firebase';
import { updatedragTodoList, addTaskToTaskColumn } from '../firebase/fetchListData';
import { Slide, toast } from 'react-toastify';

function DragDrop({ taskColumbs, ListName, userUid, ListId, onChangeONDragTask, taskPriority, listTaskAddedStatus, onlistTaskAddedStatu, updateList }) {
    const [taskColumb, setTaskColumb] = useState(taskColumbs && taskColumbs);
    const [isListUpdated, setIsListUpdated] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [updatePriority, setUpdatePriority] = useState(null);

    useEffect(() => {
        setTaskColumb(taskColumbs);
    }, [taskColumbs]);

    useEffect(() => {
        const updateData = async () => {
            if (ListName && taskColumb && isListUpdated && updatePriority && taskId) {
                try {
                    console.log("check update task drag task: ", taskColumb)
                    setIsListUpdated(false);
                    console.log("check ListName: ", ListName, taskId, updatePriority)
                    await updatedragTodoList({ listId: ListName, taskId: taskId, priority: updatePriority });
                    toast.success('Lists Task Updated', {
                        position: 'bottom-right',
                        autoClose: 1000,
                        transition: Slide
                    })
                } catch (error) {
                    console.error('Error updating tasks: ', error);
                }
            }
        };


        const taskMoveToAnotherList = async () => {
            let timeofcall = 1;
            const dragTaskAddToPlayList = async () => {
                if (taskId && ListName && ListId) {
                    console.log("check taskId taksmovetoAnotherList : ", taskId, "ListName: ", ListName, "ListId: ", ListId)
                    const response = await addTaskToTaskColumn({ listprevId: ListName, listNextId: ListId, taskId: taskId });
                    if (response?.status === 200) {
                        toast.success(`Task Add To ${ListId}`)
                        setTaskId(null);
                        updateList(true);
                    }
                    else {
                        toast.error(`Error in Moving Task To  List :${ListId}`)
                        setTaskId(null)
                    }
                } else {
                    return;
                }
            }

            if (timeofcall >= 1) {
                dragTaskAddToPlayList();
                timeofcall = --timeofcall;
            } else {
                return;
            }

        };
        if (isListUpdated && taskId) {
            if (updatePriority) {
                updateData();
            }
        } else if (taskId) {
            taskMoveToAnotherList();
            // setTaskId(null);
        }
    }, [updatePriority, taskColumb, ListName, ListId, isListUpdated, taskId]);

    const findItemById = (id, columns) => {
        for (const columnId in columns) {
            const column = columns[columnId];
            console.log("check column: ", column)
            const item = column?.tasks.find(item => item?._id === id);
            if (item) {
                return item;
            }
        }
        return null;
    };


    const onDragStart = (start) => {
        const { source, draggableId } = start;
        // taskPriority(source?.droppableId)
        setTaskId(draggableId);
        console.log("check source: ", source, "draggableId: ", draggableId)
        const item = findItemById(draggableId, taskColumb); // Implement findItemById to locate the item in taskColumb
        onChangeONDragTask(item);
    };


    const onDragEnd = (result, taskColumb, setTaskColumb) => {
        console.log("check taskId ", taskId)
        if (!result.destination && listTaskAddedStatus !== false) {
            const { source } = result;
            const sourceColumn = taskColumb[source.droppableId];
            const sourceItems = [...sourceColumn.tasks]
            // console.log("check sourceItems: ", sourceItems)
            // const [removed] = sourceItems.splice(source.index, 1);
            setTaskColumb({
                ...taskColumb, [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceItems
                }
            })
            toast.warn('list task removed successfully')
            onlistTaskAddedStatu(false)
            taskPriority('')
            setIsListUpdated(true)
            return;
        }

        const { source, destination } = result;
        console.log(source, destination)
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = taskColumb[source.droppableId];
            const destColumn = taskColumb[destination.droppableId];
            const sourceItems = [...sourceColumn.tasks];
            onChangeONDragTask('')
            taskPriority('')
            const destItems = Array.isArray(destColumn && destColumn.tasks) ? [...destColumn.tasks] : [];
            const [removed] = sourceItems.splice(source.index, 1);
            console.log(removed, removed.priority = destColumn?.priority)
            setUpdatePriority(destColumn?.priority); // Set the priority for the dragged task
            // Update the destination column with new task data
            destItems.splice(destination.index, 0, removed);
            setTaskColumb({
                ...taskColumb,
                [source.droppableId]: {
                    ...sourceColumn,
                    tasks: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    tasks: destItems,
                },
            });

        } else {
            onChangeONDragTask('')
            taskPriority('')
            const column = taskColumb[source.droppableId];
            const copiedItems = Array.isArray(column?.tasks) ? [...column.tasks] : [];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setTaskColumb({
                ...taskColumb,
                [source.droppableId]: {
                    ...column,
                    tasks: copiedItems,
                },
            });
        }

        setIsListUpdated(true);
    };

    console.log("check listid for hover list: ", ListId, "selectedListId", ListName, "taskid: ", taskId);

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={(result) => onDragEnd(result, taskColumb, setTaskColumb)}>
            <div className="flex justify-between react-beautiful-dnd-draggable">
                {taskColumb && Object.entries(taskColumb).map(([columnId, column]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="w-1/3 border-2 border-gray-400 p-3 my-2 mr-1 last:mr-0 rounded-md space-y-2"
                            >
                                <h1 className='px-2 font-semibold text-gray-600'>{column.title}</h1>
                                <span className='flex my-2'>
                                    <hr className='h-1 bg-gray-600 rounded-md mx-2 w-[15%]' />
                                    <hr className='h-1 bg-gray-600 rounded-md w-[3%]' />
                                </span>
                                {column?.tasks && column.tasks.map((item, index) => (
                                    <Draggable key={item?._id} draggableId={item?._id} index={index}>
                                        {(provided, snapsho) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className=" bg-white border rounded-md border-gray-400 "
                                            >
                                                {console.log(item?._id)}
                                                <div className='px-4 py-2 flex flex-col justify-between w-full hover:bg-gray-200 hover:rounded-md cursor-grab ' >
                                                    <h1>{item?.title}</h1>
                                                    <h2>{item?.Task_des}</h2>
                                                    <span className='text-gray-500'>{new Date(item?.due_date).toLocaleDateString('en-us', {
                                                        month: 'short',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                    })}</span>
                                                    <span>
                                                        {item?.priority}
                                                    </span>
                                                </div >
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}

export default DragDrop;
