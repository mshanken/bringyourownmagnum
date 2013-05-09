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
  

        // Checkin 
          // Winery
          'checkin/winery'                        : 'checkinWinerySearch',
          'checkin/winery/add'                    : 'checkinWineryAdd',
          'checkin/winery/edit/wyid:winery_id'    : 'checkinWineryEdit',
          'checkin/winery/list/wyid:winery_id'    : 'checkinWineryList',
          'checkin/winery/delete/wyid:winery_id'  : 'checkinWineryDelete',
  
          // Wine
          'checkin/wine'                          : 'checkinWineSearch',
          'checkin/wine/add'                      : 'checkinWineAdd',
          'checkin/wine/edit/wid:wine_id'         : 'checkinWineEdit',
          'checkin/wine/delete/wid:wine_id'       : 'checkinWineDelete',

          // Defaults
          'checkin*'                              : 'checkinWinerySearch',

        // Flight
          // Flight Setup
          'flight'                                : 'flightList',

          // Default
          'flight*'                               : 'flightList',

        // Settings

        'login'                                   : 'login',
        'profile'                                 : 'profile',
  
        // Default
        ''                                        : 'checkinWinerySearch',
  
        //Errors
        '*actions'                                : 'error'

      }
    });
    var initialize = function(options){

      var rootController = options.rootController;
      var router = new Router(options);

      // Settings 
  
      router.on('route:login', function (argOne, argTwo) {
        require(['controllers/SettingsController/SettingsController'], function (LoginController) {
          var loginController = Vm.create(rootController, 'LoginController', LoginController);
          loginController.render({requestedView:"login",args:arguments, parentContext : rootController});
        });
      });
      router.on('route:profile', function (argOne, argTwo) {
        require(['controllers/SettingsController/SettingsController'], function (LoginController) {
          var loginController = Vm.create(rootController, 'profile', LoginController);
          loginController.render({requestedView:"profile",args:arguments, parentContext : rootController});
        });
      });
  
      // Winery 
  
      router.on('route:checkinWinerySearch', function (argOne, argTwo) {
        require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWinerySearch",args:arguments, parentContext : rootController});
        });
      });
      router.on('route:checkinWineryAdd', function (argOne, argTwo) {
         require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineryAdd",args:arguments, parentContext : rootController});
        });
      });
      router.on('route:checkinWineryEdit', function (argOne, argTwo) {
          require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineryEdit",args:arguments, parentContext : rootController});
        });
      });
      router.on('route:checkinWineryList', function (argOne, argTwo) {
          require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineryList",args:arguments, parentContext : rootController});
        });
      });
  
      // Wine Event Listeners
  
      router.on('route:checkinWineSearch', function (argOne, argTwo) {
        require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineSearch",args:arguments, parentContext : rootController});
        });
      });
  
      router.on('route:checkinWineAdd', function () {
        require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineAdd",args:arguments, parentContext : rootController});
        });
      });
  
      router.on('route:checkinWineEdit', function (argOne, argTwo) {
          require(['controllers/CheckinController/CheckinController'], function (CheckinController) {
          var checkinController = Vm.create(rootController, 'CheckinController', CheckinController);
          checkinController.render({requestedView:"checkinWineEdit",args:arguments, parentContext : rootController});
        });
      });

      // Flight
        // Flight Setup

      router.on('route:flightList', function(argOne, argTwo){
        require(['controllers/FlightController/FlightController'], function (FlightController) {
          var flightController = Vm.create(rootController, 'FlightController', FlightController);
          flightController.render({requestedView:"flightList",args:[argOne,argTwo], parentContext : rootController});
        });
      });
  
      // Defaults Event Listeners
      // Errors Event Listeners
      router.on('route:error', function () {
        console.log("you dun messed up, kid...'Merrica!");
      });
  
      router.on('route', function (argOne, argTwo) {
        _.each(Vm.views,Vm.destroy);
      });

      Backbone.history.start();
    };
    return {
      initialize: initialize
    };
  });
}());
