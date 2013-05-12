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
    'text!templates/IndexView.html',
    'text!templates/UpdateContainer.html'
    ], function($,_,Backbone,vm,Events,Updates,ViewTemplate, UpdateContainer){
      var IndexView = Backbone.View.extend({
        el : "#content",
        els : {
          updateContainerParent : "#updates",
          currentUpdates : undefined,
          nextUpdates : "#nextUpdates" 
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
        bootstrapContainerSwitch : function(){
          $(this.els.updateContainerParent).append(UpdateContainer);
        },
        renderUpdates : function(){
          this.clearUpdateContainer();
          this.bootstrapContainerSwitch();
          this.collections.updates.each(function(update){
            $(this.els.nextUpdates).append(update.render());
          },this);
        }
      });
      return IndexView;
    });
}());
