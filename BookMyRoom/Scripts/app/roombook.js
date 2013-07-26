(function () {
    window.App = {
        Models: {},
        Views: {},
        Collections: {},
        Router: {},
        Helpers: {}
    };

    window.vent = _.extend({}, Backbone.Events);

    window.template = function (id) {
        return _.template($('#' + id).html().trim());
    };

    $('ul.nav > li > a').click(function () {
        window.location.hash = $(this).data('hash');
    });
})();