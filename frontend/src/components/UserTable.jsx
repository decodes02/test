// src/UserTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserTable = ({ onAddUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/data');
      setUsers(response.data.users); // Adjust based on your API response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
        <div className="navbar" style={{justifyContent:"space-between",margin:"0 2%"}}>
        <h2>User List</h2>
        <div style={{display:"flex",gap:"10px"}}>
        <Link aria-current="page" to="/"><div className='addbutton'>Ticket</div></Link>
        
        <button onClick={onAddUser} className='addbutton'>Add User</button>
        </div>
        </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.available ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
