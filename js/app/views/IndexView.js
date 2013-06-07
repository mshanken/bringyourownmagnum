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
        state : {
          lastRequest : new Date()
        },
        checkScroll : function(){
          var currentDateTime = new Date();
          var currentPosition = $(document).scrollTop()+$(window).height(),
              documentHeight = $(document).height();
          if((currentDateTime - this.state.lastRequest) >= this.constants.CHECK_LOAD_TIMEOUT){
              this.state.lastRequest = currentDateTime;
              if((currentPosition  >= documentHeight - this.constants.INFINISCROLL_PADDING) && this.collections.updates.state.isLoading === false){
                this.collections.updates.fetch();
              }
          }
        },
        constants :{
          LOADING_TRANSITION_LENGTH : 300,
          NEW_IMAGE_TRANSITION_LENGTH: 500,
          INFINISCROLL_PADDING : 600,
          CHECK_LOAD_TIMEOUT: 500
        },
        collections : {},
        initialize: function(){
          this.collections.updates = new Updates();
          $(window).on("scroll",this.checkScroll.bind(this)); // infiniscroll
          this.listenTo(this.collections.updates,"clear", this.transitionUpdates);
          this.listenTo(this.collections.updates,"loadToggle", this.toggleLoading);
          this.listenTo(this.collections.updates,"resultsToggleCol",this.toggleResults);
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
        transitionUpdates : function(){
          var $container = $(this.els.updates);

          _.each(this.collections.updates.models,function(update){
            $(this.els.updates).append(update.render());},this);

          //this.collections.updates.each(function(update){
          //  $(this.els.updates).append(update.render());
          //},this);

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

            this.collections.updates.state.isLoading = false;

            this.collections.updates.reset();
        }
      });
      return IndexView;
    });
}());
