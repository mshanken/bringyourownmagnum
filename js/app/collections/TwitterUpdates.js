// app/js/collections/TwitterUpdates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/TwitterUpdate',
    'config',
    'events'
    ], function(Backbone, $, _, TwitterUpdate, config, Events){

      var defaultCollection  = Backbone.Collection.extend({
        initialize : function(){
        },
        state : {
          noResults : false
        },
        nextPage:"new",
        model: TwitterUpdate,
        parse : function(jsonData){
          if(typeof jsonData.next_page !== "undefined"){
            this.state.noResults = false;
            this.nextPage = jsonData.next_page;
          }else{
            this.nextPage = undefined;
            this.state.noResults = true;
            this.trigger("resultsToggle");
          }
          return jsonData.results;
        },
        fetchNext : function(fetchArgs){
          if(typeof this.nextPage !== "undefined" && this.nextPage !== "new"){
            this.url = config.dataProviders.twitter.domain + this.nextPage;
            this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset});
          }else if(this.nextPage === "new"){
            this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset}); 
          }else{
            this.state.noResults = true;
            this.trigger("resultsToggle");
            this.trigger("reset");
            //this.trigger("loadToggle");
          }
        },
        url : config.dataProviders.twitter.url.replace(config.searchToken,config.hashTag),
        comparator : function(tweet){
          return tweet.get("id");
        }
      });

      return defaultCollection;

    });
}());
