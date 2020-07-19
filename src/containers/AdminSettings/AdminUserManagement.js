import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../../components/UI/Modal/Modal.module.css';
import { Modal ,Button } from 'react-bootstrap';
import { updateObject, checkValidity} from '../../shared/utility'; 
// import { StyleSheet, css } from 'aphrodite/no-important';


class AdminUserManagement extends Component {
    allBranchsNumbers = ['Talpiot','GivatShaul', 'Modiin'] ;

    state = {
        allFormIsValid: false,
        taskIsValid: false,
        branchChangeForMaster: null,
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
                valid: false, //true
                touched: false,
                text: ' מספר סניף'
            },
            userPermissions: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Master', displayValue: 'מאסטר'},
                        {value: 'Admin', displayValue: 'מנהל'},
                        {value: 'User', displayValue: 'משתמש'}
                        // {value: 'basic', displayValue: 'בסיסי'}
                    ]
                },

                value: 'User',
                validation: {},
                valid: false, //true
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
        },
        taskForm: { 
            newTaskForUser: {
                title: ''
       
            }
        }
        
    }
    
    componentDidMount() { 
        this.props.onFetchUsers(this.props.token, this.props.userId); //, this.props.branchNumber //, this.allBranchsNumbers
        this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchNumber,this.props.UserKey); 

        //ariel
        //this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchNumber,this.props.UserKey); 
    }

    // renderDeleteUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
    //     return(
    //         <>
    //         <Button bsStyle="secondary" style={{borderColor: "black",color: "white",fontVariant: "all-petite-caps", width: "auto"}}  onClick={() => this.props.onDeleteUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)} >מחק משתמש</Button>    
            
    //         {this.props.showDeleteUserModal ?
    //         this.renderDeleteUserModal(userKey,userBranchNumber,userToken,firstName,lastName)
    //         // this.renderDeleteUserModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)

    //             : null}
    //             </>
    //         );
    //   }

    inputBranchChangeForMasterHandler = (event) => { 
        event.preventDefault(); 
        const updatedCardForm = updateObject(this.state, { 
            [event.target.id]: event.target.value 
        });
        this.setState({state: updatedCardForm}); 

        let newBranchNumber;
        if(event.target.value === 'תלפיות'){
            newBranchNumber = 'Talpiot';
        }
        else if(event.target.value === 'גבעת שאול'){
            newBranchNumber = "GivatShaul";
        }
        else if(event.target.value === 'מודיעין'){
            newBranchNumber = 'Modiin';
        }
        this.setState(prevState => {
            return {branchChangeForMaster: this.state.branchChangeForMaster };
            });
            this.props.onBranchChangeForMaster(newBranchNumber); 

            
  }

//this.props.onDeleteUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)}
      renderDeleteUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
        //   console.log(userKey);
        // //   console.log(userBranchNumber);
        //   console.log(userToken);
        //   console.log(firstName);
        // //   console.log(lastName);
        return(
            <>
            <Button bsStyle="secondary" style={{borderColor: "black",color: "white",fontVariant: "all-petite-caps", width: "auto"}}  
            // eslint-disable-next-line no-restricted-globals
            onClick={() => {if(confirm("האם למחוק את משתמש " + firstName.toString() + " " + lastName.toString() + "?" )){this.props.onUserDelete(this.props.token, userBranchNumber,userKey ,this.props.userId,userToken)};}}>הסר משתמש</Button>    
            

            
            {/* {this.props.showDeleteUserModal ?
            this.renderDeleteUserModal(userKey,userBranchNumber,userToken,firstName,lastName)
            // this.renderDeleteUserModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)

                : null} */}
                </>
            );
      }
     // האם למחוק את משתמש {firstName} {lastName}?

    
    renderAddTaskToUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
        return(
            <>  
            <Button bsStyle="secondary" style={{borderColor: "black",color: "white",fontVariant: "all-petite-caps", width: "auto"}}  onClick={() =>   this.props.onAddNewTaskForUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)} >הוסף משימה</Button>   { ' ' }            
                {this.props.showAddNewTaskModal ?
                // this.renderAddNewTaskModal( userKey,userBranchNumber,userToken,firstName,lastName)
                this.renderAddNewTaskModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)

                : null}

            </>
            );
      }

      renderResetPasswordToUser = (email,firstName,lastName) => { 
        return(
            <>  
            <Button bsStyle="secondary" style={{borderColor: "black",color: "white",fontVariant: "all-petite-caps", width: "auto"}}  
            onClick={() => this.props.onResetPassword(email)} >שחזור סיסמה</Button>   { ' ' }



            </>
            );
      }


    //   renderForgetPasswordUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
    //     return(
    //         <>  
    //         <Button bsStyle="secondary" style={{borderColor: "black",color: "white"}}  onClick={() =>   this.props.onAddNewTaskForUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)} >שחזור סיסמא</Button>   { ' ' }            
    //             {this.props.showAddNewTaskModal ?
    //             this.renderAddNewTaskModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)
    //             : null}

    //         </>
    //         );
    //   }
      
