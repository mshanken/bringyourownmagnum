// app/js/collections/updates.js

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
