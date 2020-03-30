import React from 'react';
import './css/Welcome.css'
class Welcome extends React.Component{
  render(){
    return(
      <div className = "hwc_welcome">
      <div id = "hwc_welcome">
        <div id = "picture_container"></div>
        <article><p id = "xuanyan">Fighting! To be better!</p></article>
      </div>
      </div>
    );
  }
}

export default Welcome;
