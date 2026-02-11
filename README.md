# 🏋️ FitTrack - Fitness & Diet Tracker

A modern, full-stack fitness and diet tracking application with animated UI, real-time progress tracking, and comprehensive health monitoring features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green)

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure JWT-based login/signup with bcrypt password hashing
- **Dashboard** - Real-time overview of daily progress with animated metrics
- **Meal Tracking** - Log meals with detailed nutrition info (calories, protein, carbs, fats)
- **Workout Logging** - Track exercises, duration, and calories burned
- **Goal Setting** - Set and monitor daily calorie, water, and step goals
- **Progress Analytics** - Weekly charts and statistics
- **Dark/Light Mode** - Beautiful theme toggle with smooth transitions

### 🎨 UI/UX Features
- **Animated Progress Rings** - SVG circular progress with smooth animations
- **Glassmorphism Design** - Modern glass-effect cards and components
- **Framer Motion** - Smooth page transitions and micro-interactions
- **Responsive Design** - Mobile-first, works on all devices
- **Chart.js Integration** - Beautiful weekly progress charts
- **Toast Notifications** - Real-time feedback for user actions

### 💪 Advanced Features
- **BMR Calculator** - Calculate Basal Metabolic Rate based on user profile
- **Nutrition API** - Search food database for nutrition information
- **Daily Logs** - Track water intake, steps, weight, sleep, and mood
- **Premium Features** - Subscription-based advanced features
- **Weekly Statistics** - Detailed analytics and trends

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Chart.js** - Data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git installed

### Clone Repository
```bash
git clone https://github.com/rahul700raj/fitness-diet-tracker.git
cd fitness-diet-tracker
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/fitness-tracker
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Start backend server
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install

# Start frontend development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🗄️ Database Models

### User Model
- Personal info (name, email, age, gender, height, weight)
- Activity level
- Goals (daily calories, water, steps, target weight)
- Premium status

### Meal Model
- Meal name and type (breakfast, lunch, dinner, snack)
- Nutrition data (calories, protein, carbs, fats, fiber)
- Serving size and date
- Notes

### Workout Model
- Exercise name and type (cardio, strength, flexibility, sports)
- Duration and calories burned
- Intensity level
- Sets, reps, weight, distance
- Notes

### DailyLog Model
- Water intake (glasses)
- Steps count
- Weight tracking
- Sleep hours
- Mood tracking
- Daily notes

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User
- `PUT /api/user/profile` - Update profile
- `GET /api/user/daily-log` - Get daily log
- `PUT /api/user/daily-log` - Update daily log
- `GET /api/user/dashboard` - Get dashboard data

### Meals
- `GET /api/meals` - Get all meals
- `POST /api/meals` - Add new meal
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal
- `GET /api/meals/stats/weekly` - Get weekly stats

### Workouts
- `GET /api/workouts` - Get all workouts
- `POST /api/workouts` - Add new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout
- `GET /api/workouts/stats/weekly` - Get weekly stats

### Goals
- `GET /api/goals` - Get user goals
- `PUT /api/goals` - Update goals

### Nutrition
- `GET /api/nutrition/search?query=apple` - Search food
- `GET /api/nutrition/:foodName` - Get food nutrition
- `GET /api/nutrition/calculate/bmr` - Calculate BMR

## 🎨 Component Structure

```
frontend/src/
├── components/
│   ├── Navbar.jsx              # Navigation bar
│   ├── LoadingSpinner.jsx      # Loading component
│   ├── ProgressRing.jsx        # Animated circular progress
│   ├── MealCard.jsx            # Meal display card
│   ├── WorkoutCard.jsx         # Workout display card
│   ├── StatsChart.jsx          # Weekly statistics chart
│   └── WaterTracker.jsx        # Water intake tracker
├── pages/
│   ├── Landing.jsx             # Landing page
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   ├── Dashboard.jsx           # Main dashboard
│   ├── Meals.jsx               # Meals management
│   ├── Workouts.jsx            # Workouts management
│   ├── Goals.jsx               # Goals settings
│   ├── Profile.jsx             # User profile
│   └── Premium.jsx             # Premium features
├── context/
│   ├── AuthContext.jsx         # Authentication context
│   └── ThemeContext.jsx        # Theme context
└── utils/
    └── api.js                  # API utility functions
```

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. **Create account** on Railway.app or Render.com
2. **Connect GitHub** repository
3. **Set environment variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret
   NODE_ENV=production
   FRONTEND_URL=your_frontend_url
   ```
4. **Deploy** - Platform will auto-deploy from main branch

### Frontend Deployment (Vercel/Netlify)

1. **Create account** on Vercel or Netlify
2. **Import project** from GitHub
3. **Configure build settings**:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Set environment variables**:
   ```
   VITE_API_URL=your_backend_url
   ```
5. **Deploy** - Platform will auto-deploy

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create new cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Update `MONGODB_URI` in backend .env

## 📱 PWA & Play Store

### Convert to PWA

1. Add `manifest.json` in frontend/public:
```json
{
  "name": "FitTrack - Fitness & Diet Tracker",
  "short_name": "FitTrack",
  "description": "Track your fitness journey",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. Add service worker for offline support
3. Use [PWA Builder](https://www.pwabuilder.com/) to generate Android package
4. Submit to Google Play Console (₹2000 one-time fee)

## 💰 Monetization Features

### Premium Subscription (₹299/month)
- Unlimited meal logging
- Advanced analytics
- Custom diet plans
- Workout recommendations
- Ad-free experience

### Personal Diet Plan (₹999 one-time)
- Customized meal planning
- Nutritionist consultation
- Weekly follow-ups

### Affiliate Products
- Fitness equipment
- Supplements
- Workout gear

## 👨‍💻 Author

**Rahul Mishra**
- Email: rm2778643@gmail.com
- GitHub: [@rahul700raj](https://github.com/rahul700raj)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Design inspiration from modern fitness apps
- Icons from React Icons
- Animations powered by Framer Motion
- Charts by Chart.js

## 📞 Support

For support, email rm2778643@gmail.com or create an issue in the repository.

---

**Made with ❤️ by Rahul Mishra**

⭐ Star this repo if you find it helpful!
