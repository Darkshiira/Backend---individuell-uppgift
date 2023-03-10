import {useEffect, useState} from 'react';
import styled from 'styled-components';

const Background = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    height: 100vh;
    background-color: #95bdff;

    @media (max-width: 768px) {
        height: 250vh;
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

const Main = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 90%;
    margin: 0;
    padding: 0;
`

const Magnet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid black;
    margin: 20px;
    background-image: linear-gradient(to bottom, #ff0016, #d50324, #aa1028, #7e1727, #541922);
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);
    
    p {
        font-size: 1.2rem;
        font-weight: bold;
        color: black;
        padding: 10px 20px;
        background-color: #E7B10A;
        box-shadow: -1px 10px 5px -7px rgba(0,0,0,0.75);
        text-align: center;

    }

    :nth-child(odd) {
        transform: rotate(-3deg);
        :nth-child(even) {
            transform: rotate(3deg);
        }
    }


    

    button {
        font-size: 1.2rem;
        color: white;
        background: none;
        border: none;
    
        :hover {
            cursor: pointer;
            background-color: #FFACAC;
            border-radius: 10px;
    }
    `
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
        setTimeout(() => {
            setMessage('')
        }, 3000);
    }


  return (
    <Background>
        <Aside>
            <Backbutton onClick={() => goBack()}>Back</Backbutton>
            {message ? <p>{message}</p> : null}
        </Aside>
        <Main>
    {members.map((member) => 
    <Magnet key= {member.id}>
        <p>{member.userName}</p>
        <button onClick={(e)=> addfriend(member.id)}>Add friend</button>
    </Magnet>)}
    
    
    </Main>
    </Background>
  )
}

export default Members