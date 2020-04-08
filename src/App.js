import React from 'react';
import {PlotMap} from './Components/PlotMap/PlotMap.js';
import {DataStats} from './Components/DataStats/DataStats.js';
import StateStatsOnMap from './Components/StateStatsOnMap/StateStatsOnMap.js';
import Footer from './Footer.js';
import ReactGA from 'react-ga';

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
    ReactGA.initialize('UA-163648196-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleViewPort(Viewport){
    this.setState({viewport: Viewport});
  }
  
  render(){
    console.log(window.location.pathname + window.location.search);
    return(
      <div>
        <div id="data-stats-overall" style={{display:"block", marginTop:0}}>
          <DataStats data={this.state.dash_board_stats_data}/>
        </div>
        <div id="plot-map" style={{display: "block"}}>
          <PlotMap Viewport={this.state.viewport}
                   viewHeight="70vh" viewWidth="100vw"
                   bounds={bounds}
                   handleViewPort={this.handleViewPort}/>
        </div>
        <div style={{textAlign:"center"}}>
          <button type="button" style={{backgroundColor:"#50C878", borderRadius:"1vh", padding:"0.5vh"}} onClick={(e) => window.scrollTo(e.pageX, e.pageY)}>State Statistics Below</button>
        </div>
        <p style={{fontSize:"1vh", display:"block", paddingLeft:"2vw"}}>Click On A State To See Statistics</p>
        <StateStatsOnMap/>
        <Footer/>
      </div>
    )
  }
}




export default App;