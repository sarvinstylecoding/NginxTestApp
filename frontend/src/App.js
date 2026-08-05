import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import { useState , useEffect} from 'react';
import UserForm from './components/UserForm';
import api from "./services/api";

function App() {
    const usersEndpoint = "/users";

  const [users, setUsers] = useState([{name :'sarvin'}]);
  const [error, setError] = useState();


 const fetchUsers = async () => {
    try {
      const { data } = await api.get(usersEndpoint);
      setUsers(data);
    } catch (err) {
      setError("Could not fetch users!");
    }
  };
  const handleDeleteUser = async (user) => {
    console.log(user)
    if (user){
    try {
      setUsers(users?.filter((u) => u.name !== user.name));

      await api.delete(`${usersEndpoint}/${user.name}`);
    } catch (err) {
      setError("Could not delete user!");
      fetchUsers();
    }}
  };
  const handleAddUser = async (name) => {
    try {
      const newUser = { name };

      const { data } = await api.post(usersEndpoint, newUser);

      setUsers([...users, data]);
    } catch (err) {
      console.log(err)
      setError("Could not add user!");
    }
  };
  useEffect(() => {
    fetchUsers()
  }, []);
  return (
    <div className="App">
      <UserForm onAddUser={handleAddUser} />
      {error && (
        <p role="alert" className="Error">
          {error}
        </p>
      )}
      <UserList users={users} onDeleteUser={handleDeleteUser} />    </div>
  );
}

export default App;
