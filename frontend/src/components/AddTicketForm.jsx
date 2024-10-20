import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTicketForm = ({ onClose, onTicketAdded }) => {
  const [tickets_id, setTicketId] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('Todo'); // Default status set to 'Todo'
  const [priority, setPriority] = useState(1);  // Default priority set to 1
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  // Fetch users when the component loads
  useEffect(() => {
    axios
      .get('http://localhost:3000/data') // Assuming your API returns users in the '/data' endpoint
      .then((response) => {
        setUsers(response.data.users); // Set users from API response
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:3000/addticket', {
        tickets_id,
        title,
        tag,
        userId,
        status,
        priority,
      });
      onTicketAdded(); // Refresh the ticket list after adding
      onClose(); // Close the form
      window.location.reload();
    } catch (error) {
      console.error('Error adding ticket:', error);
      setError('Failed to add ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal adduserbox">
      <h2>Add Ticket</h2>
      <form onSubmit={handleSubmit} className='addticketformnew'>
        <div>
          <label>Ticket Id:</label>
          <input
            type="text"
            value={tickets_id}
            onChange={(e) => setTicketId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tag:</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Todo">Todo</option>
            <option value="In progress">In Progress</option>
            <option value="Backlog">Backlog</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Ticket'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddTicketForm;