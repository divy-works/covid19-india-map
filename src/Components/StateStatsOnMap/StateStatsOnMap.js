import React from 'react';
import {HandleMap} from './HandleMap.js';
import {DisplayStateTable} from './DisplayStateTable.js';
import {DisplayDistrictData} from './DisplayDistrictData.js';

export default class StateStatsOnMap extends React.Component {
  constructor(props){
    super(props);
    this.handleSelectedState = this.handleSelectedState.bind(this);
    this.state = {
      selected_state: '',
      state_data: {},
      pageX: '',
      pageY: ''
    }
  }

  async componentDidMount(){
    try{
        const data_url = "https://covid19-india-datasets.s3.ap-south-1.amazonaws.com/covid-india-states-data.json";
        const proxy_url = "https://cors-anywhere.herokuapp.com/";
        const data_response = await fetch(proxy_url + data_url);
        const data_response_json = await data_response.json();
        this.setState({state_data: data_response_json});
    }
    catch(error){
      console.log(error);
    }
}

  handleSelectedState(e, pageX, pageY){
    this.setState({selected_state: e, pageX: pageX, pageY: pageY});
  }

  render(){
    return(
      <div>
        <DisplayStateTable selected_state={this.state.selected_state} 
                           state_data={this.state.state_data[this.state.selected_state]}
                           pageX={this.state.pageX}
                           pageY={this.state.pageY}/>
        <HandleMap style={{zIndex:-1}} handleClick={this.handleSelectedState}/>
        <DisplayDistrictData state_name={this.state.selected_state}/>
      </div>
    )
  }

}