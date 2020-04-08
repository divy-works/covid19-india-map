import React from 'react';
import {Map, Circle, Popup, Marker, TileLayer, ZoomControl} from 'react-leaflet';

export class PlotMap extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            covid_data: '',
            states_data: '',
        }
        this.handleViewPortChanged = this.handleViewPortChanged.bind(this);
        this.map = React.createRef();
        this.tilelayer = React.createRef();
    }

    handleViewPortChanged(Viewport){
        this.props.handleViewPort(Viewport);
    }

    async componentDidMount(){
        try {
            const data_url = "https://covid19-india-datasets.s3.ap-south-1.amazonaws.com/covid19_district_data.json";
            const proxy_url = "https://cors-anywhere.herokuapp.com/";
            const data_response = await fetch(proxy_url + data_url);
            const districts_data = await data_response.json();
            this.setState({covid_data: districts_data});

            const state_data_url = "https://covid19-india-datasets.s3.ap-south-1.amazonaws.com/covid-india-states-data.json";
            const state_data_response = await fetch(proxy_url + state_data_url);
            const states_data = await state_data_response.json();
            this.setState({states_data: states_data});
        }
        catch(error){
            console.log(error);
        }
    }
    
    render(){
        let states_name_list = Object.keys(this.state.states_data);
        let state_markers= [];
        //create state markers using the data the states data
        if ((this.state.covid_data) && (this.state.states_data)){
            state_markers.push(states_name_list.map(state_name => {

                const active_cases = this.state.states_data[state_name].active_cases;
                const recovered = this.state.states_data[state_name].recovered;
                const deaths = this.state.states_data[state_name].deaths;

                const latitude = this.state.states_data[state_name]['latitude'];
                const longitude = this.state.states_data[state_name]['longitude'];
                
                return(
                    <Marker key={'marker_' + Math.floor(Math.random()*1e10)}
                            position={[Number(latitude), Number(longitude)]}
                            color="blue"
                            onmouseover={(e) => {
                                e.target.openPopup();
                                e.target.radius=10000;
                            }}
                            onmouseout={(e) => {
                                e.target.closePopup();
                                e.target.radius=5000;
                            }}
                            >
                                <Popup>
                                    State: {state_name}<br/>
                                    Active: {active_cases}<br/>
                                    Recovered: {recovered}<br/>
                                    Deaths: {deaths}
                                </Popup>
                    </Marker>
                )}));
        }
        //create district markers using the data from covid districts data
        states_name_list = Object.keys(this.state.covid_data);
        let district_markers = [];
        if (this.state.covid_data){
            district_markers.push(states_name_list.map(state_name=>{
                let state_markers_array = [];
                const districts_name_list = Object.keys(this.state.covid_data[state_name]['districts']);
                districts_name_list.map(district_name => {
                    const count = this.state.covid_data[state_name]['districts'][district_name]['count'];
                    const latitude = this.state.covid_data[state_name]['districts'][district_name]['latitude'];
                    const longitude = this.state.covid_data[state_name]['districts'][district_name]['longitude'];
                    state_markers_array.push(
                        <Circle key={'circle_' + Math.floor(Math.random()*1e10)}
                                center={[Number(latitude), Number(longitude)]}
                                color="#0080FF"
                                fillOpacity={0.5}
                                radius={7000}
                                onmouseover={(e) => {
                                    e.target.openPopup();
                                    e.target.radius=10000;
                                }}
                                onmouseout={(e) => {
                                    e.target.closePopup();
                                    e.target.radius=7000;
                                }}>
                                    <Popup width="25pc"> 
                                        District: {district_name}<br/>
                                        Active: {count}
                                    </Popup>
                        </Circle>
                    )
                    return null;
                });
                return state_markers_array;
            }));
        }

        return(
        <div>   
            <Map ref={this.map}
                onViewportChanged={this.handleViewPortChanged}
                viewport={this.props.Viewport}
                bounds={this.props.bounds}
                zoomControl={false}
                style={{height: this.props.viewHeight, width: this.props.viewWidth}}>
                <TileLayer ref={this.tilelayer}
                key={'tilelayer_' + Math.floor(Math.random()*1e10)}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                tileSize={512}
                zoomOffset={-1}
                maxZoom={15}
                />
                {district_markers}
                {state_markers}
                <ZoomControl position="bottomright" style={{width:50, height:100}}></ZoomControl>
            </Map>
            <p style={{paddingLeft:"1vw", fontSize:"0.75vh"}}>
                Disclaimer: The map uses <a href="https://leafletjs.com/">Leafletjs</a> which uses <a href="https://www.openstreetmap.org/">OpenStreetMap</a>. The boundaries of countries shown are as per <a href="https://www.openstreetmap.org/">OpenStreetMap</a>.</p>
        </div>
        )
      }
}