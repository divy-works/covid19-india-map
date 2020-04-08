import React from 'react';
import {PlotMap} from './Components/PlotMap/PlotMap.js';
import {DataStats} from './Components/DataStats/DataStats.js';
import StateStatsOnMap from './Components/StateStatsOnMap/StateStatsOnMap.js';

const DEFAULT_VIEWPORT = {
  center: [23.4358, 73.8463],
  zoom: 13,
};

const bounds = [
  [8.4, 97.25],
  [37.6, 68.7]];

const covid_dashboard_stats_url = "https://covid19-india-datasets.s3.ap-south-1.amazonaws.com/covid-india-stats.json";
const proxyurl = "https://cors-anywhere.herokuapp.com/"

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      viewport : DEFAULT_VIEWPORT,
      covid_data : {},
      dash_board_stats_data: {},
      state_data : {}
    }
    this.handleViewPort = this.handleViewPort.bind(this);
  }

  async componentDidMount() {
    try {
      let dash_board_stats_response = await fetch(proxyurl + covid_dashboard_stats_url);
      let dash_board_stats_response_json = await dash_board_stats_response.json();
      this.setState({dash_board_stats_data: dash_board_stats_response_json});
     } catch(error) {
      console.error(error);
    }
  }

  handleViewPort(Viewport){
    this.setState({viewport: Viewport});
  }
  
  render(){
    return(
      <div>
        <div id="data-stats-overall" style={{display:"block", marginTop:"1vh"}}>
          <DataStats data={this.state.dash_board_stats_data}/>
        </div>
        <div id="plot-map" style={{display: "block"}}>
          <PlotMap Viewport={this.state.viewport}
                   viewHeight="75vh" viewWidth="100vw"
                   bounds={bounds}
                   handleViewPort={this.handleViewPort}/>
        </div>
        <p style={{paddingLeft:"1vw", fontSize:"0.75vh"}}>Disclaimer: The map uses <a href="https://leafletjs.com/">Leafletjs</a> which uses <a href="https://www.openstreetmap.org/">OpenStreetMap</a>. The boundaries of countries shown are as per <a href="https://www.openstreetmap.org/">OpenStreetMap</a>.</p>
        <StateStatsOnMap/>
        <footer style={{padding:"2vw", color:"white", backgroundColor:"#36454F"}}>
          <hr/>
          <p style={{fontSize:"1.5vh"}}>Developed by: Divyendu Narayan email: divyendu.narayan@gmail.com</p>
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
            <img src="https://www.logolynx.com/images/logolynx/39/398ca47e4f9f2a2a861b3b436fcc096c.jpeg" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
            <img src="https://www.logolynx.com/images/logolynx/12/12915de338ad27d9756641b39b286ee3.png" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
            <img src="https://www.logolynx.com/images/logolynx/0a/0a2a37a7e942bc13fa9ff1edfdb4ae81.png" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
          </div>
        </footer>
      </div>
    )
  }
}

export default App;