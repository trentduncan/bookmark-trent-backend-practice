'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Bookmark = require('../models/bookmark');

const seedBookmarks = require('../db/seed/bookmarks');


mongoose.connect(MONGODB_URI)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Bookmark.insertMany(seedBookmarks);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });