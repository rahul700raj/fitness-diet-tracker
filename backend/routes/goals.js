const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/goals
// @desc    Get user goals
// @access  Private
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json({
      success: true,
      goals: user.goals
    });
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching goals',
      error: error.message
    });
  }
});

// @route   PUT /api/goals
// @desc    Update user goals
// @access  Private
router.put('/', async (req, res) => {
  try {
    const { dailyCalories, dailyWater, dailySteps, targetWeight } = req.body;
    
    const updates = {};
    if (dailyCalories !== undefined) updates['goals.dailyCalories'] = dailyCalories;
    if (dailyWater !== undefined) updates['goals.dailyWater'] = dailyWater;
    if (dailySteps !== undefined) updates['goals.dailySteps'] = dailySteps;
    if (targetWeight !== undefined) updates['goals.targetWeight'] = targetWeight;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Goals updated successfully',
      goals: user.goals
    });
  } catch (error) {
    console.error('Update goals error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating goals',
      error: error.message
    });
  }
});

module.exports = router;
