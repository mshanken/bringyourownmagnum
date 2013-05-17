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
        },
        collections : {
          twitter   : new TwitterUpdates(),
          instagram : new InstagramUpdates()
        },
        state : {
          collectionsUpdate : 0,
          COLLECTION_COUNT : 1,
          loading: true
        },
        _fireUpdate : function(){
          var updatesCtx = this;
          this.state.collectionsUpdate += 1;
          if(this.state.collectionsUpdate >= this.state.COLLECTION_COUNT){
            this.collections.twitter.each(function(){         // Unable to use .call
                                                              // due to
                                                              // restrictions on
                                                              // bb.js' eval ctx's
              updatesCtx.add(updatesCtx.collections.twitter.pop());
            });
            //this.collections.instagram.each(function(){         // Unable to use .call
            //                                                  // due to
            //                                                  // restrictions on
            //                                                  // bb.js' eval ctx's
            //  updatesCtx.add(updatesCtx.collections.instagram.pop());
            //});
            this.state.loading = false;
            //this.trigger("loadToggle");
            this.trigger("reset");
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
