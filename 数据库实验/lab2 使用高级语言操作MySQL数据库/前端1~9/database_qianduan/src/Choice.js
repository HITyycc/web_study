import React, { Component } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { connect } from 'react-redux';
import './choice.css';
var serverurl = 'http://localhost:9000/';
class QueryBox extends Component{
  constructor(props){
    super(props);
    const { loadData } = this.props;
    const input_list = props.input_list;
    this.state = {};

    input_list.map((item) => {
      this.state[item.title] = '';
    });
    console.log(this.state);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleOnchange(e){
    const value = e.target.value;
    const title = e.target.getAttribute('index');
    this.setState((preState) =>({[title]: value})
    );
  }
  handleSearch(e){
      const { loadData } = this.props;
      const input_list = this.state;
      var flag = 0;
      var sql = serverurl + this.props.keyword + '?';
      for(var key in input_list){
        if(flag == 1){
          sql += '&';
        }
        flag = 1;
        sql = sql + key + '=' + input_list[key];
      }
      console.log(sql);
      axios.get(sql).then(function(response){
        if(response.data.success == 1){
          loadData(response.data.results);
        }else{
          alert(response.data.text);
        }

      }).catch( err =>{
        alert('server error');
      })
  }
  render(){
    return(<div>
      {this.props.input_list.map((item, index) =>(
        <label>{item.text}
                <input type = 'text'
                        value = {this.state[item.title]}
                        onChange = {this.handleOnchange}
                        index = {item.title}/>
        </label>
      ))}
         <Button type="primary"  onClick = {this.handleSearch} icon={<SearchOutlined />} />
      </div>);
  }
}
function Q1Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q1'
                input_list = {[{text:'查询直接领导为%ENAME%的员工编号，请输入领导姓名：', title:'ename'}]}/>
          </div>
}

function Q2Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q2'
                input_list = {[{text:'查询项目所在地为%PLOCATION%的部门名称，请输入项目所在地：', title:'plocation'}]}/>
          </div>
}
function Q3Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q3'
                input_list = {[{text:'查询参与%PNAME%项目的所有工作人员的名字和居住地址，请输入项目名称：', title:'pname'}]}/>
          </div>
}
function Q4Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q4'
                input_list = {[{text:'查询部门领导居住地在%ADDRESS%且工资不低于%SALARY%元的员工姓名和居住地。\n请输入领导居住地：', title:'address'},
                                {text:'\n请输入最低工资: ', title:'salary'}]}/>
          </div>
}
function Q5Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q5'
                input_list = {[{text:'查询没有参加项目编号为%PNO%的项目的员工姓名。请输入项目编号：', title:'pno'}]}/>
          </div>
}
function Q6Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q6'
                input_list = {[{text:'查询部门领导工作日期在%MGRSTARTDATE%之后的部门名。请输入领导工作日期：', title:'mgrstartdate'}]}/>
          </div>
}
function Q7Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q7'
                input_list = {[{text:'查询总工作量大于%HOURS%小时的项目名称。请输入工作量小时数：', title:'hours'}]}/>
          </div>
}
function Q8Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q8'
                input_list = {[{text:' 查询员工平均工作时间低于%HOURS%的项目名称。请输入工作量小时数：', title:'hours'}]}/>
          </div>
}

function Q9Box(props){
  return <div className = 'queryBox'>
                <QueryBox loadData = {props.loadData} keyword = 'q9'
                input_list = {[{text:' 查询至少参与了%N%个项目并且工作总时间超过%HOURS%小时的员工名字。\n请输入项目个数：', title:'n'},
                                {text:'\n请输入工作小时数: ', title:'hours'}]}/>
          </div>
}
function mapDispatchToProps(dispatch) {
  return {
    loadData: (data) =>{
      const loadDataAction = {
        type:'update data',
        data: data
      };
      dispatch(loadDataAction);
    }
  }
}


export const Q1Box_item = connect(null, mapDispatchToProps)(Q1Box);
export const Q2Box_item = connect(null, mapDispatchToProps)(Q2Box);
export const Q3Box_item = connect(null, mapDispatchToProps)(Q3Box);
export const Q4Box_item = connect(null, mapDispatchToProps)(Q4Box);
export const Q5Box_item = connect(null, mapDispatchToProps)(Q5Box);
export const Q6Box_item = connect(null, mapDispatchToProps)(Q6Box);
export const Q7Box_item = connect(null, mapDispatchToProps)(Q7Box);
export const Q8Box_item = connect(null, mapDispatchToProps)(Q8Box);
export const Q9Box_item = connect(null, mapDispatchToProps)(Q9Box);
