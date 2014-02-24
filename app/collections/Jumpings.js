// Scorings.js

define(["jquery", "backbone", "models/Jumping"],

    function ($, Backbone, Jumping) {

        var cryto = require("cipher");

        var Jumpings = Backbone.Collection.extend({

            url: function () {
                return "app/data/enciphered-scorings.json";
            },

            parse: function (response) {
                var deciphered = { stream: { value: response.a }, key: { value: 'jipin'} };
                var parsed = decipher(deciphered);
                return JSON.parse(deciphered.stream.value);
            },

            model: Jumping
        });

        return Jumpings;
    }

);