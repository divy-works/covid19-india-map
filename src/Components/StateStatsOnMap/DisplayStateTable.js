import React from 'react';
import './DisplayStateTable.css';

export class DisplayStateTable extends React.Component{

    render(){
        const display_status = this.props.selected_state?"block":"none";
        return(
            <table style={{display: display_status,
                           position:"absolute",
                           zIndex:1, 
                           left: this.props.pageX, top: this.props.pageY}}>
                <tr><th  colSpan={2}>{this.props.selected_state}</th></tr>
                <tr><td >Active</td>
                <td >{this.props.state_data['active_cases']?this.props.state_data['active_cases']:0}</td></tr>
                <tr><td >Recovered</td>
                <td >{this.props.state_data['recovered']?this.props.state_data['recovered']:0}</td></tr>
                <tr><td >Deaths</td>
                <td >{this.props.state_data['deaths']?this.props.state_data['deaths']:0}</td></tr>
            </table>
        )
    }
}

DisplayStateTable.defaultProps = {
    selected_state: '',
    state_data: {active_cases: '', recovered: '', deaths: ''},
}