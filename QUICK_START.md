# ⚡ Quick Start Guide - Get Running in 5 Minutes!

## 🎯 Goal
Get your Fitness & Diet Tracker running locally in under 5 minutes.

---

## 📋 Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js installed (v18+) - Check: `node --version`
- ✅ MongoDB installed and running - Check: `mongosh`
- ✅ Git installed - Check: `git --version`

**Don't have these?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for installation instructions.

---

## 🚀 5-Minute Setup

### Step 1: Clone & Navigate (30 seconds)
```bash
git clone https://github.com/rahul700raj/fitness-diet-tracker.git
cd fitness-diet-tracker
```

### Step 2: Backend Setup (2 minutes)
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file (use any text editor)
# For quick start, just change JWT_SECRET:
# JWT_SECRET=your_random_secret_key_here_min_32_chars

# Start backend server
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 3: Frontend Setup (2 minutes)
Open a **NEW terminal window**:
```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
➜  Local:   http://localhost:3000/
```

### Step 4: Open & Test (30 seconds)
1. Open browser: http://localhost:3000
2. Click "Sign Up"
3. Create account
4. Explore dashboard!

---

## 🎉 Success!

You should now see:
- ✅ Beautiful landing page
- ✅ Working registration/login
- ✅ Dashboard with progress rings
- ✅ Navigation working

---

## 🐛 Quick Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is running
mongosh

# If not, start it:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port 5000 already in use?
```bash
# Change PORT in backend/.env
PORT=5001

# Update frontend proxy in frontend/vite.config.js
```

### Frontend can't connect to backend?
- Check backend is running on port 5000
- Check `http://localhost:5000/api/health` in browser
- Verify no CORS errors in browser console

---

## 📚 Next Steps

### 1. Customize Your App
- Update contact info in `README.md`
- Change app name in `package.json` files
- Customize colors in `tailwind.config.js`

### 2. Add Features
- Complete Meals page (`frontend/src/pages/Meals.jsx`)
- Complete Workouts page (`frontend/src/pages/Workouts.jsx`)
- Add Charts component for analytics
- Implement Premium features

### 3. Deploy to Production
Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- MongoDB Atlas setup
- Railway backend deployment
- Vercel frontend deployment
- Custom domain setup

### 4. Publish to Play Store
Follow [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- PWA configuration
- Android app generation
- Play Store submission

---

## 📖 Documentation

- **Full Setup Guide:** [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Deployment Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- **Project README:** [README.md](./README.md)

---

## 🆘 Need Help?

**Email:** rm2778643@gmail.com  
**GitHub Issues:** [Create an issue](https://github.com/rahul700raj/fitness-diet-tracker/issues)

---

## 🎓 Learning Resources

### Backend (Node.js + Express + MongoDB)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)
- [Mongoose Docs](https://mongoosejs.com/docs/guide.html)
- [JWT Authentication](https://jwt.io/introduction)

### Frontend (React + Tailwind + Framer Motion)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/en/main)

### Deployment
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)

---

## 💡 Pro Tips

1. **Use MongoDB Compass** for visual database management
2. **Install Thunder Client** (VS Code extension) for API testing
3. **Enable Auto Save** in your code editor
4. **Use Git branches** for new features
5. **Commit often** with clear messages

---

## 🔥 Common Commands

### Backend
```bash
npm run dev          # Start development server
npm start            # Start production server
npm install          # Install dependencies
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Git
```bash
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

---

## 📊 Project Structure

```
fitness-diet-tracker/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Main server file
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React context
│   │   └── App.jsx      # Main app component
│   └── index.html       # HTML entry point
├── README.md            # Project overview
├── SETUP_GUIDE.md       # Detailed setup guide
└── QUICK_START.md       # This file!
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB installed and running
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running
- [ ] Frontend dependencies installed
- [ ] Frontend server running
- [ ] Application accessible in browser
- [ ] Registration working
- [ ] Login working
- [ ] Dashboard loading

---

**Made with ❤️ by Rahul Mishra**

Happy coding! 🚀
