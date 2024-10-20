const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dk02@sql',
  database: 'ticket_management'
});

app.use(cors());
app.use(express.json());

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// API endpoint to get tickets and users
app.get('/data', (req, res) => {
  const ticketsQuery = 'SELECT * FROM tickets';
  const usersQuery = 'SELECT * FROM users';

  // Get tickets and users data
  db.query(ticketsQuery, (err, tickets) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      res.status(500).json({ error: 'Failed to fetch tickets' });
      return;
    }

    db.query(usersQuery, (err, users) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
        return;
      }

      // Format the response
      res.json({
        tickets: tickets.map(ticket => ({
          id: ticket.tickets_id, // Updated to match the database
          title: ticket.title,
          tag: ticket.tag, // Removed array brackets to match your database structure
          userId: ticket.userId,
          status: ticket.status,
          priority: ticket.priority
        })),
        users: users.map(user => ({
          id: user.user_id, // Updated to match the database
          name: user.name,
          available: !!user.available
        }))
      });
    });
  });
});

// POST request to add a new user
app.post('/addusers', (req, res) => {
    const { user_id, name, available } = req.body;
  
    // Ensure available is stored as 0 or 1
    const availableInt = available ? 1 : 0;
  
    const query = 'INSERT INTO users (user_id, name, available) VALUES (?, ?, ?)';
    db.query(query, [user_id, name, availableInt], (err, result) => {
      if (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Failed to add user' });
        return;
      }
      res.status(201).json({ message: 'User added successfully', result });
    });
  });

  app.post('/addticket', (req, res) => {
    const { tickets_id, title, tag, userId, status, priority } = req.body;
  console.log(tickets_id);
    const query = 'INSERT INTO tickets (tickets_id, title, tag, userId, status, priority) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [tickets_id, title, tag, userId, status, priority], (err, result) => {
      if (err) {
        console.error('Error adding ticket:', err);
        res.status(500).json({ error: 'Failed to add ticket' });
        return;
      }
      res.status(201).json({ message: 'Ticket added successfully', result });
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});