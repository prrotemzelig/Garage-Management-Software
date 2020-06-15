import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; 

//import { firebase } from 'firebase';
import firebase from "firebase/app";
import "firebase/auth";
//import firebase from 'firebase';
import 'firebase/firestore';
import config from "../../config";

//firebase.initializeApp(config);

class Auth extends Component {


// db = firebase.firestore();
    state = {
        controls: {
            branchNumber: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Talpiot', displayValue: 'תלפיות'},
                        {value: 'GivatShaul', displayValue: 'גבעת שאול'},
                        {value: 'Modiin', displayValue: 'מודיעין'}
                    ]
                },
                value: 'Talpiot',
                validation: {},
                valid: true,
                touched: false,
                text: ' סניף'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'הכנס/י מייל'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                text: ' כתובת מייל'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'הכנס/י סיסמא'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                text: ' סיסמא'
            }
        },
        isSignup: true
    }

    inputChangedHandler = ( event, controlName ) => {
     
        const updatedControls = updateObject( this.state.controls, { // pass the old object we want to update
            [controlName]: updateObject( this.state.controls[controlName], { //here we want to update the control name
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = (event) => {
        event.preventDefault(); // we call this to prevent the reloading of the page

        if(this.state.controls.email.value==='' && this.state.controls.password.value===''){
            alert('נא להכניס כתובת מייל וסיסמא'); 
        }
        else if(this.state.controls.email.value===''){
            alert('נא להכניס כתובת מייל'); 
        }
        else if(this.state.controls.password.value===''){
            alert('נא להכניס סיסמא'); 
        }
        else{
        //console.log("71" + this.state.controls.branchNumber.value);
        
        this.props.onAuthSignIn(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.branchNumber.value); // pass email value and password value
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.controls.branchNumber.value); // pass email value and password value
    }
}


    resetPasswordHandler = (event) => {
        event.preventDefault(); // we call this to prevent the reloading of the page

        if(this.state.controls.email.value===''){
            alert('נא להכניס כתובת מייל'); 
        }
     else{

        this.props.onResetPassword(this.state.controls.email.value); // pass email value and password value

//        // const config = {};
        // firebase.initializeApp(config);

// //  https://garage-management-software.firebaseapp.com/auth
//         firebase.auth().sendPasswordResetEmail(this.state.controls.email.value, { url: 'http://localhost:3000/auth' })
//         .then(response => {
//         })
//         .catch(error => {
//         })
    }
        // this.setState(prevState => {
        //     return {isSignup: !prevState.isSignup};
        // });
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) { // here we looped through all our controls
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (  // here we looped through all our formElementsArray to create our form ( we map this into an array of jsx elements)
        
            <Input
                key={formElement.id}
                text={formElement.config.text}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
               
        ) );

        if (this.props.loading) {
            form = <Spinner /> 
        }

        let errorMessage = null;

        if (this.props.error) { // if it's not null -> // we get message from firebase. the error come from firebase and its given me a javascript object
        //<p>{this.props.error.message}</p>
       // console.log(this.props.error);
            errorMessage = (
                <div> 
                
                <p>{this.props.error}</p>
            </div>
                );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (   
           
                
        <div  style={{ backgroundColor: "rgb(247, 248, 252)"}}>   
            <div className={classes.Auth}>
                <div style= {{textAlign: "center"}}> 
                 <h3 style={{ paddingBottom: "20px"}}>התחברות</h3>
                {authRedirect}
                {errorMessage}</div>
                <form onSubmit={this.submitHandler}>
                    {form}

                    <div style= {{textAlign: "center"}}> 
                    <Button btnType="Success">כניסה</Button></div>
                </form>
                <div style= {{textAlign: "center"}}> 
                <Button style= {{textAlign: "center"}}
                    clicked={this.resetPasswordHandler} 
                    btnType="Danger" >?שכחת סיסמא</Button></div>
                    
            </div>
            
         </div> 
          
        );
    }
}


// <div  style={{ backgroundColor: "rgb(247, 248, 252)"}}>   
// <div className={classes.Auth}>
//     <div style= {{textAlign: "center"}}> 
//      <h3 style={{ paddingBottom: "20px"}}>התחברות</h3>
//     {authRedirect}
//     {errorMessage}</div>
//     <form onSubmit={this.submitHandler}>
//         {form}

//         <div style= {{textAlign: "center"}}> 
//         <Button btnType="Success">כניסה</Button></div>
//     </form>
//     <div style= {{textAlign: "center"}}> 
//     <Button style= {{textAlign: "center"}}
//         clicked={this.switchAuthModeHandler} 
//         btnType="Danger" >{this.state.isSignup ? 'הרשמה':'התחברות'}</Button></div>
        
// </div>


// </div> 

const mapStateToProps = state => { // for displat the spinner
    return {
        loading: state.auth.loading, // we take access to auth
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => { // we do this to be able to dispatch something here via props in this component
    
    return {
        onAuthSignIn: (email, password,branchNumber) => dispatch(actions.authSignIn(email, password,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        //onAuth: (email, password, isSignup,branchNumber) => dispatch(actions.auth(email, password,isSignup,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onResetPassword: (email) => dispatch(actions.resetPassword(email))

        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );