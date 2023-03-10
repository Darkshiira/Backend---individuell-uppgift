import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import pencil from '../Media/Icons/pencil.png'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 200vh;
    margin: 0;
    background-color: #95BDFF;
`
const Aside = styled.aside`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    height: 250px;
    margin: 20px 0 0 50px;
    background-color: #DFFFD8;
    color: white;
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);
    transform: rotate(-6deg);
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

const AddTodoButton = styled.button`
    background-color: #5C8BFF;
    border: none;
    font-size: 1.2rem;
    color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 15px 18px -14px rgba(0,0,0,0px);
    margin: 0 30px 0 30px;

    :hover {
        cursor: pointer;
        background-color: rgb(180, 228, 255);
    }
    `
const BackgroundDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    background-color: #95BDFF;
    width: 80%;
    height: 100%;
    `

const TodoList = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 60px 0 50% 0;
    height: 80%;
    background-color: white;
    box-shadow: 2px 1px 36px 0px rgba(0,0,0,0.75);
    padding: 0 20px;
    

    h1 {
        font-size: 2rem;
        font-family: comic sans ms;

    }
    `
const TodoItem = styled.div`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
    width: 100%;
    border-bottom: 1px solid black;
    font-family: comic sans ms;
    

    img {
        width: 30px;
        height: 30px;
        margin: 0 10px;

        :hover {
            cursor: pointer;
        }
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
    
    const CheckButton = styled.button`
    background-color: white;
    border: 2px solid black;
    width: 20px;
    height: 20px;
    margin: 15px 10px 0 10px;
    color: white;

    :hover {
        cursor: pointer;
        color: black;
        font-weight: bold;
        font-size: 1.2rem;

    }
    `
const Addform = styled.form`
    margin: 10px 50px;
    display: flex;
    flex-direction: column;
    background-color: #95BDFF;
    width: 50%;

    input {
        width: 100%;
        height: 30px;
        margin: 10px 0;
        border: none;
        border-bottom: 1px solid black;
        font-size: 1.2rem;
        font-family: comic sans ms;
        background-color: #95BDFF;
    }

    button {
        background-color: #5C8BFF;
        border: none;
        font-size: 1.2rem;
        color: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 15px 18px -14px rgba(0,0,0,0px);
        margin: 0 30px 0 30px;
    
        :hover {
            cursor: pointer;
            background-color: rgb(180, 228, 255);
        }
    }
    `
    const Textfield = styled.div`
    margin: 10px 50px;
    display: flex;
    flex-direction: column;
    background-color: #95BDFF;
    width: 50%;

    input {
        width: 100%;
        height: 30px;
        margin: 10px 0;
        border: none;
        border-bottom: 1px solid black;
        font-size: 1.2rem;
        font-family: comic sans ms;
        background-color: #95BDFF;
    }

    button {
        background-color: #5C8BFF;
        border: none;
        font-size: 1.2rem;
        color: white;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 15px 18px -14px rgba(0,0,0,0px);
        margin: 0 30px 0 30px;
    
        :hover {
            cursor: pointer;
            background-color: rgb(180, 228, 255);
        }
    }
    `
    const Postit = styled.div`
    width: 200px;
    height: 200px;
    background-color: #FFD8D8;
    transform: rotate(5deg);
    margin: 10px;
    padding: 10px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #2C3333;
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);

    :hover {
        cursor: pointer;
    }
    `


const Todo = () => {
    const [todo, setTodo] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const {id} = useParams();
    const [textField, setTextField] = useState(false);
    const [patch, setPatch] = useState('');
    const [addNew, setAddNew] = useState(false);
    const [data, setData] = useState(false);
    const [forPatch, setForPatch] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchingTodo = async () => {
            const response = await fetch(`http://localhost:5050/todo/showtodo?id=${id}`, {
                //Endpoint: ShowTodo
                method: 'GET',
                credentials: 'include',
                })
                
            const answer = await response.json();
            setTodo(answer);
            if (response.status === 200) {
                setData(true)
            }

            if (response.status === 403) return window.location.href = '/'

            else {
                
            }
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
            setMessage(answer)
            setTimeout(() => {
                setMessage('')
            }, 3000);
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
            setMessage(answer)
            setTimeout(() => {
                setMessage('')
            }
            , 3000)
        }
    }

    const AddTodo = async (e) => {
        e.preventDefault();
        if (addNew === false) {setAddNew(true);}
        else {setAddNew(false)}
    }

    const AddnewTodo = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5050/todo/addnewtodo`, {
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
            setAddNew(false);
        window.location.reload()
    }
        
        else {
            setMessage(data)
            setTimeout(() => {
                setMessage('')
            }, 3000);
        }
    }



  return (
    <Wrapper> 
    <Aside>
    <Backbutton onClick={(e) => window.location.href = '/todolist'}>Back</Backbutton>
    {message}
    <AddTodoButton onClick={(e) => AddTodo(e)}>Add Todo</AddTodoButton>
    </Aside>
    {addNew ? <Addform onSubmit={(e)=>AddnewTodo(e)}>
    <input type="text" placeholder="Enter your Todo" onChange={(e) => setNewTodo(e.target.value)}/>
    <button>Submit</button>
    </Addform>
    : null }
    {textField ? <Textfield>
    <input type="text" defaultValue={patch[0].toDo} placeholder="Enter your Todo" onChange={(e) => setForPatch(e.target.value)}/>
    <button onClick={(e) => patchingTodo(e)}>Submit</button>
    </Textfield>
    : null}
    <BackgroundDiv>
        {data ? 
        <TodoList><Tape/><h1>{todo[0].listName}</h1>
        {todo.map((todo) => 
    <TodoItem key= {todo.id}><CheckButton onClick={(e)=>deleteTodo(todo.id)}>X</CheckButton>
    <p>{todo.toDo}</p>
    <img onClick={(e) => openTextfield(todo.id)} src={pencil} alt='icon of a pencil' width='30px' height='30px'/>
    </TodoItem>)}
    </TodoList> : <Postit><p>You have no todo's on your list</p></Postit>}
    </BackgroundDiv>
    


    </Wrapper>
  )
}

export default Todo