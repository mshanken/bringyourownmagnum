// app'
// TODO: Ensure all libs are minified
// TODO: Split this out into its own paths file

(function(){

  'use strict';

  require.config({
  
    paths: {
      jquery: '../libs/jquery/jquery-1.7.1.min',
      plugins: '../libs/plugins/plugins-min',
      underscore: '../libs/underscore/underscore', 
      backbone: '../libs/backbone/backbone',
      text: '../libs/text/text',
      modernizr : '../libs/modernizr/modernizr',
      templates: '../../templates',
      cryptojs : '../libs/cryptojs/cryptojs',
      config : 'config'                 // Site-wide config
    },

    shim : {
      'backbone' : {
        deps : ['underscore','jquery'],
        exports : 'Backbone'
      },
      'underscore' : {
        exports : '_'
      }
    }
 
  });
  
  require([
    'underscore',
    'backbone',
    'controllers/RootController',
    'router',
    'vm',
    'jquery'
    ], function(_, Backbone, RootController, Router, Vm, $){
      var rootController = Vm.create({}, 'RootController', RootController);
      rootController.render();
      Router.initialize({rootController: rootController});  // The router now has a copy of all main appview
  });

}());
