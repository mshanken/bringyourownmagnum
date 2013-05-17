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
        nextPage:undefined,
        model: TwitterUpdate,
        parse : function(jsonData){
          if(typeof jsonData.next_page !== "undefined"){
            this.nextPage = jsonData.next_page;
          }
          return jsonData.results;
        },
        fetchNext : function(fetchArgs){
          if(typeof this.nextPage !== "undefined"){
            this.url = config.dataProviders.twitter.domain + this.nextPage;
          }
          this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset});
        },
        url : config.dataProviders.twitter.url.replace(config.searchToken,config.hashTag)
      });

      return defaultCollection;

    });
}());
