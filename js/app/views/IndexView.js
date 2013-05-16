// app/views/IndexView/IndexView.js

(function(){

  "use strict";

  define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'events',
    'collections/Updates',
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
          this.listenTo(this.collections.updates,Events.updated, this.transitionUpdates);
          this.collections.updates.fetch();
        },
        render: function(){
          this.$el.append(ViewTemplate);
        },
        clearUpdateContainer : function(){
          $(this.els.updateContainerParent).html('');
        },
        transitionUpdates : function(){
          var indexCtx = this;
          this.clearUpdateContainer();
          this.collections.updates.each(function(update){
            $(this.els.updateContainerParent).append(update.render());
          },this);
          $(this.els.nextUpdates).each(function(ndx, el){
            $(el).fadeIn();
            //$(el).removeClass(indexCtx.els.nextUpdates).addClass(indexCtx.els.currentUpdates).fadeOut();
            //indexCtx.addUpdate();
          });
        },
        addUpdate : function(){
          window.addUpdate = this;
          var update = this.collections.updates.pop();
          $(this.els.updateContainerParent).append(update.render());
          $("li#"+update.cid).fadeIn();
        }
      });
      return IndexView;
    });
}());
