import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from'react-router-dom'
 
import EmployeeList from './Components/Pages/EmployeeList/EmployeeList'
import EmpInfo from './Components/Pages/EmpInfo/EmpInfo'
 
class App extends Component {

  
  render() {
    return (
      <BrowserRouter >
  
        <Switch>
       
          <Route path="/employee/:id"   component={EmpInfo} />
          <Route path="/"   component={EmployeeList} />
       
       </Switch> 
       
      </BrowserRouter>
    );
  }
}

export default App;
