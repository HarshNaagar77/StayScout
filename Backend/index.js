const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');  // Updated to bcryptjs
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('./Routes/user');
const Place = require('./Routes/places');
const Booking = require('./Routes/booking');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe('sk_test_51Pg8asRrdvF7ebjyIBJzqgNS8CcEJaIr2PIciKw434H4iGt6GRiVGdL3pfwt72wOKmUaICmRuCuDNK5J9lXeFKXL00IMehUNH8'); 
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
  origin: 'https://stayscout-1.onrender.com',
  credentials: true
}));  
app.use(express.json());

const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
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

    const salt = await bcrypt.genSalt(10);  // bcryptjs method
    const hash = await bcrypt.hash(password, salt);  // bcryptjs method

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

    const isPasswordValid = await bcrypt.compare(password, user.password);  // bcryptjs method

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

app.post('/addplace', upload.array('images', 10), async (req, res) => {
  console.log('Cookies:', req.cookies); // Add this line to check if cookies are received

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'shhh', async (err, userData) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, location, description, price, services, category, checkIn, checkOut, additional, guest } = req.body;
    const images = req.files;

    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const newPlace = new Place({
        title,
        location,
        description,
        price,
        guest,
        services: JSON.parse(services),  // Parse services from JSON
        images: images ? images.map(image => image.filename) : [],  // Store image filenames as an array
        user: user._id,
        category, // Store category as a string
        checkIn,
        checkOut,
        additional: JSON.parse(additional),  // Parse additional details from JSON
      });

      await newPlace.save();

      user.place.push(newPlace._id);
      await user.save();

      return res.status(201).json({ message: 'Place added successfully', newPlace });
    } catch (error) {
      console.error('Error adding place:', error);
      return res.status(500).json({ message: 'Failed to add place', error: error.message });
    }
  });
});

app.get('/render', async function (req, res) {
  const places = await Place.find();
  res.send(places);
  console.log(places);
});

app.get('/place/:id', async function (req, res) {
  const { id } = req.params;
  const placeData = await Place.findById(id);
  res.send(placeData);
});

app.post('/logout', (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out successfully' });
});

app.get('/user/:finder', async (req, res) => {
  const { finder } = req.params;
  try {
    const userData = await User.findOne({ _id: finder }); // Assuming finder is the _id
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.send(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});


app.post('/book/:id', async function(req, res) {
  const {token} = req.cookies
  jwt.verify(token, 'shhh', async (err, userData) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    const info = await User.findOne({ email : userData.email})
    if(info){
      try {
        const {id} = req.params 
        const { bName, bGuest, bCheckIn, bCheckOut, bPhone } = req.body;
    
        const booking = new Booking({
          checkIn : bCheckIn,
          checkOut : bCheckOut,
          name : bName ,
          phone : bPhone,
          guest : bGuest,
          user : info._id ,
          place : id ,

          // Ensure user and place IDs are correctly added if required
        });
    
        await booking.save();
        
        res.status(201).json({ message: 'Booking successful', booking });
      } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'An error occurred while processing your request.', error: error.message });
      }
    }
  })

 
});




app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


app.get('/userprofile', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, 'shhh', async (err, userData) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    
    try {
      const info = await User.findOne({ email: userData.email });
      if (!info) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(info);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
  });
});
app.get('/userplace', async (req, res) => {
  const { token } = req.cookies;
  try {
    const userData = jwt.verify(token, 'shhh');
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userplace = await Place.find({ user: user._id });
    res.json(userplace);
  } catch (error) {
    console.error('Error fetching user place:', error);
    res.status(500).json({ message: 'Failed to fetch user place', error: error.message });
  }
});

app.get('/findbook', async function (req, res) {
  const { token } = req.cookies;
  try {
    const userData = jwt.verify(token, 'shhh');
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userbook = await Booking.find({ user: user._id });
    res.json(userbook);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Failed to fetch user bookings', error: error.message });
  }
});

app.get('/findbooking', async function (req, res) {
  const { token } = req.cookies;
  try {
    const userData = jwt.verify(token, 'shhh');
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userbook = await Booking.find({ user: user._id });
    if (!userbook) return res.status(404).json({ message: 'No bookings found' });

    // Extract place IDs from bookings
    const placeIds = userbook.map(booking => booking.place);

    // Fetch place details using place IDs
    const userplaces = await Place.find({ _id: { $in: placeIds } });

    res.json(userplaces);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Failed to fetch user bookings', error: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
