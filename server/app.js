const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const API_KEY = process.env.NEWS_API_KEY;

// Check if API key is provided
if (!API_KEY) {
  console.error('ERROR: NEWS_API_KEY environment variable is not set.');
  console.error('Please create a .env file with NEWS_API_KEY=your_api_key_here');
  process.exit(1);
}

const endpoints = {
  techcrunch: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`,
  wsj: `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${API_KEY}`,
  business: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`,
  apple: `https://newsapi.org/v2/everything?q=apple&from=2025-08-22&to=2025-08-22&sortBy=popularity&apiKey=${API_KEY}`,
  india: `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`
};

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'News Fusion API Server',
    version: '1.0.0',
    availableEndpoints: Object.keys(endpoints).map(source => `/api/${source}`)
  });
});

// News endpoint with better error handling
app.get('/api/:source', async (req, res) => {
  const { source } = req.params;
  
  // Validate source parameter
  if (!endpoints[source]) {
    return res.status(400).json({ 
      error: 'Invalid news source', 
      availableSources: Object.keys(endpoints)
    });
  }

  try {
    const url = endpoints[source];
    console.log(`Fetching news from: ${source}`);
    
    const response = await axios.get(url, {
      timeout: 10000 // 10 second timeout
    });
    
    if (response.data && response.data.articles) {
      console.log(`Successfully fetched ${response.data.articles.length} articles from ${source}`);
      res.json(response.data.articles);
    } else {
      console.error(`No articles found in response from ${source}`);
      res.status(404).json({ error: 'No articles found' });
    }
  } catch (err) {
    console.error(`Error fetching news from ${source}:`, err.message);
    
    if (err.response) {
      // API returned an error response
      res.status(err.response.status).json({ 
        error: 'News API error', 
        details: err.response.data?.message || 'Unknown API error'
      });
    } else if (err.code === 'ECONNABORTED') {
      // Timeout error
      res.status(408).json({ error: 'Request timeout' });
    } else {
      // Network or other error
      res.status(500).json({ error: 'Failed to fetch news' });
    }
  }
});

// Handle 404 for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server accessible at: http://localhost:${PORT}`);
  console.log(`Available news sources: ${Object.keys(endpoints).join(', ')}`);
});