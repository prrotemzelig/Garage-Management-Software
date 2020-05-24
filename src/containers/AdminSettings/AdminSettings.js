import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; 
import { Modal  } from 'react-bootstrap';

import classes from './AdminSettings.module.css';
class AdminSettings extends Component {
    state = {
        controls: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' הכנס/י שם פרטי'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                text: ' שם פרטי'
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' הכנס/י שם משפחה'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                text: ' שם משפחה'
            },
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
                text: ' מספר סניף'
            },
            userPermissions: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Admin', displayValue: 'מנהל'},
                        {value: 'User', displayValue: 'משתמש'},
                        {value: 'basic', displayValue: 'בסיסי'}
                    ]
                },

                value: 'User',
                validation: {},
                valid: true,
                touched: false,
                text: ' הרשאות'
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
        }//,
        //isSignup: true
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
        console.log(this.state.controls.branchNumber.value);
        console.log(this.state.controls.userPermissions.value);

        event.preventDefault(); // we call this to prevent the reloading of the page
        this.props.onAuth(this.state.controls.firstName.value,this.state.controls.lastName.value,this.state.controls.branchNumber.value,this.state.controls.userPermissions.value, this.state.controls.email.value, this.state.controls.password.value); // pass email value and password value
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.controls.branchNumber.value); // pass email value and password value

    }

    closeToastModal = () => {

        
        this.props.onToastModalClose(); // this contains all the data of card 
      // this.setState({ showWorkModel: false });
      };
      

    renderToastModal = (message) => { ///*** TOAST modal! ****



        let workButtons =
            <div class="form-group" style={{marginBottom: "4px"}}>
                <div  style={{ color: "white" ,fontSize: "16px", direction : "rtl"}}>{message}</div> 
                  <div style={{textAlign:"left"}}> 
                    <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick={this.closeToastModal} >אישור</Button>{' '}
                </div>
            </div>;
          
          return (
          
              <Modal show={true} onHide={this.closeToastModal}  
                  style={{ display: "flex", textAlign:"right", paddingLeft: "1px"  }}  >
                <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
                  <Modal.Title  >הודעה</Modal.Title>   
                </Modal.Header>
             
                <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                     {workButtons}
                </Modal.Footer>
              </Modal> 
              );
            
      }
    // switchAuthModeHandler = () => {
    //     this.setState(prevState => {
    //         return {isSignup: !prevState.isSignup};
    //     });
    // }

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

        if (this.props.error) { // if it's not null
            errorMessage = (
                <p>{this.props.error.message}</p>// we get message from firebase. the error come from firebase and its given me a javascript object
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            //need to change this after the manager sign the new user to delete the details he wrote maybe
            //authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (   
           
                
        <div  style={{ backgroundColor: "rgb(247, 248, 252)"}}>   
           { this.props.showSuccessCase ?
                    this.renderToastModal( 'משתמש נפתח בהצלחה')

                :null }    
            <div className={classes.Auth}>
                <div style= {{textAlign: "center"}}> 
                 <h3 style={{ paddingBottom: "20px"}}>הוספת משתמשים חדשים לסניף</h3>
            
                {authRedirect}
                {errorMessage}</div>
                <form onSubmit={this.submitHandler}>
                    {form}

                    <div style= {{textAlign: "center"}}> 
                    <Button btnType="Success">הוספת משתמש</Button></div>
                </form>  
                           
            </div>
       
         </div> 
          
        );
    }
}

const mapStateToProps = state => { // for displat the spinner
    return {
        loading: state.auth.loading, // we take access to auth
        error: state.auth.error,
        showSuccessCase: state.card.showSuccessCase,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => { // we do this to be able to dispatch something here via props in this component
    
    return {

        onAuth: (firstName,lastName,branchNumber,userPermissions,email, password) => dispatch(actions.authSignUp(firstName,lastName,branchNumber,userPermissions,email, password)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        //onAuth: (email, password, isSignup,branchNumber) => dispatch(actions.auth(email, password,isSignup,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onToastModalClose: ( ) =>  dispatch(actions.toastModalClose()),

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AdminSettings );