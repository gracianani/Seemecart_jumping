// Question.js

define(["jquery", "backbone"],

    function ($, Backbone) {

        var Quiz = Backbone.Model.extend({
            defaults: {
                currentQuestionId: 1,
                progress: 0
            },
            initialize: function (options) {
                this.userAnswers = options.userAnswers;
                this.questions = options.questions;
                this.jumpings = options.jumpings;
                this.currentQuestion = this.questions.first();
                this.set("currentQuestionId", this.currentQuestion.get("questionId"));
                this.currentIndex = 0;
                this.questionSize = 11;
            },
            currentQuestionNumber: function () {
                // current question number is current index + 1
                return this.currentIndex + 1;
            },
            isFirstQuestion: function () {
                if (this.questions.first().get("questionId") == this.get("currentQuestionId")) {
                    return true;
                }
                return false;
            },
            isLastQuestion: function (answerId) {
                var jumping = this.jumpings.findWhere({ questionId: this.get("currentQuestionId"), answerId: answerId });
                if (jumping.get("nextQuestionId") === 0) {
                    return true;
                }
                return false;
            },
            getResultId: function (answerId) {
                var jumping = this.jumpings.findWhere({ questionId: this.get("currentQuestionId"), answerId: answerId });
                return jumping.get("resultId");
            },
            isCurrentQuestionAnswered: function () {
                return this.userAnswers.isAnswered(this.get("currentQuestionId"));
            },
            goToPreviousQuestion: function () {
                var prevQuestion = this.questions.at(this.currentIndex - 1);
                this.currentQuestion = prevQuestion;
                this.currentIndex = this.currentIndex - 1;
                this.set("currentQuestionId", prevQuestion.get("questionId"));
                this.set("progress", Math.floor(this.currentIndex / this.questions.size() * 100));
            },
            goToNextQuestion: function (answerId) {
                var question = this.questions.at(this.currentIndex + 1);
                var jumping = this.jumpings.findWhere({ questionId: this.get("currentQuestionId"), answerId: answerId });
                var nextQuestion = this.questions.findWhere({ questionId: jumping.get("nextQuestionId") });
                this.currentQuestion = nextQuestion;
                this.currentIndex = this.currentIndex + 1;
                this.set("currentQuestionId", nextQuestion.get("questionId"));
                this.set("progress", Math.floor(this.currentIndex / this.questionSize * 100));
            },
            processUserAnswer: function (answerId) {
                if (this.isCurrentQuestionAnswered()) {
                    this.userAnswers.remove(
                        this.userAnswers.where({ "questionId": this.get("currentQuestionId") })
                    );
                }
                this.userAnswers.add({ "questionId": this.get("currentQuestionId"), "answerId": answerId });
            },
            getCurrentQuestion: function () {
                var question = this.questions.get(this.get("currentQuestionId")).clone();
                question.set("answerId", this.getCurrentUserAnswerId());
                return question;
            },
            getCurrentUserAnswerId: function () {
                var answer = this.userAnswers.findWhere({ "questionId": this.get("currentQuestionId") });
                if (answer) {
                    return answer.get("answerId");
                } else {
                    return -1;
                }
            },
            getQuestionsCount: function () {
                return this.questionSize;
            },
            resetQuiz: function () {
                var questionId = this.questions.first().get("questionId");
                this.set("currentQuestionId", questionId);
                this.currentIndex = this.questions.indexOf(this.questions.findWhere({ "questionId": questionId }));
                this.set("progress", Math.floor(this.currentIndex / this.questionSize * 100));
            }
        });

        return Quiz;
    }

);