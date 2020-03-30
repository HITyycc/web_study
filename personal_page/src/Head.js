import React from 'react';
import './css/Head.css'
class Head extends React.Component{
  render(){
    var index_list = this.props.index_list;
    return(
      <div className = "header">
        {index_list.map((item, index) => {
          return <p className = "choice" index = {item} onClick={this.props.choosefunc}>{item}</p>
        })}
      </div>
    );
  }
}

export default Head;
