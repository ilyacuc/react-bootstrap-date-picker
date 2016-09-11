import React from 'react';

const CalendarMonths = React.createClass({
	propTypes: {
		selectedDate: React.PropTypes.object,
		displayDate: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		monthLabels: React.PropTypes.array.isRequired
	},
	handleClick(month) {
		const newDisplayDate = new Date(this.props.displayDate);
		newDisplayDate.setMonth(month);
		this.props.onChange(newDisplayDate, 'days');
	},
	render() {
		const selectedMonth = this.props.selectedDate ? this.props.selectedDate.getMonth() : null;
		const selectedYear = this.props.selectedDate ? this.props.selectedDate.getFullYear() : null;
		const year = this.props.displayDate.getFullYear();
		let month = 0;

		let rows=[];
		for(let i = 0; i < 4; i++) {
			let row = [];
			for(let j = 0; j < 3; j++) {
				let selected=selectedMonth==month && selectedYear==year;
				let current=false;
				row.push(
					<td
						key={j}
						onClick={this.handleClick.bind(this, month)}
						className={"dp-calendar__day" + (selected ? " day--selected" : current ? " day-current" : "")}
					>
						{this.props.monthLabels[month].length>4?(this.props.monthLabels[month].substr(0,3)+'.'):this.props.monthLabels[month]}
					</td>
				);
				month++;
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

export default CalendarMonths;