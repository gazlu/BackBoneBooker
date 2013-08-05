window.App.Helpers.showCalendar = function (bookings, rooms) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var _startDateInput = $('input#StartDate');
    var _endDateInput = $('input#EndDate');
    var _modalDiv = $('#bookingModal');
    var _removeButton = $('button.removeEvent');
    var _roomSelect = $('select#RoomId');
    var _events = [];

    bookings.each(function (model) {
        var _booking = model.toJSON();
        _events.push({
            id: _booking.Id,
            title: _booking.Title,
            agenda: _booking.BookedFor,
            bookedBy: _booking.BookedBy,
            bookedOn: _booking.BookedOn,
            attendees: _booking.Attendees,
            reccursive: _booking.Reccursive,
            reccursiveType: _booking.ReccursiveType,
            start: _booking.StartDate.replace('00:00:00', _booking.StartTime.replace('.0000000', '')),
            end: _booking.EndDate.replace('00:00:00', _booking.EndTime.replace('.0000000', '')),
            allDay: false
        });
    });

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {
            console.log(rooms);
            _removeButton.hide();
            window.App.Helpers.ClearForm('manageBooking');
            _startDateInput.val(new XDate(start).toString('M/d/yy HH:mm:ss'));
            _endDateInput.val(new XDate(end).toString('M/d/yy HH:mm:ss'));
            _roomSelect.html(rooms);
            var title = _modalDiv.modal('show');
        },
        editable: true,
        events: _events,
        eventClick: function (calEvent, jsEvent, view) {
            window.App.Helpers.EditEvent(calEvent, rooms);
        },
        eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {
            window.App.Helpers.EditEvent(event, rooms);
        },
        eventMouseover: function (calEvent, jsEvent, view) {
            $(this).popover({
                animation: true,
                title: '<b>' + calEvent.title + '</b>',
                html: true,
                content: '<div class="row"><div class="span8">Starts On: <b>' + calEvent.start + '</b><br/>' +
                         'Ends On: <b>' + calEvent.end + '</b><div><div>' +
                         '<div class="row"><div class="span8">Booked By: <b>' + calEvent.bookedBy + '</b><br/>' +
                         'Booked On: <b>' + calEvent.bookedOn + '</b><div><div>' +
                         '<div class="row"><div class="span8">Attendees: <b>' + calEvent.attendees + '</b><br/>' +
                         'Reccursion: <b>' + calEvent.reccursiveType + '</b><div><div>',
                trigger: 'hover',
                placement: 'right'
            })
        }
    });
    return calendar;
};

window.App.Helpers.EditEvent = function (calEvent, roomOptions) {
    var _startDateInput = $('input#StartDate');
    var _endDateInput = $('input#EndDate');
    var _modalDiv = $('#bookingModal');
    var _removeButton = $('button.removeEvent');
    var _roomSelect = $('select#RoomId');

    var _booking = App.bookings.where({ Id: parseInt(calEvent.id) });
    _roomSelect.html(roomOptions);
    window.App.Helpers.InjectJSONToForm(_booking[0].toJSON(), 'manageBooking', function () {
        _modalDiv.modal('show');
        _removeButton.show();
        _startDateInput.val(new XDate(calEvent.start).toString('M/d/yy HH:mm:ss'));
        _endDateInput.val(new XDate(calEvent.end).toString('M/d/yy HH:mm:ss'));
    })
}

window.App.Helpers.ClearForm = function (formId) {
    $('#' + formId + ' :input').each(function () {
        var _elem = $(this);
        var _elemId = _elem.attr('id');
        $(this).val(_elemId == 'Id' ? '0' : '');
    });
};

window.App.Helpers.InjectJSONToForm = function (_jsonRow, _formId, callBack) {
    $.each(_jsonRow, function (key, value) {
        var _element = key;
        this.name = key;
        this.value = value;
        if ($('form#' + _formId + ' #' + _element).length > 0) {
            if ($('form#' + _formId + ' #' + _element)[0].type == "checkbox") {
                if (value)
                    $('form#manageBooking #' + _element)[0].checked = true;
            }
            $('form#' + _formId + ' #' + _element).each(function () {
                if (this.name.indexOf('Date') >= 0 || this.name.indexOf('date') >= 0 || this.name.indexOf('DOB') >= 0) {
                    this.value = new XDate(value).toString('M/d/yy HH:mm:ss');
                } else {
                    this.value = value;
                }
            });
        }
    });
    callBack(_jsonRow);
}