@echo off
echo 🚀 Building News Fusion for Deployment...
echo.

echo 📦 Building Client...
cd client
call npm install
call npm run build
echo ✅ Client build complete!
echo.

echo 📦 Preparing Server...
cd ../server
call npm install
echo ✅ Server preparation complete!
echo.

echo 🎉 Both applications are ready for deployment!
echo.
echo 📁 Client build is in: client/build/
echo 📁 Server files are in: server/
echo.
echo Next Steps:
echo 1. Deploy server folder to Vercel
echo 2. Deploy client/build folder to Vercel/Netlify
echo 3. Update REACT_APP_API_URL with server URL
echo.
pause