import React, { Component } from 'react'
 
import axios from '../../../axios'
 
import Auxiliary from '../../../hoc/Auxiliary'
import classes from './EmployeeList.module.css'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import AddEmp from '../../AddEmp/AddEmp'
class EmployeeList extends Component  {
  state ={
    data: null,
    loading: false,
    error: false,
    page:1,
    creating: false
  }
    componentDidMount() {
        axios.get('/employees?page=1')
        .then( response => {
          this.setState({data: response.data})})
          .catch( error => {console.log(error)})
         
      }
  
 
      postSelectedHandler = ( id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/user/' + id );
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

  render() {
    let emp = null
    if(this.state.data)
    {
      emp = (
        <Auxiliary>
          
        <ul>
            {this.state.data.map(employee=>{
                return(
                <li key={employee.id} onClick={() => this.postSelectedHandler(employee.id)}><b>{employee.name}</b>: {employee.title}</li>

                )


            } )}
        </ul>
        <button onClick={this.moreClickHandler}>Load other</button>
          
        </Auxiliary>
      )
    }
    if(this.state.loading)
    {
        emp = <Spinner/>

    }
    return ( 
    <div className={classes.EmployessList}>
    {emp}
    <div onClick={this.addEmpHandler} className={classes.AddSticky}>Add A New Employee</div>
    <Modal show={this.state.creating} modalClosed={this.cancelEmpHandler} >
        <AddEmp/>
    </Modal>
    </div>
    )
  }

}

export default withErrorHandler(EmployeeList, axios)