const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Init Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/urls', require('./routes/urls'));

// Redirect route
app.get('/:shortId', async (req, res) => {
  try {
    const { shortId } = req.params;
    const Url = require('./models/Url');
    
    const url = await Url.findByShortId(shortId);
    
    if (!url) {
      return res.status(404).json({ msg: 'URL not found' });
    }
    
    await Url.incrementClicks(shortId);
    
    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;