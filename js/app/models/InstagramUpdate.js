// app/js/models/InstagramUpdate.js
//
// Representation of a Instagram update

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
        data_provider: "instagram"
      },
      render : function(){
        var attr = this.attributes;
        attr.cid = this.cid;
        attr.url = "";
        attr.image_src = this.attributes.images.standard_resolution.url;
        attr.username = this.attributes.user.username;

        return _.template(updateTemplate)(attr);
      }
    });
    return Update;
  });
}());
