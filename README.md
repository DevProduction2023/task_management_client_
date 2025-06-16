# 📝 Task Manager App

A full-stack task management application where users can register/login using email and password, create task lists, and manage tasks using an intuitive drag-and-drop interface. Tasks can be prioritized (Low, Medium, High) and moved between lists with hover-based drag interaction. Authentication is protected via JWT.

---

## 🚀 Features

- 🔐 User Registration and Login via Email & Password
- 🧾 Create and manage Task Lists
- ✅ Add Tasks to Lists
- 🕹️ Drag and Drop Tasks across Priorities (Low, Medium, High)
- 📂 Move Tasks to other Lists (on hover for 1 second)
- 🔒 JWT-based Route Protection
- ⚛️ Built with React (Frontend) and Node.js (Backend)

---

## 🛠️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- React Context API
- React Router

### Backend
- Node.js
- Express.js
- JWT for authentication
- MongoDB 

  ---

## ⚙️ Installation & Setup

### 1. Clone the Repository
After Clone , 
cd task-manager-app

## Setup Frontend
cd frontend
npm install
npm run dev

## Setup Backend
- Note: Assuming your backend is in a separate folder or repo. If not, update instructions accordingly.
cd backend
npm install
node index.js

---

## 🔐 Authentication
- Auth is handled via Firebase Auth with JWT tokens.

## 🧲 Drag & Drop Mechanics
- Tasks are draggable across priority levels: Low, Medium, High.
- Tasks can be moved to other lists by hovering for 1 second over a target list.
- Implemented in Drap&Drop.jsx, TaskCard.jsx, and ListAndTask.jsx.

## 📌 Todos
- Add user profile management
- Implement due dates and reminders
- Improve mobile responsiveness
- Add unit and integration tests


