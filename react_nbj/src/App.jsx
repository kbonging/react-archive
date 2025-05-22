import { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import SearchForm from './components/SearchForm';
import UserModal from './components/UserModal';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddUser = (newUser) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  return (
    <>
      <SearchForm onOpenModal={() => setIsModalOpen(true)} />
      <UserList users={users} />
      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddUser}
        />
      )}
    </>
  );
}

export default App;
