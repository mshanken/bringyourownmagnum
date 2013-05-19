// app'
// TODO: Ensure all libs are minified
// TODO: Split this out into its own paths file

(function(){

  'use strict';

  require.config({
  
    paths: {
      jquery: '../libs/jquery/jquery-1.7.1',
      plugins: '../libs/plugins/plugins-min',
      underscore: '../libs/underscore/underscore', 
      backbone: '../libs/backbone/backbone',
      text: '../libs/text/text',
      modernizr : '../libs/modernizr/modernizr',
      templates: '../../templates',
      cryptojs : '../libs/cryptojs/cryptojs',
      TweenLite : '../libs/greensock/TweenLite',
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
    'router',
    'vm',
    'jquery'
    ], function(_, Backbone, Router, Vm, $){
      $(document).ready(function() {
        Router.initialize();  // The router now has a copy of all main appview
      });
  });

}());
