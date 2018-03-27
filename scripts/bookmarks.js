'use strict';

/* global store, $, api */

//eslint-disable-next-line no-unused-vars
const bookmarks = (function(){
//   render functions below
  const generateDefaultHeader = function(){
    
    return `<div class="add-and-filter">
                <button id="add-bookmark-button">Add Bookmark</button>
                <select class="filter-bookmark-dropdown">
                    <option value="all" ${store.ratingFilter === 'all' ? 'selected': ''}>All</option>
                    <option value="1" ${store.ratingFilter === 1 ? 'selected': ''}>1</option>
                    <option value="2" ${store.ratingFilter === 2 ? 'selected': ''}>2</option>
                    <option value="3" ${store.ratingFilter === 3 ? 'selected': ''}>3</option>
                    <option value="4" ${store.ratingFilter === 4 ? 'selected': ''}>4</option>
                    <option value="5" ${store.ratingFilter === 5 ? 'selected': ''}>5</option>
                </select>
            </div>`;
  };

  const generateAddItemHeader = function(){
    return `<form id="add-bookmark-form">
                <input class="input-text" id="title" type="text" name="title" maxlength="30" placeholder="Enter Title" required>
                <input class="input-text" id="description" type="text" maxlength="45" name="description" placeholder="Enter Description">
                <input class="input-text" id="url" type="url" name="url" placeholder="Enter URL" required>
                <div class="rating-radio">
                    <input class="rating-radio" id="rating1" type="radio" name="rating" value="1" checked><label for="rating1">1</label>
                    <input class="rating-radio" id="rating2" type="radio" name="rating" value="2"><label for="rating2">2</label>
                    <input class="rating-radio" id="rating3" type="radio" name="rating" value="3"><label for="rating3">3</label>
                    <input class="rating-radio" id="rating4" type="radio" name="rating" value="4"><label for="rating4">4</label>
                    <input class="rating-radio" id="rating5" type="radio" name="rating" value="5"><label for="rating5">5</label>
                </div>
                <button class="add-form-buttons" type="submit">Add Bookmark</button>
                <button class="cancel-button add-form-buttons" type="button" name="cancel-button">Cancel</button>
            </form>`;
  };

  const generateStarRating = function(rating){
    const filledStar = '&#9733;';
    const hollowStar = '&#9734;';
    const numberFilledStars = filledStar.repeat(rating);
    const numberHollowStars = hollowStar.repeat(5 - rating);
    return numberFilledStars + numberHollowStars;

  };
  
  const generateDefaultBookmarkItem = function(bookmark) {
    return `<li role="button" tabindex="0" class="bookmark-item" data-item-id="${bookmark.id}">
                <h2>${bookmark.title}</h2>
                <p class="rating">${generateStarRating(bookmark.rating)}</p>
            </li>`;
  }; 

  
  const generateExpandedBookmarkItem = function(bookmark){
    return `<li role="button" tabindex="0" class="bookmark-item expanded" data-item-id="${bookmark.id}">
                <h2>${bookmark.title}</h2>
                <div class="bookmark-expanded-content">
                    <p>${bookmark.desc === '' ? 'No Description' : bookmark.desc}</p>
                    <div class="rating expanded-rating">${generateStarRating(bookmark.rating)}</div>
                    <div class="link-del-buttons">
                        <span class="edit-box"><i class="far fa-edit"></i></span>
                        <a href="${bookmark.url}" target="_blank"><button class="link-button" name="link-button">Link to Page</button></a>
                        <button class="delete-button" name="button">Delete</button>
                    </div>
                </div>
            </li>`;
  };

  const render = function(){
    let header = (store.addFormDisplayed) ? generateAddItemHeader() : generateDefaultHeader();
    let currentStore = (store.ratingFilter === 'all') ? store.bookmarks : store.bookmarks.filter(obj => obj.rating >= store.ratingFilter);
    let bookmarkItems = currentStore.map(bookmark => {
      return bookmark.expanded ? generateExpandedBookmarkItem(bookmark) : generateDefaultBookmarkItem(bookmark);
    });
    $('.add-and-filter-heading').html(header);
    $('.bookmark-list').html(bookmarkItems);
  };
  //   add items to the page
  const handleDisplayAddForm = function(){
    $('.add-and-filter-heading').on('click', '#add-bookmark-button', function(){
      store.toggleAddFormDisplayed();
      render();
    });
  };
  const handleCancelAdd = function(){
    $('.add-and-filter-heading').on('click', '.cancel-button', function(){
      store.toggleAddFormDisplayed();
      render();
    });
  };

  const handleAddBookmarks = function(){
    $('.add-and-filter-heading').on('submit', '#add-bookmark-form', function(event){
      event.preventDefault();
      const newTitle = $('#title').val();
      const newDesc = $('#description').val();
      const newUrl = $('#url').val();
      const newRating = $('input[type="radio"][name="rating"]:checked').val();

      api.createBookmark(newTitle, newUrl, newDesc, newRating, function(response){
        response.expanded = false;
        store.addBookmark(response);
        store.toggleAddFormDisplayed();
        render();
      });
    });
  };

  //   expand items 

  const findIdFromElement = function(item){
    return $(item)
      .closest('.bookmark-item')
      .attr('data-item-id');
  };

  const handleExpandItem = function(){
    $('.bookmark-list').on('click', '.bookmark-item', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      store.toggleExpand(bookmarkId);
      render();
    });
  };

  const handleExpandItemForKeyboardUsers = function(){
    $('.bookmark-list').on('keypress', '.bookmark-item', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      store.toggleExpand(bookmarkId);
      render();
    });
  };

  //   delete items

  const handleDeleteBookmark = function(){
    $('.bookmark-list').on('click', '.delete-button', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      api.deleteBookmark(bookmarkId, function(){
        store.deleteBookmark(bookmarkId);
        render();
      });
    });
  };

  const handleDeleteBookmarkForKeyboardUsers = function(){
    $('.bookmark-list').on('keypress', '.delete-button', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      api.deleteBookmark(bookmarkId, function(){
        store.deleteBookmark(bookmarkId);
        render();
      });
    });
  };

  //   rating filter
  
  const handleRatingFilter = function(){
    $('.add-and-filter-heading').on('change', '.filter-bookmark-dropdown', function(){
      const filterValue = $('.filter-bookmark-dropdown').val();
      store.changeRatingFilter(filterValue);
      render();
    });
  };



  const bindEventListeners = function(){
    handleDisplayAddForm();
    handleCancelAdd();
    handleAddBookmarks();
    handleExpandItem();
    handleDeleteBookmark();
    handleRatingFilter();
    handleExpandItemForKeyboardUsers();
    handleDeleteBookmarkForKeyboardUsers();
    
  };

  return {
    render,
    bindEventListeners
  };

}());