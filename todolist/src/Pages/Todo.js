import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Todo = () => {
    const [todo, setTodo] = useState([]);
    const {id} = useParams();
    const [textField, setTextField] = useState(false);
    const [patch, setPatch] = useState('');


    useEffect(() => {
        const fetchingTodo = async () => {
            const response = await fetch(`http://localhost:5050/todo?id=${id}`, {
                method: 'GET',
                credentials: 'include',
                })
                
            const data = await response.json();
            setTodo(data);

            if (response.status === 403)
        window.location.href = '/login'
        }
        fetchingTodo();
   
    }, [id])

    const deleteTodo = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5050/todo?id=${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        window.location.href = '/todolist';
    }

    const openTextfield= async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5050/todo?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        setPatch(data);
        setTextField(true);
        
    }

    const patchingTodo = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5050/todo?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patch
            }),
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        window.location.href = '/todolist';
    }




  return (
    <> 
    {textField ? <div>
    <input type="text" value={patch.map((patch) => patch.toDo)} placeholder="Enter your Todo" onChange={(e) => setPatch(e.target.value)}/>
    <button onClick={(e) => patchingTodo(e)}>Submit</button>
    </div>
    :
    <div>{todo.map((todo) => 
    <div key= {todo.id}>
    <p>{todo.toDo}</p>
    <button onClick={(e)=>deleteTodo(e)}>Delete</button>
    </div>)}</div> }
    <aside>
    <button onClick={(e) => window.location.href = '/todolist'}>Back</button>
    <button onClick={(e) => openTextfield(e)}>Change Todo</button>
    </aside>

    </>
  )
}

export default Todo