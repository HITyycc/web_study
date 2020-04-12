import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
function GetTable(props){
  var columns = [];
  var data = props.data;
  if(data.length !== 0){
    for(var key in data[0]){
      columns.push({title: key.toUpperCase(),
                    dataIndex: key,
                    width:100
                  });
    }
  }
  return (<div><Table size = 'middle' columns = {columns} dataSource = {data}/><footer style = {{fontSize: '14px' }}>--共有{data.length}条记录</footer></div>);
}

function mapStateToProps(state) {
  console.log('get',state.data);
  return {
    data: state.data
  };
}
export default connect(mapStateToProps, null)(GetTable);
