App.Collections.Rooms = Backbone.Collection.extend({
    model: App.Models.Room,
    url: '/api/room'
});

App.Collections.Bookings = Backbone.Collection.extend({
    model: App.Models.Booking,
    url: '/api/booking'
});