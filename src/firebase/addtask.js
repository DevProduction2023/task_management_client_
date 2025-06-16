import { arrayUnion, updateDoc } from 'firebase/firestore';
// import { doc } from './AddList'
// import { v4 as uuidv4 } from 'uuid'
// import { db } from './firebase';
// import { collection } from './HandleLogin';
import axios from 'axios';

const addTaskToTaskColumn = async ({listId, taskTitle, taskDes, DueDate, taskPriority }) => {
    try {
        console.log(" addtask: ", listId)
        const addtask = await axios.post('http://localhost:5000/api/list/addtask', {
            listId: listId,
            taskTitle: taskTitle,
            taskDes: taskDes,
            DueDate: DueDate,
            taskPriority: taskPriority
        }, {
            withCredentials: true,
        });

        console.log(addtask);
        // const taskId = uuidv4();
        // const taskColumnRef = doc(db, 'toDoList', uid, 'ToDoLists', toDoListName, 'taskList', columnName);
        // const res = await updateDoc(taskColumnRef, {
        //     items: arrayUnion({ id: taskId, title: taskTitle, Task_des: taskDes, due_date: DueDate, task_priority: taskPriority, createdAt: new Date() })
        // });
        // const userTodoListRef = collection(db, 'toDoList', uid, 'ToDoLists');
        // const playlistRef = doc(userTodoListRef, toDoListName);
        // await updateDoc(playlistRef, {
        //     updatedAt: new Date()
        // });

        return {status: 200, data: addtask}
    } catch (error) {
        return {status: error?.response?.status || 500 , msg:error?.response?.data?.error,  error: error.response?.data}
    }
}



export { addTaskToTaskColumn, updateDoc }