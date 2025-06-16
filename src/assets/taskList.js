const tasks = [
    { Id: '001', Task: "task no. 01", Due_date: '10-05-2024' },
    { Id: '002', Task: "task no. 02", Due_date: '11-05-2024' },
]
const tasks1 = [
    { Id: '00001', Task: "task no. 03", Due_date: '10-05-2024' },
    { Id: '00002    ', Task: "task no. 04", Due_date: '11-05-2024' },
]
const TasksColumbs = {
    taskColumb01: {
        id: '01',
        title: 'Daily Task',
        items: []
    },
    taskColumb02:
    {
        id: '02',
        title: 'Important Task',
        items: []
    },
    taskColumb03:
    {
        id: '03',
        title: 'Urgent Task',
        items: tasks
    }
}
const TasksColumbs1 = {
    taskColumb01: {
        id: '01',
        title: 'Daily Task',
        items: []
    },
    taskColumb02:
    {
        id: '02',
        title: 'Important Task',
        items: tasks1
    },
    taskColumb03:
    {
        id: '03',
        title: 'Urgent Task',
        items: []
    }
}


const toDoList = {
    playlist1: { id: 1, title: 'playList01', taskList: TasksColumbs },
    playlist2: { id: 2, title: 'playList02', taskList: TasksColumbs1 }
}

export { toDoList, TasksColumbs }


