import React from 'react';

const CalendarYears = React.createClass({
	propTypes: {
		selectedDate: React.PropTypes.object,
		displayDate: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		monthLabels: React.PropTypes.array.isRequired
	},
	handleClick(year) {
		const newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setFullYear(year);
		this.props.onChange(newDisplayDate, 'months');
	},
	render() {
		const displayYear = this.props.displayDate.getFullYear();
		let year = displayYear-7;

		let rows=[];
		for(let i = 0; i < 4; i++) {
			let row = [];
			for(let j = 0; j < 3; j++) {
				let selected=year==displayYear;
				let current=false;
				row.push(
					<td
						key={j}
						onClick={this.handleClick.bind(this, year)}
						className={"dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "")}
					>
						{year}
					</td>
				);
				year++;
			}
			rows.push(<tr key={i}>{row}</tr>);
		}
		return <table className="text-center dp-calendar">
			<tbody>
			{rows}
			</tbody>
		</table>;
	}
});

export default CalendarYears;