import {useState} from 'react'

const Addtodo = () => {
    const [todo, setTodo] = useState('');

    const UploadTodo = async (e) => {
        e.preventDefault();
        console.log(todo)

        const response = await fetch('http://localhost:5050/todo/addtodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todo
            }),
            credentials: 'include'
        })
        const data = await response.json();
        console.log(data);
        if (response.status === 202) {
            setTodo('');
            window.location.href = '/todolist';

        
        }

    }


  return (
    <>
    <form onSubmit={(e) => UploadTodo(e)}>
        <input type="text" placeholder="Enter your Todo" onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit">Add Todo</button>
    </form>
    </>
  )
}

export default Addtodo