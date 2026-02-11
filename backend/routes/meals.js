const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/meals
// @desc    Get all meals for user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { date, mealType, limit = 50 } = req.query;
    
    let query = { user: req.user.id };
    
    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    // Filter by meal type if provided
    if (mealType) {
      query.mealType = mealType;
    }
    
    const meals = await Meal.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));
    
    // Calculate totals
    const totals = meals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
    
    res.json({
      success: true,
      count: meals.length,
      totals,
      meals
    });
  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meals',
      error: error.message
    });
  }
});

// @route   POST /api/meals
// @desc    Add new meal
// @access  Private
router.post('/', async (req, res) => {
  try {
    const mealData = {
      ...req.body,
      user: req.user.id
    };
    
    const meal = await Meal.create(mealData);
    
    res.status(201).json({
      success: true,
      message: 'Meal added successfully',
      meal
    });
  } catch (error) {
    console.error('Add meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding meal',
      error: error.message
    });
  }
});

// @route   PUT /api/meals/:id
// @desc    Update meal
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);
    
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }
    
    // Check ownership
    if (meal.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this meal'
      });
    }
    
    meal = await Meal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Meal updated successfully',
      meal
    });
  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating meal',
      error: error.message
    });
  }
});

// @route   DELETE /api/meals/:id
// @desc    Delete meal
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }
    
    // Check ownership
    if (meal.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this meal'
      });
    }
    
    await meal.deleteOne();
    
    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting meal',
      error: error.message
    });
  }
});

// @route   GET /api/meals/stats/weekly
// @desc    Get weekly meal statistics
// @access  Private
router.get('/stats/weekly', async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const meals = await Meal.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });
    
    // Group by date
    const dailyStats = {};
    meals.forEach(meal => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = {
          date: dateKey,
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
          mealCount: 0
        };
      }
      dailyStats[dateKey].calories += meal.calories;
      dailyStats[dateKey].protein += meal.protein;
      dailyStats[dateKey].carbs += meal.carbs;
      dailyStats[dateKey].fats += meal.fats;
      dailyStats[dateKey].mealCount += 1;
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
