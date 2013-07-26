//Global App View
App.Views.App = Backbone.View.extend({
    el: '#top',
    initialize: function () {
        //Events
        vent.on('room:edit', this.editRoom, this);
    },

    editRoom: function (room) {
        var _room = room.toJSON();
        $('#manageRooms input#Id').val(_room.Id);
        $('#manageRooms input#Number').val(_room.Number);
        $('#manageRooms input#Name').val(_room.Name);
        $('#manageRooms input#Capacity').val(_room.Capacity);
        $('#manageRooms input#Projector').attr("checked", _room.Projector);
        $('#manageRooms input#Board').attr("checked", _room.Board);
    }
});