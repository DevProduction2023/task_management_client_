import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, updateDoc } from 'firebase/firestore';
import { collection } from "./HandleLogin";
import { doc, setDoc } from './AddList';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1acoTjhtKfo0JnSRkwTiy8t-UU-T3Ek8",
  authDomain: "todo-5dcb2.firebaseapp.com",
  projectId: "todo-5dcb2",
  storageBucket: "todo-5dcb2.firebasestorage.app",
  messagingSenderId: "629049005833",
  appId: "1:629049005833:web:4761543ea7effbc072a5d8",
  measurementId: "G-GFNSH5MFXW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const logOut = () => {
  signOut(auth);
}

// const updatedragTodoList = async ({ uid, toDoListName, newList, userEmail }) => {
//   // const playlistRef = doc(db, 'toDoList', uid, 'ToDoLists', toDoListName);
//   // const taskListRef = collection(playlistRef, 'taskList');
//   try {
//     // for (const [columnName, columnData] of Object.entries(newList)) {
//     //   const columnRef = doc(taskListRef, columnName);
//     //   await setDoc(columnRef, { items: columnData.items }, { merge: true });
//     // }
//     // await updateDoc(playlistRef, {
//     //   updatedAt: new Date()
//     // });
//     const updatedList = await axios.post('http://localhost:5000/api/list/updatedrag', {
//       uid: uid,
//       toDoListName: toDoListName,
//       newList: newList,
//       userEmail: userEmail
//     }, {
//       withCredentials: true,
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }




export { auth, db, logOut }

