import React from 'react';

const CalendarHeader = React.createClass({
	propTypes: {
		displayDate: React.PropTypes.object.isRequired,
		onChange: React.PropTypes.func.isRequired,
		setView: React.PropTypes.func.isRequired,
		monthLabels: React.PropTypes.array.isRequired,
		view: React.PropTypes.string.isRequired
	},
	handleClickPrevious(){
		const newDisplayDate = new Date(this.props.displayDate);
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
	handleClickNext(){
		const newDisplayDate = new Date(this.props.displayDate);
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

	handleChangeView() {
		let newView='days';
		switch (this.props.view) {
			case 'days':
				newView='months';
				break;
			case 'months':
				newView='years';
				break;
			case 'years':
				newView='months';
				break;
		}
		this.props.setView(newView);
	},

	render() {
		return (
			<table className="text-center dp-header">
				<tbody>
					<tr>
						<td style={{width:'30px'}}><div  style={{width:'30px'}} className="text-muted  dp-header--nav-button" onClick={this.handleClickPrevious}>«</div></td>
						<td>{this.props.view!='years'?<div className="dp-header--nav-button" onClick={this.handleChangeView}>{this.props.view=='days'?this.props.monthLabels[this.props.displayDate.getMonth()]:null} {this.props.displayDate.getFullYear()}</div>:null}</td>
						<td style={{width:'30px'}}><div  style={{width:'30px'}} className="text-muted  dp-header--nav-button" onClick={this.handleClickNext}>»</div></td>
					</tr>
				</tbody>
			</table>
		);
	}
});

export default CalendarHeader;