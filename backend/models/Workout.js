const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exercise: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
    default: 'cardio'
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required'],
    min: 1
  },
  caloriesBurned: {
    type: Number,
    required: [true, 'Calories burned is required'],
    min: 0
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  sets: {
    type: Number,
    min: 0
  },
  reps: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number, // in kg
    min: 0
  },
  distance: {
    type: Number, // in km
    min: 0
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
workoutSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);
