import {useEffect, useState} from 'react'

const Addtodo = () => {
    const [todo, setTodo] = useState('');
    const [sucess, setSucess] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [showTodoList, setShowTodoList] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchingTodo = async () => {
            const response = await fetch(`http://localhost:5050/todo?name=${name}`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            setTodoList(data);
        }
        fetchingTodo();
    }, [showTodoList])

    const AddNewTodoList = async (e) => {
        e.preventDefault();
        console.log(todo)

        const response = await fetch('http://localhost:5050/todo/addtodolist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            }),
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        if (response.status === 202) {
            setSucess(true);
        }

    AddNewTodoList();

    }

    const AddNewTodo = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5050/todo/addtodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                todo
            }),
            credentials: 'include'
        })
        const data = await response.json();
        
        if(response.status === 201) {
            setShowTodoList(true);
        }

        if (response.status === 403)
        window.location.href = '/'

        if (response.status === 409)
        console.log('Listname already exists')


    }



  return (
    <> {sucess ?<div>
        {showTodoList ? <div>
            <h1>{name}</h1>
            {todoList.map((todo) => (
            <div key={todo.id}>
                <h1>{todo.toDo}</h1>
            </div>
        ))} </div> : null

            }


    <h1>Make a new todo to your list</h1>

    <form onSubmit={(e) => AddNewTodo(e)}>
        <input type="text" placeholder="Add a new todo to your list" onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit">Add a new todo</button>
    </form> 
    </div>
    :
    <div>

    <h1>Make a new list</h1>
    <form onSubmit={(e) => AddNewTodoList(e)}>
        <input type="text" placeholder="Name of your list" onChange={(e) => setName(e.target.value)}/>
        <button type="submit">Create a new list</button>
    </form>
    </div>}

    </>
  )
}

export default Addtodo;