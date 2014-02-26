// Break out the application running from the configuration definition to
// assist with testing.
require(["config"], function () {
    // Kick off the application.
    require(["app", "router"], function (app, Router) {
        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        app.router = new Router();

        Backbone.history.start({ pushState: false, root: app.root });

    });
});
