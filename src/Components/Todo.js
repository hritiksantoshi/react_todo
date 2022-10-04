import React, { useState } from 'react'
import ShowTodo from './ShowTodo'
import './Todo.css'
function Todo() {

    const [task, setTask] = useState("add some task")
    const [data, setData] = useState([])
    const [isEditing, setIsEditing] = useState(false);
  // object state to set so we know which todo item we are editing
  const [currentTodo, setCurrentTodo] = useState({})

    const onChangeHandler = (e) => {
        setTask(e.target.value);
    }
    
    const handleEditFormSubmit = (e) =>{
        e.preventDefault();
        handleUpdateTodo(currentTodo);
      }
      
    const submitHandler = (e) => {
        e.preventDefault();
        const newData = task;
        setData([...data, newData])
        setTask('')
    }
    
    const handleEditInputChange = (e) => {
        // set the new state value to what's currently in the edit input box
        setCurrentTodo({ ...currentTodo, text: e.target.value });
        console.log(currentTodo);
      }

    const handleEditClick = (todo) => {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
        console.log(todo);
    }  
    const handleUpdateTodo =  (updatedTodo) => {

        const updatedData = data.map((todo,index) =>index === updatedTodo.id ? updatedTodo.text : todo);
        setIsEditing(false);
        setData(updatedData);
      }

    const deleteItem =(a)=>{
        const finalData = data.filter((curEle,index)=>{
            return index !== a;
        })
        setData(finalData)
    }

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center main-row">
                <div className="col shadow main-col bg-white">
                    <div className="row bg-primary text-white">
                        <div className="col  p-2">
                            <h4 className='text-center'>Todo App Using React JS</h4>
                        </div>
                    </div>
                     {isEditing ? (
                        <form onSubmit={handleEditFormSubmit}>
                        <h2>Edit Todo</h2>
                        <input name="editTodo"   type="text" placeholder="Edit todo" value={currentTodo.text}  onChange={handleEditInputChange} />
                        <label htmlFor="editTodo">Edit todo: </label>
                        <button type="submit" >Update</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                     ):
                    (
                    <form onSubmit={submitHandler}>
                        <div className="row justify-content-between text-white p-2">
                            <div className="form-group flex-fill mb-2 col-9">
                                <input id="todo-input" type="text" className="form-control" value={task} onChange={onChangeHandler} />
                            </div>
                            <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">Add todo</button>
                        </div>
                    </form>
                    )
                     }

                    {data.map((value, index) => {
                        return <ShowTodo
                            key={index}
                            id={index}
                            task={value}
                            onSelcet={deleteItem}
                            onEdit = {handleEditClick}
                        />
                    })}


                </div>
            </div>
        </div>
    )
}

export default Todo
