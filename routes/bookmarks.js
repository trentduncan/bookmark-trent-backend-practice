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

router.post('/bookmarks', ( req, res, next) => {
  const {title, desc, url, rating} = req.body;

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  if (!url) {
    const err = new Error('Missing `url` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = {
    title,
    desc,
    url,
    rating
  };

  Bookmark.create(newItem)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/bookmarks/:id', (req, res, next) => {
  const {id} = req.params;

  Bookmark.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

module.exports = router;