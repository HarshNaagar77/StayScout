const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./Routes/user');
const Place = require('./Routes/places');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const PORT = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    jwt.sign({ email: user.email }, 'shhh', {}, (err, token) => {
      if (err) {
        console.error('JWT Error:', err);
        return res.status(500).json({ message: 'Error creating token', error: err.message });
      }

      res.cookie('token', token, { httpOnly: true }).status(200).json({ message: 'Login successful', token });
    });

  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Failed to login user', error: error.message });
  }
});

app.post('/addplace', upload.single('image'), async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'shhh', async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, location, description, price, services, category, checkIn, checkOut, additional , guest } = req.body;
    const image = req.file;

    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const newPlace = new Place({
        name,
        location,
        description,
        price,
        guest ,
        services: JSON.parse(services),  // Parse services from JSON
        image: image ? image.filename : null,
        user: user._id,
        category: category, // Store category as a string
        checkIn,
        checkOut,
        additional: JSON.parse(additional),  // Parse additional details from JSON
      });
      await newPlace.save();

      user.place.push(newPlace._id);
      await user.save();

      res.status(201).json({ message: 'Place added successfully', newPlace });
    } catch (error) {
      console.error('Error adding place:', error);
      res.status(500).json({ message: 'Failed to add place', error: error.message });
    }
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});