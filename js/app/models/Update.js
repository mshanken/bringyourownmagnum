// app/js/models/update.js
//
// General representation of an application update

(function(){

  "use strict";
  
  define([
    'backbone',
    'jquery',
    'config',
    'underscore'
  ], function(Backbone, $, config,underscore){
  
    var Update = Backbone.Model.extend({
      defaults : {
        username: "",
        message : "",
        image_url: "",
        data_provider: ""
      },
      initialize: function(){
        console.log("Update booted",arguments);
      }
    });
  
    return Update;
  
  });
}());
