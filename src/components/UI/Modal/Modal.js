import React, { Component } from 'react';
import classes from './Modal.module.css';

import Aux from '../../../hoc/Auxn/Auxn.js'; //we will import our auxiliary component here because we need to place that modal next to the backdrop;
import Backdrop from '../Backdrop/Backdrop.js';

/*we will add the backdrop to this Modal because, this backdrop is closely connected to the modal.
If the modal is shown, the backdrop should be shown.
So therefore, we will import our auxiliary component here because we need to place that modal next to thebackdrop,;
*/ 

class Modal extends Component{

    shouldComponentUpdate ( nextProps, nextState ) { // we controlled this with should component update
        // we only return true if show changed
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; //return true or false
        // if we get a new children this component will be update!
    }

   // componentWillUpdate () {
   //     console.log('[Modal] WillUpdate');
   // }

    render(){
        return(
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' :'0', fontWeight: "bold",fontFamily: "Alef Hebrew",fontSize: "20px"
                }}>
                {this.props.children}
            </div>
        </Aux>
        
        )
    }
} 

export default Modal;

/* if we want to add some style - we need to bind style here to something dynamic, rgar dynamic thing should be 
in the style:

transform - here we want to send or set the transform property.
if show is true we will set transform to translateY(0) which is the position we defined in css.
is show is false we will set transform to translateY(-100vh). vh is a special unit which refers to the viewport height, so it will simply slide it outside of the screen

opacity - we want to animate the opacit
if props.show is true it should be 1
if props.show is false it should be 0 and then this modal should be not visible

*/

/*
<Backdrop/> - we should configure the shoe property on the backdrop because we expect it in there, and thankfully, we get the show information on props int the modal component itself.
if the modal is shown => the backdrop should be shown.
there we have to provide a clicked property and we have to do something there. 
then we have to do something and we simply trigger a prop on that modal which should be modalClosed. 
and now, modalClosed is now a property we have to add to the modal component when we add it to JSX (to our output), and we use that modal in the burger builder.
clicked={props.modalClosed} -> its a reference to the method we want to execute once the backdrop fires clicked
in the BurgerBuilder.js we have to add this modal closed property to modal because we just added it in there as a reference to the method we want to execute once the backdrop fires clicked
*/