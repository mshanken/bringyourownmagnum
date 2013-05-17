// app/config.js
// Contains side-wide configuration variables. Not secure.
// DO NOT KEEP CONFIDENTIAL INFORMATION WITHIN THIS FILE
//
// Twitter API v 1.1 - https://dev.twitter.com/docs/api/1.1/get/search/tweets without OAuth

(function(){

  "use strict";

  define(function(){

    return {
      hashTag: "porsche",
      searchToken : "<<SEARCH_TOKEN>>",
      dataProviders : {
        twitter : {
          domain  : "http://search.twitter.com/search.json",
          url     : "http://search.twitter.com/search.json?q=%23<<SEARCH_TOKEN>>%20pic.twitter.com&include_entities=true&count=100&until=2013-09-01" 
        },
        instagram : {
          url: "https://api.instagram.com/v1/tags/<<SEARCH_TOKEN>>/media/recent?client_id=777ace9cb20b46ec9d81ec11ae5cad0d"
        }
      }
    };

  });

}());
