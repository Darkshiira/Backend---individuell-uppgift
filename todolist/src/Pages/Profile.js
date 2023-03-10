import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import billboard from '../Media/Backgrounds/Billboard.avif'
import pin from '../Media/Icons/pin.png'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const FriendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 10%;
    margin: 0;
    background-color: #95BDFF;
    color: white;
    
        a {
            text-decoration: none;
            color: white;
            font-size: 1.2rem;
        }

        button {
            background-color: #5C8BFF;
            border: none;
            font-size: 1.2rem;
            color: white;
            padding: 10px;

            @media (max-width: 768px) {
            height: 50px;
            }
        

            :hover {
                cursor: pointer;
                background-color: rgb(180, 228, 255);
            }
        }

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
    }
`
const Friendsdiv = styled.div`
    

    @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        justify-content: start;

        a {
            margin: 0 10px 0 10px;
        }
    }
`
const TopBillboard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    
    button {
        background-color: #5C8BFF;
        border: none;
        font-size: 1.2rem;
        color: white;
        padding: 10px;
        border-radius: border-radius: 0px 10px 10px 0px;

        box-shadow: 0px 15px 18px -14px rgba(0,0,0,0.75);
        
        :hover {
            cursor: pointer;
            background-color: rgb(180, 228, 255);
        }
    }
    ` 
const Billboard = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
    width: 90%;
    height: 100vh;
    margin: 0;
    background-image: url(${billboard});
    background-size: cover;
    background-position: center;
    box-shadow: 12px 10px 22px 0px rgba(0,0,0,0.75) inset;
    
    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        
    }
   
`
const TodoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin: 30px 0;

    img {
        width: 50px;
        height: 50px;
    }

    
`

const Postit = styled.div`
    width: 200px;
    height: 200px;
    background-color: #DFFFD8;
    margin: 10px;
    padding: 10px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #2C3333;
    font-family: comic sans ms;
    box-shadow: 0 0 15px 0 black;

    :hover {
        cursor: pointer;
    }
    :nth-child(2n) {
        background-color: #FFD8D8;
        transform: rotate(5deg);
    }
    :nth-child(3n){
        background-color: #FBFFB1;
        transform: rotate(-5deg);
    }

    @media (max-width: 768px) {
        width: 150px;
        height: 150px;
        font-size: 1rem;
    }
`

const Profile = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [friends, setFriends] = useState([]);
    const [todos, setTodos] = useState([]);
    const [list, setList] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        const fetchingFriends = async () => {
            const response = await fetch('http://localhost:5050/auth/verifyfriends', {
                //Endpoint: VerifyFriends
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            
            if (response.status === 200) {
                setFriends(data);
            }

            if (response.status === 403) return window.location.href = '/'

            if (response.status === 404) {
                setFriends([{id:0},{userFriends: 'You dont have any friends.....yet'}]);

            } else {    
                
            }
        }
        const fetchingTodos = async () => {
            const response = await fetch('http://localhost:5050/auth/verifytodo', {
                //Endpoint: VerifyTodo
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
            //Endpoint: DeleteList
            method: 'DELETE',
            credentials: 'include'
        })
        const data = await response.json();
        if (response.status === 403)
        window.location.href = '/'
        if (response.status === 200)
        window.location.reload();

        else {
            console.log(data);
        }
    }


        

  return (
    <>
    {loggedIn ? <Wrapper>
    <FriendWrapper><Friendsdiv><h2>Friends</h2> {friends.map((friend) => <div key={friend.id}><Link to={`/members/:${friend.id}`}>{friend.userFriends}</Link> </div>)}</Friendsdiv><button onClick= {(e)=> viewMembers(e)}>Add new friends</button></FriendWrapper>
    <Billboard><TopBillboard><button onClick={(e) => AddTodo()}>Add todo</button></TopBillboard>
    {list ?
        <TodoWrapper>
        {todos.map((todo) => <Postit key={todo.id + 'todo'}><img onClick ={(e)=>deleteList(todo.id)} src= {pin} alt='icon of a pin'/><p onClick={(e)=> administrate(todo.id)}>{todo.listName}</p></Postit>)}
        </TodoWrapper>
         : 
         <p>You don't have anything to do.</p>}
        </Billboard></Wrapper>
    : <h1>Not logged in</h1>}
    </>
  )
}

export default Profile