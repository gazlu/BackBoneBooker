//Global App View
App.Views.Bookings = Backbone.View.extend({
    initialize: function () {
        //console.log(this.collection.toJSON());
    }
});

App.Views.CalendarView = Backbone.View.extend({
    template: template('calendarView'),
    initialize: function () {
        this.collection.on('sync', this.refreshCalendar, this);
    },

    events: {
        'submit': 'ManageBooking',
        'click button.removeEvent': 'removeBooking'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    ManageBooking: function (e) {
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
    },

    removeBooking: function (e) {
        var _booking = App.bookings.where({ Id: parseInt($('form#manageBooking #Id').val()) })[0];
        _booking.destroy();
        $.ajax({
            url: 'api/booking/' + _booking.get('Id'),
            type: 'DELETE'
        }).success(this.refreshCalendar()).fail();
    },

    refreshCalendar: function () {
        var _calendarView = new App.Views.CalendarView({ collection: App.bookings });
        $('div.modal-backdrop').fadeOut();
        $('#appContents').html('').html(_calendarView.render().el);
        var _roomOption = new App.Views.RoomOptionsView().render();
        window.App.Helpers.showCalendar(App.bookings, _roomOption);
        $('.datetime').datetimepicker({
            format: 'MM/dd/yyyy hh:mm:ss'
        });
    }
});

App.Views.RoomOptionsView = Backbone.View.extend({
    el: 'optgroup',
    label: 'Rooms',
    template: template('roomOptionsView'),
    render: function () {
        return this.template({ rooms: App.rooms.toJSON() });
    },
})