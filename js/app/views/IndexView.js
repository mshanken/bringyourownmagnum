// app/views/IndexView/IndexView.js

(function(){

  "use strict";

  define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'events',
    'collections/updates',
    'text!templates/IndexView.html'
    ], function($,_,Backbone,vm,Events,Updates,ViewTemplate){
      var IndexView = Backbone.View.extend({
        el : "#content",
        els : {
          currentUpdates : ".currentUpdate",
          nextUpdates : ".nextUpdate",
          updateContainerParent : "#updates"
        },
        collections : {},
        initialize: function(){
          this.render();
          this.collections.updates = new Updates();
          this.listenTo(this.collections.updates,Events.updated, this.renderUpdates);
          this.collections.updates.fetch();
        },
        render: function(){
          this.$el.append(ViewTemplate);
        },
        clearUpdateContainer : function(){
          $(this.els.updateContainerParent).html('');
        },
        renderUpdates : function(){
          this.clearUpdateContainer();
          this.collections.updates.each(function(update){
            $(this.els.updateContainerParent).append(update.render());
          },this);

          $(this.els.nextUpdates).each(function(ndx, el){
            console.log("Animate",el);
            el.animate({
              'margin-left':'-100%'
            },500);
          });

        }
      });
      return IndexView;
    });
}());