// onDeleteUserClick = (userKey,userBranchNumber,userToken) =>  {
//    this.props.onUserDelete(this.props.token, userBranchNumber,userKey ,this.props.userId,userToken); 
// }  
  

openAddNewUserModal = (event) => { // add new USER to the system
  this.props.onAddNewUserModalOpening( ); 
};

closeAddNewUser = (event) => {
    this.props.onAddNewUserModalClose(this.props.token); 
    this.setTheStates();

};

  userSignUpHandler = (event) => {

    event.preventDefault(); // we call this to prevent the reloading of the page
    this.props.onUserSignUp(this.props.token,this.props.userId,this.state.controls.firstName.value,this.state.controls.lastName.value,this.state.controls.branchNumber.value,this.state.controls.userPermissions.value, this.state.controls.email.value, this.state.controls.password.value); // pass email value and password value
 
    this.setTheStates();

//     let updateControls = {
            
//         firstName: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: ' הכנס/י שם פרטי'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             text: ' שם פרטי'
//         },
//         lastName: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'text',
//                 placeholder: ' הכנס/י שם משפחה'
//             },
//             value: '',
//             validation: {
//                 required: true
//             },
//             valid: false,
//             touched: false,
//             text: ' שם משפחה'
//         },
//         branchNumber: {
//             elementType: 'select',
//             elementConfig: {
//                 options: [ 
//                     {value: 'Talpiot', displayValue: 'תלפיות'},
//                     {value: 'GivatShaul', displayValue: 'גבעת שאול'},
//                     {value: 'Modiin', displayValue: 'מודיעין'}
//                 ]
//             },
//             value: 'Talpiot',
//             validation: {},
//             valid: false, //true
//             touched: false,
//             text: ' מספר סניף'
//         },
//         userPermissions: {
//             elementType: 'select',
//             elementConfig: {
//                 options: [
//                     {value: 'Admin', displayValue: 'מנהל'},
//                     {value: 'User', displayValue: 'משתמש'},
//                     {value: 'basic', displayValue: 'בסיסי'}
//                 ]
//             },

//             value: 'User',
//             validation: {},
//             valid: false, // true
//             touched: false,
//             text: ' הרשאות'
//         },
//         email: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'email',
//                 placeholder: 'הכנס/י מייל'
//             },
//             value: '',
//             validation: {
//                 required: true,
//                 isEmail: true
//             },
//             valid: false,
//             touched: false,
//             text: ' כתובת מייל'
//         },
//         password: {
//             elementType: 'input',
//             elementConfig: {
//                 type: 'password',
//                 placeholder: 'הכנס/י סיסמא'
//             },
//             value: '',
//             validation: {
//                 required: true,
//                 minLength: 6
//             },
//             valid: false,
//             touched: false,
//             text: ' סיסמא'
//         }
    
//   }
//   this.setState({controls: updateControls});

}


setTheStates = () => {

    let updateControls = {
            
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
            valid: false, //true
            touched: false,
            text: ' מספר סניף'
        },
        userPermissions: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'Master', displayValue: 'מאסטר'},
                    {value: 'Admin', displayValue: 'מנהל'},
                    {value: 'User', displayValue: 'משתמש'}
                    // {value: 'basic', displayValue: 'בסיסי'}
                ]
            },

            value: 'User',
            validation: {},
            valid: false, // true
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
    
  }
  this.setState({controls: updateControls});


    //   document.getElementById("workCardForm").reset(); 
    // document.getElementById("workCardForm").reset(); 
   
  
    }



