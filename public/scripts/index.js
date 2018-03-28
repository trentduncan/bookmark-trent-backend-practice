'use strict';

/* global bookmarks, $, store, api */

$(function(){
  api.getBookmarks(function(response){
    response.forEach(bookmark => {
      bookmark.expanded = false;
      store.addBookmark(bookmark);
    });
    bookmarks.render();
  });
  bookmarks.bindEventListeners();
  bookmarks.render();

});

