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

  const generateEditBookmarkItem = function(bookmark){
    return `<li role="button" tabindex="0" class="bookmark-item expanded" data-item-id="${bookmark.id}">
              <form class="edit-form">
                <input class="input-text" id="title${bookmark.id}" type="text" name="title" maxlength="30" value="${bookmark.title}" required>
                <div class="bookmark-expanded-content">
                <input class="input-text" id="desc${bookmark.id}" type="text" maxlength="45" name="description" value="${bookmark.desc === '' ? 'No Description' : bookmark.desc}">
                <div class="rating-radio">
                  <input class="rating-radio" id="rating1${bookmark.id}" type="radio" name="rating${bookmark.id}" value="1"${(bookmark.rating === 1) ? ' checked' : ''}><label for="rating1">1</label>
                  <input class="rating-radio" id="rating2${bookmark.id}" type="radio" name="rating${bookmark.id}" value="2"${(bookmark.rating === 2) ? ' checked' : ''}><label for="rating2">2</label>
                  <input class="rating-radio" id="rating3${bookmark.id}" type="radio" name="rating${bookmark.id}" value="3"${(bookmark.rating === 3) ? ' checked' : ''}><label for="rating3">3</label>
                  <input class="rating-radio" id="rating4${bookmark.id}" type="radio" name="rating${bookmark.id}" value="4"${(bookmark.rating === 4) ? ' checked' : ''}><label for="rating4">4</label>
                  <input class="rating-radio" id="rating5${bookmark.id}" type="radio" name="rating${bookmark.id}" value="5"${(bookmark.rating === 5) ? ' checked' : ''}><label for="rating5">5</label>
                </div>
                    <div class="link-del-buttons edit-mode-del-link-buttons">
                        <span class="edit-box"><i class="far fa-edit"></i></span>
              </form>
                        <a href="${bookmark.url}" target="_blank"><button class="link-button" name="link-button" disabled>Link to Page</button></a>
                        <button class="delete-button" name="button" disabled>Delete</button>
                    </div>
                </div>
            </li>`;
  };

  const render = function(){
    let header = (store.addFormDisplayed) ? generateAddItemHeader() : generateDefaultHeader();
    let currentStore = (store.ratingFilter === 'all') ? store.bookmarks : store.bookmarks.filter(obj => obj.rating >= store.ratingFilter);
    let bookmarkItems = currentStore.map(bookmark => {
      if (bookmark.expanded) {
        if (bookmark.editMode) {
          return generateEditBookmarkItem(bookmark);
        } else {
          return generateExpandedBookmarkItem(bookmark);
        }
      } else {
        return generateDefaultBookmarkItem(bookmark);
      }
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
      const currentBookmark = store.bookmarks.find(bookmark => bookmarkId === bookmark.id);
      if (!currentBookmark.editMode) {
        store.toggleExpand(bookmarkId);
        render();
      }
    });
  };

  const handleExpandItemForKeyboardUsers = function(){
    $('.bookmark-list').on('keypress', '.bookmark-item', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      const currentBookmark = store.bookmarks.find(bookmark => bookmarkId === bookmark.id);
      if (!currentBookmark.editMode) {
        store.toggleExpand(bookmarkId);
        render();
      }
    });
  };
  //  edit items

  const collectUserEditData = function(id){
    const title = $(`#title${id}`).val();
    const desc = $(`#desc${id}`).val();
    const rating = $(`input[type="radio"][name="rating${id}"]:checked`).val();

    return {title, desc, rating: Number(rating)};
  };

  const handleToggleEditMode = function(){
    $('.bookmark-list').on('click', '.edit-box', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);
      const currentBookmark = store.bookmarks.find(obj => obj.id === bookmarkId);
      if (currentBookmark.editMode){
        const updatedBookmark = collectUserEditData(bookmarkId);
        api.updateBookmark(bookmarkId, updatedBookmark);
        store.updateBookmark(bookmarkId, updatedBookmark);
        store.toggleEdit(bookmarkId);
        store.toggleExpand(bookmarkId);
        render();
      } else {
        store.toggleEdit(bookmarkId);
        render();
      }
    });
  };

  const handleSubmitEdit = function(){
    $('.bookmark-list').on('keyup', '.edit-form', function(event){
      const bookmarkId = findIdFromElement(event.currentTarget);

      const title = $(`#title${bookmarkId}`).val();
      const desc = $(`#desc${bookmarkId}`).val();
      const rating = $(`input[type="radio"][name="rating${bookmarkId}"]:checked`).val();

      const updatedBookmark = {title, desc, rating: Number(rating)};
      store.updateBookmark(bookmarkId, updatedBookmark);
    });
  };

  // could add a change event listener to fix radio switch in edit mode bug

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
    handleToggleEditMode();
    handleSubmitEdit();
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