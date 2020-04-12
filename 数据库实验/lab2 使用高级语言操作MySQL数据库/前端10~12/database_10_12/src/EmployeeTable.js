import React, { Component } from 'react';
import { Table, Input, InputNumber, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
const serverurl = 'http://localhost:9000/employeeAPI';


class EmployeeTable extends Component{
  constructor(props){
    super(props);
    this.input_list = [ 'essn','ename', 'address', 'salary', 'superssn', 'dno'];
    this.state = {
      ename: '',
      essn: '',
      address: '',
      salary: '',
      superssn: '',
      dno: '',
      data: [],
      loading: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOnchange = this.handleOnchange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.columns = [
      {
        title: 'ENAME',
        dataIndex: 'ename',
        width: '10%',
      },
      {
        title: 'ESSN',
        dataIndex: 'essn',
        width: '5%',
      },
      {
        title: 'ADDRESS',
        dataIndex: 'address',
        width: '45%',
      },
      {
        title: 'SALARY',
        dataIndex: 'salary',
        width: '10%',
      },
      {
        title: 'SUPERSSN',
        dataIndex: 'superssn',
        width: '5%',
      },
      {
        title: 'DNO',
        dataIndex: 'dno',
        width: '5%',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => (<span>
          <a
            href="javascript:;"
            onClick={() => this.handleDelete(record.essn)}
            style={{
              marginRight: 4,
            }}
          >
            delete
          </a>
          </span>)}];
  }

  componentDidMount(){
    const _this = this;
    axios.get(serverurl + '/getdata?').then(function(response){
      if(response.data.success == 1){
        _this.setState({data:response.data.results});
      }else{
        alert(response.data.text);
      }}).catch( err =>{
      alert('server error');
    })
  }
  handleDelete(essn){
    const _this = this;
    axios.get(`${serverurl}/delete?essn=${essn}`).then(response =>{
      if(response.data.success == 1){
        _this.setState((preState) => {
          var newdata = JSON.parse(JSON.stringify(preState.data));
          newdata = newdata.filter((item) => {
            return (item.essn != essn)
          });
          console.log(newdata);
          return {data: newdata};
        });
      }else{
        alert(response.data.text);
      }
    });
  }
  handleOnchange(name, value){
    this.setState((state) => {
      return {[name]: value};
    });
  }

  handleSearch(e){
    var url = serverurl + '/getdata?';
    var flag = 0;
    const _this = this;
    this.setState((state) => ({loading: true}))
    this.input_list.map(item =>{
      if(this.state[item] !== ''){
        if(flag === 1){
          url += '&';
        }
        flag = 1;
        url = url + item + '=' + this.state[item];
      }
    });
    axios.get(url).then(function(response){
      if(response.data.success == 1){
        _this.setState({data:response.data.results});
      }else{
        alert(response.data.text);
      }}).then(_this.setState((state) => ({loading: false}))).catch( err =>{
      alert('server error');
    })
  }

  handleUpdate(e){
    var url = serverurl + '/update?';
    var flag = 0;
    const _this = this;
    if(this.state.essn === ''){
      alert('请输入员工号');
      return;
    }
    this.setState((state) => ({loading: true}))
    this.input_list.map(item =>{
      if(this.state[item] !== ''){
        if(flag === 1){
          url += '&';
        }
        flag = 1;
        url = url + item + '=' + this.state[item];
      }
    });
    axios.get(url).then(function(response){
      if(response.data.success == 1){
        alert(response.data.text);
        _this.handleSearch();
      }else{
        alert(response.data.text);
      }}).then(_this.setState((state) => ({loading: false}))).catch( err =>{
      alert('server error');
    })
  }
  handleAdd(e){
    var url = serverurl + '/add?';
    var flag = 0;
    const _this = this;
    if(this.state.essn === ''){
      alert('请输入员工号');
      return;
    }
    this.setState((state) => ({loading: true}))
    this.input_list.map(item =>{
      if(this.state[item] !== ''){
        if(flag === 1){
          url += '&';
        }
        flag = 1;
        url = url + item + '=' + this.state[item];
      }
    });
    axios.get(url).then(function(response){
      if(response.data.success == 1){
        alert(response.data.text);
        _this.handleSearch();
      }else{
        alert(response.data.text);
      }}).then(_this.setState((state) => ({loading: false}))).catch( err =>{
      alert('server error');
    })
  }
  render(){
    const _this = this;
    return (<div style = {{width: '80%', margin:'0px auto'}}>
            <div style = {{textAlign: 'center', height: '70px',backgroundColor: 'rgba(70,130,180)'}}><h1 style = {{lineHeight:'70px',color:'white'}}>Employee Table</h1></div>
          {this.input_list.map((item, index) => {
            return <label>{item}: <Input key = {item} value = {this.state[item]} style = {{width:'8%', marginRight:'1%'}}
                                          onChange = {(e) => {
                                                            const value = e.target.value;
                                                            _this.handleOnchange(item, value);
                                                            }}/></label>
          })}
          <Button type="primary" style = {{margin:'1%'}} onClick = {this.handleSearch}>查询</Button>
          <Button type="primary" style = {{margin:'1%'}} onClick = {this.handleUpdate}>修改</Button>
          <Button type="primary" style = {{margint:'1%'}} onClick = {this.handleAdd}>新增</Button>
          <Table size = 'middle' columns = {this.columns} dataSource = {this.state.data} loading = {this.state.loading}/>
          <footer style = {{fontSize: '14px' }}>--共有{this.state.data.length}条记录</footer>
          </div>);
  }
}

export default EmployeeTable;
