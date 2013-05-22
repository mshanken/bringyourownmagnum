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
          this.listenTo(this.collections.twitter,
                        "noResults",
                        this._noResults);
        },
        _noResults : function(evt){
          if(this.collections.twitter.state.noResults === true){
             //this.collections.instagram.state.noResults === true){
            this.trigger("noResults");
          }
        },
        collections : {
          twitter   : new TwitterUpdates(),
          instagram : new InstagramUpdates()
        },
        state : {
          collectionsUpdate : 0,
          COLLECTION_COUNT : 1,
          isLoading: true
        },
        _fireUpdate : function(){
          var updatesCtx = this;
          this.state.collectionsUpdate += 1;
          if(this.state.collectionsUpdate >= this.state.COLLECTION_COUNT){
            this.collections.twitter.each(function(){
              updatesCtx.add(updatesCtx.collections.twitter.pop());
            });

            this.collections.twitter.reset(undefined,{silent:true});
            this.state.isLoading = false;
            this.trigger("loadToggle");
            this.trigger("clear");
          }
        },
        fetch : function(){
          this.collections.twitter.fetchNext({dataType:"jsonp",reset:true});
          //this.collections.instagram.fetchNext({dataType:"jsonp",reset:true});
        }
      });

      return defaultCollection;

    });
}());
