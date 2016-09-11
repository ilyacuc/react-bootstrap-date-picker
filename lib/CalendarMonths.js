'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarMonths = _react2.default.createClass({
	displayName: 'CalendarMonths',

	propTypes: {
		selectedDate: _react2.default.PropTypes.object,
		displayDate: _react2.default.PropTypes.object.isRequired,
		onChange: _react2.default.PropTypes.func.isRequired,
		monthLabels: _react2.default.PropTypes.array.isRequired
	},
	handleClick: function handleClick(month) {
		var newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setMonth(month);
		this.props.onChange(newDisplayDate, 'days');
	},
	render: function render() {
		var selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
		var selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
		var year = this.props.displayDate.getFullYear();
		var month = 0;

		var rows = [];
		for (var i = 0; i < 4; i++) {
			var row = [];
			for (var j = 0; j < 3; j++) {
				var selected = selectedMonth == month && selectedYear == year;
				var current = false;
				row.push(_react2.default.createElement(
					'td',
					{
						key: j,
						onClick: this.handleClick.bind(this, month),
						className: "dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "")
					},
					this.props.monthLabels[month].length > 4 ? this.props.monthLabels[month].substr(0, 3) + '.' : this.props.monthLabels[month]
				));
				month++;
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

exports.default = CalendarMonths;
module.exports = exports['default'];