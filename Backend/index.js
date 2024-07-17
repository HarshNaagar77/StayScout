const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const User = require('./Routes/user');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); // Updated to use express.json()

const PORT = 3000
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/registeruser', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash
    });

    await newUser.save();

    jwt.sign({ email: email }, 'shhh', {}, (err, token) => {
      if (err) {
        console.error('JWT Error:', err);
        return res.status(500).json({ message: 'Error creating token', error: err.message });
      }
      // Added httpOnly flag to the cookie options
      res.cookie('token', token, { httpOnly: true }).status(201).json({ message: 'User registered successfully', token });
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Password is correct, generate a JWT token
    jwt.sign({ email: user.email }, 'shhh', {}, (err, token) => {
      if (err) {
        console.error('JWT Error:', err);
        return res.status(500).json({ message: 'Error creating token', error: err.message });
      }

      // Set the token in a httpOnly cookie
      res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login successful', token });
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to login user', error: error.message });
  }
});



app.post('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});