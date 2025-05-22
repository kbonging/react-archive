import { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import SearchForm from './components/SearchForm';
import UserModal from './components/UserModal';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = ()=>{
    setIsModalOpen(prev => !prev);
  }

  useEffect(() => {
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
      <SearchForm toggleModal={toggleModal} />
      <UserList users={users} isModalOpen={isModalOpen} />
      {isModalOpen && <UserModal toggleModal={toggleModal}/>}
    </>
  );
}

export default App;
