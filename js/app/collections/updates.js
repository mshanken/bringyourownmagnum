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

        initialize: function () {
          this.listenTo(this.collections.twitterUpdates,Events.updated,this.renderAppellation.searchResults.addSearchResults);
        },

        collections : {
          twitter   : new TwitterUpdates(),
          instagram : new InstagramUpdates()
        },

        state : {
          collectionsUpdate : 0,
          COLLECTION_COUNT : 2
        },

        _fireUpdate : function(){
          if(this.collectionsUpdate === this.COLLECTION_COUNT){
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
              }
            ]);
            this.trigger(Events.updated);
          }
        },

        model: Update,

        fetch : function(){
          _.each(this.collections,function(){
            debugger;
          });
        }

      });

      return defaultCollection;

    });
}());
