'use strict';

const express = require('express');
const router = express.Router();

// const mongoose = require('mongoose');

const Bookmark = require('../models/bookmark');

router.get('/bookmarks', (req, res, next) => {
  Bookmark.find()
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

module.exports = router;