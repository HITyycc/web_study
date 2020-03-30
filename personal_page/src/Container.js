import React from 'react';
import Footer from './Footer.js';
import Head from './Head.js'
function get_content(state, index_list, contents){
  return index_list.map((item, index) => {
    if(state[item]){
      return contents[item];
    }
  }
  );
}
class Container extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.contents = {};
    this.index_list = [];
    this.changeContent = this.changeContent.bind(this);
    props.list.map((item, index)=>{
      if(index === 0){
        this.state[item.index] = true;
      }else{
        this.state[item.index] = false;
      }
      console.log("state:",this.state);
      this.contents[item.index] = item.content;
      this.index_list.push(item.index);
    });
  }

  changeContent(e){
    let choice = e.target.getAttribute("index");
    this.index_list.map((item, index) => {
        if(choice === item){
          this.setState({
            [item]: true
          });
        }
        else{
          this.setState({
            [item]: false
          });
        }
      });
    }
  render(){

    return(
      [<Head index_list = {this.index_list} choosefunc = {this.changeContent}/>,get_content(this.state, this.index_list, this.contents),
      <Footer url = "http://www.beian.miit.gov.cn/" text = "备案号（粤ICP备20013627号）"/>]
    )
  }
}
export default Container;
