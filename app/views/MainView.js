﻿// ToolbarView.js
// -------
define(["jquery", "backbone","animationscheduler"],

    function ($, Backbone, AnimationScheduler) {

        var MainView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "body",

            // View constructor
            initialize: function (options) {
                this.disableSelection();
                this.helpButtonAnimationScheduler = new AnimationScheduler( this.$el.find("#topBar-help") );
                this.helpButtonAnimationScheduler.animateIn();
            },

            // View Event Handlers
            events: {
                "click #logo": "onClickLogo",
                "click #shareOverlay":"hideShareOverlay",
                "click #start-shareButton":"showShareOverlay",
                "click #result-shareButton":"showShareOverlay",
                "click #topBar-help":"toggleHelpPannel"
            },

            onClickLogo: function() {
                Backbone.history.navigate('', { trigger: true, replace: true });
            },
            hideShareOverlay: function() {
                this.$el.find("#shareOverlay").addClass("hidden");
            },
            showShareOverlay: function(){
                this.$el.find("#shareOverlay").removeClass("hidden");
            },
            disableSelection: function() {
                this.$el.css({
                    'MozUserSelect':'none',
                    'webkitUserSelect':'none',
                    '-ms-user-select':'none',
                    'oUserSelect':'none',
                    }).attr('unselectable','on').bind('selectstart', function(event) {
                    event.preventDefault();
                    return false;
                });
            },
            toggleHelpPannel: function(e) {
                var topbar = this.$el.find("#topBar");
                topbar.toggleClass("opened");
                
                if ( topbar.hasClass("opened") ) {
                
                    topbar.animate({
                        "height":"300px"
                    },"fast","swing", function(){
                        $("#topBar-text").removeClass("hidden");
                    });
                    
                } else {
                
                    $("#topBar-text").addClass("hidden");
                    topbar.animate({
                        "height":"43px"
                    },"fast","swing", function(){
                        
                    });
                }
                
            }
        });

        // Returns the View class
        return MainView;
    }

);