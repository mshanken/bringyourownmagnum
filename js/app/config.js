// app/config.js
// Contains side-wide configuration variables. Not secure.
// DO NOT KEEP CONFIDENTIAL INFORMATION WITHIN THIS FILE

(function(){

  "use strict";
  
  define(function(){
  
    return {
      hashTag: "swag",
      searchToken : "<<SEARCH_TOKEN>>",
      dataProviders : {
        twitter : {
          url : "http://search.twitter.com/search.json?q=%23<<SEARCH_TOKEN>>%20pic.twitter.com&rpp=5&include_entities=true&result_type=mixed%20filter%3Aimages"
        },
        instagram : {
          url: "https://api.instagram.com/v1/tags/<<SEARCH_TOKEN>>/media/recent?client_id=777ace9cb20b46ec9d81ec11ae5cad0d"
        }
      }
    };
  
  });

}());
