const mongoose = require("mongoose");

const visita = new mongoose.Schema({
name: String,
address: String,
description: String,
date: Date,
time: String,
age: Number, 
email: String,
finished: Boolean,
notified: Boolean
});

module.exports = visita;