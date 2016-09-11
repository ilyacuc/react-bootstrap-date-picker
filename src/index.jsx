// See http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html for calendar logic.
require('../src/style.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import Popover from 'react-bootstrap/lib/Popover';
import Overlay from 'react-bootstrap/lib/Overlay'
import CalendarHeader from './CalendarHeader.jsx';
import CalendarDays from './CalendarDays.jsx';
import CalendarMonths from './CalendarMonths.jsx';
import CalendarYears from './CalendarYears.jsx';



export default React.createClass({
	propTypes: {
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		dayLabels: React.PropTypes.array,
		monthLabels: React.PropTypes.array,
		onChange: React.PropTypes.func,
		onClear: React.PropTypes.func,
		calendarPlacement: React.PropTypes.string,
		dateFormat: React.PropTypes.string,  // 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/MM/DD', 'DD-MM-YYYY'
		showClearButton: React.PropTypes.bool
	},
	getDefaultProps() {
		const language = typeof window !== "undefined" && window.navigator ? (window.navigator.userLanguage || window.navigator.language || '').toLowerCase() : '';
		return {
			dayLabels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			monthLabels: [
				'Январь', 'Февраль', 'Март', 'Апрель',
				'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
				'Октябрь', 'Ноябрь', 'Декабрь'
			],
			calendarPlacement: "bottom",
			dateFormat: 'DD.MM.YYYY',
			showClearButton: true

		}
	},
	getInitialState() {
		var state = this.makeDateValues(this.props.value);
		state.focused = false;
		state.inputFocused = false;
		state.placeholder = this.props.placeholder || this.props.dateFormat;
		state.separator = this.props.dateFormat.match(/[^A-Z]/)[0];
		state.view='days';
		return state;
	},
	makeDateValues(isoString) {
		let displayDate;
		const selectedDate = isoString ? new Date(isoString) : null;
		const inputValue = isoString ? this.makeInputValueString(selectedDate) : null;
		if(selectedDate) {
			displayDate = new Date(selectedDate);
		}
		else {
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
		}
	},

	clear() {
		if(this.props.onClear) {
			this.props.onClear();
		}
		else {
			let newState=this.makeDateValues(null);
			newState.view='days';
			this.setState(newState);
		}

		if(this.props.onChange) {
			this.props.onChange(null);
		}
	},
	handleHide(e){
		if(this.state.inputFocused) {
			return;
		}
		this.setState({
			focused: false
		});
		if(this.props.onBlur) {
			this.props.onBlur(e);
		}
	},
	handleKeyDown(e){
		if(e.which === 9 && this.state.inputFocused) {
			this.setState({
				focused: false
			});
			if(this.props.onBlur) {
				this.props.onBlur(e);
			}
		}
	},
	handleFocus(e){
		if(this.state.focused === true) {
			return;
		}
		this.setState({
			inputFocused: true,
			focused: true
		});
		if(this.props.onFocus) {
			this.props.onFocus(e);
		}
	},
	handleBlur(e){
		this.setState({
			inputFocused: false
		});
	},
	shouldComponentUpdate: function (nextProps, nextState) {
		return !(this.state.inputFocused === true && nextState.inputFocused === false);
	},
	getValue(){
		return this.state.selectedDate ? this.state.selectedDate.toISOString() : null;
	},
	makeInputValueString(date) {
		const month = date.getMonth() + 1;
		const day = date.getDate();

		//this method is executed during intialState setup... handle a missing state properly
		var separator = (this.state ? this.state.separator : this.props.dateFormat.match(/[^A-Z]/)[0]);
		if(this.props.dateFormat.match(/MM.DD.YYYY/)) {
			return (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day) + separator + date.getFullYear();
		}
		else
			if(this.props.dateFormat.match(/DD.MM.YYYY/)) {
				return (day > 9 ? day : "0" + day) + separator + (month > 9 ? month : "0" + month) + separator + date.getFullYear();
			}
			else {
				return date.getFullYear() + separator + (month > 9 ? month : "0" + month) + separator + (day > 9 ? day : "0" + day);
			}
	},
	handleBadInput(originalValue) {
		let parts = originalValue.replace(new RegExp(`[^0-9${this.state.separator}]`), '').split(this.state.separator);
		if(this.props.dateFormat.match(/MM.DD.YYYY/) || this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if(parts[0] && parts[0].length > 2) {
				parts[1] = parts[0].slice(2) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 2);
			}
			if(parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if(parts[2]) {
				parts[2] = parts[2].slice(0, 4);
			}
		}
		else {
			if(parts[0] && parts[0].length > 4) {
				parts[1] = parts[0].slice(4) + (parts[1] || '');
				parts[0] = parts[0].slice(0, 4);
			}
			if(parts[1] && parts[1].length > 2) {
				parts[2] = parts[1].slice(2) + (parts[2] || '');
				parts[1] = parts[1].slice(0, 2);
			}
			if(parts[2]) {
				parts[2] = parts[2].slice(0, 2);
			}
		}
		this.setState({
			inputValue: parts.join(this.state.separator)
		});
	},
	handleInputChange(e){
		const originalValue = ReactDOM.findDOMNode(this.refs.input).value;
		if(!originalValue) this.clear();
		let inputValue = originalValue.replace(/(-|\/\/)/g, this.state.separator);
		let month, day, year;
		if(this.props.dateFormat.match(/DD.MM.YYYY/)) {
			if(!inputValue.match(/[0-1][0-9]\.[0-3][0-9]\.[1-2][0-9][0-9][0-9]/)) {
				return this.handleBadInput(originalValue);
			}
			day = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
			month = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
			year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
		}
		else
			if(this.props.dateFormat.match(/MM.DD.YYYY/)) {
				if(!inputValue.match(/[0-1][0-9]\.[0-3][0-9]\.[1-2][0-9][0-9][0-9]/)) {
					return this.handleBadInput(originalValue);
				}
				month = inputValue.slice(0, 2).replace(/[^0-9]/g, '');
				day = inputValue.slice(3, 5).replace(/[^0-9]/g, '');
				year = inputValue.slice(6, 10).replace(/[^0-9]/g, '');
			}
			else {
				if(!inputValue.match(/[1-2][0-9][0-9][0-9]\.[0-3][0-9]\.[0-9][0-9]/)) {
					return this.handleBadInput(originalValue);
				}
				year = inputValue.slice(0, 4).replace(/[^0-9]/g, '');
				month = inputValue.slice(5, 7).replace(/[^0-9]/g, '');
				day = inputValue.slice(8, 10).replace(/[^0-9]/g, '');
			}
		const monthInteger = parseInt(month, 10);
		const dayInteger = parseInt(day, 10);
		const yearInteger = parseInt(year, 10);

		if(monthInteger > 12 || dayInteger > 31) {
			return this.handleBadInput(originalValue);
		}
		if(!isNaN(monthInteger) && !isNaN(dayInteger) && !isNaN(yearInteger) && monthInteger <= 12 && dayInteger <= 31 && yearInteger > 999) {
			const selectedDate = new Date();
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
			if(this.props.onChange) {
				this.props.onChange(selectedDate.toISOString());
			}
		}
		if(this.props.dateFormat.match(/MM.DD.YYYY/)) {
			inputValue = month + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + day + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
		}
		else
			if(this.props.dateFormat.match(/DD.MM.YYYY/)) {
				inputValue = day + inputValue.slice(2, 3).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(5, 6).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + year;
			}
			else {
				inputValue = year + inputValue.slice(4, 5).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '') + month + inputValue.slice(7, 8).replace(new RegExp('[^\\' + this.state.separator + ']', 'g'), '');
			}
		if(this.props.dateFormat.match(/YYYY.MM.DD/)) {
			if(this.state.inputValue && inputValue.length > this.state.inputValue.length) {
				if(inputValue.length == 4) {
					inputValue += this.state.separator;
				}
				if(inputValue.length == 7) {
					inputValue += this.state.separator;
				}
				inputValue = inputValue.slice(0, 10);
			}
		}
		else {
			if(this.state.inputValue && inputValue.length > this.state.inputValue.length) {
				if(inputValue.length == 2) {
					inputValue += this.state.separator;
				}
				if(inputValue.length == 5) {
					inputValue += this.state.separator;
				}
				inputValue = inputValue.slice(0, 10);
			}
		}
		this.setState({
			inputValue: inputValue
		});
	},
	onHeaderChange(newDisplayDate, view) {
		let newState={
			displayDate: newDisplayDate
		};
		if (view) newState.view=view;
		this.setState(newState);
	},
	setView(view) {
		this.setState({
			view: view
		});
	},
	onChangeDate(newSelectedDate) {
		this.setState({
			inputValue: this.makeInputValueString(newSelectedDate),
			selectedDate: newSelectedDate,
			displayDate: newSelectedDate,
			value: newSelectedDate.toISOString(),
			focused: false
		});
		if(this.props.onBlur) {
			this.props.onBlur(new Event("Change Date"));
		}
		if(this.props.onChange) {
			this.props.onChange(newSelectedDate.toISOString());
		}
	},
	componentWillReceiveProps(newProps) {
		const value = newProps.value;
		if(this.getValue() !== value) {
			this.setState(this.makeDateValues(value));
		}
	},
	render() {
		let calendar=null; console.log(this.state.view);
		switch (this.state.view) {
			case 'days':
				calendar=(
					<CalendarDays
						selectedDate={this.state.selectedDate}
						displayDate={this.state.displayDate}
						onChange={this.onChangeDate}
						dayLabels={this.props.dayLabels}
					/>
				);
				break;
			case 'months':
				calendar=(
					<CalendarMonths
						selectedDate={this.state.selectedDate}
						displayDate={this.state.displayDate}
						onChange={this.onHeaderChange}
						monthLabels={this.props.monthLabels}
					/>
				);
				break;
			case 'years':
				calendar=(
					<CalendarYears
						selectedDate={this.state.selectedDate}
						displayDate={this.state.displayDate}
						onChange={this.onHeaderChange}
					/>
				);
				break;
		}
		return (
			<div>
			<Overlay rootClose={true} onHide={this.handleHide} show={this.state.focused} container={() => ReactDOM.findDOMNode(this.refs.overlayContainer)} target={() => ReactDOM.findDOMNode(this.refs.input)} placement={this.props.calendarPlacement} delayHide={200}>
				<Popover id="calendar">
					<CalendarHeader
						displayDate={this.state.displayDate}
						onChange={this.onHeaderChange}
						setView={this.setView}
						monthLabels={this.props.monthLabels}
						dateFormat={this.props.dateFormat}
						view={this.state.view}
					/>
					{calendar}
					{this.props.showClearButton ?
						<div>
							<div onClick={this.clear} className="dp-clear-button">Очистить</div>
						</div> : null
					}
				</Popover>
			</Overlay>
			<div ref="overlayContainer"/>
			<input type="hidden" id={this.props.id} name={this.props.name} value={this.state.value || ''}/>
			<FormControl
				onKeyDown={this.handleKeyDown}
				value={this.state.inputValue || ''}
				ref="input"
				type="text"
				//placeholder={this.state.focused ? this.props.dateFormat : this.state.placeholder}
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onChange={this.handleInputChange}
			/>

		</div>
		);
	}
});