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

  const toggleExpand = function(id){
    const targetedBookmark = this.bookmarks.find(obj => obj.id === id);
    targetedBookmark.expanded = !targetedBookmark.expanded;
  };

  const deleteBookmark = function(id){
    const filteredBookmarks = this.bookmarks.filter(obj => obj.id !== id);
    this.bookmarks = filteredBookmarks;
  };

  const changeRatingFilter = function(rating){
    this.ratingFilter = rating === 'all' ? rating : parseInt(rating);
  };


  return {
    bookmarks: [],
    ratingFilter: 'all',
    addFormDisplayed: false,
    
    addBookmark,
    toggleAddFormDisplayed,
    toggleExpand,
    deleteBookmark,
    changeRatingFilter
  };
}());