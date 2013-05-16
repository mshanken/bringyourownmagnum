// app/js/collections/InstagramUpdates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/Update',
    'config',
    'events'
    ], function(Backbone, $, _, Update, config, Events){

      var defaultCollection  = Backbone.Collection.extend({
        initialize: function () {
          this.listenTo(this.collections.twitterUpdates,Events.updated,this.renderAppellation.searchResults.addSearchResults);
        },
        model: Update
      });

      return defaultCollection;

    });
}());

