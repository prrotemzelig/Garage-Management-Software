import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; 
import IconPerson2 from '../../assets/icon-person2';
import IconCollection2 from '../../assets/icon-collection2';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';

//import { firebase } from 'firebase';
//import firebase from "firebase/app";
import "firebase/auth";
//import firebase from 'firebase';
import 'firebase/firestore';
//import config from "../../config";

//firebase.initializeApp(config);

class Auth extends Component {


// db = firebase.firestore();
    state = {
        controls: {
          formIsValid: false,
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
                valid: false,
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
                    minLength: 6   //change to 6
                },
                valid: false,
                touched: false,
                text: ' סיסמא'
            }
        },
        isSignup: true
    }

//     inputChangedHandler = ( event, controlName ) => {
     
//         const updatedControls = updateObject( this.state.controls, { // pass the old object we want to update
//             [controlName]: updateObject( this.state.controls[controlName], { //here we want to update the control name
//                 value: event.target.value,
//                 valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
//                 touched: true
//             } )
//         } );
//         this.setState( { controls: updatedControls } );
//     }

//     submitHandler = (event) => {
//         event.preventDefault(); // we call this to prevent the reloading of the page

//         if(this.state.controls.email.value==='' && this.state.controls.password.value===''){
//             alert('נא להכניס כתובת מייל וסיסמא'); 
//         }
//         else if(this.state.controls.email.value===''){
//             alert('נא להכניס כתובת מייל'); 
//         }
//         else if(this.state.controls.password.value===''){
//             alert('נא להכניס סיסמא'); 
//         }
//         else{
//         //console.log("71" + this.state.controls.branchNumber.value);
        
//         this.props.onAuthSignIn(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.branchNumber.value); // pass email value and password value
//         //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.controls.branchNumber.value); // pass email value and password value
//     }
// }

