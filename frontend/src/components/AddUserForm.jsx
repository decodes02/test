import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onClose, onUserAdded }) => {
  const [user_id, setUserId] = useState(''); // Changed to user_id
  const [name, setName] = useState('');
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      await axios.post('http://localhost:3000/addusers', {
        user_id,
        name,
        available,
      });
      setUserId('');  // Reset fields after submission
      setName('');
      setAvailable(false);
      onUserAdded();
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="modal adduserbox">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Id:</label>
          <input
            type="text"
            value={user_id} // Changed to user_id
            onChange={(e) => setUserId(e.target.value)} // Changed to setUserId
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{display:"flex",alignItems:"center"}}>
          <label>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add User'} {/* Show loading text */}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
      </form>
    </div>
  );
};

export default AddUserForm;