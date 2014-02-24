define(function (require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require("backbone");
    var BackboneTouch = require("backbonetouch");
    var Cipher = require("cipher");
    var Questions = require("collections/Questions");
    var UserAnswers = require("collections/UserAnswers");
    var Scorings = require("collections/Scorings");
    var Jumpings = require("collections/Jumpings");
    var Results = require("collections/Results");
    var UserResult = require("models/UserResult");
    var Quiz = require("models/Quiz");

    var InQuizView = require("views/InQuizView");
    var StartQuizView = require("views/StartQuizView");
    var PrepareResultView = require("views/PrepareResultView");
    var EndQuizView = require("views/EndQuizView");
    var MainView = require("views/MainView");

    var questions;
    var userAnswers;
    var results;
    var scorings;
    var jumpings;
    var quiz;

    var inQuizView;
    var startQuizView;
    var prepareResultView;
    var endQuizView;
    var mainView;

    var t;
    // Defining the application router.
    module.exports = Backbone.Router.extend({

        initialize: function () {
            startQuizView = new StartQuizView();
            mainView = new MainView();
            questions = new Questions();
            results = new Results();
            userAnswers = new UserAnswers();
            scorings = new Scorings();
            jumpings = new Jumpings();

            var self = this;
            this.fetchSuccessCount = 0;
            var fetchSuccessHandler = function () {
                self.fetchSuccessCount++;
                if (self.fetchSuccessCount == 3) {
                    self.prepare();
                }
            };
            questions.fetch({
                success: fetchSuccessHandler
            });
            results.fetch({
                success: fetchSuccessHandler
            });
            jumpings.fetch({
                success: fetchSuccessHandler
            });

        },

        routes: {
            "": "index",
            "question/:questionId": "startQuiz",
            "result/:resultId": "result"
        },

        prepare: function () {
            startQuizView.ready();
        },

        index: function () {
            console.log("Welcome to your / route.");
            startQuizView.render();
            if (!(questions.isEmpty() || results.isEmpty() || jumpings.isEmpty())) {
                this.prepare();
            }
        },

        startQuiz: function (questionId) {
            if (questions.isEmpty()) {
                Backbone.history.navigate('', { trigger: true, replace: true });
                return;
            }

            if (inQuizView) {
                quiz.resetQuiz();
                inQuizView.render();
                return;
            }
            quiz = new Quiz({
                questions: questions,
                jumpings: jumpings,
                userAnswers: userAnswers
            });
            inQuizView = new InQuizView({ model: quiz });
        },
        result: function (resultId) {
            if ( typeof(resultId) !== 'undefined' ) {
                var userResult = new UserResult({ results: results, resultId : resultId  });
                prepareResultView = new PrepareResultView({ userResult: userResult});
                endQuizView = new EndQuizView({ model: userResult, prepareResultView: prepareResultView });

            } else {
                Backbone.history.navigate('', { trigger: true, replace: true });
            }

        }
    });
});
