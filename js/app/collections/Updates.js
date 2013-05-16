// app/js/collections/Updates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/Update',
    'config',
    'events',
    'collections/TwitterUpdates',
    'collections/InstagramUpdates'
    ], function(Backbone, $, _, Update, config, Events,TwitterUpdates,InstagramUpdates){

      var defaultCollection  = Backbone.Collection.extend({
        initialize: function () {
          this.listenTo(this.collections.twitter,
                        Events.updated,
                        this._fireUpdate);
          this.listenTo(this.collections.instagram,
                        Events.updated,
                        this._fireUpdate);
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