inputTaskChangedHandler = (event) => { 

    const updatedFormElement = updateObject(this.state.taskForm[event.target.id], { 
        title: event.target.value,
     
    });
    const updatedCardForm = updateObject(this.state.taskForm, { 
        [event.target.id]: updatedFormElement 
    });
  
    let taskIsValid = false;
    if(event.target.value!== ''){
        taskIsValid = true;
    }
      this.setState({taskForm: updatedCardForm,taskIsValid:taskIsValid});      
    }

inputChangedHandler = (event) => { 
    const updatedFormElement = updateObject(this.state.controls[event.target.id], { 
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[event.target.id].validation),
        touched: true
    });
    const updatedControls = updateObject(this.state.controls, { // here we want to update the overall card for a given input identifer
        [event.target.id]: updatedFormElement // here we need to pass javascript object and pass a new properties and it should be dynamic input identifier where we pick a specific control.
    });
  
//    let formIsValid = true;
    // if (event.target.id === 'licenseNumber'   ) { // the user must enter valid car number! the rest does not matter
    //     formIsValid = updatedCardForm[event.target.id].valid;  
    // }
    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {

        if(event.target.id ==='branchNumber' && inputIdentifier === 'branchNumber'  ){
            if(event.target.value==='בחר/י סניף' ){
                formIsValid = false; //true
                updatedControls[inputIdentifier].valid = false;  
            }
            else{
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }
        else if(event.target.id === 'userPermissions' && inputIdentifier=== 'userPermissions'){
            if(event.target.value ==='בחר/י סוג הרשאות'){
                formIsValid = false;
                updatedControls[inputIdentifier].valid = false;
            }
            else{
                formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
            }
        }
        else{
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;

        }
//        formIsValid = updatedControls[inputIdentifier].valid && formIsValid;

    }


    this.setState( { controls: updatedControls,allFormIsValid: formIsValid } );
      
    }
