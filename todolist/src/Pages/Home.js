import { useState } from 'react';

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
    <div>
        <form onSubmit= {(e) => FetchingCookie(e)}>
            <input type="text" placeholder="Enter your Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter your Password" onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Home