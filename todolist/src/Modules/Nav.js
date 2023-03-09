import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

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
            if (data === 'Login successful') {
                window.location.href = '/todolist';
            }
        }
        fetching();
    }


  return (
    <nav>

        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/todolist">Todolist</Link></li>
        </ul>

{loggedIn ? <div><p>{userName[0].userName}</p><button onClick={(e) => LogOut()}>Logout</button> </div>:
<form onSubmit= {(e) => LogIn(e)}>
            <input type="text" placeholder="Enter your Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter your Password" onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>}

</nav>
  )
}

export default Nav