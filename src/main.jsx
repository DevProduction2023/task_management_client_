import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import List from './pages/List'
import NotFound from './pages/404'
import PrivateRouter from './router/PrivateRouter'
import AdminDashboard from './pages/AdminDashboard'
import Users from './pages/admin/Users'
import TaskLists from './pages/admin/TaskLists'
import Tasks from './pages/admin/Tasks'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path='/' element={<PrivateRouter />} > */}
        <Route path="/list" element={<List />} />
        <Route path="/admin" element={<AdminDashboard />} >
          <Route path='users' element={<Users />} />
          <Route path='taskList' element={<TaskLists />} />
          <Route path='tasks' element={<Tasks />} />
        </Route>
      {/* </Route> */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
)
