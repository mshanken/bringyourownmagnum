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
        },
        model: Update
      });

      return defaultCollection;

    });
}());
