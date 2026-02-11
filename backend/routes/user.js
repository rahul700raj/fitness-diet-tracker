const express = require('express');
const router = express.Router();
const User = require('../models/User');
const DailyLog = require('../models/DailyLog');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const allowedUpdates = ['name', 'age', 'gender', 'height', 'weight', 'activityLevel'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        activityLevel: user.activityLevel,
        bmi: user.calculateBMI()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// @route   GET /api/user/daily-log
// @desc    Get daily log for today or specific date
// @access  Private
router.get('/daily-log', async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    let dailyLog = await DailyLog.findOne({
      user: req.user.id,
      date: targetDate
    });
    
    // Create if doesn't exist
    if (!dailyLog) {
      dailyLog = await DailyLog.create({
        user: req.user.id,
        date: targetDate
      });
    }
    
    res.json({
      success: true,
      dailyLog
    });
  } catch (error) {
    console.error('Get daily log error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching daily log',
      error: error.message
    });
  }
});

// @route   PUT /api/user/daily-log
// @desc    Update daily log
// @access  Private
router.put('/daily-log', async (req, res) => {
  try {
    const { date, ...updates } = req.body;
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);
    
    let dailyLog = await DailyLog.findOne({
      user: req.user.id,
      date: targetDate
    });
    
    if (!dailyLog) {
      dailyLog = await DailyLog.create({
        user: req.user.id,
        date: targetDate,
        ...updates
      });
    } else {
      dailyLog = await DailyLog.findByIdAndUpdate(
        dailyLog._id,
        updates,
        { new: true, runValidators: true }
      );
    }
    
    res.json({
      success: true,
      message: 'Daily log updated successfully',
      dailyLog
    });
  } catch (error) {
    console.error('Update daily log error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating daily log',
      error: error.message
    });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get dashboard data
// @access  Private
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get today's daily log
    const dailyLog = await DailyLog.findOne({
      user: req.user.id,
      date: today
    });
    
    // Get today's meals
    const Meal = require('../models/Meal');
    const todayMeals = await Meal.find({
      user: req.user.id,
      date: { $gte: today }
    });
    
    const mealTotals = todayMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    
    // Get today's workouts
    const Workout = require('../models/Workout');
    const todayWorkouts = await Workout.find({
      user: req.user.id,
      date: { $gte: today }
    });
    
    const workoutTotals = todayWorkouts.reduce((acc, workout) => ({
      duration: acc.duration + workout.duration,
      caloriesBurned: acc.caloriesBurned + workout.caloriesBurned
    }), { duration: 0, caloriesBurned: 0 });
    
    res.json({
      success: true,
      dashboard: {
        user: {
          name: req.user.name,
          goals: req.user.goals,
          bmi: req.user.calculateBMI()
        },
        today: {
          date: today,
          waterIntake: dailyLog?.waterIntake || 0,
          steps: dailyLog?.steps || 0,
          weight: dailyLog?.weight || req.user.weight,
          meals: {
            count: todayMeals.length,
            ...mealTotals
          },
          workouts: {
            count: todayWorkouts.length,
            ...workoutTotals
          }
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

module.exports = router;
