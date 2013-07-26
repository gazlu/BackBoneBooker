App.rooms = new App.Collections.Rooms;
App.rooms.fetch().then(function () {
    new App.Views.App({ collection: App.rooms });
});

App.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'rooms': 'rooms',
        'calendar': 'calendar'
    },

    index: function () {
        //console.log('the index page');
    },

    rooms: function () {
        //Load Room Main View
        var _manageRoomsView = new App.Views.ManageRoom({ collection: App.rooms });

        //Remove Page Contens
        $('#appContents').html('');

        //Append Manage Rooms view to Page
        $('#appContents').append(_manageRoomsView.render().el);

        //Creaye Room List Instance
        var _roomListView = new App.Views.RoomList({ collection: App.rooms });
        $('#appContents').append(_roomListView.render().el).show();
    },

    calendar: function () {
        App.bookings = new App.Collections.Bookings;
        App.bookings.fetch().then(function () {
            new App.Views.Bookings({ collection: App.bookings });
        });

        var _calendarView = new App.Views.CalendarView({ collection: App.bookings });
        $('#appContents').html(_calendarView.render().el);
        window.App.Helpers.showCalendar(App.bookings);
        $('.datetime').datetimepicker({
            format: 'MM/dd/yyyy hh:mm:ss'
        });
    }
});