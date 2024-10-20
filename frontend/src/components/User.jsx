// src/App.js
import React, { useState } from 'react';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';

const User = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddUser = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleUserAdded = () => {
    // This function can be used to refresh the user list if needed
  };

  return (
    <div>
      <UserTable onAddUser={handleAddUser} />
      {isFormOpen && (
        <AddUserForm onClose={handleCloseForm} onUserAdded={handleUserAdded} />
      )}
    </div>
  );
};

export default User;