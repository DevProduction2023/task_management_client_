import { doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
// import { collection } from "./HandleLogin";
import axios from "axios";
// import { db } from "./firebase";

const fetchUserPlaylists = async () => {
    try {
        // const UserTodoLists = await axios.get(`http://localhost:5000/api/todoList/${uid}`, {
        //     withCredentials: true,
        // });

        const userList = await axios.post(`http://localhost:5000/api/list/lists`, {}, {
            withCredentials: true,
        });

        console.log(userList);

        return userList.data;

        // const playlistsRef = collection(db, 'toDoList', uid, 'ToDoLists');
        // const playlistsSnapshot = await getDocs(playlistsRef);
        // const playlists = [];
        // playlistsSnapshot.forEach((doc) => {
        //     playlists.push({ id: doc.id, ...doc.data() });
        // });
        // return playlists;
    } catch (error) {
        console.error('Error fetching Todolists: ', error);
        throw error;
    }
};

const fetchTasksForPlaylist = async (listId) => {
    try {
        const taskList = await axios.get(`http://localhost:5000/api/list/${listId}`, {
            withCredentials: true,
        });

        const Tasks = [
            {
                id: '01',
                title: 'Low Priority',
                priority: 'low',
                tasks: []
            },
            {
                id: '02',
                title: 'Medium Priority',
                priority: 'medium',
                tasks: []
            },
            {
                id: '03',
                title: 'High Priority',
                priority: "high",
                tasks: []
            }
        ]

        taskList?.data?.tasks?.forEach((task) => {
            console.log("check task: ", task)
            if (task?.priority === 'low') {
                Tasks[0].tasks.push(task);
            } else if (task?.priority === 'medium') {
                Tasks[1].tasks.push(task);
            } else if (task?.priority === 'high') {
                Tasks[2].tasks.push(task);
            }
        });


        console.log("api response", Tasks);

        return Tasks;

        // const taskListRef = collection(db, 'toDoList', uid, 'ToDoLists', playlistTitle, 'taskList');
        // const taskListSnapshot = await getDocs(taskListRef);
        // const tasks = {};
        // taskListSnapshot.forEach((doc) => {
        //     tasks[doc.id] = doc.data();
        // });
        // let count = null
        // Object?.entries(tasks)?.forEach(ele => {
        //     count += ele[1].items.length
        // })
        // const playlistRef = doc(db, 'toDoList', uid, 'ToDoLists', playlistTitle);
        // await updateDoc(playlistRef, {
        //     totalTasks: count
        // });
        // return tasks;
    } catch (error) {
        console.error('Error fetching tasks: ', error);
        throw error;
    }
};


const updatedragTodoList = async ({ listId, taskId, priority }) => {
    // const playlistRef = doc(db, 'toDoList', uid, 'ToDoLists', toDoListName);
    // const taskListRef = collection(playlistRef, 'taskList');
    try {
        // for (const [columnName, columnData] of Object.entries(newList)) {
        //   const columnRef = doc(taskListRef, columnName);
        //   await setDoc(columnRef, { items: columnData.items }, { merge: true });
        // }
        // await updateDoc(playlistRef, {
        //   updatedAt: new Date()
        // });
        console.log("fetch list: ", listId, taskId, priority)
        if (!listId || !taskId || !priority) {
           return ;
        }
        const updatedList = await axios.post(`http://localhost:5000/api/list/${listId}/${taskId}`, {
            priority: priority
        }, {
            withCredentials: true,
        });
        console.log("updatedList: ", updatedList)
        return updatedList.data;
    } catch (error) {
        console.log(error)
    }
}

const addTaskToTaskColumn = async ({listprevId, listNextId, taskId}) => {
    try {
        console.log("  addTaskToTaskColumn : ", listprevId, listNextId, taskId)
        const addtask = await axios.put(`http://localhost:5000/api/list/tasktolist/${listprevId}/${listNextId}/${taskId}`, {}, {
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

        return {status: 200}
    } catch (error) {
        console.log(error)
    }
}

export { fetchUserPlaylists, fetchTasksForPlaylist, updatedragTodoList, getDocs, addTaskToTaskColumn }