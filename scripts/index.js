'use strict';

/* global bookmarks, $, store, api */

$(function(){
  api.getBookmarks(function(response){
    response.forEach(bookmark => store.addBookmark(bookmark));
    bookmarks.render();
  });

});

api.createBookmark('bookmarktest','https//:www.testurlwooo.com','dsfsfsdfsdfsdsf','5', function(response){
  console.log(response);
});