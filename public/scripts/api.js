'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars
const api = (function(){
  // const BASE_URL ='https://thinkful-list-api.herokuapp.com/trent';
  const BASE_URL = '/api';
  
  const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark= function(title, url, desc, rating, callback){
    const bookmark = {
      title,
      url,
      desc,
      rating
    };
    const newBookmark = JSON.stringify(bookmark);

    $.ajax({
      'url':`${BASE_URL}/bookmarks`,
      'method': 'POST',
      'contentType': 'application/json',
      'data': newBookmark,
      'success': callback
    });
  };

  const deleteBookmark = function(id, callback){
    $.ajax({
      'url': `${BASE_URL}/bookmarks/${id}`,
      'method': 'DELETE',
      'success': callback
    });
  };

  const updateBookmark = function(id, bookmark){
    const updatedBookmark = JSON.stringify(bookmark);

    $.ajax({
      'url':`${BASE_URL}/bookmarks/${id}`,
      'method': 'PUT',
      'contentType': 'application/json',
      'data': updatedBookmark
      // 'success': callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
    updateBookmark
  };

}());