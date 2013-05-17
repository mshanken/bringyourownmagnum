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
    'text!templates/IndexView.html',
    'text!templates/Modal.html'
    ], function($,_,Backbone,vm,Events,Updates,ViewTemplate,ModalTemplate){
      var IndexView = Backbone.View.extend({
        el : "#content",
        els : {
          updates : "ul#updates",
          loadingPlaceholder : "#loadingPlaceholder"
        },
        checkScroll : function(){
          console.log("We been scrolled, yo");
        },
        constants :{
          LOADING_TRANSITION_LENGTH : 300,
          NEW_IMAGE_TRANSITION_LENGTH: 500
        },
        collections : {},
        initialize: function(){
          this.render();
          this.collections.updates = new Updates();
          $(window).on("scroll",this.checkScroll);
          this.listenTo(this.collections.updates,"reset", this.transitionUpdates);
          this.listenTo(this.collections.updates,"loadToggle", this.toggleLoading);
          this.collections.updates.fetch();
        },
        toggleLoading : function(){
          if(this.collections.updates.state.loading === true){
           $(this.els.loadingPlaceholder).fadeIn(this.constants.LOADING_TRANSITION_LENGTH);
          }else{
           $(this.els.loadingPlaceholder).fadeOut(this.constants.LOADING_TRANSITION_LENGTH);
          }
        },
        render: function(){
          //this.$el.append(ViewTemplate);
          //this.$el.append(ModalTemplate);
        },
        transitionUpdates : function(){

          var $container = $(this.els.updates);

          _.each(this.collections.updates.shuffle(), function(update){
            $(this.els.updates).append(update.render());
          },this);

            $container.masonry({
              itemSelector: '.masonryTile',
              columnWidth:240
            }).imagesLoaded(function(){
              console.log("loaded");
              $container.masonry("reload");
              $container.children().each(function(ndx,el){
                $(el).fadeIn(500);
              });
            });

            $container.infinitescroll({
              navSelector  : '#page-nav',    // selector for the paged navigation 
              nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
              itemSelector : '.masonryTile',     // selector for all items you'll retrieve
              loading: {
                  finishedMsg: 'No more pages to load.',
                  img: 'img/loading.gif'
              }
            },
              function(newElements){
                var $newElems = $(newElements).css({opacity:0});
                $newElems.imagesLoaded(function(){
                  $newElems.animate({opacity:1});
                  $container.masonry('appended',$newElems,true);
                });
              }
            );

        },
        addUpdate : function(){
          var update = this.collections.updates.collections.twitter.pop();
          $(this.els.updateContainerParent).append(update.render());
          $("li#"+update.cid).fadeIn();
        }
      });
      return IndexView;
    });
}());
