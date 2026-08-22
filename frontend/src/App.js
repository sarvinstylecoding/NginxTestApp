import './App.css';
import UserList from './components/UserList';
import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import api from "./services/api";

function App() {
  const usersEndpoint = "/users";

  const [users, setUsers] = useState([{ name: 'sarvin' }]);
  const [proccess, setProcess] = useState('');
  const [bigDataStatus, setBigDataStatus] = useState('');

  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const { data } = await api.get(usersEndpoint);
      console.log("data", data)
      setUsers(data.data);
    } catch (err) {
      setError("Could not fetch users!");
    }
  };
  const handleDeleteUser = async (user) => {
    console.log(user)
    if (user) {
      try {
        setUsers(users?.filter((u) => u.name !== user.name));

        await api.delete(`${usersEndpoint}/${user.name}`);
      } catch (err) {
        setError("Could not delete user!");
        fetchUsers();
      }
    }
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

  // Process Data
  const handleProcessData = async () => {
    try {
      setProcess("Please wait...");

      const { data } = await api.get("/proccessData");

      console.log("process data:", data);

      setProcess(data.data.status);
    } catch (err) {
      console.log(err);
      setError("Could not process data!");
    }
  };

  // Big Data
  const handleBigData = async () => {
    try {
      setBigDataStatus("Please wait...");

      const { data } = await api.get("/bigData");

      console.log("bigData", data);

      setBigDataStatus(data.data.status);
    } catch (err) {
      console.log(err);
      setError("Could not process data!");
    }
  };



  return (
    <div className="App">

      <UserForm onAddUser={handleAddUser} />
      <button onClick={handleProcessData}>
        Process Data
      </button>
      <button onClick={handleBigData}>
        Big Data
      </button>

      <span>{proccess}</span> <span>{bigDataStatus}</span> 

      {error && (
        <p role="alert" className="Error">
          {error}
        </p>
      )}

      <UserList
        users={users}
        onDeleteUser={handleDeleteUser}
      />

    </div>
  );
}

export default App;