import { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import SearchForm from './components/SearchForm';
import UserModal from './components/UserModal';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const onChangeSearch = (e)=>{
    setSearch(e.target.value);
  }

  const toggleModal = ()=>{
    setIsModalOpen(prev => !prev);
  }
  
  const onCreateUser = (newUser) => {
    const lastId = users[users.length - 1].id;
    const userWithId = { ...newUser, id:lastId +1};
    setUsers(prev => [...prev, userWithId]);
    toggleModal();
  };
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);
  return (
    <>
      <SearchForm toggleModal={toggleModal} search={search} onChangeSearch={onChangeSearch} />
      <UserList users={users} isModalOpen={isModalOpen} search={search} />
      {isModalOpen && <UserModal toggleModal={toggleModal} onCreateUser={onCreateUser} />}
    </>
  );
}

export default App;
