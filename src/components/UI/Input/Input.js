import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                text={props.text}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
            
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                text={props.text}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    text={props.text}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                text={props.text}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            
            <label className={classes.text}>{props.text}</label>
            <label className={classes.Label}>{props.label}
            {inputElement}</label>
        </div>
    );
};


/* <div className={classes.Input}>
            
<label className={classes.Label}>{props.label}
{inputElement}</label>
<label className={classes.text}>{props.text}</label>
</div> */


export default input;