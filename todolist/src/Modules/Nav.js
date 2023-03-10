import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import postit from '../Media/Icons/post.png'
import styled from 'styled-components';

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    background-color: #95BDFF;

    ul {
        display: flex;
        flex-direction: row;
        list-style: none;
    
        li {
            margin: 0 10px;
            font-size: 1.5rem;

            a {
                text-decoration: none;
                color: white;

                :hover {
                    background-color: rgb(180, 228, 255);
                    border-radius: 5px;
                    padding: 10px;
                    cursor: pointer;
                }

            }

        }
    }

    img {
        margin: 15px;
        width: 50px;
        height: 50px;
    }

`;

const FormStyle = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;

    input {
        height: 30px;
        width: 150px;
        border-radius: 5px;
        border: none;
        margin: 0 10px;
        background-color: #FEFBF6;
    }

    button {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        border: none;
        background-color: #95BDFF;
        color: white;
        font-weight: bold;

        :hover {
            background-color: #5C8BFF;
            cursor: pointer;
        }
    }
    `

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    `

const LoggedIn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px;

    p {
        margin: 0 10px;
        font-size: 1.5rem;
        color: white;
    }

    button {
        margin-left: 30px;
        height: 30px;
        width: 100px;
        border-radius: 5px;
        border: none;
        background-color: #5C8BFF;
        color: white;
        font-weight: bold;

        :hover {
            background-color: rgb(180, 228, 255);
            cursor: pointer;
        }
    }
    `


const Nav = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState([]);

    useEffect(() => {
        const fetchingLoggedIn = async () => {
            const response = await fetch('http://localhost:5050/auth/verify', {
                // Endpoint: Verify
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();

            if (response.status === 200){
                setLoggedIn(true);
                setUserName(data);
            } else {
                setLoggedIn(false);
            }


        }
        fetchingLoggedIn();
    }, [loggedIn])

    const LogOut = async () => {
        const response = await fetch('http://localhost:5050/auth/logout', {
            // Endpoint Logout
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json();
        if (response.status === 200)
        {   
            setLoggedIn(false)
            window.location.reload();

        }
        
            if (response.status === 403) return window.location.href = '/'
            else {
                console.log(data);
        }
    }

    const LogIn = async (e) => {
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
            if (response.status === 200) {
                window.location.href = '/todolist';
            }
            else {
                console.log(data);
            }
        }
        fetching();
    }


  return (
    <NavBar>
        <Wrapper>
        <img alt='icon of a postit' src={postit}></img>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/todolist">Profile</Link></li>
        </ul>
        </Wrapper>

{loggedIn ? <LoggedIn><p>{userName[0].userName}</p><button onClick={(e) => LogOut()}>Logout</button> </LoggedIn>:
<FormStyle onSubmit= {(e) => LogIn(e)}>
            <input type="text" placeholder="Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </FormStyle>}

</NavBar>
  )
}

export default Nav