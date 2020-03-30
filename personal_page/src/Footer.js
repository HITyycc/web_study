import React from 'react';
import './css/Footer.css'

class Footer extends React.Component{
  render(){
    return(<div className = "footer"><footer ><p><a href = {this.props.url}>{this.props.text}</a></p>
      </footer></div>)
  }
}

export default Footer;
