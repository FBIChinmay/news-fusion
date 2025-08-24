# 🚀 News Fusion - Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- NewsAPI key from newsapi.org

## 📦 Deployment Steps

### Step 1: Deploy Server (Backend)

#### Option A: Vercel Web Interface
1. Go to [vercel.com](https://vercel.com) and login
2. Click "New Project"
3. Upload the `server` folder or connect Git repo
4. Configure:
   - Framework: `Other`
   - Root Directory: `server` (if needed)
   - Build Command: `npm install`
   - Output Directory: `.`
5. Environment Variables:
   - Key: `NEWS_API_KEY`
   - Value: `your_actual_newsapi_key`
6. Deploy!

#### Option B: Vercel CLI
```bash
cd server
vercel login
vercel --prod
# Follow prompts and set NEWS_API_KEY when asked
```

### Step 2: Deploy Client (Frontend)

#### Option A: Vercel Web Interface
1. Create another "New Project"
2. Upload the `client` folder
3. Configure:
   - Framework: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Environment Variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-server-url.vercel.app` (from Step 1)
5. Deploy!

#### Option B: Vercel CLI
```bash
cd client
# First update .env.production with your server URL
vercel --prod
```

### Step 3: Update API URL

After server deployment, update client's environment:

**In Vercel Dashboard:**
1. Go to client project → Settings → Environment Variables
2. Add/Update: `REACT_APP_API_URL` = `https://your-server-domain.vercel.app`
3. Redeploy the client

## 🔧 Configuration Files Created

- `server/vercel.json` - Server deployment config
- `client/vercel.json` - Client deployment config  
- `client/.env.production` - Production environment variables
- `.vercelignore` files - Exclude unnecessary files

## 📱 Final URLs

After deployment, you'll have:
- **Server API**: `https://your-server-name.vercel.app`
- **Client App**: `https://your-client-name.vercel.app`

## 🔍 Testing Deployment

Test these endpoints after server deployment:
- `GET https://your-server-url.vercel.app/` - Server info
- `GET https://your-server-url.vercel.app/api/techcrunch` - News data

## 🐛 Troubleshooting

### Common Issues:
1. **CORS Errors**: Server already includes CORS middleware
2. **API Key Issues**: Verify environment variable is set correctly
3. **Build Failures**: Check node version compatibility

### Environment Variables:
- Server needs: `NEWS_API_KEY`
- Client needs: `REACT_APP_API_URL`

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NewsAPI Documentation](https://newsapi.org/docs)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)

Happy Deploying! 🎉