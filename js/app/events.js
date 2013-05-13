// app/events.js

(function(){
  
  "use strict";

  define([
    'jquery',
    'underscore',
    'backbone'
  ], function($, _, Backbone){
    var vent = $.extend({
      failedVerification : "failedVerification",
      updated : "updated",
      test : "test"
    }, Backbone.Events);
    return vent;
  });

}());

