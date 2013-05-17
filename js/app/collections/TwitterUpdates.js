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
          //this.on('reset',function(){debugger;});
        },
        nextPage:undefined,
        model: TwitterUpdate,
        parse : function(jsonData){
          if(typeof jsonData.nextPage !== "undefined"){
            this.nextPage = jsonData.nextPage;
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
