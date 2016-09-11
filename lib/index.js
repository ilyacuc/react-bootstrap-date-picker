'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Overlay = require('react-bootstrap/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _CalendarHeader = require('./CalendarHeader');

var _CalendarHeader2 = _interopRequireDefault(_CalendarHeader);

var _CalendarDays = require('./CalendarDays');

var _CalendarDays2 = _interopRequireDefault(_CalendarDays);

var _CalendarMonths = require('./CalendarMonths');

var _CalendarMonths2 = _interopRequireDefault(_CalendarMonths);

var _CalendarYears = require('./CalendarYears');

var _CalendarYears2 = _interopRequireDefault(_CalendarYears);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.
require('../src/style.scss');

exports.default = _react2.default.createClass({
	displayName: 'src',

	propTypes: {
		value: _react2.default.PropTypes.string,
		placeholder: _react2.default.PropTypes.string,
		dayLabels: _react2.default.PropTypes.array,
		monthLabels: _react2.default.PropTypes.array,
		onChange: _react2.default.PropTypes.func,
		onClear: _react2.default.PropTypes.func,
		calendarPlacement: _react2.default.PropTypes.string,
		dateFormat: _react2.default.PropTypes.string, // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
		showClearButton: _react2.default.PropTypes.bool,
		className: _react2.default.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		var language = typeof window !== "undefined" && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
		return {
			dayLabels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			monthLabels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			calendarPlacement: "bottom",
			dateFormat: 'DD.MM.YYYY',
			showClearButton: true,
			className: ''

		};
	},
	getInitialState: function getInitialState() {
		var state = this.makeDateValues(this.props.value);
		state.focused = false;
		state.inputFocused = false;
		state.placeholder = this.props.placeholder || this.props.dateFormat;
		state.separator = this.props.dateFormat.match(/[^A-Z]/)[0];
		state.view = 'days';
		return state;
	},
	makeDateValues: function makeDateValues(isoString) {
		var displayDate = void 0;
		var selectedDate = isoString ? new Date(isoString) : null;
		var inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
		if (selectedDate) {
			displayDate = new Date(selectedDate);
		} else {
			displayDate = new Date();
			displayDate.setHours(12);
			displayDate.setMinutes(0);
			displayDate.setSeconds(0);
			displayDate.setMilliseconds(0);
		}
		return {
			value: selectedDate ? selectedDate.toISOString() : null,
			displayDate: displayDate,
			selectedDate: selectedDate,
			inputValue: inputValue
		};
	},
	clear: function clear() {
		if (this.props.onClear) {
			this.props.onClear();
		} else {
			var newState = this.makeDateValues(null);
			newState.view = 'days';
			this.setState(newState);
		}

		if (this.props.onChange) {
			this.props.onChange(null);
		}
	},
	handleHide: function handleHide(e) {
		if (this.state.inputFocused) {
			return;
		}
		this.setState({
			focused: false
		});
		if (this.props.onBlur) {
			this.props.onBlur(e);
		}
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.which === 9 && this.state.inputFocused) {
			this.setState({
				focused: false
			});
			if (this.props.onBlur) {
				this.props.onBlur(e);
			}
		}
	},
	handleFocus: function handleFocus(e) {
		if (this.state.focused === true) {
			return;
		}
		this.setState({
			inputFocused: true,
			focused: true
		});
		if (this.props.onFocus) {
			this.props.onFocus(e);
		}
	},
	handleBlur: function handleBlur(e) {
		this.setState({
			inputFocused: false
		});
	},

	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return !(this.state.inputFocused === true && nextState.inputFocused === false);
	},
	getValue: function getValue() {
		return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
	},
	makeInputValueString: function makeInputValueString(date) {
		var month = date.getMonth() + 1;
		var day = date.getDate();

		//this method is executed during intialState setup... handle a missing state properly
		var separator = this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0];
		if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
			return (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day) + separator + date.getFullYear();
		} else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
			return (day > 9 ? day : "0" + day) + separator + (month > 9 ? month : "0" + month) + separator + date.getFullYear();
		} else {
			return date.getFullYear() + separator + (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day);
		}
	},
	handleBadInput: function handleBadInput(originalValue) {
		var parts = originalValue.replace(new RegExp('[^0-9' + this.state.separator + ']'), '').split(this.state.separator);
		if (this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if (parts[0] && parts[0].length > 2) {
				parts[1] = parts[0].slice(2) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 2);
			}
			if (parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if (parts[2]) {
				parts[2] = parts[2].slice(0, 4);
			}
		} else {
			if (parts[0] && parts[0].length > 4) {
				parts[1] = parts[0].slice(4) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 4);
			}
			if (parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if (parts[2]) {
				parts[2] = parts[2].slice(0, 2);
			}
		}
		this.setState({
			inputValue: parts.join(this.state.separator)
		});
	},
	handleInputChange: function handleInputChange(e) {
		var originalValue = _reactDom2.default.findDOMNode(this.refs.input).value;
		if (!originalValue) this.clear();
		var inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator);
		var month = void 0,
		    day = void 0,
		    year = void 0;
		if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if (!inputValue.match(/[0-1][0-9]\.[0-3][0-9]\.[1-2][0-9][0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}
			day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
			month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
			year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
		} else if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
			if (!inputValue.match(/[0-1][0-9]\.[0-3][0-9]\.[1-2][0-9][0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}
			month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
			day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
			year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
		} else {
			if (!inputValue.match(/[1-2][0-9][0-9][0-9]\.[0-3][0-9]\.[0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}
			year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
			month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
			day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
		}
		var monthInteger = parseInt(month, 10);
		var dayInteger = parseInt(day, 10);
		var yearInteger = parseInt(year, 10);

		if (monthInteger > 12 || dayInteger > 31) {
			return this.handleBadInput(originalValue);
		}
		if (!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
			var selectedDate = new Date();
			selectedDate.setHours(12);
			selectedDate.setMinutes(0);
			selectedDate.setSeconds(0);
			selectedDate.setMilliseconds(0);
			selectedDate.setYear(yearInteger);
			selectedDate.setMonth(monthInteger - 1);
			selectedDate.setDate(dayInteger);
			this.setState({
				selectedDate: selectedDate,
				displayDate: selectedDate,
				value: selectedDate.toISOString()
			});
			if (this.props.onChange) {
				this.props.onChange(selectedDate.toISOString());
			}
		}
		if (this.props.dateFormat.match(/MM.DD.YYYY/)) {
			inputValue = month + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + day + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
		} else if (this.props.dateFormat.match(/DD.MM.YYYY/)) {
			inputValue = day + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
		} else {
			inputValue = year + inputValue.slice(4, 5).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(7, 8).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '');
		}
		if (this.props.dateFormat.match(/YYYY.MM.DD/)) {
			if (this.state.inputValue && inputValue.length > this.state.inputValue.length) {
				if (inputValue.length == 4) {
					inputValue += this.state.separator;
				}
				if (inputValue.length == 7) {
					inputValue += this.state.separator;
				}
				inputValue = inputValue.slice(0, 10);
			}
		} else {
			if (this.state.inputValue && inputValue.length > this.state.inputValue.length) {
				if (inputValue.length == 2) {
					inputValue += this.state.separator;
				}
				if (inputValue.length == 5) {
					inputValue += this.state.separator;
				}
				inputValue = inputValue.slice(0, 10);
			}
		}
		this.setState({
			inputValue: inputValue
		});
	},
	onHeaderChange: function onHeaderChange(newDisplayDate, view) {
		var newState = {
			displayDate: newDisplayDate
		};
		if (view) newState.view = view;
		this.setState(newState);
	},
	setView: function setView(view) {
		this.setState({
			view: view
		});
	},
	onChangeDate: function onChangeDate(newSelectedDate) {
		this.setState({
			inputValue: this.makeInputValueString(newSelectedDate),
			selectedDate: newSelectedDate,
			displayDate: newSelectedDate,
			value: newSelectedDate.toISOString(),
			focused: false
		});
		if (this.props.onBlur) {
			this.props.onBlur(new Event("Change Date"));
		}
		if (this.props.onChange) {
			this.props.onChange(newSelectedDate.toISOString());
		}
	},
	componentWillReceiveProps: function componentWillReceiveProps(newProps) {
		var value = newProps.value;
		if (this.getValue() !== value) {
			this.setState(this.makeDateValues(value));
		}
	},
	render: function render() {
		var _this = this;

		var calendar = null;
		switch (this.state.view) {
			case 'days':
				calendar = _react2.default.createElement(_CalendarDays2.default, {
					selectedDate: this.state.selectedDate,
					displayDate: this.state.displayDate,
					onChange: this.onChangeDate,
					dayLabels: this.props.dayLabels
				});
				break;
			case 'months':
				calendar = _react2.default.createElement(_CalendarMonths2.default, {
					selectedDate: this.state.selectedDate,
					displayDate: this.state.displayDate,
					onChange: this.onHeaderChange,
					monthLabels: this.props.monthLabels
				});
				break;
			case 'years':
				calendar = _react2.default.createElement(_CalendarYears2.default, {
					selectedDate: this.state.selectedDate,
					displayDate: this.state.displayDate,
					onChange: this.onHeaderChange
				});
				break;
		}
		return _react2.default.createElement(
			'div',
			{ className: this.props.className, style: { position: 'relative' } },
			_react2.default.createElement(
				_Overlay2.default,
				{ rootClose: true, onHide: this.handleHide, show: this.state.focused, container: function container() {
						return _reactDom2.default.findDOMNode(_this.refs.overlayContainer);
					}, target: function target() {
						return _reactDom2.default.findDOMNode(_this.refs.input);
					}, placement: this.props.calendarPlacement, delayHide: 200 },
				_react2.default.createElement(
					_Popover2.default,
					{ id: 'calendar' },
					_react2.default.createElement(_CalendarHeader2.default, {
						displayDate: this.state.displayDate,
						onChange: this.onHeaderChange,
						setView: this.setView,
						monthLabels: this.props.monthLabels,
						dateFormat: this.props.dateFormat,
						view: this.state.view
					}),
					calendar,
					this.props.showClearButton ? _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ onClick: this.clear, className: 'dp-clear-button' },
							'Очистить'
						)
					) : null
				)
			),
			_react2.default.createElement('div', { ref: 'overlayContainer' }),
			_react2.default.createElement('input', { type: 'hidden', id: this.props.id, name: this.props.name, value: this.state.value || '' }),
			_react2.default.createElement(_FormControl2.default, {
				onKeyDown: this.handleKeyDown,
				value: this.state.inputValue || '',
				ref: 'input',
				type: 'text'
				//placeholder={this.state.focused ? this.props.dateFormat : this.state.placeholder}
				, onFocus: this.handleFocus,
				onBlur: this.handleBlur,
				onChange: this.handleInputChange
			})
		);
	}
});
module.exports = exports['default'];