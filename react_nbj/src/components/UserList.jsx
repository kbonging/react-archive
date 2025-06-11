
import UserItem from './UserItem';

const UserList = ({ users, search, onEditUser, onDeleteUser }) => {

  const getFilterData = () => {
    if(search === ''){
      return users;
    }
    return users.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Users Management</h1>
      
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getFilterData().map((user) => (
          <UserItem key={user.id} user={user} onEditUser={onEditUser} onDeleteUser={onDeleteUser}/>
        ))}
        
      </div>
    </div>
  );
};

export default UserList; 