import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const Todo = () => {
    const [todo, setTodo] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const {id} = useParams();
    const [textField, setTextField] = useState(false);
    const [patch, setPatch] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState(false);
    const [forPatch, setForPatch] = useState('');


    useEffect(() => {
        const fetchingTodo = async () => {
            const response = await fetch(`http://localhost:5050/todo/showtodo?id=${id}`, {
                //Endpoint: ShowTodo
                method: 'GET',
                credentials: 'include',
                })
                
            const answer = await response.json();
            setTodo(answer);
            setData(true)

            if (response.status === 403)
        window.location.href = '/'
        }
        fetchingTodo();
        
        
   
    }, [addNew])

    const deleteTodo = async (id) => {
        const response = await fetch(`http://localhost:5050/todo?id=${id}`, {
            //Endpoint: DeleteTodo
            method: 'DELETE',
            credentials: 'include'
        })
        const answer = await response.json();
        if (response.status === 403)
        window.location.href = '/'

        if (response.status === 200)
        window.location.reload();

        else {
            console.log(answer)
        }
    }

    const openTextfield= async (id) => {

        const response = await fetch(`http://localhost:5050/todo/item?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        setPatch(data);
        setTextField(true);
        
    }

    const patchingTodo = async (e) => {
        e.preventDefault();
        const id = patch[0].id;
        const todo = forPatch

        const response = await fetch(`http://localhost:5050/todo`, {
            //Endpoint: PatchTodo
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                todo
                
            }),
            credentials: 'include'
        })
        const answer = await response.json();

        if (response.status === 403)
        window.location.href = '/'

        if (response.status === 201)
        window.location.reload();

        else {
            console.log(answer)
        }
    }

    const AddTodo = async (e) => {
        e.preventDefault();
        setAddNew(true);
    }

    const AddnewTodo = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5050/todo/addnewtodo?`, {
            //Endpoint: AddTodotoList
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                newTodo
            }),
            credentials: 'include'
        })
        const data = await response.json();
        if (response.status === 403){
        window.location.href = '/'}

        if (response.status === 201){
        setAddNew(false)}
        
        else {
            console.log(data)
        }
    }



  return (
    <> 
    {addNew ? <form onSubmit={(e)=>AddnewTodo(e)}>
    <input type="text" placeholder="Enter your Todo" onChange={(e) => setNewTodo(e.target.value)}/>
    <button>Submit</button>
    </form>
    : null }
    {textField ? <div>
    <input type="text" defaultValue={patch[0].toDo} placeholder="Enter your Todo" onChange={(e) => setForPatch(e.target.value)}/>
    <button onClick={(e) => patchingTodo(e)}>Submit</button>
    </div>
    : null}
        {data ? 
        <div><h1>{todo[0].listName}</h1>
        {todo.map((todo) => 
    <div key= {todo.id}>
    <p>{todo.toDo}</p>
    <button onClick={(e)=>deleteTodo(todo.id)}>Delete</button>
    <button onClick={(e) => openTextfield(todo.id)}>Change Todo</button>
    </div>)}
    </div> : <p>Loading...</p>}
    
    <aside>
    <button onClick={(e) => window.location.href = '/todolist'}>Back</button>
    <button onClick={(e) => AddTodo(e)}>Add Todo</button>
    </aside>


    </>
  )
}

export default Todo