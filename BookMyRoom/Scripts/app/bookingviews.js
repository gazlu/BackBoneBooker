//Global App View
App.Views.Bookings = Backbone.View.extend({
    initialize: function () {
        //console.log(this.collection.toJSON());
    }
});

App.Views.CalendarView = Backbone.View.extend({
    template: template('calendarView'),
    initialize: function () {
    },

    events: {
        'submit': 'ManageBooking'
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },

    ManageBooking: function(e) {
        e.preventDefault();
        var _validationResult = subCommonForm(0, 'main');
        if (_validationResult) {
            var _booking = $('form#manageBooking').serializeObject();
            _booking.StartTime = new XDate(_booking.StartDate).toString('HH:mm:ss');
            _booking.EndTime = new XDate(_booking.EndDate).toString('HH:mm:ss');
            _booking.BookedBy = _booker;
            if (_booking.Id == 0) {
                this.collection.create(_booking, { wait: true });
            } else {
            }
        } else {

        }
    }
});