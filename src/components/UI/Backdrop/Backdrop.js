import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;

//here we just want to check if props show is true -> then we will return div
//if props show is false - return null. we can return null in components its ok but its just mean that nothing gets rendered.
//we don't need to pass any content to the div, bet we need to set up some styling

//so here we expects to get a show property

//we need to add a click listener inside the backdrop on the div, and the onClick should execute some method and of course we will receive a reference to that method on a property.
//onClick={props.clicked} -> clicked is the property name, and then in Modal.js er have to provide a clicked property