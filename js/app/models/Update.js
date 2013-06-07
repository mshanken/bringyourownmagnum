// app/js/models/Update.js
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
        image_src : "http://localhost:4000/img/placeholder.png",
        username: "",
        data_provider: ""
      },
      render : function(){
        var attr = this.attributes;
        attr.cid = this.cid;
        return _.template(updateTemplate)(attr);
      }
    });
    return Update;
  });
}());
