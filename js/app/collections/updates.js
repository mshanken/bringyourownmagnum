// app/js/collections/updates.js

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

        url: config.base_url_path + 'api/container',

        initialize: function () {
        },

        model: Update ,

        fetch : function(){
          console.log("Update the updates collection");
          
          this.add([
            {
              username: "Johnny",
              data_provider : "twitter"
            },  
            {
              username: "Jimmy",
              data_provider : "instagram"
            },  
            {
              username: "Johnny",
              data_provider : "twitter"
            },  
            {
              username: "Jimmy",
              data_provider : "instagram"
            },  
            {
              username: "Johnny",
              data_provider : "twitter"
            },  
          ]);

          this.trigger(Events.updated);

        }

      });

      return defaultCollection;

    });
}());
