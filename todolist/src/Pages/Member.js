import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


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
        }
        fetchingMember();
    }, [])

    const goBack = () => {
        window.history.back();
    }

  return (
    <>
    <button onClick= {(e)=> goBack()}>Back</button>
    {data ? 
    <div>
    <h1>{memberData[0].userName}</h1>
    

    {lists.map((element,index) => { 
        return <div key={index}><h2>{element}</h2>{memberData.filter((member) => member.listName.includes(element)).map(filteredtodos => {
        return <div key={filteredtodos.id}><p>{filteredtodos.toDo}</p></div>})}</div>})}

    </div>: <h2>Your friend has nothing to do yet!</h2>}
    </>
  )
}

export default Member