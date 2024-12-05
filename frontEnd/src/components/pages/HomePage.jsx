import React,{useState,useEffect} from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import LogOut from '../commen/LogOut';
import { useSelector } from 'react-redux';
import { deleteCompletedTaskApi, deleteTaskApi, editTaskApi, getTasksApi, postTaskApi, updateTaskApi } from '../../apis';
import TaskStatistics from '../commen/TaskStatistics';

function HomePages() {
  const [isCompleteScreen,setIsCompleteScreen] = useState('')
  const [allTodos,setTodos] = useState([])
  const [newTitle,setTitle] = useState('')
  const [newDesc,setDesc] = useState('')
  const [newTime, setTime] = useState('')
  const [assignee, setAssignee] = useState('')
  const [date, setDate] = useState('')
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState(-1);
  const user = useSelector(state => state?.user);

  const fetchTaks = async(status='')=>{
      const res = await getTasksApi(status);
      if(res?.success){
          setTodos(res.tasks.tasks);
      }
  }
  useEffect(()=>{
    fetchTaks()
  },[]);
console.log(allTodos)
  const handleAddTodo = async () =>{
    let newToDoItem = {
      title:newTitle,
      description:newDesc,
      user:user._id,
      assignee,
      dueDate:date
    }
    const flag = allTodos.some( (todo) => todo.title === newToDoItem.title );
    const res = await postTaskApi(newToDoItem,flag)
    if(res?.success){
      let reducer = [...allTodos];
      setTodos([res.task,...reducer]);
        setTitle('')
        setDesc('')
        setDate('')
        setAssignee('')
    }
}

  const handleDeleteTodo = async (index,id)=>{
    let reducedArr = [...allTodos]
    const res = await deleteTaskApi(id);
    if(res?.success){
        reducedArr.splice(index,1)
        setTodos(reducedArr)
    }
  }

  const getTodo = (status)=>{
    fetchTaks(status);
    setIsCompleteScreen(status);
  }

  const handleComplete= async (index,id)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth()+1;
    let yyyy = now.getFullYear()
    let h =now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    let completedOn = dd+'-'+mm+'-'+yyyy+'at' +h+':'+m+':'+s;
    let reducedArr = [...allTodos]

    const res = await updateTaskApi(id,completedOn);
    if(res?.success){
        reducedArr[index].status = 'completed'
        setTodos(reducedArr)
    }
  }


  const handleDeleteCompleted = async (index,id)=>{
    let reducedArr = [...allTodos]
    const res = await deleteCompletedTaskApi(id);
    if(res?.success){
    reducedArr.splice(index,1)
    setTodos(reducedArr)
    }
  }

  function handleEdit(index,item){
    setCurrentEdit(index)
    setCurrentEditedItem(item)
  }

  const handleUpdateTitle =(value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }
  const handleUpdateDesc = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }
  const handleUpdateTime = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,dueDate:value}
    })
  }
  const handleUpdateToDo= async ()=>{
    let newToDo = [...allTodos];
    const flag = newToDo.some((ele,ind)=> ind !== currentEdit && ele.title === currentEditedItem.title)
    const res = await editTaskApi(currentEditedItem,flag);
    if(res?.success){
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo)
    setCurrentEdit('')
    }
  }

  const handleUpdateAssignee = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,assignee:value}
    })
  }

  const cancelUpdate = async ()=>{
    setCurrentEdit(-1)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Todos</h1>
          <LogOut />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={newTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What's the task title"
                    className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="desc">Description</label>
                  <input
                    type="text"
                    id="desc"
                    value={newDesc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="What's the description"
                    className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div className='flex gap-2 '>
                  <div className='flex-1' >
                  <label className="block text-sm font-medium mb-1" htmlFor="time">Date</label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  </div>
                  <div className='flex-grow'>
                  <label className="block text-sm font-medium mb-1" htmlFor="time">Assignee</label>
                  <input
                    type="text"
                    id="assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  </div>
                </div>
                <button
                  type='button'
                  onClick={handleAddTodo}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Add Task
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex mb-4 space-x-4">
                <button
                  className={`flex-1 px-4 py-2 rounded ${isCompleteScreen === '' ? 'bg-green-500' : 'bg-gray-700'}`}
                  onClick={() => getTodo('')}
                >
                  All
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded ${isCompleteScreen === 'pending' ? 'bg-green-500' : 'bg-gray-700'}`}
                  onClick={() => getTodo('pending')}
                >
                  Todo
                </button>
                <button
                  className={`flex-1 px-4 py-2 rounded ${isCompleteScreen === 'completed' ? 'bg-green-500' : 'bg-gray-700'}`}
                  onClick={() => getTodo('completed')}
                >
                  Completed
                </button>
              </div>

              <div className="space-y-4">
                { allTodos.map((item, index) => (
                  currentEdit === index ? (
                    <div key={index} className="bg-gray-700 p-4 rounded">
                      <input
                        type="text"
                        placeholder="Updated Title"
                        onChange={(e) => handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Updated Description"
                        onChange={(e) => handleUpdateDesc(e.target.value)}
                        value={currentEditedItem.description}
                        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Updated Assignee"
                        onChange={(e) => handleUpdateAssignee(e.target.value)}
                        value={currentEditedItem.assignee}
                        className="w-full p-2 mb-2 rounded bg-gray-600 text-white"
                      />
                      <div className="flex justify-between items-center">
                        <input
                          type="date"
                          value={currentEditedItem.dueDate.split('T')[0]}
                          onChange={(e) => handleUpdateTime(e.target.value)}
                          className="p-2 rounded bg-gray-600 text-white w-32"
                        />
                        <div>
                        <button
                          type='button'
                          onClick={handleUpdateToDo}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                        >
                          Update
                        </button>
                        <button
                          type='button'
                          onClick={cancelUpdate}
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        >
                          Cancel
                        </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    item.status === 'pending' ? (                    <div key={index} className="bg-gray-700 p-4 rounded flex justify-between items-start">
                      <div>
                        <h2 className="text-green-400 text-xl font-semibold">{item.title}</h2>
                        <p className="text-gray-300">{item.description}</p>
                        <div className='flex gap-2'>
                          <p className="text-sm text-gray-400 mt-2">Date: {item.dueDate.split('T')[0]}</p>
                          <p className="text-sm text-gray-400 mt-2">Assignee: {item.assignee}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <BsCheckLg
                          className="text-2xl text-green-500 cursor-pointer hover:text-green-600"
                          onClick={() => handleComplete(index, item._id)}
                          title='Complete?'
                        />
                        <AiOutlineEdit
                          className="text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500"
                          onClick={() => handleEdit(index, item)}
                          title='Edit?'
                        />
                        <AiOutlineDelete
                          className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
                          onClick={() => handleDeleteTodo(index, item._id)}
                          title='Delete?'
                        />
                      </div>
                    </div>
                    ) : (
                  <div key={index} className="bg-gray-700 p-4 rounded flex justify-between items-start">
                    <div>
                      <div className='flex gap-2'><h2 className="text-xl font-semibold">{item.title}</h2><p>(assignee:{item.assignee})</p></div>
                      <p className="text-gray-300">{item.desc}</p>
                      <p className="text-sm text-gray-400 mt-2">Assined Date: {item.createdAt.split('T')[0]}</p>
                      <p className="text-sm text-gray-400 mt-2">Due Date: {item.dueDate.split('T')[0]}</p>
                      <p className="text-sm italic text-gray-400 mt-2">Completed On: {item.updatedAt.split('T')[0]}</p>
                    </div>
                    <div>
                      <AiOutlineDelete
                        className="text-2xl text-red-500 cursor-pointer hover:text-red-600"
                        onClick={() => handleDeleteCompleted(index, item._id)}
                        title='Delete?'
                      />
                    </div>
                  </div>
                    )
                  )
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <TaskStatistics todo={allTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePages
