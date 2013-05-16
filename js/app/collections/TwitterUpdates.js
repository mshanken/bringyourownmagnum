// app/js/collections/TwitterUpdates.js

// http://search.twitter.com/search.json?q=%23swag%20pic.twitter.com&rpp=5&include_entities=true&result_type=mixed

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
        },
        model: Update
      });

      return defaultCollection;

    });
}());
