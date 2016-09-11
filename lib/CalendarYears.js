'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarYears = _react2.default.createClass({
	displayName: 'CalendarYears',

	propTypes: {
		selectedDate: _react2.default.PropTypes.object,
		displayDate: _react2.default.PropTypes.object.isRequired,
		onChange: _react2.default.PropTypes.func.isRequired,
		monthLabels: _react2.default.PropTypes.array.isRequired
	},
	handleClick: function handleClick(year) {
		var newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setFullYear(year);
		this.props.onChange(newDisplayDate, 'months');
	},
	render: function render() {
		var displayYear = this.props.displayDate.getFullYear();
		var year = displayYear - 7;

		var rows = [];
		for (var i = 0; i < 4; i++) {
			var row = [];
			for (var j = 0; j < 3; j++) {
				var selected = year == displayYear;
				var current = false;
				row.push(_react2.default.createElement(
					'td',
					{
						key: j,
						onClick: this.handleClick.bind(this, year),
						className: "dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "")
					},
					year
				));
				year++;
			}
			rows.push(_react2.default.createElement(
				'tr',
				{ key: i },
				row
			));
		}
		return _react2.default.createElement(
			'table',
			{ className: 'text-center dp-calendar' },
			_react2.default.createElement(
				'tbody',
				null,
				rows
			)
		);
	}
});

exports.default = CalendarYears;
module.exports = exports['default'];