import { useState, useEffect } from 'react';
import './App.css';
import UserList from './components/UserList';
import SearchForm from './components/SearchForm';
import UserModal from './components/UserModal';

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState(null);

  const onChangeSearch = (e)=>{
    setSearch(e.target.value);
  }

  const toggleModal = ()=>{
    setIsModalOpen(prev => !prev);
    if(isModalOpen){
      setEditUser(null);
    }
  }
  
  const onCreateUser = (newUser) => {
    const lastId = users[users.length - 1].id;
    const userWithId = { ...newUser, id:lastId +1};
    setUsers(prev => [...prev, userWithId]);
    toggleModal();
  };
  
  const onEditUser = (user) => {
    setEditUser(user); 
    setIsModalOpen(true);   
  };

  const onUpdateUser = (updatedUser) => {
    const updatedList = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedList);
    setEditUser(null);    
    setIsModalOpen(false);
  };
  
  const onDeleteUser = (targetId) => {
    const updatedList = users.filter(user => user.id !== targetId);
    setUsers(updatedList);
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
      <UserList users={users} isModalOpen={isModalOpen} search={search} onEditUser={onEditUser}  onDeleteUser={onDeleteUser}/>
      {isModalOpen && 
        <UserModal 
          toggleModal={toggleModal} 
          onCreateUser={onCreateUser} 
          onUpdateUser={onUpdateUser}
          editUser={editUser}
          onDeleteUser={onDeleteUser}
        />
      }
    </>
  );

}

export default App;
