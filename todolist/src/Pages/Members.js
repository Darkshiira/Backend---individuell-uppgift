import {useEffect, useState} from 'react';

const Members = () => {

    const [members, setMembers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchingMembers = async () => {
            const response = await fetch('http://localhost:5050/members', {
                // Endpoint: GetMembers
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();
            setMembers(data);

            if (response.status === 403) return window.location.href = '/'
            else {
            }
        }
        fetchingMembers();
    }, [])

    const goBack = () => {
        window.location.href = '/todolist'
    }

    const addfriend = async (id) => {
        const response = await fetch(`http://localhost:5050/members?id=${id}`, {
            // Endpoint: AddFriend
            method: 'POST',
            credentials: 'include',
        })
        const data = await response.json();
        setMessage(data);
    }


  return (
    <>
    <button onClick={() => goBack()}>Back</button>
    <h1>Members</h1>
    {members.map((member) => <div key= {member.id}><p>{member.userName}</p><button onClick={(e)=> addfriend(member.id)}>Add to friends</button></div>)}
    
    {message ? <p>{message}</p> : null}
    </>
  )
}

export default Members