renderAddNewUserModal = (list) => { ///*** add new user modal! ****

    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
            <div style={{textAlign:"left"}}> 
                  <Button bsStyle="secondary" style={{borderColor: "black"}} onClick={this.closeAddNewUser} >ביטול</Button>{' '}
                  
                  <Button bsStyle="secondary" style={{borderColor: "black"}} disabled={!this.state.allFormIsValid}  onClick={this.userSignUpHandler} >הוספת משתמש</Button>     </div>
        </div>;
  
    //  let errorMessage = null;

     //Request failed with status code 400
     //Network Error
        // if (this.props.error) { // if it's not null
        //     errorMessage = (
        //         <p    style={{  backgroundColor: "black" ,color: "white", textAlign: "center" ,fontSize: "20px" }} >{this.props.error.message}</p>// we get message from firebase. the error come from firebase and its given me a javascript object
        //     );
        // }

    //     if (this.props.error) { // if it's not null
    //     alert(this.props.error);
    //     // errorMessage = (
    //     //     <p    style={{  backgroundColor: "black" ,color: "white", textAlign: "center" ,fontSize: "20px" }} >{this.props.error.message}</p>// we get message from firebase. the error come from firebase and its given me a javascript object
    //     // );
    // }
      return (
        
          <Modal show={this.props.showAddNewUserModel} onHide={this.closeAddNewUser}   backdrop={false}
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px" }}  >
            <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
              <Modal.Title  >הוספת משתמש חדש</Modal.Title>   
            </Modal.Header>
      
              <div className={classes.separator}></div>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    {/* {errorMessage} */}
                    <form autocomplete="on">
              <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
              <form  class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="firstName"  >שם פרטי</label>
                   <input type="text" id="firstName" autocomplete="off" class="form-control " style={{marginLeft: "10px"}} placeHolder="הכנס/י שם פרטי"
                     onChange={(event) => this.inputChangedHandler(event)}  value={this.state.controls.firstName.value}/>
                 </form >
      
                 <form  class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="lastName" >שם משפחה</label>
                   <input type="text" id="lastName" autocomplete="off" class="form-control" onChange={(event) => this.inputChangedHandler(event)} 
                   style={{marginLeft: "10px"}} value={this.state.controls.lastName.value} placeHolder=" הכנס/י שם משפחה"/>
                 </form >         
                 </div>
      
                 <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto" }}> 
      
                 <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="branchNumber" >סניף</label>
                   <select type="number" id="branchNumber" class="form-control" autocomplete="off" onChange={(event) => this.inputChangedHandler(event)} 
                   aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} value={this.state.controls.branchNumber.value}>
                            <option selected> בחר/י סניף</option>
                            <option selected>{this.state.controls.branchNumber.elementConfig.options[0].displayValue}</option>
                            <option>{this.state.controls.branchNumber.elementConfig.options[1].displayValue}</option>
                            <option>{this.state.controls.branchNumber.elementConfig.options[2].displayValue}</option>
                </select> 
                 </div>

                 <form  class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="userPermissions" >הרשאות</label>
                   <select type="number" id="userPermissions" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}}  value={this.state.controls.userPermissions.value}>
                            <option selected>בחר/י סוג הרשאות</option>
                            <option selected>{this.state.controls.userPermissions.elementConfig.options[0].displayValue}</option>
                            <option selected>{this.state.controls.userPermissions.elementConfig.options[1].displayValue}</option>
                            <option>{this.state.controls.userPermissions.elementConfig.options[2].displayValue}</option>
                            {/* <option>{this.state.controls.userPermissions.elementConfig.options[2].displayValue}</option> */}
                    </select>
                 </form>
                 </div>
                 
                 <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 

                 <form  class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="email" >כתובת מייל</label>
                   <input type="email" id="email" class="form-control" autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}} placeHolder="הכנס/י מייל" value={this.state.controls.email.value}/>
                 </form >
      
                 <form  class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="password" >סיסמא</label>
                   <input  type="text"  id="password" class="form-control" autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}} placeHolder="הכנס/י סיסמא"  value={this.state.controls.password.value}/>
                 </form >
               </div> 
               </form>
              </Modal.Body>
            <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                 {workButtons}
            </Modal.Footer>
          </Modal> 
          
          );
  }


  alertModal = (list) => { 
        this.props.onToastModalClose(); 
        alert(list);         
  }

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


  closeToastModal = (event) => {
    this.props.onToastModalClose(); 
  };
  

  closeAddNewTaskModal = (event) => {
    this.props.onAddNewTaskForUserModalClose(); 
  };
  
  taskOpeningHandler = ( event,token,userBranchNumber,userKey,list ) => {
    event.preventDefault(); // with that we get the task details
    this.closeAddNewTaskModal();

    const formData = {};
        formData['title'] = this.state.taskForm.newTaskForUser.title;
        formData['checked'] = false;
        formData['tag'] = this.props.AdminFirstName  ; //'חדש'
        formData['list'] = 'todo';
        formData['isEdit'] = false;
        formData['openedByFirstName'] = this.props.AdminFirstName;
        formData['openedByLastName'] = this.props.AdminLastName;
    
    this.props.onTaskOpening(formData,token, userBranchNumber, userKey,list); // this contains all the data of card 
    let notification={};
    notification['type']='task';
    notification['description']=this.state.taskForm.newTaskForUser.title;
    notification['openedBy'] = this.props.AdminFirstName+' '+this.props.AdminLastName;
    notification['show']='false';
    this.props.onNotificationOpening(notification,token, userBranchNumber, userKey,this.props.userId,this.props.userkey);
    //this.closeAddNewTaskModal();
    let updateTaskForm =  { 
            newTaskForUser: {  
                title: ''            
            }  
    }
    this.setState({taskForm: updateTaskForm});

}


// renderDeleteUserModal = ( userKey,userBranchNumber,userToken,firstName,lastName) => { ///*** TOAST modal! ****

//     // let nodeBranchNumber = '';
//     // if(userBranchNumber === 'Talpiot'){
//     //     nodeBranchNumber= 'תלפיות'
//     // }
//     // else if(userBranchNumber === 'GivatShaul'){
//     //     nodeBranchNumber= 'גבעת שאול'
//     // }
//     // else if(userBranchNumber === 'Modiin'){
//     //     nodeBranchNumber= 'מודיעין'
//     // }


//     let workButtons =
//         <div class="form-group" style={{marginBottom: "4px"}}>
//               <div style={{textAlign:"left"}}> 
//               <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick={this.props.onDeleteUserModalClose} >ביטול</Button>{' '}
//                 <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick= {( ) => this.props.onUserDelete(this.props.token, userBranchNumber,userKey ,this.props.userId,userToken)}>מחק</Button>{' '}
//             </div>
//         </div>;
  
//       return (
     
