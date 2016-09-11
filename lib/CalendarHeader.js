'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CalendarHeader = _react2.default.createClass({
	displayName: 'CalendarHeader',

	propTypes: {
		displayDate: _react2.default.PropTypes.object.isRequired,
		onChange: _react2.default.PropTypes.func.isRequired,
		setView: _react2.default.PropTypes.func.isRequired,
		monthLabels: _react2.default.PropTypes.array.isRequired,
		view: _react2.default.PropTypes.string.isRequired
	},
	handleClickPrevious: function handleClickPrevious() {
		var newDisplayDate = new Date(this.props.displayDate);
		switch (this.props.view) {
			case 'days':
				newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
				break;
			case 'months':
				newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
				break;
			case 'years':
				newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 12);
				break;
		}
		this.props.onChange(newDisplayDate);
	},
	handleClickNext: function handleClickNext() {
		var newDisplayDate = new Date(this.props.displayDate);
		switch (this.props.view) {
			case 'days':
				newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
				break;
			case 'months':
				newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
				break;
			case 'years':
				newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 12);
				break;
		}
		this.props.onChange(newDisplayDate);
	},
	handleChangeView: function handleChangeView() {
		var newView = 'days';
		switch (this.props.view) {
			case 'days':
				newView = 'months';
				break;
			case 'months':
				newView = 'years';
				break;
			case 'years':
				newView = 'months';
				break;
		}
		this.props.setView(newView);
	},
	render: function render() {
		return _react2.default.createElement(
			'table',
			{ className: 'text-center dp-header' },
			_react2.default.createElement(
				'tbody',
				null,
				_react2.default.createElement(
					'tr',
					null,
					_react2.default.createElement(
						'td',
						{ style: { width: '30px' } },
						_react2.default.createElement(
							'div',
							{ style: { width: '30px' }, className: 'text-muted  dp-header--nav-button', onClick: this.handleClickPrevious },
							'«'
						)
					),
					_react2.default.createElement(
						'td',
						null,
						this.props.view != 'years' ? _react2.default.createElement(
							'div',
							{ className: 'dp-header--nav-button', onClick: this.handleChangeView },
							this.props.view == 'days' ? this.props.monthLabels[this.props.displayDate.getMonth()] : null,
							' ',
							this.props.displayDate.getFullYear()
						) : null
					),
					_react2.default.createElement(
						'td',
						{ style: { width: '30px' } },
						_react2.default.createElement(
							'div',
							{ style: { width: '30px' }, className: 'text-muted  dp-header--nav-button', onClick: this.handleClickNext },
							'»'
						)
					)
				)
			)
		);
	}
});

exports.default = CalendarHeader;
module.exports = exports['default'];