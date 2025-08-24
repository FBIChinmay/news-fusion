# News Fusion 📰

A modern web application that displays news from different APIs based on various domains including Technology, Business, and more.

## 🌟 Live Demo

**📱 Frontend**: [https://news-fusion-client.vercel.app](https://news-fusion-client.vercel.app)  
**🔗 Backend API**: [https://news-fusion-chinmaym.vercel.app](https://news-fusion-chinmaym.vercel.app)

> Try the live app! Browse news by domain and explore different sources in real-time.

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## Features

- **Domain-based News Filtering**: Browse news by different domains (Technology, Business)
- **Multiple News Sources**: TechCrunch, Wall Street Journal, US Business News, and Apple News
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Fetch latest news from various APIs
- **Error Handling**: Comprehensive error handling and loading states

## Project Structure

```
news fusion/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Tailwind styles
│   └── package.json
└── server/                 # Express backend
    ├── app.js             # Server application
    ├── .env.example       # Environment template
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- News API key from [NewsAPI.org](https://newsapi.org/)

### 1. Get News API Key

1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key

### 2. Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file and add your News API key:
   ```
   NEWS_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm start
   ```

   The server will run on http://localhost:5000

### 3. Client Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The client will run on http://localhost:3000

## Usage

1. **Start the Application**: 
   - Make sure both server (port 5000) and client (port 3000) are running
   - Open http://localhost:3000 in your browser

2. **Browse News by Domain**:
   - **Technology**: TechCrunch, Apple News
   - **Business**: Wall Street Journal, US Business News

3. **Switch Sources**: 
   - Click on any source button to fetch news from that specific source
   - The app will display loading state while fetching data

## API Endpoints

The server provides the following endpoints:

- `GET /` - Server information and available endpoints
- `GET /api/techcrunch` - TechCrunch technology news
- `GET /api/wsj` - Wall Street Journal news
- `GET /api/business` - US business headlines
- `GET /api/apple` - Apple-related news

## Available News Sources

| Source | Domain | Description |
|--------|--------|-------------|
| TechCrunch | Technology | Latest tech startup and innovation news |
| Wall Street Journal | Business | Financial and business news |
| US Business News | Business | General US business headlines |
| Apple News | Technology | Apple-related technology news |

## Troubleshooting

### Common Issues

1. **"Failed to fetch news" Error**:
   - Ensure the server is running on port 5000
   - Check that your News API key is valid
   - Verify your internet connection

2. **API Key Issues**:
   - Make sure you've copied the API key correctly to `.env`
   - Ensure the API key is active and has remaining quota
   - Check NewsAPI.org for any account issues

3. **CORS Errors**:
   - The server includes CORS middleware, but ensure both client and server are running on their designated ports

4. **Port Already in Use**:
   - Change the PORT in server's `.env` file
   - For client, React will automatically suggest an alternative port

## 🚀 Deployment

### ✅ Live Deployment (Vercel)

This application is currently deployed and running:

- **Frontend**: [https://news-fusion-client.vercel.app](https://news-fusion-client.vercel.app)
- **Backend**: [https://news-fusion-chinmaym.vercel.app](https://news-fusion-chinmaym.vercel.app)

### Manual Deployment Options

### Quick Deploy with Docker

1. **Set your API key:**
   ```bash
   export NEWS_API_KEY=your_news_api_key_here
   ```

2. **Deploy with Docker Compose:**
   ```bash
   docker-compose up --build -d
   ```

3. **Access your app:**
   - Frontend: http://localhost
   - Backend: http://localhost:3002

### Cloud Deployment Options

#### Option 1: Vercel (Recommended)

**Client Deployment:**
```bash
cd client
npm run build
vercel --prod
```

**Server Deployment:**
```bash
cd server
vercel --prod
```

#### Option 2: Netlify + Railway

**Client (Netlify):**
1. Build: `npm run build`
2. Upload `build` folder to Netlify
3. Set environment variable: `REACT_APP_API_URL=your_server_url`

**Server (Railway):**
1. Connect your repository
2. Set `NEWS_API_KEY` environment variable
3. Deploy automatically

### Environment Variables

**Server (.env):**
```
NEWS_API_KEY=your_api_key_here
PORT=3002
```

**Client (.env.production):**
```
REACT_APP_API_URL=https://your-server-domain.com
```

## Development

### Adding New News Sources

1. Add the new endpoint to the `endpoints` object in `server/app.js`
2. Add the source configuration to the `sources` array in `client/src/App.js`
3. Restart both server and client

### Customizing the UI

- Modify Tailwind classes in `client/src/App.js`
- Update styles in `client/src/index.css`
- Customize the layout and components as needed

## Technologies Used

### Frontend
- React 18
- Tailwind CSS
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- Axios for API calls
- CORS middleware
- dotenv for environment variables

## License

This project is open source and available under the MIT License.