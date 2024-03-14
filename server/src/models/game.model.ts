import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  name: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

const GameSchema = new Schema({
  name: { type: String, required: true },
  targets: [TargetSchema],
});

const Game = mongoose.model('Game', GameSchema);

export default Game;
