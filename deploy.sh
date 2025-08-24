#!/bin/bash

echo "🚀 Starting News Fusion Deployment..."

# Check if NEWS_API_KEY is set
if [ -z "$NEWS_API_KEY" ]; then
    echo "❌ Error: NEWS_API_KEY environment variable is not set"
    echo "Please set your NewsAPI key: export NEWS_API_KEY=your_api_key_here"
    exit 1
fi

# Build and deploy with Docker Compose
echo "📦 Building and starting containers..."
docker-compose up --build -d

echo "✅ Deployment complete!"
echo "🌐 Client: http://localhost"
echo "🔧 Server: http://localhost:3002"
echo ""
echo "🔍 Check logs with: docker-compose logs -f"
echo "🛑 Stop with: docker-compose down"