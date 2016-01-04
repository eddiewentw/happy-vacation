var eventArray;
var hourArray;
var targetEvent;

$(document).ready( function(){

	// Initialize FullCalendar
	var $calendar = $('#calendar');
	$calendar.fullCalendar({
		allDayDefault: true,
		eventClick: function( thisEvent, jsEvent, view ) {
			targetEvent = thisEvent;
		},
		eventAfterAllRender: function(event) {
			$.each( $('.tenDays'), function(){
				$(this).children('.fc-content').append('<div class="arrow minus" data-move="minus"></div><div class="arrow plus" data-move="plus"></div><div class="event-background"></div>');
			});
		}
	});

	// Arrows in Calendar
	$calendar.on( 'click', '.arrow', function(e){
		e.stopPropagation();
		var eventOrdering = parseInt( targetEvent.className[1].substring(6,7) )+1;

		var move = $(this).attr('data-move');

		// Check minus or plus too much
		var actionPermission = "OK";
		var preDate = eventArray[eventOrdering].start;
		if( move == "minus" ) {
			// Prevent more then ten days
			// Should not be before this date
			var limitDate = moment(eventArray[eventOrdering-1].start).add( -10, 'days' );

			preDate = moment(preDate).add( preDate.day() == 1 ? -3 : -1, 'days' );
			if( preDate.isBefore(limitDate) ) {
				actionPermission = "NOT ALLOWED";
				showDialog('left');
			}
		} else {
			// Prevent conflicts
			preDate = moment(preDate).add( 1, 'days' );
			preDate.fixWeekend();
			if( preDate.isSame(eventArray[eventOrdering-1].start) ) {
				actionPermission = "NOT ALLOWED";
				showDialog('right');
			}
		}

		if( actionPermission == "OK" ) {
			for( i = eventOrdering; i < 9+1; i++ ) {

				var updatedDate = eventArray[i].start;
				if( i == eventOrdering ) {
					// From Mon. to Fri.
					var dayToMove = 1;
					if( move == "minus" ) {
						dayToMove = updatedDate.day() == 1 ? -3 : -1;
					}
					// Event be moved
					updatedDate = moment(updatedDate).add( dayToMove, 'days' );
				} else {
					// after that event
					updatedDate = moment(eventArray[i-1].start).add( -10, 'days' );
				}
				updatedDate.fixWeekend();

				eventArray[i].start = updatedDate;

			}
			$calendar.fullCalendar( 'removeEvents' );
			$calendar.fullCalendar( 'addEventSource', eventArray );

			// Reset hourArray
			hourArray = [];
			for( i = 0; i < eventArray.length-1; i++ ) {
				var eventHead = eventArray[i].start;
				var eventTail = eventArray[i+1].start;

				for( j = 1; j < eventHead.diff(eventTail, 'days'); j++ ) {
					var newStart = moment(eventHead).add( j*(-1), 'days' );
					var newEvent = {
						title: newStart.day() == 0 || newStart.day() == 6 ? "0hr＊＊＊＊＊＊" : "8hr",
						start: newStart,
						className: "hourDay"
					}
					hourArray.push(newEvent);
				}
			}
			$calendar.fullCalendar( 'addEventSource', hourArray );

		}
	}); // Arrows in Calendar -----

	$('#calendar').on( 'click', '.fc-event', function(){

		var neededHours = 0;

		// How many back-to-work events
		for( i = 1; i < eventArray.length; i++ ) {
			if( targetEvent.start.isSameOrBefore( eventArray[i].start, 'day' ) ) {
				neededHours += 4; // Or not plus (all-day work)
			} else {
				break;
			}
		}

		for( i = 0; i < hourArray.length; i++ ) {
			if( targetEvent.start.isSameOrBefore( hourArray[i].start, 'day' ) ) {
				if( hourArray[i].title == "8hr" ) {
					neededHours += 8;
				}
			} else {
				break;
			}
		}

	});

	// Initialize Pikaday
	var picker = new Pikaday({
		field: $('#datepicker')[0],
		format: 'YYYY-MM-DD'
	});

	$('.options').on( 'click', function(){
		$('.options').removeClass('valuable');
		$('.wave').removeClass('show');
		$(this).addClass('valuable');
		$(this).find('.wave').addClass('show');

		$('.day-value').text( $(this).attr('data-day') == "all-day" ? "整天" : "半天" );
	});

	$('.ok').on( 'click', function(){

		if( $('#datepicker').val() == "" ) {
			alert("好歹跟我說哪天退伍吧~");
		} else {

			// Get this from user
			var finalDay = moment( $('#datepicker').val() );
			eventArray = [
				{
					title: "退伍日",
					start: finalDay,
					className: 'retireDate'
				}
			];

			var lastEvent = finalDay;
			hourArray = [];
			for( i = 0; i < 9; i++ ) {

				// * Stort lastEvent first.
				var hourStart = moment(lastEvent);

				lastEvent = moment(lastEvent).add( -10, 'days' );
				var fixedDays = lastEvent.fixWeekend();

				//////
				// * Add hourDay event between each goBackEvents
				for( j = 0; j < 9-fixedDays; j++ ) {

					hourStart = moment(hourStart).add( -1, 'days' );
					var hourEvent = {
						title: hourStart.day() == 0 || hourStart.day() == 6 ? "0hr＊＊＊＊＊＊" : "8hr",
						start: hourStart,
						className: 'hourDay'
					};

					hourArray.push( hourEvent );

				}
				//////

				var newEvent = {
					title: "*該上勤了吧",
					start: lastEvent,
					className: 'tenDays event-'+i
				};
				eventArray.push(newEvent);

			};
			$calendar.fullCalendar( 'removeEvents' );
			$calendar.fullCalendar( 'addEventSource', eventArray );
			$calendar.fullCalendar( 'addEventSource', hourArray );

			$calendar.fullCalendar( 'gotoDate', finalDay );

			$('.overlay').fadeOut(300);

		}

	});

	// Trigger calendar to next/prev month
	$('.month-btn').on( 'click', function(){
		$calendar.fullCalendar( $(this).hasClass('prev') ? 'prev' : 'next' );
	});

	$('.setting-btn').on( 'click', function(){
		$('.overlay').fadeIn(500);
	});

});

function showDialog( action ) {
	$('.alert').addClass('show ' + action);
	$('.dialog').addClass('bounceIn');

	$('.dialog .fine').on( 'click', function(){
		$('.alert').removeClass('show left right');
		$('.dialog').removeClass('bounceIn');
		$(this).off('click');
	});
}

moment.fn.fixWeekend = function() {
	// lastEvent.day()
	// 0 -> Sun. // 6 -> Sat.
	var fixedDays = 0;

	if( this.day() == 0 ) {
		fixedDays = 1;
	} else if ( this.day() == 6 ) {
		fixedDays = 2;
	}

	this.add( fixedDays, 'days' );
	return fixedDays;

}

