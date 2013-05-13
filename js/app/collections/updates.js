// app/js/collections/updates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/Update',
    'config'
    ], function(Backbone, $, _, Update, config){

      var defaultCollection  = Backbone.Collection.extend({

        url: config.base_url_path + 'api/container',

        initialize: function () {
        },

        model: Update ,

        fetch : function(){
          console.log("Update the updates collection");
        }

      });

      return defaultCollection;

    });
}());