//           <Modal show={true} onHide={this.props.onDeleteUserModalClose} backdrop={false} 
//               style={{ display: "flex", textAlign:"right", paddingLeft: "1px",boxShadow: "none",fontFamily: "Alef Hebrew"}}  >
//             <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
//               <Modal.Title  >מחיקת משתמש</Modal.Title>   
//             </Modal.Header>
//             <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    
//               <div class="form-row" style={{ direction: "rtl" ,fontSize: "22px", marginRight:"auto",fontWeight: "bold"}}> 
//             האם למחוק את משתמש {firstName} {lastName}?
//                  </div>

//               </Modal.Body>

//             <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
//                  {workButtons}
//             </Modal.Footer>
//           </Modal> 
      
//           );
//   }
  

  renderAddNewTaskModal = ( userKey,userBranchNumber,userToken,firstName,lastName) => { ///*** TOAST modal! ****

    // let nodeBranchNumber = '';
    // if(userBranchNumber === 'Talpiot'){
    //     nodeBranchNumber= 'תלפיות'
    // }
    // else if(userBranchNumber === 'GivatShaul'){
    //     nodeBranchNumber= 'גבעת שאול'
    // }
    // else if(userBranchNumber === 'Modiin'){
    //     nodeBranchNumber= 'מודיעין'
    // }

    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
              <div style={{textAlign:"left"}}> 
              <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick={this.closeAddNewTaskModal} >ביטול</Button>{' '}
                <Button bsStyle="light" style={{borderColor: "black",color: "black"}} disabled={!this.state.taskIsValid} onClick= {( event ) => this.taskOpeningHandler( event,this.props.token,userBranchNumber,userKey,'todo')}>אישור</Button>{' '}
            </div>
        </div>;

      return (
     

          <Modal show={this.props.showAddNewTaskModal} onHide={this.closeAddNewTaskModal} backdrop={false} 
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px",boxShadow: "none",fontFamily: "Alef Hebrew"}}  >
            <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
              <Modal.Title  >הוספת משימה חדשה למשתמש</Modal.Title>   
            </Modal.Header>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    
              <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
              <div class="form-group col-md-12"  style={{ marginBottom: "4px",width:"100%",height: "100%"}}   > 
              <label for="firstName" style={{ color: "black" ,fontSize: "16px", direction : "rtl",fontWeight: "bold",backgroundColor:"lightskyblue"}} >הוספת משימה חדשה ל: {firstName}{' '}{lastName}</label>

            <textarea name="message" id="newTaskForUser" style={{width: "100%",height: "100%", fontSize: "16px", marginTop: "15px" }}  placeHolder="פרטי המשימה"
            onChange={(event) => this.inputTaskChangedHandler(event)}/>
                </div> 
                 </div>

              </Modal.Body>

            <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                 {workButtons}
            </Modal.Footer>
          </Modal> 
      
          );
  }
  

    render () {

        if(this.props.branchNumber === 'Talpiot'){
            this.state.branchChangeForMaster = 'תלפיות';

        }
        else if(this.props.branchNumber === 'GivatShaul'){
            this.state.branchChangeForMaster = 'גבעת שאול';

        }
        else if(this.props.branchNumber === 'Modiin'){
            this.state.branchChangeForMaster = 'מודיעין';

        }
        // let cards;

        // if (this.props.loading) {
        //     cards = <div style= {{textAlign: "center",position: "center"}}><Spinner/></div>;
        // }

        // else if ( !this.props.loading ) { // if it not true - if we not loading
        //     cards = this.props.cards.map( card => (
        //         <Card
        //             key={card.id}
        //             cardData={card.cardData}
        //             customerData={card.customerData}
        //             carData={card.carData}
        //             />
        //     ) )
        // }
        return (
            <div class="form-row" > 
         <div  class="form-group col-md-12">
            {
                this.props.loadingFetchUsers ? 
                <div style= {{textAlign: "center",position: "center"}}><Spinner/></div>
            :
            <div> 
            <div class="form-row" style={{direction: "rtl"}} >
            <div    >       
            <Button bsStyle="secondary" style={{borderColor: "black",marginLeft: "20px"}} onClick= {( event ) => this.openAddNewUserModal( event)}>פתיחת משתמש חדש</Button> 
            </div>

            <div    >       
            {this.props.userPermissions ==='Master'  ?
            <div style={{display: "flex"}}>
            <div  style={{ marginLeft: "5px"}}  >       
            <label for="branchChangeForMaster">שינוי סניף להצגת כל הנתונים</label>
            </div>
            <div   >       
            <select  id="branchChangeForMaster" class="form-control"    
            value={ this.state.branchChangeForMaster}  
            onChange={(event) => this.inputBranchChangeForMasterHandler(event)}>
                    <option>תלפיות</option>
                    <option>גבעת שאול</option>
                    <option>מודיעין</option> 
            </select>
            </div>
            </div>
            : null       
                }
           </div>

            </div>
            {this.props.showAddNewUserModel?
                this.renderAddNewUserModal()
            :null} 
              { this.props.showSuccessCase && !this.props.loading && !this.props.showAddNewUserModel ?
                    this.alertModal('משתמש נפתח בהצלחה')
              :null }
            {/* { this.props.showDeleteSuccessCase ?
                        this.renderToastModal( 'משתמש נמחק בהצלחה')

                        :null } */}
            { this.props.showAddTaskSuccessCase && !this.props.loading ?
                this.alertModal('משימה הוספה בהצלחה')
                        :null }
            { this.props.error ?
                    this.alertModal(this.props.error)  :
                    null
             }

            <p> </p>
         
            <div class="table-wrapper" style={this.props.backgroundColor=== 'light' ? {direction: "rtl", backgroundColor: "white"}
            : {direction: "rtl", backgroundColor: "#27293d" , color: "rgba(255, 255, 255, 0.8)",  tableLayout: "fixed"}}>
        <table class="table table-bordered" style={window.innerWidth > '376' ? {marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew",  tableLayout: "fixed"}: {marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew"}} >
            <thead>  
            <>
            {window.innerWidth > '376' ?

             <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                    <th  scope="col" style={{ textAlign: "right"}}>סניף</th>
                    <th  scope="col" style={{ textAlign: "right"}}>שם</th>
                    <th  scope="col" style={{ textAlign: "right"}}>הרשאות</th>
                    <th  scope="col" style={{ textAlign: "right"}}>מייל</th>
                    <th  scope="col" style={{ textAlign: "right",width:"30%"}}>פעולות</th> 
                </tr>
            :
            <tr style={{fontWeight: "bold", fontSize: "18px"}}>
            <th  scope="col" style={{ textAlign: "right"}}>פרטים</th>
            <th  scope="col" style={{ textAlign: "right"}}>הרשאות</th>
            <th  scope="col" style={{ textAlign: "right"}}>פעולות</th> 
            </tr> }
            </>
            </thead>
            <tbody>

            {this.props.TalpiotUsers.map( user =>  (
                <>
                {user.email !== this.props.email ?
                <>
                    {window.innerWidth > '376' ?
                    <tr> 
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>תלפיות</td>
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.firstName}{' '}{user.lastName}</td>
                    {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.email}</td>  
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                        {' '}
                        {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                        {' '}
                        {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                        {' '}                
                        {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                        {' '}
                    </td>
                    </tr>      
                    :
                    <tr>
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>תלפיות<br/>{user.firstName}{' '}{user.lastName}<br/>{user.email}</td>
                    {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }

                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                        {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                        {' '}
                        {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                        {' '}
                        {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    </td>
                    </tr>
                    }
                    </>
                    :null}
                     </> 
                 ))     
            }

            {this.props.GivatShaulUsers.map( user =>  (
                <>
                 {user.email !== this.props.email ?
                <>
                {window.innerWidth > '376' ?
                <tr> 
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>גבעת שאול</td>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.firstName}{' '}{user.lastName}</td>
                {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }

                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.email}</td>  
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                    {' '}
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                </td>
                </tr>      
                :
                <tr>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>גבעת שאול<br/>{user.firstName}{' '}{user.lastName}<br/>{user.email}</td>
                {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                    {' '}
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)} 
                </td>
                </tr>
                }
                       </>
                    :null}

                </>
            ))
            }

            {this.props.ModiinUsers.map( user =>  (
        
                <>
                  {user.email !== this.props.email ?
                <>
                {window.innerWidth > '376' ?
                <tr> 
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מודיעין</td>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.firstName}{' '}{user.lastName}</td>
                {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.email}</td>  
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                    {' '}
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                </td>
                </tr>      
                :
                <tr>
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מודיעין<br/>{user.firstName}{' '}{user.lastName}<br/>{user.email}</td>
                {user.userPermissions ==='Master'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מאסטר</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='Admin'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>מנהל</td>
                      : 
                        null
                    }
                    {user.userPermissions ==='User'? 
                        <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>משתמש</td>
                      : 
                    null
                    }
                <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word",width: "100%"}}>
                    
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderResetPasswordToUser(user.email,user.firstName,user.lastName)}
                     {' '}
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                </td>
                </tr>
                }
                     </>
                    :null}
                </>
            ))
            }

            </tbody>
        </table> 
        </div>

            </div>
            }
        </div>
        </div>
        );
    }
}

