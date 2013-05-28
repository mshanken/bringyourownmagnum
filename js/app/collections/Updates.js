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
                        "reset",
                        this._fireUpdate);
          this.listenTo(this.collections.instagram,
                        "reset",
                        this._fireUpdate);
          this.listenTo(this.collections.instagram,
                        "resultsToggle",
                        this._noResults);
          this.listenTo(this.collections.twitter,
                        "resultsToggle",
                        this._noResults);
        },
        _noResults : function(evt){
          if(this.collections.twitter.state.noResults === true && this.collections.instagram.state.noResults === true){
           this.state.isLoading = false;
           this.state.noResults = true;
           this.trigger("resultsToggleCol");
           this.trigger("loadToggle");
          }
        },
        collections : {
          twitter   : new TwitterUpdates(),
          instagram : new InstagramUpdates()
        },
        state : {
          collectionsUpdate : 0,
          COLLECTION_COUNT : 2,
          isLoading: true,
          noResults : false
        },
        _fireUpdate : function(){
          var updatesCtx = this;
          this.state.collectionsUpdate += 1;
          if(this.state.collectionsUpdate >= this.state.COLLECTION_COUNT){

            // Instagram
            this.collections.instagram.each(function(){
              updatesCtx.add(updatesCtx.collections.instagram.pop());
            });
            this.collections.instagram.reset(undefined,{silent:true});

            // Twitter
            this.collections.twitter.each(function(){
              updatesCtx.add(updatesCtx.collections.twitter.pop());
            });
            this.collections.twitter.reset(undefined,{silent:true});
            
            this.state.collectionsUpdate = 0;
            this.state.isLoading = false;
            this.trigger("loadToggle");
            this.trigger("clear");
          }
        },
        fetch : function(){
          this.state.isLoading = true;
          this.state.noResults = false;
          this.trigger("loadToggle");
          this.trigger("resultsToggleCol");

          this.collections.twitter.fetchNext({dataType:"jsonp",reset:true});
          this.collections.instagram.fetchNext({dataType:"jsonp",reset:true});
        }
      });
      return defaultCollection;

    });
}());
