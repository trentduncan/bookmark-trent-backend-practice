'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Bookmark = require('../models/bookmark');

router.get('/bookmarks', (req, res, next) => {
  Bookmark.find()
    .then(results => {
      res.json(results);
    })
    .catch(next);
});

router.put('/bookmarks/:id', (req, res, next) => {
  const {id} = req.params;
  const {title, desc, rating} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  const updateItem = {title, desc, rating};
  
  Bookmark.findByIdAndUpdate(id, updateItem, {new: true})
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
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