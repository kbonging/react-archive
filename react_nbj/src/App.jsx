import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import UserList from './components/UserList'
// import UserModal from './components/UserModal'
import SearchForm from './components/SearchForm'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() =>{
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <SearchForm/>
      <UserList users={users} />
    </>
  )
}

export default App
