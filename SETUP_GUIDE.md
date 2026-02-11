# 🚀 Complete Setup & Deployment Guide

## 📋 Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running the Application](#running-the-application)
5. [Deployment to Production](#deployment-to-production)
6. [Play Store Publishing](#play-store-publishing)
7. [Troubleshooting](#troubleshooting)

---

## 🏠 Local Development Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **MongoDB** v6.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git** ([Download](https://git-scm.com/downloads))
- **Code Editor** (VS Code recommended)

### Step 1: Clone the Repository
```bash
git clone https://github.com/rahul700raj/fitness-diet-tracker.git
cd fitness-diet-tracker
```

---

## 🗄️ Database Setup

### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
   - Windows: Download MSI installer from MongoDB website
   - Mac: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   # OR
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is Running**
   ```bash
   mongosh
   # Should connect to mongodb://localhost:27017
   ```

### Option B: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Free Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier (512MB storage)

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for security

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fitness-tracker?retryWrites=true&w=majority`

---

## ⚙️ Environment Configuration

### Backend Environment Variables

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```

3. **Edit .env file** with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database (Choose one)
   # Local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/fitness-tracker
   
   # OR MongoDB Atlas:
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/fitness-tracker?retryWrites=true&w=majority
   
   # JWT Secret (Generate a random string)
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_change_this
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Generate Secure JWT Secret**
   ```bash
   # Option 1: Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Option 2: Using OpenSSL
   openssl rand -hex 32
   
   # Option 3: Online generator
   # Visit: https://randomkeygen.com/
   ```

### Frontend Environment Variables (Optional)

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Create .env file** (if needed for production)
   ```bash
   echo "VITE_API_URL=http://localhost:5000" > .env
   ```

---

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
npm install
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
📍 Environment: development
✅ MongoDB Connected Successfully
```

**If you see errors:**
- Check MongoDB is running
- Verify .env file exists and has correct values
- Check port 5000 is not in use

### Start Frontend Development Server

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Access the Application

Open your browser and go to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

---

## 🌐 Deployment to Production

### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `fitness-diet-tracker` repository
   - Select `backend` folder as root directory

3. **Add Environment Variables**
   - Go to project settings → Variables
   - Add all variables from your .env file:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_production_jwt_secret
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     PORT=5000
     ```

4. **Deploy**
   - Railway will automatically deploy
   - Get your backend URL (e.g., `https://fitness-tracker-production.up.railway.app`)

### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [Vercel.com](https://vercel.com/)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import `fitness-diet-tracker` repository
   - Set root directory to `frontend`

3. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Get your frontend URL (e.g., `https://fitness-tracker.vercel.app`)

6. **Update Backend CORS**
   - Go back to Railway
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy backend

### Alternative Deployment Options

#### Backend Alternatives:
- **Render.com** (Free tier available)
- **Heroku** (Paid)
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**

#### Frontend Alternatives:
- **Netlify** (Similar to Vercel)
- **GitHub Pages** (Static only)
- **Cloudflare Pages**

---

## 📱 Play Store Publishing

### Convert to PWA (Progressive Web App)

1. **Add manifest.json**
   Create `frontend/public/manifest.json`:
   ```json
   {
     "name": "FitTrack - Fitness & Diet Tracker",
     "short_name": "FitTrack",
     "description": "Track your fitness journey, monitor calories, and achieve your health goals",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#3b82f6",
     "orientation": "portrait",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png",
         "purpose": "any maskable"
       },
       {
         "src": "/icon-512.png",
         "sizes": "512x512",
         "type": "image/png",
         "purpose": "any maskable"
       }
     ]
   }
   ```

2. **Create App Icons**
   - Create 192x192px and 512x512px PNG icons
   - Use [Favicon Generator](https://realfavicongenerator.net/)
   - Place in `frontend/public/` folder

3. **Add Service Worker**
   Create `frontend/public/sw.js`:
   ```javascript
   self.addEventListener('install', (event) => {
     console.log('Service Worker installed');
   });

   self.addEventListener('fetch', (event) => {
     event.respondWith(
       caches.match(event.request).then((response) => {
         return response || fetch(event.request);
       })
     );
   });
   ```

4. **Register Service Worker**
   Add to `frontend/index.html` before closing `</body>`:
   ```html
   <script>
     if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('/sw.js')
         .then(() => console.log('SW registered'))
         .catch(err => console.log('SW error:', err));
     }
   </script>
   ```

### Generate Android App Bundle

1. **Use PWA Builder**
   - Go to [PWABuilder.com](https://www.pwabuilder.com/)
   - Enter your deployed website URL
   - Click "Start"
   - Click "Package for Stores"
   - Select "Android"
   - Download the generated APK/AAB file

2. **Alternative: Bubblewrap**
   ```bash
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest https://your-site.com/manifest.json
   bubblewrap build
   ```

### Publish to Google Play Store

1. **Create Google Play Console Account**
   - Go to [Google Play Console](https://play.google.com/console)
   - Pay one-time $25 registration fee
   - Complete account setup

2. **Create New App**
   - Click "Create app"
   - Fill in app details:
     - App name: FitTrack
     - Default language: English
     - App/Game: App
     - Free/Paid: Free

3. **Complete Store Listing**
   - App details
   - Graphics (screenshots, icon, feature graphic)
   - Categorization
   - Contact details: rm2778643@gmail.com
   - Privacy policy URL

4. **Upload App Bundle**
   - Go to "Release" → "Production"
   - Click "Create new release"
   - Upload your AAB file
   - Fill in release notes
   - Review and rollout

5. **Content Rating**
   - Complete questionnaire
   - Get rating certificate

6. **Submit for Review**
   - Review all sections
   - Submit app for review
   - Wait 1-7 days for approval

---

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongosh`
- Check MONGODB_URI in .env file
- For Atlas, verify IP whitelist and credentials

#### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Find process using port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env file
```

#### CORS Error in Browser
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check FRONTEND_URL in backend .env
- Verify cors configuration in server.js
- Clear browser cache

#### JWT Token Invalid
```
Error: Token is invalid or expired
```
**Solution:**
- Clear localStorage in browser
- Logout and login again
- Check JWT_SECRET matches between environments

#### Build Errors
```
Module not found or dependency errors
```
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Getting Help

- **Email:** rm2778643@gmail.com
- **GitHub Issues:** [Create an issue](https://github.com/rahul700raj/fitness-diet-tracker/issues)
- **Documentation:** Check README.md

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)

---

**Made with ❤️ by Rahul Mishra**

For any questions or support, contact: rm2778643@gmail.com
