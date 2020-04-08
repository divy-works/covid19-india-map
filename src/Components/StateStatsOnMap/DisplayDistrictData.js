import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const getRandomColor = ()=> {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
export class DisplayDistrictData extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            districts_data : [],
        }
    }

    async componentDidMount(){
        try {
          const districts_data_url = "https://covid19-india-datasets.s3.ap-south-1.amazonaws.com/covid19_district_data.json";
          const proxy_url = "https://cors-anywhere.herokuapp.com/";
          const districts_data_response = await fetch(proxy_url + districts_data_url);
          const districts_data = await districts_data_response.json();
          this.setState({districts_data: districts_data});
        } catch(error){
          console.log(error);
        }
      }

      render(){
          let state_name = this.props.state_name;
          //fix as the same state names are named differently in district and state data
          if (state_name === "Telengana"){
            state_name = "Telangana";
          }
          if (state_name === "Andaman and Nicobar Islands"){
              state_name = "Andaman and Nicobar Island";
          }
          if (state_name === "Chandigarh"){
              state_name = "Chandigarh UT";
          }
          if (state_name === "Chhattisgarh"){
              state_name = "Chhatisgarh";
          }

        //covid data from districts is in upper case
        state_name = state_name.toUpperCase();
          state_name = state_name.toUpperCase();
          let districts_data = [];
          if (this.state.districts_data[state_name]){
              Object.keys(this.state.districts_data[state_name].districts).map(
                  district_name => {
                      districts_data.push({
                          name: district_name,
                          value: Number(this.state.districts_data[state_name].districts[district_name].count),
                      })
                    return null;
                  }
              )
          }
        return(
          <ResponsiveContainer width="100%" height={window.innerHeight*0.4}>
            <PieChart height={window.innerHeight*0.5}>
              <Pie
                data={districts_data}
                cx={window.innerWidth*0.01}
                cy={window.innerHeight*0.01}
                outerRadius={window.innerHeight*0.25}
                startAngle={0}
                endAngle={-90}
                paddingAngle={2}
                fill="#8884d8"
                dataKey="value"
                label={({
                  cx, cy, midAngle, innerRadius, outerRadius, value, index}) => {
                    const radius = 20 + outerRadius;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    let labelAngle = -midAngle;
                    if (midAngle > 90 && midAngle <=270){
                      labelAngle = -180-midAngle;
                    }
                    if (midAngle <-90 && midAngle >=-270){
                        labelAngle = 180-midAngle;
                    }
                  return (
                    <text onMouseOver={(e)=>{e.target.style.fontSize=window.innerHeight*0.015;}}
                          onMouseOut={(e)=>{e.target.style.fontSize=window.innerHeight*0.01;}}
                          x={x} y={y} fill="#8884d8" 
                          textAnchor={x > cx ? "start" : "end"}
                          fontSize={window.innerHeight*0.01} 
                          dominantBaseline="central"
                          transform={`rotate(${labelAngle},${x},${y})`}>
                      {districts_data[index].name} ({value})
                    </text>
                  )
                }}
              >{districts_data.map(index=> <Cell key={"cell_" + index}
                                       fill={getRandomColor()}/>)}</Pie>
            </PieChart>
          </ResponsiveContainer>);
        }

    }