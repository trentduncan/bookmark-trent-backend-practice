'use strict';

/* global */

//eslint-disable-next-line no-unused-vars
const store = (function(){

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

//   const 


  return {
    bookmarks: [],
    ratingFilter: null,
    addFormDisplayed: true,
    
    addBookmark
  };
}());