/* <tr>
                
<td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.firstName}{' '}{user.lastName}</td>
<td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.email}</td>                        
<td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{user.userPermissions}</td>
<td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word", width: "100%"}}>
    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
    {' '}
    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}

</td>
</tr> */
const mapStateToProps = state => { 
    return {
        showSuccessCase: state.admin.showSuccessCase,
        error: state.admin.error,
        loading: state.admin.loading,
        loadingFetchUsers: state.admin.loadingFetchUsers,
        token: state.auth.token,
        userId: state.auth.userId,
        AdminFirstName: state.auth.firstName,
        AdminLastName: state.auth.lastName,
        branchNumber: state.auth.branchNumber,
        UserKey: state.auth.userKey,

        showAddNewUserModel: state.admin.showAddNewUserModel,
        // showDeleteSuccessCase: state.admin.showDeleteSuccessCase,
        showAddNewTaskModal: state.admin.showAddNewTaskModal,
        showDeleteUserModal: state.admin.showDeleteUserModal,
        showAddTaskSuccessCase: state.admin.showAddTaskSuccessCase,
        TalpiotUsers: state.admin.TalpiotUsers,
        GivatShaulUsers: state.admin.GivatShaulUsers,
        ModiinUsers: state.admin.ModiinUsers,

        userKey: state.admin.userKey,
        userBranchNumber: state.admin.userBranchNumber,
        userToken: state.admin.userToken,
        firstName: state.admin.firstName,
        lastName: state.admin.lastName,
        backgroundColor: state.auth.backgroundColor,
        userPermissions: state.auth.userPermissions,
        email: state.auth.email

        
        //notification: state.notification.notification,
        //notificationKey: state.notification.notificationId


    };
};

