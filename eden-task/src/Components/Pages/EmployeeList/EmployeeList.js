import React, { Component } from 'react'
 
import axios from '../../../axios'
 
import Auxiliary from '../../../hoc/Auxiliary'
import classes from './EmployeeList.module.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import AddEmp from '../../AddEmp/AddEmp'
import Button from '../../UI/Button/Button'
class EmployeeList extends Component  {
  state ={
    data: null,
    loading: false,
    error: false,
    page: 1,
    creating: false,
    fullView: true
  }
    componentDidMount() {
        axios.get('/employees')
        .then( response => {
          this.setState({data: response.data})})
          .catch( error => {console.log(error)})
         
      }
  
 
      postSelectedHandler = ( id ) => {
 
        this.props.history.push( '/employee/' + id );
    }
    PageClickHandler = (event,previous) => {
      event.preventDefault()
    
      let statePage = {...this.state}
      if(previous  && (this.state.page > 1))
        statePage.page = statePage.page -1

      else if(!previous && Object.keys(this.state.data).length >= 10 )
        statePage.page = statePage.page +1

      this.setState({page:statePage.page}, () => {
        
        axios.get('/employees?page='+this.state.page)
        .then( response => {
          this.setState({data: response.data})})
          .catch( error => {console.log(error)})
      })
     
     
    }

    addEmpHandler=() => {
          this.setState({creating:true})
    }
    cancelEmpHandler=() => {
      this.setState({creating:false})
}
ToggleViewHandler=(event ) => {
  event.preventDefault();
  this.setState(prevState  => ({
    fullView: !prevState.fullView
  }));
}


  render() {
    let emp = null
    if(this.state.data)
    {
      if(this.state.fullView)
      {
        emp = (
          <ul  >
              {this.state.data.map(employee=>{
                  return(
                 <li key={employee.id} onClick={() => this.postSelectedHandler(employee.id)}> 
                <h2>{employee.id}</h2>
                <h3>{employee.name}</h3>
                <p>{employee.title}</p>
                <button>View Employee</button>
                
                </li>
                  )
              } )}
          </ul>
     
        )
      }
      else{
        emp = (
          <ul  >
              {this.state.data.map(employee=>{
                  return(
                  
                   
                 <li key={employee.id} onClick={() => this.postSelectedHandler(employee.id)}> <span>{employee.id}</span><b>{employee.name}</b>: {employee.title}</li>  
                 
                  )
              } )}
          </ul>
        )
      }
 
    }
    if(this.state.loading)
    {
        emp = <Spinner/>

    }
    return ( 
    <Auxiliary>
    <div className={this.state.fullView? classes.EmployessList: classes.EmployeesListView}>
         
    {emp}
    <Button btnType={"Sixth2"} clicked={(event) => this.PageClickHandler(event,true)}>Load Previous Page</Button>
    <Button btnType={"Sixth2"} clicked={(event) => this.PageClickHandler(event,false)}>Load Next Page</Button>
    <Button btnType={"Sixth2"} clicked={this.ToggleViewHandler}>Switch View</Button>

    <Modal show={this.state.creating} modalClosed={this.cancelEmpHandler} >
        <AddEmp/>
    </Modal>
    
    </div>
    <div onClick={this.addEmpHandler} className={classes.AddSticky}>Add A New Employee</div>

    </Auxiliary>
    )
  }

}

export default withErrorHandler(EmployeeList, axios)