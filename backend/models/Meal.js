const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: 0
  },
  protein: {
    type: Number,
    default: 0,
    min: 0
  },
  carbs: {
    type: Number,
    default: 0,
    min: 0
  },
  fats: {
    type: Number,
    default: 0,
    min: 0
  },
  fiber: {
    type: Number,
    default: 0,
    min: 0
  },
  servingSize: {
    type: String,
    default: '1 serving'
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for faster queries
mealSchema.index({ user: 1, date: -1 });

// Virtual for total macros
mealSchema.virtual('totalMacros').get(function() {
  return this.protein + this.carbs + this.fats;
});

module.exports = mongoose.model('Meal', mealSchema);
