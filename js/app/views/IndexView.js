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
          loadingPlaceholder : "#loadingPlaceholder",
          noResultsPlaceholder : "#noResultsPlaceholder"
        },
        checkScroll : function(){
          var currentPosition = $(document).scrollTop()+$(window).height(),
              documentHeight = $(document).height();
          if(
              (currentPosition  >= documentHeight - this.constants.INFINISCROLL_PADDING) &&
              this.collections.updates.state.isLoading === false
            ){
            this.collections.updates.state.isLoading = true;
            this.collections.updates.fetch();
          }
        },
        constants :{
          LOADING_TRANSITION_LENGTH : 300,
          NEW_IMAGE_TRANSITION_LENGTH: 500,
          INFINISCROLL_PADDING : 200
        },
        collections : {},
        initialize: function(){
          this.collections.updates = new Updates();
          $(window).on("scroll",this.checkScroll.bind(this)); // infiniscroll
          this.listenTo(this.collections.updates,"clear", this.transitionUpdates);
          this.listenTo(this.collections.updates,"loadToggle", this.toggleLoading);
          this.listenTo(this.collections.updates,"noResults",this.showNoResults);
          this.collections.updates.fetch();
        },
        toggleLoading : function(){
          if(this.collections.updates.state.isLoading === true){
           $(this.els.loadingPlaceholder).fadeIn(this.constants.LOADING_TRANSITION_LENGTH);
          }else{
           $(this.els.loadingPlaceholder).fadeOut(this.constants.LOADING_TRANSITION_LENGTH);
          }
        },
        render : function(){
          $(this.els.noResultsPlaceholder).fadeOut(this.constants.LOADING_TRANSITION_LENGTH);
        },
        transitionUpdates : function(){
          var $container = $(this.els.updates);
          //this.render();

          _.each(this.collections.updates.shuffle(), function(update){
            $(this.els.updates).append(update.render());
          },this);

            $container.masonry({
              itemSelector: '.masonryTile',
              columnWidth:240
            }).imagesLoaded(function(){
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
            this.collections.updates.reset();
        },
        showNoResults : function(){
          $(this.els.noResultsPlaceholder).fadeIn(this.constants.LOADING_TRANSITION_LENGTH);
        }
      });
      return IndexView;
    });
}());
