import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import styled from "styled-components"
import magnet from "../Media/Icons/redmagnet.png"

const Wrapper = styled.div`
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
    justify-content: center;
    width: 90%;
    `
const PostitWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;

    h2 {
        margin: 10px 25px;
    }

`

const ListHeader = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 20px 0 0 50px;
    background-color: white;
    font-family: comic sans ms;
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);

    :nth-child(odd) {
        transform: rotate(3deg);
        margin: 50px 0 0 50px;
    }
    :nth-child(even) {
        transform: rotate(-6deg);
        margin: 20px 0 0 50px;
    }

    img {
        position: absolute;
        top: 0;
        right: 48%;
        width: 20px;
        height: 20px;
    }
    `
const Listbody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid black;
`

const Board = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    `
const Sign = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    background-image: linear-gradient(
        45deg,
        hsl(240deg 2% 78%) 0%,
        hsl(304deg 2% 82%) 10%,
        hsl(347deg 5% 86%) 20%,
        hsl(11deg 9% 90%) 30%,
        hsl(29deg 14% 93%) 40%,
        hsl(60deg 20% 97%) 50%,
        hsl(60deg 3% 85%) 60%,
        hsl(60deg 1% 73%) 70%,
        hsl(60deg 1% 61%) 80%,
        hsl(60deg 0% 50%) 90%,
        hsl(0deg 0% 39%) 100%
      );
    border-radius: 15px;
    box-shadow: 10px 10px 41px 0px rgba(0,0,0,0.75);
    margin: 50px 0;

    @media (max-width: 768px) {
        width: 200px;
        height: 100px;
    }
    
    h1 {
        font-size: 2.5rem;
        color: transparent;
        text-shadow: 2px 2px 3px black;
    }
    `
    const NothingToSee = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    height: 250px;
    margin: 20px 0 0 50px;
    background-color: #F7C8E0;
    color: black;
    font-family: comic sans ms;
    box-shadow: 3px 24px 36px 0px rgba(0,0,0,0.75);
    transform: rotate(2deg);
    `


const Member = () => {
    const [data, setData] = useState(false);
    const {id} = useParams();
    const [memberData, setMemberData] = useState([]);
    const [lists, setLists] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchingMember = async () => {
            const member = id.split(":")[1];
            const response = await fetch(`http://localhost:5050/members/profile?member=${member}`, {
                //Endpoint: Friendprofile
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json();

            if (response.status === 403){
            window.location.href = '/'
        }
            if (response.status === 200){
            setMemberData(data);
            const alllists = data.map((list) => list.listName);
            const unique = [...new Set(alllists)];
            setLists(unique);
            setData(true);
        }
        if (response.status === 404){
            setMessage('No data to show')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }
        fetchingMember();
    }, [])

    const goBack = () => {
        window.history.back();
    }

  return (
    <Wrapper>
        <Aside>
            <Backbutton onClick= {(e)=> goBack()}>Back</Backbutton>
            {message}
        </Aside>
    <Main>
    {data ? 
    <Board>
        <Sign>
            <h1>{memberData[0].userName}</h1>
        </Sign>
    
        <PostitWrapper>
        {lists.map((element,index) => { 
             return <ListHeader key={index}><img src={magnet} alt='icon of a pin'/><h2>{element}</h2>{memberData.filter((member) => member.listName.includes(element)).map(filteredtodos => {
            return <Listbody key={filteredtodos.id}><p>{filteredtodos.toDo}</p></Listbody>})}</ListHeader>})}

         </PostitWrapper>
    </Board>
    :
    <NothingToSee><h2>Your friend has nothing to do yet!</h2></NothingToSee>}
    </Main>
    </Wrapper>
  )
}

export default Member