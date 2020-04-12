import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, IndexRoute} from "react-router-dom";
import  './choose.css';
import GetTable from './GetTable.js';
import { createStore } from 'redux';
import reducer from './reducer.js';
import { Provider } from 'react-redux';
import Overview from './Overview';
import { Q1Box_item, Q2Box_item, Q3Box_item, Q4Box_item, Q5Box_item, Q6Box_item, Q7Box_item, Q8Box_item, Q9Box_item} from './Choice.js';
var store = createStore(reducer);
class Choose extends Component{
  render(){
    return(
      <div className = 'whole-container'>
      <Overview/>
      <Provider store = {store}>
      <Router>
        <Route path = '/' component = {Choose_table}/>
          <Route path = '/q1' component = {Q1Box_item}/>
          <Route path = '/q2' component = {Q2Box_item}/>
          <Route path = '/q3' component = {Q3Box_item}/>
          <Route path = '/q4' component = {Q4Box_item}/>
          <Route path = '/q5' component = {Q5Box_item}/>
          <Route path = '/q6' component = {Q6Box_item}/>
          <Route path = '/q7' component = {Q7Box_item}/>
          <Route path = '/q8' component = {Q8Box_item}/>
          <Route path = '/q9' component = {Q9Box_item}/>
      </Router>
      <GetTable/>
      </Provider>
      </div>
    );
  }
}
class Choose_table extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<table className = 'chooseTable'><tbody><tr>{getlinks(this.list)}</tr></tbody></table>);
  }
}


function getlinks(list){
  return ['q1', 'q2', 'q3', 'q4', 'q5', 'q6','q7', 'q8', 'q9'].map((item, index)=>{
    return <td key = {item} ><NavLink activeStyle={{
    color: 'rgba(65,105,225,1)'
  }} style = {{textDecoration:'none',color:'rgba(	169,169,169,1)'}}
  to={'/'+item} >{item}</NavLink></td>;
  }
  );
}

export default Choose;
