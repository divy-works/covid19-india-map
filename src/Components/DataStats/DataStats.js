import React from 'react'
import './DataStats.css'

class DisplayBlock extends React.Component{
    render(){
        return (
            <button className="button_style" 
                    style={{backgroundImage: this.props.backgroundColor,width:this.props.blockWidth}}>
                {this.props.label}<br/>
                {this.props.value}
            </button>
        );
    }
}

export class DataStats extends React.Component {
    render(){
        return (
            <div style={{width:"100vw", margin: "0px"}}>
                <div style={{width:"100vw", textAlign:"left"}}>
                    <DisplayBlock label="COVID19-India Status" 
                                value={this.props.data.update_time}
                                backgroundColor="white" 
                                blockWidth="45vw"/>
                    <DisplayBlock label="Active" 
                                value={this.props.data.active}
                                backgroundColor='linear-gradient(#0080ff,#73c2fb)'/>
                    <DisplayBlock label="Recovered" 
                                value={this.props.data.recovered}
                                backgroundColor='linear-gradient(#0B6623,#c7ea46)'/>
                    <DisplayBlock label="Deaths" 
                                value={this.props.data.deaths}
                                backgroundColor='linear-gradient(#ff2400,#fa8072)'/>
                </div>
                    <p className="data-source"><a style={{padding: 0, paddingLeft:20, margin:0}} href="https://www.mohfw.gov.in/">
                        data source: Ministry of Health and Family Welfare, Government of India
                       </a>
                    </p>
            </div>
        )
    }
}