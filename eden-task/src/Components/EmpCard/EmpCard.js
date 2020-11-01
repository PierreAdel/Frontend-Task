import React, { Component } from 'react'
 
import classes from './EmpCard.module.css'
import Auxiliary from '../../hoc/Auxiliary'
import avatar from '../../assests/images/avatar.png'
import Input from '../UI/Input/Input'

import axios from '../../axios'
class empCard extends Component{
    state={
         

        inputForm:{
             
            name: {
                label:"Name",
                key: "name",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'name',
                
                },
                value:this.props.emp["name"],
                validation: {
                    required:true 
                },
                valid:false,
                touched: false,
              
               
            },
            age: {
                label:"Age",
                key: "age",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'age'
                },
                value:this.props.emp["age"],
                validation: {
                    required:true,
                    
                },
                valid:false,
                touched: false,
               
                 
            },
            title: {
                label:"Title",
                key: "title",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'title'
                },
                value:this.props.emp["title"],
                validation: {
                    required:true,
                    
                },
                valid:false,
                touched: false,
             
                 
            },
            id: {
                label:"ID",
                key:"id",
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'id'
                },
                value:this.props.emp["id"],
                validation: {
                    required:true,
                    
                },
                valid:false,
                touched: false,
               
                 
            },
        
          
        },
        loginFormIsValid: false,
        editable: false
        
    
    }
    editableHandler=(event)=>
    {
        event.preventDefault();
        if(this.state.editable)
        {  const data ={
            name: this.state.inputForm.name.value,
            age: this.state.inputForm.age.value,
            title: this.state.inputForm.title.value}
     
   
            axios.patch('/employee/'+this.props.id,data)
            .then( response => {
                console.log(response.data)})
              .catch( error => {console.log(error)})

                this.setState({editable:false})
                alert("User data updated")
        }
        else
        {
                       //imut change kda?
        let editable = true //fix
        
        this.setState({editable})
        }

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
    submitHandler=(event) => {
      event.preventDefault();
         
        const formData = {};
        for (let formElementIdentifier in this.state.inputForm) {
            formData[formElementIdentifier] = this.state.inputForm[formElementIdentifier].value;
        }
        const order = {
           
            orderData: formData
        }
        console.log(order)

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
                value={this.props.emp[formElement.config.key]}
                changed={this.state.editable? (event) => this.inputChangedHandler(event, formElement.id) : null}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                errorMsg={formElement.config.validationMSG}
                disabled={!this.state.editable  }
                 />
            ))}
 
        </form>
      );
 
    return(
        
        <div className={classes.Container}>
            <div className={classes.EmpCard}>
               {form}
          <button className={classes.Button} onClick={this.editableHandler} >{this.state.editable? "Save": "Edit"}</button>

            </div>
        </div>
    )


}
}

  
 
 

export default empCard 