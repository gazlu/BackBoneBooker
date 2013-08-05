App.rooms = new App.Collections.Rooms;
App.rooms.fetch().then(function () {
    new App.Views.App({ collection: App.rooms });
});

App.bookings = new App.Collections.Bookings;
App.bookings.fetch().then(function () {
    new App.Views.Bookings({ collection: App.bookings });
});

App.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        '#': 'index',
        'rooms': 'rooms',
        'calendar': 'calendar',
        'today': 'today',
        'week': 'week',
        'month': 'month',
        'own': 'own',
        'roombooking': 'roombooking'
    },

    index: function () {
        //console.log('the index page');
        $('#overview').slideDown();
        $('#appContents').html('');
    },

    rooms: function () {
        $('#overview').slideUp();
        window.document.title = 'booK mY rooM - managE roomS';
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
        $('#overview').slideUp();
        window.document.title = 'booK mY rooM - vieW/managE bookingS';
        var _calendarView = new App.Views.CalendarView({ rooms: App.rooms, collection: App.bookings});
        $('#appContents').html(_calendarView.render().el);
        var _roomOption = new App.Views.RoomOptionsView().render();
        window.App.Helpers.showCalendar(App.bookings, _roomOption);
        $('.helpButton').popover();
    }
});