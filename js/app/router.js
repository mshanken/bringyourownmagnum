// app/router.js
// TODO: Generate route dynamically. Involves deep-dive into Backbone as routes are dynamically bound 
(function(){

  "use strict";

  define([
    'vm',
    'underscore'
  ], function (Vm,_) {
    var Router = Backbone.Router.extend({
      routes: {
        // Default
        ''                                        : 'index',
        '*actions'                                : 'index'
      }
    });
    var initialize = function(options){

      var rootController = (typeof options !== "undefined" && typeof options.rootController !== "undefined") ? options.rootController:undefined,
          router = new Router(options);

      router.on('route:index', function (argOne, argTwo) {
        require(['views/IndexView'], function (IndexView) {
          var loginController = Vm.create([], 'IndexView', IndexView);
        });
      });

  
      // Defaults Event Listeners
      // Errors Event Listeners
      router.on('route:error', function () {
      });
  
      /*
      router.on('route', function (argOne, argTwo) {
        _.each(Vm.views,Vm.destroy);
      });

      */

      Backbone.history.start();
    };
    return {
      initialize: initialize
    };
  });
}());
