const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  waterIntake: {
    type: Number, // glasses
    default: 0,
    min: 0,
    max: 50
  },
  steps: {
    type: Number,
    default: 0,
    min: 0
  },
  weight: {
    type: Number, // kg
    min: 0
  },
  sleep: {
    type: Number, // hours
    min: 0,
    max: 24
  },
  mood: {
    type: String,
    enum: ['excellent', 'good', 'okay', 'bad', 'terrible']
  },
  notes: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Compound index for user and date (unique per day)
dailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
