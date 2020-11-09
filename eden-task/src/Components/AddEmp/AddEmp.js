import React, { Component } from 'react'
 
import classes from './AddEmp.module.css'
import Auxiliary from '../../hoc/Auxiliary'
import avatar from '../../assests/images/avatar.png'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import axios from '../../axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class AddEmp extends Component{
    state={
         

        inputForm:{
             
            name: {
                label:"Name",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'name',
                
                },
                value:"",
                validation: {
                    minLength:1,
                    required:true 
                },
                valid:false,
                touched: false,
 
            },
            age: {
                label:"Age",
             
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'age'
                },
                value:"",
                validation: {
                    required:true,
                    
                },
                valid:false,
                touched: false,
              
               
                 
            },
            title: {
                label:"Title",
               
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'title'
                },
                value:"",
                validation: {
                    required:true,
                    
                },
                valid:false,
                touched: false,
                
             
                 
            },
          
        
          
        },
        loginFormIsValid: false,
 
    
    }
    notify = () => toast.success('Data Saved Successfully', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    editableHandler=(event)=>
    {
        event.preventDefault();
     
           const data ={
            name: this.state.inputForm.name.value,
            age: this.state.inputForm.age.value,
            title: this.state.inputForm.title.value}
     
   
            axios.post('/employees/', data)
            .then( response => {
                console.log(response.data)})
              .catch( error => {console.log(error)})

                
                this.notify()
       

    }
    checkValidity(value, rules)
    {      let isValid = true

        if(!rules)
            return true
        if(rules.required &&isValid ){
            isValid = value.trim() !== ''
        }
 
        if(rules.minLength &&isValid )
        {
            isValid = value.length >= rules.minLength
 
        }
        
        if(rules.maxLength &&isValid )
        {
            isValid = value.length <= rules.maxLength
 
        }
       
        
        return isValid
    }
    orderHandler = ( event ) => {
        event.preventDefault();
        
        const formData = {};
        for (let formElementIdentifier in this.state.inputForm) {
            formData[formElementIdentifier] = this.state.inputForm[formElementIdentifier].value;
        }
    }
 
    inputChangedHandler =(event, inputIdentifier) => {
        
        const updatedloginForm = {
            ...this.state.inputForm
        }
       const updatedFormElement ={
            ...updatedloginForm[inputIdentifier]
       } 
       updatedFormElement.value = event.target.value
       updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
         updatedFormElement.validation)
         updatedFormElement.touched= true
         
         updatedloginForm[inputIdentifier] = updatedFormElement


       let loginFormIsValid = true
       for(let inputIdentifier in updatedloginForm)
       {
            loginFormIsValid = updatedloginForm[inputIdentifier].valid && loginFormIsValid
       }
       this.setState({inputForm: updatedloginForm, loginFormIsValid})

    }
    render()
    {
        const formElementsArray = [];
        for(let key in this.state.inputForm)
        {
            formElementsArray.push({
                id: key,
                config: this.state.inputForm[key]
            })
        }
    let form = (
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                  label={formElement.config.label}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id) }
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                errorMsg={formElement.config.validationMSG}
              
                 />
            ))}
 
        </form>
      );
 
    return(
        <Auxiliary>
       
            
            <div className={classes.AddEmp}>
               {form}
              <Button disabled={!this.state.loginFormIsValid} btnType={"Sixth"} clicked={this.editableHandler} >SAVE</Button>

            </div>
     
        <ToastContainer />
        </Auxiliary>
    )


}
}

export default AddEmp 