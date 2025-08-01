const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  note: String,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
    try {
      const { name, email, note } = req.body;
  
      const newUser = new User({ name, email, note });
      await newUser.save();

      res.status(200).json({ message: 'User registered!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error!' });
    }
});
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));