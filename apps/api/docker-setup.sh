#!/bin/bash

echo "🐳 Setting up Docker environment for Template Project API..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📄 Creating .env.local from example file..."
    cp .env .env.local
    echo "✅ .env.local created! Please update the values as needed."
    echo ""
    echo "🔧 Important: Update these values in .env.local:"
    echo "   - JWT secrets (generate secure random strings)"
    echo "   - Stripe keys (if using Stripe payments)"
    echo "   - SMTP credentials (if sending emails)"
    echo ""
else
    echo "✅ .env.local already exists"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

echo "🧹 Cleaning up existing containers..."
docker compose -f docker-compose-local.yml down --volumes

echo "🏗️  Building and starting containers..."
docker compose -f docker-compose-local.yml up --build --detach

echo "⏳ Waiting for database to be ready..."
sleep 10

echo "🎉 Setup complete!"
echo ""
echo "📋 Your application should be running at:"
echo "   🌐 API: http://localhost:3005"
echo "   🗄️  Database: localhost:3006"
echo ""
echo "📊 To view logs:"
echo "   docker compose -f docker-compose-local.yml logs -f"
echo ""
echo "🛑 To stop:"
echo "   docker compose -f docker-compose-local.yml down"
echo ""
echo "🔄 To restart with fresh database:"
echo "   Set DB_RESET=true in .env.local and restart containers" 