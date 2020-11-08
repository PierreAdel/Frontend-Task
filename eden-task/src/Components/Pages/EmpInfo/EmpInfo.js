import React, { Component } from 'react'
 
import axios from '../../../axios'
 
import Auxiliary from '../../../hoc/Auxiliary'
 import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import EmpCard from '../../EmpCard/EmpCard'
class EmpInfo extends Component  {
  state ={
    EmpData: null,
    loading: true,
    error: false
  }
  //GET the Emp data
    componentDidMount() {
        axios.get('/employee/'+this.props.match.params.id)
        .then( response => {
          this.setState({loading:false, EmpData: response.data})})
          .catch( error => {this.setState({loading:false, error:true})})
         
      }
   
  render() {
    let emp = this.state.error ? <h2>Please Refresh Or Try Again Later.</h2>: null  
    if(this.state.EmpData)
    {
      emp = (
        <EmpCard emp={this.state.EmpData} id={this.props.match.params.id}/>
      )
    }
    if(this.state.loading)
        emp = <Spinner/>
    
    return ( 
    <div>
        {emp}
    </div>
    )
  }

}

export default withErrorHandler(EmpInfo, axios)