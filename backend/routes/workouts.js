const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/workouts
// @desc    Get all workouts for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { date, type, limit = 50 } = req.query;
    
    let query = { user: req.user.id };
    
    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    // Filter by type if provided
    if (type) {
      query.type = type;
    }
    
    const workouts = await Workout.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    // Calculate totals
    const totals = workouts.reduce((acc, workout) => ({
      duration: acc.duration + workout.duration,
      caloriesBurned: acc.caloriesBurned + workout.caloriesBurned
    }), { duration: 0, caloriesBurned: 0 });
    
    res.json({
      success: true,
      count: workouts.length,
      totals,
      workouts
    });
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching workouts',
      error: error.message
    });
  }
});

// @route   POST /api/workouts
// @desc    Add new workout
// @access  Private
router.post('/', async (req, res) => {
  try {
    const workoutData = {
      ...req.body,
      user: req.user.id
    };
    
    const workout = await Workout.create(workoutData);
    
    res.status(201).json({
      success: true,
      message: 'Workout added successfully',
      workout
    });
  } catch (error) {
    console.error('Add workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding workout',
      error: error.message
    });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    // Check ownership
    if (workout.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this workout'
      });
    }
    
    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Workout updated successfully',
      workout
    });
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating workout',
      error: error.message
    });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }
    
    // Check ownership
    if (workout.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this workout'
      });
    }
    
    await workout.deleteOne();
    
    res.json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting workout',
      error: error.message
    });
  }
});

// @route   GET /api/workouts/stats/weekly
// @desc    Get weekly workout statistics
// @access  Private
router.get('/stats/weekly', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const workouts = await Workout.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });
    
    // Group by date
    const dailyStats = {};
    workouts.forEach(workout => {
      const dateKey = workout.date.toISOString().split('T')[0];
      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = {
          date: dateKey,
          duration: 0,
          caloriesBurned: 0,
          workoutCount: 0
        };
      }
      dailyStats[dateKey].duration += workout.duration;
      dailyStats[dateKey].caloriesBurned += workout.caloriesBurned;
      dailyStats[dateKey].workoutCount += 1;
    });
    
    res.json({
      success: true,
      stats: Object.values(dailyStats)
    });
  } catch (error) {
    console.error('Get weekly stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weekly statistics',
      error: error.message
    });
  }
});

module.exports = router;
