'use strict';

/* global */

//eslint-disable-next-line no-unused-vars
const store = (function(){

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  const toggleAddFormDisplayed = function(){
    this.addFormDisplayed = !this.addFormDisplayed;
  }; 


  return {
    bookmarks: [],
    ratingFilter: null,
    addFormDisplayed: false,
    
    addBookmark,
    toggleAddFormDisplayed
  };
}());