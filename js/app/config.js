// app/config.js
// Contains side-wide configuration variables. Not secure.
// DO NOT KEEP CONFIDENTIAL INFORMATION WITHIN THIS FILE
//
// Twitter API v 1.1 - https://dev.twitter.com/docs/api/1.1/get/search/tweets without OAuth

(function(){

  "use strict";

  define(function(){

    return {
      hashTag: "wsporsche",
      //hashTag: "porsche",
      searchToken : "<<SEARCH_TOKEN>>",
      dataProviders : {
        twitter : {
          domain  : "http://search.twitter.com/search.json",
          url     : "http://search.twitter.com/search.json?q=<<SEARCH_TOKEN>>&exclude_replies=1&exclude_retweets=1&include_entities=1&count=100" 
        },
        instagram : {
          url: "https://api.instagram.com/v1/tags/<<SEARCH_TOKEN>>/media/recent?client_id=777ace9cb20b46ec9d81ec11ae5cad0d"
        }
      }
    };

  });

}());
