import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Todolist = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [friends, setFriends] = useState([]);
    const [todos, setTodos] = useState([]);
    const [list, setList] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const fetchingFriends = async () => {
            const response = await fetch('http://localhost:5050/auth/verifyfriends', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();

            if (data === 'You dont have friends') {
                setFriends([{id:0},{userFriends: 'You dont have any friends.....yet'}]);

            } else {
            
                setFriends(data);
            }
        }
        const fetchingTodos = async () => {
            const response = await fetch('http://localhost:5050/auth/verifytodo', {
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();

            if (data === 'You dont have anything to do') {
                setList(false);
                
            }
            else {
            setTodos(data);
            setList(true);
            }
            setLoggedIn(true);
            
        }
        fetchingFriends();
        fetchingTodos();
    }, [])

    const administrate = (id) => {
        window.location.href = `/todolist/${id}`

    }

    const AddTodo = () => {
        window.location.href = '/addtodo'
    }

    const viewMembers = (e) => {
        e.preventDefault();
        window.location.href = '/members'
    }
        

  return (
    <>
    {loggedIn ? <div> <h1>Logged in</h1> 
    <div><h2>Friends</h2> {friends.map((friend) => <p key={friend.id}>{friend.userFriends}</p>)}</div><button onClick= {(e)=> viewMembers(e)}>Add new friends</button>
    <div><h2>Todos</h2> <button onClick={(e) => AddTodo()}>Add todo</button> 
    {list ?
     <div>
        {todos.map((todo) => <div key={todo.id + 'todo'}><p>{todo.listName}</p><button onClick={(e)=> administrate(todo.id)}>Show</button></div>)}
        </div>
         : 
         <p>You don't have anything to do.</p>}
        </div></div>
    : <h1>Not logged in</h1>}
    </>
  )
}

export default Todolist