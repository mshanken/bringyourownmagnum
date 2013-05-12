// app/js/models/update.js
//
// General representation of an application update

(function(){

  "use strict";
  
  define([
    'backbone',
    'jquery',
    'underscore',
    'config',
    'underscore',
    'text!templates/Update.html'
  ], function(Backbone, $, _, config,underscore, updateTemplate){
    var Update = Backbone.Model.extend({
      defaults : {
        url: "",
        image_src : "",
        username: "",
        data_provider: ""
      },
      initialize: function(){
        console.log("Update booted",arguments);
      },
      render : function(){
        debugger;
        return _.template(updateTemplate)(this.attributes);
      }
    });
    return Update;
  });
}());
