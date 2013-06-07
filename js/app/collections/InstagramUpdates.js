// app/js/collections/InstagramUpdates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/InstagramUpdate',
    'config',
    'events'
    ], function(Backbone, $, _, InstagramUpdate, config, Events){

      var defaultCollection  = Backbone.Collection.extend({
        initialize : function(){
        },
        state : {
          noResults : false
        },
        url : config.dataProviders.instagram.url.replace(config.searchToken,config.hashTag),
        nextPage:"new",
        model: InstagramUpdate,
        parse : function(jsonData){
          if(typeof jsonData.pagination.next_url !== "undefined"){
            this.state.noResults = false;
            this.nextPage = jsonData.pagination.next_url;
          }else{
            this.nextPage = undefined;
            this.state.noResults = true;
            this.trigger("resultsToggle");
          }
          return jsonData.data;
        },
        fetchNext : function(fetchArgs){
          if(typeof this.nextPage !== "undefined" && this.nextPage !== "new"){
            this.url = this.nextPage;
            this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset});
          }else if(this.nextPage === "new"){
            this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset}); 
          }else{
            this.state.noResults = true;
            this.trigger("resultsToggle");
            this.trigger("reset");
          }
        },
        comparator : function(instagram){
          return instagram.get("id");
        },
      });

      return defaultCollection;

    });
}());
