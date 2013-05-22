// app/js/models/TwitterUpdate.js
//
// Representation of a twitter update

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
        data_provider: "twitter"
      },
      render : function(){

        var attr = this.attributes;
        attr.cid = this.cid;
        attr.url = "";
        attr.image_src = this.attributes.entities.media[0].media_url;
        attr.username = this.attributes.from_user_name;

        return _.template(updateTemplate)(attr);
      }
    });
    return Update;
  });
}());
