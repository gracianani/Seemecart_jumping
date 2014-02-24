// UserResult.js

define(["jquery", "backbone"],

    function ($, Backbone) {

        var UserResult = Backbone.Model.extend({

            initialize: function (options) {
                this.resultRepo = options.results;
                this.resultId = parseInt(options.resultId);
                this.setResult();
            },
            getResultDetailByResultId: function (resultId, resultScore) {
                var resultDetail = this.resultRepo.findWhere({ resultId: resultId }).clone();
                resultDetail.set("score", resultScore);
                return resultDetail;
            },
            setResult: function () {
                var highestDetail = this.getResultDetailByResultId(this.resultId, 100);
                this.set(highestDetail.toJSON());
            }

        });

        return UserResult;
    }

);