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
          this.listenTo(this.collections.updates,"resultsToggle",this.toggleResults);
          this.collections.updates.fetch();
        },
        toggleLoading : function(){
          if(this.collections.updates.state.isLoading === true){
           $(this.els.loadingPlaceholder).fadeIn(this.constants.LOADING_TRANSITION_LENGTH);
          }else{
           $(this.els.loadingPlaceholder).fadeOut(this.constants.LOADING_TRANSITION_LENGTH);
          }
        },
        toggleResults : function(){
          if(this.collections.updates.state.noResults === true){
            $(this.els.noResultsPlaceholder).fadeIn(this.constants.LOADING_TRANSITION_LENGTH); 
          }else{
            $(this.els.noResultsPlaceholder).fadeOut(this.constants.LOADING_TRANSITION_LENGTH);
          }
        },
        render : function(){
        },
        transitionUpdates : function(){
          var $container = $(this.els.updates);

          this.collections.updates.each(function(update){
            $(this.els.updates).append(update.render());
          },this);

            $container.masonry({
              itemSelector: '.masonryTile',
              isAnimated : false,
              columnSize: 300
              /*animations : {
                duration: 700,
                easing : 'swing',
                queue: true
              }*/
            }).imagesLoaded(function(){
              $container.masonry("reload");
              $container.children().each(function(ndx,el){
                $(el).fadeIn(500);
              });
            });

            this.collections.updates.reset();
        }
      });
      return IndexView;
    });
}());