const mapDispatchToProps = dispatch => { 
    return {
        onFetchUsers: (token,userId) => dispatch( actions.fetchUsers(token, userId)), //allBranchsNumbers 
        onUserDelete: (token, userBranchNumber,userKey ,userId,userToken) => dispatch( actions.UserDelete(token,userBranchNumber,userKey,userId,userToken)),
        onAddNewUserModalOpening: ( ) =>  dispatch(actions.AddNewUserModalOpening()),
        onAddNewUserModalClose: (token ) =>  dispatch(actions.AddNewUserModalClose(token)),

        onAddNewTaskForUserModalOpening: ( userKey,userBranchNumber,userToken,firstName,lastName) =>  dispatch(actions.addNewTaskForUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)),
        onAddNewTaskForUserModalClose: (token ) =>  dispatch(actions.addNewTaskForUserModalClose(token)),

        // onDeleteUserModalOpening: (userKey,userBranchNumber,userToken,firstName,lastName) =>  dispatch(actions.deleteUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)),
        onDeleteUserModalClose: ( ) =>  dispatch(actions.deleteUserModalClose()),

        onUserSignUp: (token,userId,firstName,lastName,branchNumber,userPermissions,email, password) => dispatch(actions.authSignUp(token,userId,firstName,lastName,branchNumber,userPermissions,email, password)),
        onBranchChangeForMaster: (newBranchNumber) => dispatch(actions.branchChangeForMaster(newBranchNumber)),
        onToastModalClose: ( ) =>  dispatch(actions.toastModalClose()),
        onTaskOpening: (task, token,branchNumber,userKey,list) => dispatch(actions.taskOpeningForUser(task, token, branchNumber,userKey,list)),
        onResetPassword: (email) => dispatch(actions.resetPassword(email)),

        
        onNotificationOpening: (notification, token,branchNumber,userKey,userId,userLoggedInKey) => dispatch(actions.notificationOpening(notification, token, branchNumber,userKey,userId,userLoggedInKey)),
        onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey))
        //onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey)),
        //onNotificationDelete:(token,branchNumber,userKey,notificationKey ,userId)=>dispatch(actions.notificationDelete(token,branchNumber,userKey,notificationKey ,userId))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( AdminUserManagement, axios ) ); // I need to pass axios otherwise this won't work
// I can check if withErrorHandler by delete from axios.get('/cards.json') the .json and just -> get('/cards')  