import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  username: { type: String, required: true },
  time: { type: Number, required: true },
});

const LeaderboardSchema = new Schema({
  gameName: { type: String, required: true },
  data: [dataSchema],
});

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema);

export default Leaderboard;
