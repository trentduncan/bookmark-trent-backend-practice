'use strict';

/* global bookmarks, $, store, api */

$(function(){
  api.getBookmarks(function(response){
    response.forEach(bookmark => store.addBookmark(bookmark));
    bookmarks.render();
  });

});