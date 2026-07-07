const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  rewardId: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['daily', 'quest-completion', 'milestone', 'achievement', 'bonus'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  items: [{
    name: String,
    quantity: Number,
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common'
    }
  }],
  unlocksContent: {
    character: String,
    story: String,
    ability: String
  },
  streakBonus: {
    day: Number,
    multiplier: Number
  },
  description: String,
  phase: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date
});

module.exports = mongoose.model('Reward', rewardSchema);
