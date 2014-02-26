// Scorings.js

define(["jquery", "backbone", "models/Scoring"],

    function ($, Backbone, Scoring) {

        var cryto = require("cipher");

        var Scorings = Backbone.Collection.extend({

            url: function () {
                return "app/data/scorings.json"; 

            },

            model: Scoring
        });

        return Scorings;
    }

);