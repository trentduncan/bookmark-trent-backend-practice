'use strict';

/* global cuid */

//eslint-disable-next-line no-unused-vars
const store = (function(){
  const bookmarks = [
    {title: 'Bookmark1',
      description: 'Filler descsdfgafgfdsgfdsgdfsgsd',
      url: 'https//:www.testurl.com',
      rating: 5,
      expanded: false,
      id: cuid()
    },
    {title: 'Bookmark2',
      description: 'filler2 descsdfgafgfdsgfdsgdfsgsd',
      url: 'https//:www.testurl2.com',
      rating: 3,
      expanded: false,
      id: cuid()
    }
  ];
  let ratingFilter = null;
  let addBookmark = false;


  return {
    bookmarks,
    ratingFilter,
    addBookmark
  };
}());