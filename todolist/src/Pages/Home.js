import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    background-image: linear-gradient(to bottom, #95bdff, #78d5ff, #85e8f1, #aff5e0, #dfffd8);
    height: 100vh;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 30%;
    margin: 0;
    background-color: white;
    border-radius: 0px 15px 0px 0px;

    @media (max-width: 768px) {
        width: 60%;
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

const Home = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const FetchingCookie = (e) => {
        e.preventDefault();
        const fetching = async () => {
            const response = await fetch('http://localhost:5050/auth/login', {
                // Endpoint Login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                }),
                credentials: 'include'
            })
            const data = await response.json();
            setMessage(data);

            if (response.status === 200) {
                window.location.href = '/todolist';
            }
        }
        fetching();
    }

  return (
    <Background>
        <Wrapper>
    <h1>Sign in:</h1>
    
    
        <Form onSubmit= {(e) => FetchingCookie(e)}>
            <input type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </Form>
        <p>{message}</p>
        <div><h2>Dont have an account yet?</h2> <Link to= '/register'>Register</Link></div>
        </Wrapper>
    </Background>
  )
}

export default Home