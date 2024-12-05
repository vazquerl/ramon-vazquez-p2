require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Password hashing
const jwt = require('jsonwebtoken'); // JSON Web Token for authentication

// Initialize Express app
const app = express();

// Middleware for CORS and parsing JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const mongoURI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// Check if MongoDB URI exists in environment variables
if (!mongoURI) {
  console.error("MongoDB URI is missing from the environment variables.");
  process.exit(1); // Stop the server if MongoDB URI is missing
}

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Define User Schema and Model for Registration
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

// Define DropSpot Schema (for your meetups or drops)
const DropSpotSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemName: { type: String, required: true },
  location: { type: String, required: true },
  scheduledTime: { type: Date, required: true },
});

const DropSpot = mongoose.model('DropSpot', DropSpotSchema);

// Routes

// Home route
app.get('/', (req, res) => {
  res.send('DropSpot Backend API');
});

// Register new user (POST /api/register)
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the user in the database

    // Return success response
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Something went wrong during registration." });
  }
});

// Login user (POST /api/login)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token in the response
    res.status(200).json({ token, message: "Login successful!" });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ message: "Something went wrong during login." });
  }
});

// Create a new drop (POST /api/drops)
app.post('/api/drops', async (req, res) => {
  try {
    const drop = new DropSpot(req.body);
    await drop.save();
    res.status(201).json(drop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all drops (GET /api/drops)
app.get('/api/drops', async (req, res) => {
  try {
    const drops = await DropSpot.find();
    res.status(200).json(drops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific drop by ID (GET /api/drops/:id)
app.get('/api/drops/:id', async (req, res) => {
  try {
    const drop = await DropSpot.findById(req.params.id);
    if (!drop) return res.status(404).json({ error: 'Drop not found' });
    res.status(200).json(drop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a drop by ID (PUT /api/drops/:id)
app.put('/api/drops/:id', async (req, res) => {
  try {
    const drop = await DropSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!drop) return res.status(404).json({ error: 'Drop not found' });
    res.status(200).json(drop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a drop by ID (DELETE /api/drops/:id)
app.delete('/api/drops/:id', async (req, res) => {
  try {
    const drop = await DropSpot.findByIdAndDelete(req.params.id);
    if (!drop) return res.status(404).json({ error: 'Drop not found' });
    res.status(200).json({ message: 'Drop deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