inputChangedHandler = ( event ) => {
    event.preventDefault(); // we call this to prevent the reloading of the page
    let updatedControls ; 
    if(event.target.id === 'branchNumber'){
      let ifValid;
      if(event.target.value !== 'בחר/י סניף'){
        ifValid = true;
      }
      else{
        ifValid = false
      }
       updatedControls = updateObject( this.state.controls, { // pass the old object we want to update
        [event.target.id]: updateObject( this.state.controls[event.target.id], { //here we want to update the control name
            value: event.target.value,
            valid: ifValid,
            touched: true
        } )
    } );

    let formIsValid = false;
    if(this.state.controls.password.valid && this.state.controls.email.valid && ifValid){
      formIsValid = true;
    }
    this.setState( { controls: updatedControls,formIsValid: formIsValid } );
    }
    else{
       updatedControls = updateObject( this.state.controls, { // pass the old object we want to update
        [event.target.id]: updateObject( this.state.controls[event.target.id], { //here we want to update the control name
            value: event.target.value,
            valid: checkValidity( event.target.value, this.state.controls[event.target.id].validation ),
            touched: true
        } )
    } );
    let formIsValid = false;
    if(event.target.id === 'password'){
      if(this.state.controls.branchNumber.valid && this.state.controls.email.valid && checkValidity( event.target.value, this.state.controls[event.target.id].validation )){
        formIsValid = true;
      }
      else{
        formIsValid = false;
      }
    }
    else if(event.target.id === 'email'){
      if(this.state.controls.branchNumber.valid && checkValidity( event.target.value, this.state.controls[event.target.id].validation) && this.state.controls.password.valid ){
        formIsValid = true;
      }
      else{
        formIsValid = false;
      }
    }
    this.setState( { controls: updatedControls,formIsValid: formIsValid } );
    }

    // let formIsValid = false;
    // if(this.state.controls.branchNumber.valid && this.state.controls.email.valid && this.state.controls.password.valid){
    //   formIsValid = true;
    //   console.log(formIsValid);
    // }
    // console.log(formIsValid);

    // this.setState( { controls: updatedControls,formIsValid: formIsValid } );
    // console.log(this.state.controls);
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
    // console.log(this.state.controls.email.value);
    // console.log(this.state.controls.password.value);
    // console.log(this.state.controls.branchNumber.value);
    let branchNumber;
    if( this.state.controls.branchNumber.value==='תלפיות')
        branchNumber='Talpiot';
    else if( this.state.controls.branchNumber.value==='גבעת שאול')
        branchNumber= 'GivatShaul';
    else if( this.state.controls.branchNumber.value==='מודיעין')
        branchNumber= 'Modiin';

    // console.log(branchNumber);
    this.props.onAuthSignIn(this.state.controls.email.value, this.state.controls.password.value, branchNumber); // pass email value and password value
    //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.controls.branchNumber.value); // pass email value and password value
}
}


    render () {
        // const formElementsArray = [];
        // for ( let key in this.state.controls ) { // here we looped through all our controls
        //     formElementsArray.push( {
        //         id: key,
        //         config: this.state.controls[key]
        //     } );
        // }

        // let form = formElementsArray.map( formElement => (  // here we looped through all our formElementsArray to create our form ( we map this into an array of jsx elements)
        
        //     <Input
        //         key={formElement.id}
        //         text={formElement.config.text}
        //         elementType={formElement.config.elementType}
        //         elementConfig={formElement.config.elementConfig}
        //         value={formElement.config.value}
        //         invalid={!formElement.config.valid}
        //         shouldValidate={formElement.config.validation}
        //         touched={formElement.config.touched}
        //         changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
               
        // ) );

    //     if (this.props.loading) {
    //         form = <Spinner /> 
    //     }

    //     let errorMessage = null;

    //     if (this.props.error) { // if it's not null -> // we get message from firebase. the error come from firebase and its given me a javascript object
    //     //<p>{this.props.error.message}</p>
    //    // console.log(this.props.error);
    //         errorMessage = (
    //             <div> 
                
    //             <p>{this.props.error}</p>
    //         </div>
    //             );
    //     }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (   
           
            <div class="head">
            <div>
            <div class="brand">
            <a>
              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/logo.png' alt=""/>
            </a>
          </div>
         
          <div class="login">
           {this.props.loading?
          <div class="authent">
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg' alt=""/>
            <p>מתחבר...</p>
          </div>: null}

          {this.props.loadingForgotPassword?
          <div class="authent">
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg' alt=""/>
            <p>בבדיקה...</p>
          </div>: null}


          {this.props.error?
          <div class="authent">
            {/* <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg' alt=""/> */}
            <p style={{fontSize: "20px"}}>{this.props.error}</p>
          </div>: null}

            <div class="login_title">
            <IconPerson2 fill={'white'}/>
              <span style={{  marginRight: "15px"}}>התחבר לחשבונך</span>
              

            </div>
            <div class="login_fields">

            <form class="login_fields__user">
              <div class="icon">
            <IconCollection2 fill={'white'}/>
            </div>
                {/* <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png' alt=""/>
                </div> */}
                
                {/* <input placeholder='סניף' type='text' style={{width: "100%"}} class="input"  autocomplete="off"/> */}
                  {/* <div class='validation'>
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'/>
                  </div> */}
                {/* </input> */}
             

                <select placeholder='סניף' type='text' id="branchNumber" onChange={(event) => this.inputChangedHandler(event)}
                style={{width: "99%", color: "#afb1be",marginTop: "-2px",background: "#32364a",left: "0",padding: "10px 65px",borderTop: "2px solid #393d52",borderBottom: "2px solid #393d52",borderRight: "none",borderLeft: "none",outline: "none",boxShadow: "none",  fontFamily: "Alef Hebrew"}} class="input"  autocomplete="off">
                      <option>בחר/י סניף</option>
                      <option>תלפיות</option>
                      <option>גבעת שאול</option>
                      <option>מודיעין</option>
            
                  </select>
              </form>


              <form class="login_fields__user">
                <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png' alt=""/>
                </div>
                    {authRedirect}

                <input placeholder='כתובת מייל' id="email" type='text' style={{width: "99%"}} class="input"  autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}/>
                  {/* <div class='validation'>
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'/>
                  </div> */}
                {/* </input> */}
              </form>

              <div class="login_fields__password"  >
                <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png' alt=""/>
                </div>
                <form>
                <input placeholder='סיסמא' id="password" type='password' style={{width: "99%"}} class="input"  autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}/>
                </form>
                <div class="validation">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png' alt=""/>
                </div>
              </div>

              <div class="login_fields__submit">
                <button type='submit' value='כניסה' class="input" onClick={(event) => this.submitHandler(event)} disabled={!this.state.formIsValid} style={!this.state.formIsValid ? {cursor: "not-allowed"}: {}}>כניסה
                  </button>
               
              </div>

              <div class="login_fields__submit">
                <div class="forgot">
                  <a alt="">שכחת סיסמה? פנה למנהל</a>
                </div>
                <div class="forgot" style={!this.state.controls.email.valid ? {cursor: "not-allowed"}: {cursor: "pointer"}} >

                {/* onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,1)}> */}


                  <a alt="" onClick={this.state.controls.email.valid ? () => this.props.onResetPassword(this.state.controls.email.value) : null} >שחזור סיסמה עבור מנהל</a>
                </div>
              </div>
            </div>
            <div class="success">
              <h2>Authentication Success</h2>
              <p>Welcome back</p>
            </div>
            <div class="disclaimer">
              <p>ברוכים הבאים למוסכניק האתר הטוב ביותר לניהול המוסך שלך! כאן תוכל לנהל באופן מלא את המוסך שלך ולקבל את חווית המשתמש הטובה ביותר</p>
            </div>
          </div>
          
          <div class="love">
            <p>נעשה ב <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/love_copy.png" alt=""/> על ידי <a > רותם ואריאל </a></p>
          </div>
       
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

        
// </div>

// </div> 


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
        authRedirectPath: state.auth.authRedirectPath,
        loadingForgotPassword: state.auth.loadingForgotPassword
    };
};

const mapDispatchToProps = dispatch => { // we do this to be able to dispatch something here via props in this component
    
    return {
        onAuthSignIn: (email, password,branchNumber) => dispatch(actions.authSignIn(email, password,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        //onAuth: (email, password, isSignup,branchNumber) => dispatch(actions.auth(email, password,isSignup,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onResetPassword: (email) => dispatch(actions.resetPasswordForAdmin(email))
        
    };
};

//export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(Auth,axios) );
export default connect( mapStateToProps, mapDispatchToProps )(Auth,axios );

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(openNew,axios));