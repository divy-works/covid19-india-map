import React from 'react';
import {SvgLoader, SvgProxy} from 'react-svgmt';
import india_map from './India-Map.svg';

export class HandleMap extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.target.style.fill="blue";
        this.props.handleClick(e.target.id, e.pageX, e.pageY);
    }

    render(){
        return (
            <div style={{backgroundSize:"400px 400px"}}>
                <SvgLoader path={india_map}>
                    <SvgProxy selector="g" 
                              onclick={(e)=>{this.handleClick(e)}}
                              onmouseout={(e)=>e.target.style.fill=""}/>
                </SvgLoader>
            </div>
        )
    }
}