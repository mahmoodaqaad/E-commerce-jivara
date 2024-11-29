import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const Todos = ({ mode }) => {

    const initeTodo = [
        { id: 1, title: "learn HTML CSS PHP JS", complete: true },
        { id: 2, title: "Learn React and react Hooks", complete: false },
        { id: 3, title: "create a dashboard with react", complete: false },
        { id: 4, title: "learn HTML CSS PHP JS", complete: true },
        { id: 5, title: "Learn React and react Hooks", complete: false },
        { id: 6, title: "create a dashboard with react", complete: false },
    ]
    const [todos, setTodos] = useState(initeTodo)
    const [title, setTitle] = useState("")
    const handelSubmit = () => {
        if (title) {

            setTodos(
                prev => {
                    return [...prev, { id: crypto.randomUUID(), title: title, complete: false }]
                }
            )
            setTitle("")
        }
    }


    function handleDelete(id) {
        const newTodo = todos.filter(item => item.id !== id)
        setTodos(newTodo)

    }

    function toggleTodo(complete, id) {

        setTodos(prev => {
            return prev.map(item => {


                if (item.id === id) {
                    return { ...item, complete }
                }


                return item
            })

        })



    }

    return (
        <div className={`p-3  rounded-3 h-100 bg-card ${!mode && "shadow"}`}  >
            <h1 className='mb-3'>Todo</h1>
            <div className='d-flex gap-2 justify-content-between'>
                <div className='col-10'>

                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className='fs-14 w-100 bg-transparent h-100  border p-2 rounded-1' style={{ color: mode ? "white" : "#000" }} placeholder='What do you need to do today ?' />
                </div>
                <button className='btn btn-primary-alt text-white col-2 m-0' onClick={handelSubmit}>Add</button>
            </div>
            <div className='todos border-top pt-2 mt-3'>

                {todos.length > 0 ? todos.map(item =>
                (<div className='d-flex align-items-center justify-content-between  mt-3' key={item.id}>

                    <div className="d-flex gap-2 align-items-center col-10">
                        < input type="checkbox" checked={item.complete} onChange={e => toggleTodo(e.target.checked, item.id)} />

                        <div className={`m-0 flex-grow-1  ${item.complete && (mode ? "completed" : "completed-light")} `} ><h5>{item.title}</h5></div>
                    </div>
                    <div className='px-2 py-1 pointer bg-danger rounded-1 ' onClick={e => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} color='white' /></div>
                </div>


                )) : <h3 className='text-center text-dark-emphasis'>No Todos</h3>}
            </div>

        </div>
    )
}

export default Todos
