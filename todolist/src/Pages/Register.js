import { useState } from "react"

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [answer, setAnswer] = useState('');

    const RegisterUser = (e) => {
        e.preventDefault();
        const fetching = async () => {
            const response = await fetch('http://localhost:5050/auth/register', {
                // Endpoint Register
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const data = await response.json();
            setAnswer(data);
            
            if (response.status === 201)
            {
            setUsername('');
            setPassword('');
            }
        }
        fetching();
    }

  return (
    <div>
        <h1>Register</h1>
        <form onSubmit= {(e) => RegisterUser(e)}>
            <input type="text" placeholder="Enter your Username" onChange={(e)=> setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter your Password" onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit">Register</button>
        </form>

        <p>{answer}</p>
    </div>
  )
}

export default Register