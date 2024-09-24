const express = require('express');
const bodyParser = require('body-parser');
const BloomFilter = require('./BloomFilter');

const app = express();
const PORT = 3000;

// Create a bloom filter instance with a size of 1000 and 4 hash functions
const bloom = new BloomFilter(1000, 4);

// Dummy users stored in memory for demo
const users = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route to render the HTML form and pass the users
app.get('/', (req, res) => {
  res.render('index', { users: Object.keys(users) });
});

// Endpoint to check if a username exists using Bloom filter
app.post('/check-username', (req, res) => {
  const username = req.body.username;
  const exists = bloom.contains(username);
  res.json({ exists });
});

// Endpoint to save new user and update the Bloom filter
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  if (bloom.contains(username)) {
    return res.json({ success: false, message: 'Username already exists!' });
  }

  // Save user to "database" (memory in this case)
  users[username] = { password };

  // Add username to the Bloom filter
  bloom.add(username);

  res.json({ success: true, message: 'User registered successfully!', users: Object.keys(users) });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
