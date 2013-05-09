// TODO: Incomplete migration. Paused to refactor models
(function(){

  "use strict";

  define([
    'jquery',
    '../models/defaultModel',
    'config'
    ], function($, defaultModel, config){

      var defaultCollection  = Backbone.Collection.extend({

        url: config.base_url_path + 'api/container',

        initialize: function () {
        },

        model: defaultModel 

      });

      return defaultCollection;

    });
}());
