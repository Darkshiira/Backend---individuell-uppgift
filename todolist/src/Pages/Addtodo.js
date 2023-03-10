import {useEffect, useState} from 'react'
import styled from 'styled-components'

const Background = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    background-color: #95BDFF;
    height: 200vh;
`

const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    height: 250px;
    margin: 20px 0 0 50px;
    background-color: #DFFFD8;
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);
    transform: rotate(-6deg);

    @media (max-width: 768px) {
        width: 150px;
        height: 100px;
`
const Backbutton = styled.button `
    background-color: #DFFFD8;
    border: none;
    font-size: 1.2rem;
    font-family: comic sans ms;

    :hover {
        cursor: pointer;
        background-color: rgb(180, 228, 255);
    }
`
const Side = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 20%;
    background-color: white;
    height: 50%;
    margin:0;
    border-radius: 15px 0 0 15px;

    @media (max-width: 768px) {
        width: 50%;
    }
    `

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
    height: 40%;
    background-color: white;

    input {
        height: 30px;
        width: 300px;
        border-radius: 5px;
        margin: 20px;

        @media (max-width: 768px) {
            width: 200px;
        }
    }

    button {
        background-color: #5C8BFF;
        border: none;
        font-size: 1.2rem;
        color: white;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 0px 15px 18px -14px rgba(0,0,0,0px);
        margin: 40px 30px 0 30px;
    
        :hover {
            cursor: pointer;
            background-color: rgb(180, 228, 255);
        }
        
    }

`
const TodoList = styled.div`
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 60px 0 60px 0;
    
    box-shadow: 2px 1px 36px 0px rgba(0,0,0,0.75);
    padding: 0 20px;
    

    h1 {
        font-size: 2rem;
        font-family: comic sans ms;
        text-decoration: underline;

    }

    p {
        font-size: 1.2rem;
        font-family: comic sans ms;
        border-bottom: 1px solid black;

    }

    @media (max-width: 768px) {
        display: none;
    }

    `
    const Tape = styled.div`
    position: absolute;
    top: -25px;
    left: 48%;
    width: 30px;
    height: 50px;
    background-color: #E7B10A;
    box-shadow: 2px 1px 36px 0px rgba(0,0,0,0.75);
    transform: rotate(8deg);
    `
const Todoitem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0;
    background-color: white;
    `


const Addtodo = () => {
    const [todo, setTodo] = useState('');
    const [sucess, setSucess] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [showTodoList, setShowTodoList] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

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
            if (response.status === 400) {
                setMessage(data);          
            setTimeout(() => {
                setMessage('');
            }, 3000);
            }

        }


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
        setTimeout(() => {
            setMessage('');
        }, 3000);
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
        setMessage(data);
        setTimeout(() => {
            setMessage('');
        }, 3000);
        
        if(response.status === 201) {          
            setTodo('');
            fetchingTodo();
            setShowTodoList(true);
        }
        if (response.status === 403) return window.location.href = '/'

        else {
            setMessage(data);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }

    const goBack = (e) => {
        e.preventDefault();
        window.location.href = '/todolist'
    }


  return (
    <Background>
        <Aside>
    <Backbutton onClick={(e) => goBack(e)}>Back</Backbutton>
    {message}
    </Aside>
        {showTodoList ? <TodoList>
            <Tape></Tape>
            <h1>{name}</h1>
            {todoList.map((todo) => (
            <Todoitem key={todo.id}>
                <p>{todo.toDo}</p>
            </Todoitem>
        ))} </TodoList>: null }
    {sucess ?
    <Side>
    <h1>Make a new todo to your list</h1>
    <Form onSubmit={(e) => AddNewTodo(e)}>
        <input type="text" placeholder="Add a new todo to your list" onChange={(e) => setTodo(e.target.value)}/>
        <button type="submit">Add a new todo</button>
    </Form>
    </Side>
    :
    <Side>
    <h1>Make a new list</h1>
    <Form onSubmit={(e) => AddNewTodoList(e)}>
        <input type="text" placeholder="Name of your list" onChange={(e) => setName(e.target.value)}/>
        <button type="submit">Create a new list</button>
    </Form>
    </Side>}

    

    </Background>
  )
}

export default Addtodo;