//Manage Rooms View
App.Views.ManageRoom = Backbone.View.extend({
    el: template('manageRoomsTemplate'),

    initialize: function () {
    },

    events: {
        'submit': 'ManageRoom'
    },

    render: function () {
        return this;
    },

    ManageRoom: function (e) {
        e.preventDefault();
        var _validationResult = subCommonForm(0, 'main');
        if (_validationResult) {
            var _room = $('form#manageRooms').serializeObject();
            if (_room.Id == 0) {
                this.collection.create(_room, { wait: true });
            } else {
                var _editingRoomModel = this.collection.where({ "Id": parseInt(_room.Id) })[0];
                _editingRoomModel.set('Number', _room.Number);
                _editingRoomModel.set('Name', _room.Name);
                _editingRoomModel.set('Capacity', _room.Capacity);
                _editingRoomModel.set('Projector', _room.Projector);
                _editingRoomModel.set('Board', _room.Board);

                $.ajax({
                    url: 'api/room/' + _room.Id,
                    type: 'PUT',
                    data: _room
                }).success($('#manageRooms input#Id').val(0)).fail();
            }
        }
    }
});

//RoomList
App.Views.RoomList = Backbone.View.extend({
    template: template('roomsListTemplate'),

    render: function () {
        this.$el.html(this.template());
        var _roomRows = new App.Views.RoomRows({ collection: this.collection });
        $(this.$el).find('#allRooms').append(_roomRows.render().el).show();
        return this;
    }
});

//All Rooms View
App.Views.RoomRows = Backbone.View.extend({
    tagName: 'tbody',

    initialize: function () {
        this.collection.on('sync', this.addRoomRow, this);
    },

    render: function () {
        this.collection.each(this.addRoomRow, this);
        return this;
    },

    addRoomRow: function (room) {
        var _roomView = new App.Views.Room({ model: room });
        this.$el.append(_roomView.render().el);
    }
});

//Single Room View
App.Views.Room = Backbone.View.extend({
    tagName: 'tr',
    template: template('roomRowTemplate'),

    initialize: function () {
        this.model.on('destroy', this.unrender, this);
        this.model.on('change', this.render, this);
    },

    events: {
        'click a.delete': 'deleteRoom',
        'click a.edit': 'editRoom',
    },

    deleteRoom: function () {
        this.model.destroy();
        $.ajax({
            url: 'api/room/' + this.model.get('Id'),
            type: 'DELETE'
        }).success().fail();
    },

    editRoom: function () {
        vent.trigger('room:edit', this.model);
    },

    render: function () {
        this.$el.html(this.template({ room: this.model }));
        return this;
    },

    unrender: function () {
        this.remove();
    }
});