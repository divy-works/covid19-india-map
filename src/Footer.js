import React from 'react';

export default class Footer extends React.Component {
    render(){
        return(
            <footer style={{padding:"2vw", color:"white", backgroundColor:"#36454F"}}>
                <div style={{fontSize:"1.5vh"}}>
                <p>MIT License </p>
                <p>Copyright (c) 2020 <a style={{color: "white"}} href="https://www.linkedin.com/in/divyendu-narayan-63411416/">Divyendu Narayan</a></p>
                </div>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}>
                <a href="https://s3.console.aws.amazon.com/s3/buckets/covid19-india-datasets/" target="_blank">
                    <img src="https://www.logolynx.com/images/logolynx/39/398ca47e4f9f2a2a861b3b436fcc096c.jpeg" alt="amazon-s3" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
                </a>
                <a href="https://github.com/divy-works/covid19-india-map" target="_blank">
                    <img src="https://www.logolynx.com/images/logolynx/12/12915de338ad27d9756641b39b286ee3.png" alt="github" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
                </a>
                <a href="https://medium.com/@divyendu.narayan/covid-india-map-web-application-83f04a819dd3" target="_blank">
                    <img src="https://www.logolynx.com/images/logolynx/0a/0a2a37a7e942bc13fa9ff1edfdb4ae81.png" alt="medium" width={window.innerWidth*0.1} height={window.innerWidth*0.1}/>
                </a>
                </div>
          </footer>
        )
    }
}