define(["jquery", "backbone", "mustache", "text!templates/PrepareResult.html", "animationscheduler", "image"],

    function ($, Backbone, Mustache, template, AnimationScheduler, image) {

        var PrepareResultView = Backbone.View.extend({
            // The DOM Element associated with this view
            el: "#stage",
            initialize: function (options) {
                this.waitingTime = 5;
                this.isTimeUp = false;
                this.isPrepareFinished = false;

                this.userResult = options.userResult;

                this.prepareImages();

                this.listenTo(this, "render", this.postRender);

                this.render();

            },
            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(Mustache.render(this.template));

                this.trigger("render");

                // Maintains chainability
                return this;

            },
            postRender: function () {
                var self = this;

                this.showAd();

                this.$el.find("#prepare-progress-bar").animate({
                    "width": "100%"
                }, this.waitingTime * 3000, "swing", function () {
                    self.isTimeUp = true;
                    self.onPrepareFinish();
                });
            },
            prepareImages: function () {
                var firstResultImg = "image!/app/img/" + this.userResult.get("resultImageUrl");
                var self = this;
                require([firstResultImg], function (first) {
                    self.isPrepareFinished = true;
                    self.onPrepareFinish();
                });

            },
            onPrepareFinish: function () {
                if (this.isPrepareFinished && this.isTimeUp) {
                    this.trigger("prepareFinish");
                }
            },
            showAd: function () {
                var self = this;
                var placeHolder = this.$el.find("#prepare-ad");
                var tanx_s = document.createElement('script');
                tanx_s.src = 'http://ads1.qadabra.com/t?id=a02b6e08-e724-4844-af55-41aafb13965e&size=300x250';
                tanx_s.type = 'text/javascript';

                if (!document._write) document._write = document.write;
                document.write = function (str) {
                    if (str.indexOf("SCRIPT") >= 0) {
                        var matches = str.match(/SRC=".+"/);
                        for (var index = 0; index < matches.length; index++) {
                            var src = matches[index].replace("SRC=\"", "").replace("\"", "");
                            tanx_s.src = src;
                            tanx_s.type = 'text/javascript';
                            placeHolder.append(tanx_s);
                        }
                    }
                    else {
                        placeHolder.append(str)
                    }
                };
                placeHolder.append(tanx_s);
                //    tanx_h = document.getElementsByTagName("head")[0];
                //    if (tanx_h)
                //        tanx_h.insertBefore(tanx_s, tanx_h.firstChild);
            }
        });

        return PrepareResultView;
    }
);