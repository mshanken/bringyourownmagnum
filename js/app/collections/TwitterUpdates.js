// app/js/collections/TwitterUpdates.js

(function(){

  "use strict";

  define([
    'backbone',
    'jquery',
    'underscore',
    '../models/TwitterUpdate',
    'config',
    'events'
    ], function(Backbone, $, _, TwitterUpdate, config, Events){

      var defaultCollection  = Backbone.Collection.extend({
        initialize : function(){
          this.add([
            {
              "url" : "http://twitter.com/Pedroncelli",
              "image_src":"https://pbs.twimg.com/media/BLZXvpgCIAA7sER.jpg:large",
              "from_user_name":"Pedroncelli Winery",
              "from_user":"Pedroncelli",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BLZXvpgCIAA7sER.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/pmauney1",
              "image_src":"https://pbs.twimg.com/media/BLZXvpgCIAA7sER.jpg:large",
              "from_user_name":"Phillip Mauney",
              "from_user":"pmauney1",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BLZu9vSCMAE8ivp.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/federighi007",
              "image_src":"https://pbs.twimg.com/media/BLZvoNICYAAPzoX.jpg:large",
              "from_user_name":"Mark W. Federighi",
              "from_user":"federighi007",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BLZvoNICYAAPzoX.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/DuttonGoldfield",
              "image_src":"http://d3j5vwomefv46c.cloudfront.net/photos/large/776171065.jpg?1369853609",
              "from_user_name":"Dutton-Goldfield",
              "from_user":"DuttonGoldfield",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"http://d3j5vwomefv46c.cloudfront.net/photos/large/776171065.jpg?1369853609"}]}
            },
            {
              "url" : "http://twitter.com/Merryvale",
              "image_src":"https://pbs.twimg.com/media/BLdq3CeCcAADaP8.jpg:large",
              "from_user_name":"Merryvale Vineyards",
              "from_user":"Merryvale",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BLdq3CeCcAADaP8.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/chrisogwine",
              "image_src":"https://pbs.twimg.com/media/BLdr7sBCYAAAgIq.jpg:large",
              "from_user_name":"Christopher O'Gorman",
              "from_user":"chrisogwine",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BLdr7sBCYAAAgIq.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/jsthaler",
              "image_src":"https://pbs.twimg.com/media/BML2J-pCEAARc0C.jpg:large",
              "from_user_name":"Jessica Thaler",
              "from_user":"jsthaler",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BML2J-pCEAARc0C.jpg:large"}]}
            },
            {
              "url" : "http://twitter.com/jsthaler",
              "image_src":"https://pbs.twimg.com/media/BMK13NNCMAAvsVR.jpg:large",
              "from_user_name":"Jessica Thaler",
              "from_user":"jsthaler",
              "data_provider":"twitter",
              "entities":{media:[{media_url:"https://pbs.twimg.com/media/BMK13NNCMAAvsVR.jpg:large"}]}
            }
          ]);
        },
        state : {
          noResults : false
        },
        nextPage:"new",
        model: TwitterUpdate,
        parse : function(jsonData){
          if(typeof jsonData.next_page !== "undefined"){
            this.state.noResults = false;
            this.nextPage = jsonData.next_page;
          }else{
            this.nextPage = undefined;
            this.state.noResults = true;
            this.trigger("resultsToggle");
          }
          return jsonData.results;
        },
        fetchNext : function(fetchArgs){
          if(typeof this.nextPage !== "undefined" && this.nextPage !== "new"){
            this.url = config.dataProviders.twitter.domain + this.nextPage;
            //this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset});
            this.trigger("reset");
          }else if(this.nextPage === "new"){
            this.url = config.dataProviders.twitter.url.replace(config.searchToken,config.hashTag);
            //this.fetch({dataType:fetchArgs.dataType,reset:fetchArgs.reset}); 
            this.trigger("reset");
          }else{
            this.state.noResults = true;
            this.trigger("resultsToggle");
            this.trigger("reset");
          }
        },
        url : config.dataProviders.twitter.url.replace(config.searchToken,config.hashTag),
        comparator : function(tweet){
          return tweet.get("id");
        }
      });

      return defaultCollection;

    });
}());
