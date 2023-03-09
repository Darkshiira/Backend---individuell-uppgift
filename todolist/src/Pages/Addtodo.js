import {useEffect, useState} from 'react'

const Addtodo = () => {
    const [todo, setTodo] = useState('');
    const [sucess, setSucess] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [showTodoList, setShowTodoList] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchingTodo = async () => {
            const response = await fetch(`http://localhost:5050/list?name=${name}`, {
                //Endpoint GetTodo
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            
            if (response.status === 200) { 
                setTodoList(data);
                setShowTodoList(true);
            }
            if (response.status === 403) return window.location.href = '/'

            else {
                console.log(data)
            }

        }
        fetchingTodo();
    }, [showTodoList])


    const AddNewTodoList = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5050/list/addtodolist', {
            //Endpoint: AddTodoList
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
        setMessage(data);
        if (response.status === 201) {
            setSucess(true);
        }
        if (response.status === 403) return window.location.href = '/'
    }

    const AddNewTodo = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:5050/list/addtodo', {
            //Endpoint: AddTodo
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
        setMessage(data.message);
        
        if(response.status === 201) {           
            setTodo('')
        }
        if (response.status === 403) return window.location.href = '/'
    }



  return (
    <> {sucess ?<div>
        {showTodoList ? <div>
            <h1>{name}</h1>
            {todoList.map((todo) => (
            <div key={todo.id}>
                <p>{todo.toDo}</p>
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

    {message}

    </>
  )
}

export default Addtodo;