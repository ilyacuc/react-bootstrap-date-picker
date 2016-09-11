import React from 'react';
import ReactDOM from 'react-dom';

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const CalendarDays = React.createClass({
	propTypes: {
		selectedDate: React.PropTypes.object,
		displayDate: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		dayLabels: React.PropTypes.array.isRequired
	},
	handleClick(day) {
		const newSelectedDate = new Date(this.props.displayDate);
		newSelectedDate.setHours(12);
		newSelectedDate.setMinutes(0);
		newSelectedDate.setSeconds(0);
		newSelectedDate.setMilliseconds(0);
		newSelectedDate.setDate(day);
		this.props.onChange(newSelectedDate);
	},
	render() {
		const currentDate = new Date();
		const currentDay = currentDate.getDate();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();
		const selectedDay = this.props.selectedDate ? this.props.selectedDate.getDate() : null;
		const selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
		const selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
		const year = this.props.displayDate.getFullYear();
		const month = this.props.displayDate.getMonth();
		const firstDay = new Date(year, month, 1);
		let startingDay = firstDay.getDay() - 1;
		if(startingDay === -1) startingDay = 6;
		let monthLength = daysInMonth[month];
		if(month == 1) {
			if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
				monthLength = 29;
			}
		}
		const weeks = [];
		let day = 1;
		for(let i = 0; i < 9; i++) {
			let week = [];
			for(let j = 0; j <= 6; j++) {
				if(day <= monthLength && (i > 0 || j >= startingDay)) {
					const selected = day === selectedDay && month == selectedMonth && year === selectedYear;
					const current = day === currentDay && month == currentMonth && year === currentYear;
					week.push(
						<td key={j} onClick={this.handleClick.bind(this, day)} className={"dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "")}>{day}</td>);
					day++;
				}
				else {
					week.push(<td key={j}/>);
				}
			}
			weeks.push(<tr key={i}>{week}</tr>);
			if(day > monthLength) {
				break;
			}
		}
		return <table className="text-center dp-calendar">
			<thead>
			<tr>
				{this.props.dayLabels.map((label, index)=> {
					return <td key={index} className="text-muted">
						<small>{label}</small>
					</td>
				})}
			</tr>
			</thead>
			<tbody>
			{weeks}
			</tbody>
		</table>;
	}
});

export default CalendarDays;