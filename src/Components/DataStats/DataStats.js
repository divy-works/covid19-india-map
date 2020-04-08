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

    componentWillReceiveProps(){
        console.log(this.props.data)
    }

    render(){
        let confirmed = Number(this.props.data.active) + Number(this.props.data.recovered) + Number(this.props.data.deaths);
        if (!confirmed){
            confirmed = '';
        }
        return (
            <div style={{width:"100vw", margin: "0px"}}>
                <p style={{fontSize:"1vh"}}>COVID19-India Satus : {this.props.data.update_time}</p>
                <div style={{width:"100vw", textAlign:"left"}}>
                    <DisplayBlock label="Confirmed" 
                                value={confirmed}
                                backgroundColor="white" 
                                blockWidth="23vw"/>
                    <DisplayBlock label="Active" 
                                value={this.props.data.active}
                                backgroundColor='linear-gradient(#0080ff,#73c2fb)'
                                blockWidth="23vw"/>
                    <DisplayBlock label="Recovered" 
                                value={this.props.data.recovered}
                                backgroundColor='linear-gradient(#0B6623,#c7ea46)'
                                blockWidth="23vw"/>
                    <DisplayBlock label="Deaths" 
                                value={this.props.data.deaths}
                                backgroundColor='linear-gradient(#ff2400,#fa8072)'
                                blockWidth="23vw"/>
                </div>
                    <p className="data-source"><a style={{padding: 0, paddingLeft:20, margin:0}} href="https://www.mohfw.gov.in/">
                        data source: Ministry of Health and Family Welfare, Government of India
                       </a>
                    </p>
            </div>
        )
    }
}