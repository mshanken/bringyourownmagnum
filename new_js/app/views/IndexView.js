// app/views/IndexView/IndexView.js
// DESC: These are some design patterns I use frequently.
//       Ensure that render cycles are idempotent - multiple calls to render will render the same state ( no
//       ".append" calls that depend on call order"
//
//       el : Element the view is a child of
//       els : object css selectors 
//       events :  Standard
//       views : Object of child views
//       initialize : Standard
//       models: Object of models used
//       state: flags tracking internal state
//       render: Standard

(function(){

  "use strict";

  define([
    'jquery',
    'underscore',
    'backbone',
    'views/RootView/HeaderView',
    'io',
    'vm'
    ], function($, _, Backbone, headerView, io,vm){
      var WineEditView = Backbone.View.extend({
        el : "#content",
        els : {
          appellation : {
            resultsList : "ul#appellationOutput",
            noResultsMessage : "",
            search : "input#appellation",
            spinner : "#appellationSpinner",
            selectedList : "ul#appellationSelected"
          },
          region : {
            resultsList : "ul#regionOutput",
            noResultsMessage : "",
            search : "input#region",
            spinner : "#regionSpinner",
            selectedList : "ul#regionSelected"
          },
          wine :{
            color:"select#color",
            type : "select#type",
            style : "select#style",
            caseOrder : "input.caseOrder",
            wineName : "input[type=radio][name=caseorder]",
            wineNameVal :"input[type=text][name=caseorder]",
            description: "textarea#description"
          },
          vintages :{
            list      : "ul#vintage-list",
            bottlings : "ul#containerFields",
            details : {
              vintage       : "input#detailsVintage",
              alcohol       : "input#detailsAlcohol",
              casesProduced : "input#detailsCasesProduced",
              casesImported : "input#detailsCasesImported"
            }
          }
        },
        events : {
          "click div#updateBtn"       : "updateWine",
          "click a#deleteBtn"         : "deleteWine",
          "keyup input#region"        : "regionSearched",
          "keyup input#appellation"   : "appellationSearched",
          "click  li.vintageListItem" : "loadVintage",
          "click div#addBottling"     : "addNewVintage",
          "click  div#editGrape"      : "editGrape",
          "click  div#editImporter"   : "editImporter"
        },
        views : {
          imageUploadView : new ImageUploadView()
        },
        initialize: function(){

          // Fetch in the wine model,
          // Pass the wine_id to the Vintages collection and fetch its vintages
          // Avoid locking this process but the wine > vintages process will need to be synchronous

          var path_id = io.getIdFromPath({wine_id:true}).wine_id;
          this.models.wine = new WineModel({
            id : path_id
          }); 
          this.views.imageUploadView.model.set({wine_id:path_id[0]});
          this.listenTo(this.models.wine,'syncAll',this.render);
          this.models.wine.fetch();

          // All the autocomplete fields will need their own collections to display the search
          // results

          this.models.searchResults.appellationCollection = new AppellationCollection();
          this.models.searchResults.regionCollection = new RegionCollection();

          // 1-to-M relationship beteen wines and vintages, vintages aren't a property of wine in the API

          this.models.vintages = new VintagesCollection();

          this.listenTo(this.models.searchResults.appellationCollection,'reset',this.renderAppellation.searchResults.addSearchResults);
          this.listenTo(this.models.searchResults.appellationCollection,'noResults',this.renderAppellation.searchResults.showNoResults);
          this.listenTo(this.models.searchResults.appellationCollection,'resultSelected',this.renderAppellation.searchResults.addSelectedResults);

          this.listenTo(this.models.searchResults.regionCollection,'reset',this.renderRegions.searchResults.addSearchResults);
          this.listenTo(this.models.searchResults.regionCollection,'noResults',this.renderRegions.searchResults.showNoResults);
          this.listenTo(this.models.searchResults.regionCollection,'resultSelected',this.renderRegions.searchResults.addSelectedResults);

          // update selector
          // bb does not support 
          $('body').on("click","div#updateBtn",{handlingView:this},this.updateWine);
          $('body').on("click","div#deleteBtn",{handlingView:this},this.deleteWine);

        },
        models : {
          searchResults : {},
          wine : {},
          vintages : {}
        },
        state : {
          selectedVintage : undefined,
          overlayEnabled : true
        },
        render: function(){
        }
      });
      return WineEditView;
    });
}());

