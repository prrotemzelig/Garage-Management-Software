import React from 'react';
import classes from './Button.module.css';
//import { Button } from "reactstrap";


/*this is a functional component which receive some props where we return some JSX 
we want to output props.children here so that we can use our own button like a normal button and simply wrap the content which should go inside with our custom button element then and we will need
onClick listener for sure where we need to execute props.clicked,
we need different style links for different types of buttons, a cancel button, a continue button or something like that.
*/
const button = (props) => (
    <button 
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

{/* <button
className={[classes.Button, classes[props.btnType]].join(' ')} // for mergeing the danger or sucess color and then know witch one to show 
onClick={props.clicked}>{props.children}</button> */}

export default button;

//her
//disabled={props.disabled} -> to allow using this button we need to put this in the css line 12

//css:
// .Button:disabled {
//     color: #ccc;
//     cursor: not-allowed;
// }

/*in className={} we have to pass the string in the end
we add inside an array because we always want to assign the button class but then conditionally, we will add the success or danger class,
so we will set classes button as one element of this array, of classes we want to add and then classes and now we will dynamically pull out a certain type with props button type for example, button type is
a prop I have to set through outside and button type will have to be either Danger with a capital D or a Success with a capital S.

join -> what we passed to class has to be a string, right now it's an array of strings though.
So we change this by joining this with a whitespace to have a list of classes which is a string in the end.
*/