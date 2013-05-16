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
        model: TwitterUpdate,
        parse : function(jsonData){
          return jsonData.results;
        },
        url : config.dataProviders.twitter.url.replace(config.searchToken,config.hashTag)
      });

      return defaultCollection;

    });
}());
