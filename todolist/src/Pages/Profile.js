import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Profile = () => {
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
            
            if (response.status === 403) return window.location.href = '/'

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

    const deleteList = async (id) => {
        const response = await fetch(`http://localhost:5050/list?id=${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const data = await response.json();
        if (response.status === 403)
        window.location.href = '/'
        if (response.status === 200)
        window.location.reload();
    }


        

  return (
    <>
    {loggedIn ? <div> <h1>Logged in</h1> 
    <div><h2>Friends</h2> {friends.map((friend) => <div key={friend.id}><Link to={`/members/:${friend.id}`}>{friend.userFriends}</Link> </div>)}</div><button onClick= {(e)=> viewMembers(e)}>Add new friends</button>
    <div><h2>Todos</h2> <button onClick={(e) => AddTodo()}>Add todo</button> 
    {list ?
     <div>
        {todos.map((todo) => <div key={todo.id + 'todo'}><p>{todo.listName}</p><button onClick={(e)=> administrate(todo.id)}>Show</button><button onClick ={(e)=>deleteList(todo.id)}>X</button></div>)}
        </div>
         : 
         <p>You don't have anything to do.</p>}
        </div></div>
    : <h1>Not logged in</h1>}
    </>
  )
}

export default Profile