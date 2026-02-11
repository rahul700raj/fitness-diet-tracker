const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// Mock nutrition database (in production, use real API like USDA FoodData Central)
const nutritionDatabase = {
  'apple': { calories: 95, protein: 0.5, carbs: 25, fats: 0.3, fiber: 4 },
  'banana': { calories: 105, protein: 1.3, carbs: 27, fats: 0.4, fiber: 3 },
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0 },
  'rice': { calories: 206, protein: 4.3, carbs: 45, fats: 0.4, fiber: 0.6 },
  'egg': { calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3, fiber: 0 },
  'milk': { calories: 149, protein: 7.7, carbs: 11.7, fats: 7.9, fiber: 0 },
  'bread': { calories: 79, protein: 2.7, carbs: 15, fats: 1, fiber: 0.8 },
  'salmon': { calories: 206, protein: 22, carbs: 0, fats: 13, fiber: 0 },
  'broccoli': { calories: 55, protein: 3.7, carbs: 11, fats: 0.6, fiber: 2.4 },
  'potato': { calories: 163, protein: 4.3, carbs: 37, fats: 0.2, fiber: 2.5 },
  'yogurt': { calories: 100, protein: 10, carbs: 13, fats: 0.4, fiber: 0 },
  'oats': { calories: 389, protein: 16.9, carbs: 66, fats: 6.9, fiber: 10.6 },
  'almonds': { calories: 579, protein: 21, carbs: 22, fats: 50, fiber: 12.5 },
  'orange': { calories: 62, protein: 1.2, carbs: 15, fats: 0.2, fiber: 3.1 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2 }
};

// @route   GET /api/nutrition/search
// @desc    Search for food nutrition info
// @access  Private
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Search in mock database
    const searchTerm = query.toLowerCase();
    const results = Object.entries(nutritionDatabase)
      .filter(([food]) => food.includes(searchTerm))
      .map(([food, nutrition]) => ({
        name: food,
        ...nutrition,
        servingSize: '100g'
      }));
    
    res.json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Nutrition search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching nutrition data',
      error: error.message
    });
  }
});

// @route   GET /api/nutrition/:foodName
// @desc    Get nutrition info for specific food
// @access  Private
router.get('/:foodName', async (req, res) => {
  try {
    const foodName = req.params.foodName.toLowerCase();
    
    const nutrition = nutritionDatabase[foodName];
    
    if (!nutrition) {
      return res.status(404).json({
        success: false,
        message: 'Food not found in database'
      });
    }
    
    res.json({
      success: true,
      food: {
        name: foodName,
        ...nutrition,
        servingSize: '100g'
      }
    });
  } catch (error) {
    console.error('Get nutrition error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching nutrition data',
      error: error.message
    });
  }
});

// @route   GET /api/nutrition/calculate/bmr
// @desc    Calculate Basal Metabolic Rate
// @access  Private
router.get('/calculate/bmr', async (req, res) => {
  try {
    const user = req.user;
    
    if (!user.weight || !user.height || !user.age || !user.gender) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your profile (weight, height, age, gender) to calculate BMR'
      });
    }
    
    // Mifflin-St Jeor Equation
    let bmr;
    if (user.gender === 'male') {
      bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) + 5;
    } else {
      bmr = (10 * user.weight) + (6.25 * user.height) - (5 * user.age) - 161;
    }
    
    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    const tdee = bmr * (activityMultipliers[user.activityLevel] || 1.55);
    
    res.json({
      success: true,
      calculations: {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        activityLevel: user.activityLevel,
        recommendations: {
          maintain: Math.round(tdee),
          mildWeightLoss: Math.round(tdee - 250),
          weightLoss: Math.round(tdee - 500),
          extremeWeightLoss: Math.round(tdee - 1000),
          mildWeightGain: Math.round(tdee + 250),
          weightGain: Math.round(tdee + 500)
        }
      }
    });
  } catch (error) {
    console.error('Calculate BMR error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating BMR',
      error: error.message
    });
  }
});

module.exports = router;
