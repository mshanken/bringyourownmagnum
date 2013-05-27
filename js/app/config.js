// app/config.js
// Contains side-wide configuration variables. Not secure.
// DO NOT KEEP CONFIDENTIAL INFORMATION WITHIN THIS FILE
//
// Twitter API v 1.1 - https://dev.twitter.com/docs/api/1.1/get/search/tweets without OAuth

(function(){

  "use strict";

  define(function(){

    return {
      hashTag: "BYOM2013",
      searchToken : "<<SEARCH_TOKEN>>",
      dataProviders : {
        twitter : {
          domain  : "http://search.twitter.com/search.json",
          url     : "http://search.twitter.com/search.json?q=<<SEARCH_TOKEN>>%20pic.twitter.com%20exclude:retweets%20exclude:replies&exclude_replies=true&exclude_retweets=true&include_entities=true&count=100&until=2013-05-29" 
        },
        instagram : {
          url: "https://api.instagram.com/v1/tags/<<SEARCH_TOKEN>>/media/recent?client_id=777ace9cb20b46ec9d81ec11ae5cad0d"
        }
      }
    };

  });

}());
