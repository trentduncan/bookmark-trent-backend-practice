'use strict';

/* global store, $ */

//eslint-disable-next-line no-unused-vars
const bookmarks = (function(){
  const generateDefaultHeader = function(){
    return `<div class="add-and-filter">
                <button class="add-bookmark-button" type="button">Add Bookmark</button>
                <select class="filter-bookmark-dropdown">
                    <option value="null">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>`;
  };

  const generateAddItemHeader = function(){
    return `<form class="add-bookmark-form">
                <input id="title" type="text" name="title" placeholder="Enter Title">
                <input id="description" type="text" name="description" placeholder="Enter Description">
                <input id="url" type="url" name="url" placeholder="Enter URL">
                <div class="rating-radio">
                    <input id="rating1" type="radio" name="rating" value="1"><label for="rating1">1</label>
                    <input id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label>
                    <input id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label>
                    <input id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label>
                    <input id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label>
                </div>
                <input type="submit" value="Add Bookmark">
            </form>`;
  };

  const generateDefaultBookmarkItem = function(bookmark) {
    return `<li class="bookmark-item" id="${bookmark.id}">
                <h2>${bookmark.title}</h2>
                Rating: ${bookmark.rating}
            </li>`;
  }; 

  
  const generateExpandedBookmarkItem = function(bookmark){
    return `<li class="bookmark-item" id="${bookmark.id}">
                <h2>${bookmark.title}</h2>
                <div class="bookmark-expanded-content">
                    Description: ${bookmark.desc}
                    Rating:${bookmark.rating}
                    Link to this URL: ${bookmark.url}
                    <button name="button">Delete</button>
                </div>
            </li>`;
  };

  const render = function(){
    let header = (store.addFormDisplayed) ? generateAddItemHeader() : generateDefaultHeader();
    let bookmarkItems = store.bookmarks.map(bookmark => {
      return bookmark.expanded ? generateExpandedBookmarkItem(bookmark) : generateDefaultBookmarkItem(bookmark);
    });
    $('.add-and-filter-heading').html(header);
    $('.bookmark-list').html(bookmarkItems);

  };

  return {
    render,
  };

}());