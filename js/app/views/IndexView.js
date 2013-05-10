// app/views/IndexView/IndexView.js

(function(){

  "use strict";

  define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'events',
    'collections/updates'
    ], function($,_,Backbone,vm,Events,Updates){
      var WineEditView = Backbone.View.extend({
        el : "#content",
        collections : {},
        initialize: function(){
          console.log("IndexView instantiated.");
          this.collections.updates = new Updates();
          this.listenTo(this.collections.updates,Events.updated, this.renderNewUpdates);
          this.collections.updates.fetch();
        }
      });
      return WineEditView;
    });
}());

