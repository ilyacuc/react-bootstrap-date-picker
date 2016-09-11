"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var CalendarDays = _react2.default.createClass({
	displayName: "CalendarDays",

	propTypes: {
		selectedDate: _react2.default.PropTypes.object,
		displayDate: _react2.default.PropTypes.object.isRequired,
		onChange: _react2.default.PropTypes.func.isRequired,
		dayLabels: _react2.default.PropTypes.array.isRequired
	},
	handleClick: function handleClick(day) {
		var newSelectedDate = new Date(this.props.displayDate);
		newSelectedDate.setHours(12);
		newSelectedDate.setMinutes(0);
		newSelectedDate.setSeconds(0);
		newSelectedDate.setMilliseconds(0);
		newSelectedDate.setDate(day);
		this.props.onChange(newSelectedDate);
	},
	render: function render() {
		var currentDate = new Date();
		var currentDay = currentDate.getDate();
		var currentMonth = currentDate.getMonth();
		var currentYear = currentDate.getFullYear();
		var selectedDay = this.props.selectedDate ? this.props.selectedDate.getDate() : null;
		var selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
		var selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
		var year = this.props.displayDate.getFullYear();
		var month = this.props.displayDate.getMonth();
		var firstDay = new Date(year, month, 1);
		var startingDay = firstDay.getDay() - 1;
		if (startingDay === -1) startingDay = 6;
		var monthLength = daysInMonth[month];
		if (month == 1) {
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				monthLength = 29;
			}
		}
		var weeks = [];
		var day = 1;
		for (var i = 0; i < 9; i++) {
			var week = [];
			for (var j = 0; j <= 6; j++) {
				if (day <= monthLength && (i > 0 || j >= startingDay)) {
					var selected = day === selectedDay && month == selectedMonth && year === selectedYear;
					var current = day === currentDay && month == currentMonth && year === currentYear;
					week.push(_react2.default.createElement(
						"td",
						{ key: j, onClick: this.handleClick.bind(this, day), className: "dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "") },
						day
					));
					day++;
				} else {
					week.push(_react2.default.createElement("td", { key: j }));
				}
			}
			weeks.push(_react2.default.createElement(
				"tr",
				{ key: i },
				week
			));
			if (day > monthLength) {
				break;
			}
		}
		return _react2.default.createElement(
			"table",
			{ className: "text-center dp-calendar" },
			_react2.default.createElement(
				"thead",
				null,
				_react2.default.createElement(
					"tr",
					null,
					this.props.dayLabels.map(function (label, index) {
						return _react2.default.createElement(
							"td",
							{ key: index, className: "text-muted" },
							_react2.default.createElement(
								"small",
								null,
								label
							)
						);
					})
				)
			),
			_react2.default.createElement(
				"tbody",
				null,
				weeks
			)
		);
	}
});

exports.default = CalendarDays;
module.exports = exports['default'];