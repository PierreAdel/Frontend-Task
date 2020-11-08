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
    moreClickHandler = (event) => {
      event.preventDefault()
      if(this.state.page === 1)
   {   this.setState({page:2})
      axios.get('/employees?page='+2)
      .then( response => {
        this.setState({data: response.data})})
        .catch( error => {console.log(error)})
       }
       else
       {
        this.setState({page:1})
        axios.get('/employees?page='+1)
        .then( response => {
          this.setState({data: response.data})})
          .catch( error => {console.log(error)})
       }
     
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
          <Auxiliary>
            
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
     
          </Auxiliary>
        )
      }
      else{
        emp = (
          <Auxiliary>
            
          <ul  >
              {this.state.data.map(employee=>{
                  return(
                 <li key={employee.id} onClick={() => this.postSelectedHandler(employee.id)}><b>{employee.name}</b>: {employee.title}</li>  
                  )
              } )}
          </ul>
       
          </Auxiliary>
        )
        
      }
      
    }
    if(this.state.loading)
    {
        emp = <Spinner/>

    }
    return ( 
    <div className={this.state.fullView? classes.EmployessList: classes.EmployeesListView}>
    {emp}
    <Button btnType={"Sixth2"} clicked={this.moreClickHandler}>Load Other</Button>
    <Button   btnType={"Sixth2"} clicked={this.ToggleViewHandler}>Change View</Button>
    <div onClick={this.addEmpHandler} className={classes.AddSticky}>Add A New Employee</div>

    <Modal show={this.state.creating} modalClosed={this.cancelEmpHandler} >
        <AddEmp/>
    </Modal>
    
    </div>
    )
  }

}

export default withErrorHandler(EmployeeList, axios)