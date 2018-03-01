'use strict';

/* global */

//eslint-disable-next-line no-unused-vars
const store = (function(){
  const bookmarks = [
    {title: 'Bookmark1',
      desc: 'Filler descsdfgafgfdsgfdsgdfsgsd',
      url: 'https//:www.testurl.com',
      rating: 5,
      expanded: false,
      id: 1
    },
    {title: 'Bookmark2',
      desc: 'filler2 descsdfgafgfdsgfdsgdfsgsd',
      url: 'https//:www.testurl2.com',
      rating: 3,
      expanded: true,
      id: 2
    }
  ];
  let ratingFilter = null;
  let addBookmark = true;


  return {
    bookmarks,
    ratingFilter,
    addBookmark
  };
}());