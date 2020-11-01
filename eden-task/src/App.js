import React, { Component } from 'react';
 
 //import Home from './Container/Home/Home'
import Home from './Components/Pages/Home'
import EmployeeList from './Components/Pages/EmployeeList/EmployeeList'
import EmpInfo from './Components/Pages/EmpInfo/EmpInfo'
 
import {Route, Switch} from'react-router-dom'

import {BrowserRouter } from 'react-router-dom'
  
 
import classes from './App.css'
class App extends Component {

  
  render() {
    return (
      <BrowserRouter >
 
      
      <div className={classes.FullScreen}>
        <Switch>
        
    
          <Route path="/user/:id"   component={EmpInfo} />
          <Route path="/"   component={EmployeeList} />
          

       </Switch> 
       </div>
        
      </BrowserRouter>
      
   
    );
  }
}

export default App;
