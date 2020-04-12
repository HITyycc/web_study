import React, { Component } from 'react';
import { Collapse } from 'antd';
const { Panel } = Collapse;
function Overview(props){
  const list = ['查询直接领导为%ENAME%的员工编号','查询项目所在地为%PLOCATION%的部门名称',
  '查询参与%PNAME%项目的所有工作人员的名字和居住地址', '查询部门领导居住地在%ADDRESS%且工资不低于%SALARY%元的员工姓名和居住地',
  '查询没有参加项目编号为%PNO%的项目的员工姓名','查询部门领导工作日期在%MGRSTARTDATE%之后的部门名',
  '查询总工作量大于%HOURS%小时的项目名称','查询员工平均工作时间低于%HOURS%的项目名称',
  '查询至少参与了%N%个项目并且工作总时间超过%HOURS%小时的员工名字'];
  return (<Collapse defaultActiveKey={['1']}>
          <Panel header="详细问题描述" key="1">
          <div className = 'overview'><ul>{list.map((item, index) => (<li>{'Q' + (index+1)+ ': '+ item}</li>))}</ul></div>
          </Panel>
          </Collapse>);
}

export default Overview;
