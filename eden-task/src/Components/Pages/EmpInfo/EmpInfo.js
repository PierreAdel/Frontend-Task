import React, { Component } from 'react'
 
import axios from '../../../axios'
 
import Auxiliary from '../../../hoc/Auxiliary'
import classes from './EmpInfo.module.css'
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
            console.log(response.data)
          this.setState({loading:false, EmpData: response.data})})
          .catch( error => {this.setState({loading:false, error:true})})
         
      }
   
  render() {
    let emp = this.state.error ? <p>Data can't be loaded, please refresh or try again later.</p>: null
    if(this.state.EmpData)
    {
      emp = (
        <Auxiliary>
          
        <EmpCard emp={this.state.EmpData} id={this.props.match.params.id}/>
          
        </Auxiliary>
      )
    }
    if(this.state.loading)
    {
        emp = <Spinner/>

    }
    
    return ( 
    <Auxiliary>
        {emp}
    </Auxiliary>
    )
  }

}

export default withErrorHandler(EmpInfo, axios)