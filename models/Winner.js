const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WinnerSchema = new Schema({
    winner_id: String,
    win: Number,
    clickCount: Number,
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Winner', WinnerSchema);