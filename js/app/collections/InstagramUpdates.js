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
        initialize: function () {
          this.on("reset",function(){
            while(this.length > this.state.MAX_LENGTH){
              this.pop();
            }
          });
        },
        state : {
          MAX_LENGTH : 3
        },
        model: InstagramUpdate,
        parse : function(jsonData){
          return jsonData.data;
        },
        url : config.dataProviders.instagram.url.replace(config.searchToken,config.hashTag)
      });

      return defaultCollection;

    });
}());
