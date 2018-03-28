'use strict';

const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  url: {type: String, required: true },
  rating: {type: Number, min: 1, max: 5},
  expanded: {type: Boolean, default: false}
});

bookmarkSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);