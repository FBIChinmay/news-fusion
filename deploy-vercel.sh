#!/bin/bash

# News Fusion Vercel Deployment Script
# Make sure you're logged in to Vercel first: vercel login

echo "🚀 Starting News Fusion deployment to Vercel..."

# Check if logged in to Vercel
if ! vercel --version > /dev/null 2>&1; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Deploy Server
echo "📡 Deploying server..."
cd server
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Server deployment failed"
    exit 1
fi

echo "✅ Server deployed successfully!"
echo "📝 Don't forget to:"
echo "   1. Add your NEWS_API_KEY environment variable:"
echo "      vercel env add NEWS_API_KEY"
echo "   2. Redeploy after adding the env var:"
echo "      vercel --prod"

# Get server URL
echo "🔍 Please copy your server URL from the output above"
read -p "📋 Enter your server URL (e.g., https://news-fusion-server-xxx.vercel.app): " SERVER_URL

# Update client environment
cd ../client
echo "REACT_APP_API_URL=$SERVER_URL" > .env.production

# Deploy Client
echo "💻 Deploying client..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Client deployment failed"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your News Fusion app is now live!"
echo ""
echo "📋 Next steps:"
echo "   1. Make sure you've added the NEWS_API_KEY environment variable to your server"
echo "   2. Test your application"
echo "   3. Update any documentation with the new URLs"