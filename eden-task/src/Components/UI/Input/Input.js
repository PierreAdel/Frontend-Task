
import React from 'react'
import classes from './Input.module.css'

const input =(props) => {


    let inputElement=null
    let errorElement =null
    const inputClasses = [classes.InputElement, classes.Bold]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
        errorElement= <span>{props.errorMsg}</span>
    }
    if(props.disabled)
    {
        inputClasses.push(classes.Disabled)
    }
    
   
 
    switch(props.elementType)
    {
        case ('input'):
            inputElement = <input 
             onChange={props.changed}
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value} 
             disabled={props.disabled}  />
            break
        case ('textarea'):
            inputElement = <textarea
             onChange={props.changed}
             className={inputClasses.join(' ')}
              {...props.elementConfig}
             value={props.value} />
            break
        case ('select'):
            inputElement = <select
             onChange={props.changed}
             className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value} >
                {props.elementConfig.options.map( option => (
                    <option 
                    key={option.value}
                    value={option.value} >{option.displayValue}</option>
                ))}
            </select>
            break
        default:
            inputElement =<input 
             onChange={props.changed}
             className={inputClasses.join(' ')}
            {...props.elementConfig}
             value={props.value} />
    }

    return(
    <div className={classes.Input}> 
        <label className={classes.Label} >{props.label}</label>
        {inputElement}
        {errorElement}
    </div>
    )


}

export default input

