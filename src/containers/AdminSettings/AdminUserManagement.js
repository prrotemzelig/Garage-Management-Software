import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import classes from '../../components/UI/Modal/Modal.module.css';
import { Modal ,Button } from 'react-bootstrap';
import { updateObject, checkValidity} from '../../shared/utility'; 


class AdminUserManagement extends Component {
    allBranchsNumbers = ['Talpiot','GivatShaul', 'Modiin'] ;

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
        },
        taskForm: { 
            newTaskForUser: {
                title: ''
       
            }
        }
        
    }
    
    componentDidMount() { 
        this.props.onFetchUsers(this.props.token, this.props.userId); //, this.props.branchNumber //, this.allBranchsNumbers
    }

    renderDeleteUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
        return(
            <>
            <Button bsStyle="secondary" style={{borderColor: "black",color: "white"}}  onClick={() => this.props.onDeleteUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)} >מחק משתמש</Button>    
            
            {this.props.showDeleteUserModal ?
            this.renderDeleteUserModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)

                : null}
                </>
            );
      }

    
    renderAddTaskToUser = (userKey,userBranchNumber,userToken,firstName,lastName) => { 
        return(
            <>  
            <Button bsStyle="secondary" style={{borderColor: "black",color: "white"}}  onClick={() =>   this.props.onAddNewTaskForUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)} >הוסף משימה</Button>   { ' ' }            
                
                {this.props.showAddNewTaskModal ?
                this.renderAddNewTaskModal( this.props.userKey,this.props.userBranchNumber,this.props.userToken,this.props.firstName,this.props.lastName)
                : null}

            </>
            );
      }


onDeleteUserClick = (userKey,userBranchNumber,userToken) =>  {

   this.props.onUserDelete(this.props.token, userBranchNumber,userKey ,this.props.userId,userToken); 
  }  
  

openAddNewUserModal = (event) => { // add new USER to the system
  this.props.onAddNewUserModalOpening( ); 
};


closeAddNewUser = (event) => {
    this.props.onAddNewUserModalClose(this.props.token); 
  };

  userSignUpHandler = (event) => {

    event.preventDefault(); // we call this to prevent the reloading of the page
    this.props.onUserSignUp(this.props.token,this.props.userId,this.state.controls.firstName.value,this.state.controls.lastName.value,this.state.controls.branchNumber.value,this.state.controls.userPermissions.value, this.state.controls.email.value, this.state.controls.password.value); // pass email value and password value
 
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
    
  }
  this.setState({controls: updateControls});

}

inputTaskChangedHandler = (event) => { 

    const updatedFormElement = updateObject(this.state.taskForm[event.target.id], { 
        title: event.target.value,
     
    });
    const updatedCardForm = updateObject(this.state.taskForm, { 
        [event.target.id]: updatedFormElement 
    });
  
      this.setState({taskForm: updatedCardForm});      
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
    // let formIsValid = true;
    // for (let inputIdentifier in updatedCardForm) {
    //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
    // }
  

    this.setState( { controls: updatedControls } );
      
    }
renderAddNewUserModal = (list) => { ///*** add new user modal! ****

    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
            <div style={{textAlign:"left"}}> 
                  <Button bsStyle="secondary" style={{borderColor: "black"}} onClick={this.closeAddNewUser} >ביטול</Button>{' '}
                  <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.userSignUpHandler} >הוספת משתמש</Button>     </div>
        </div>;
  
     let errorMessage = null;

     //Request failed with status code 400
     //Network Error
        if (this.props.error) { // if it's not null
            errorMessage = (
                <p    style={{  backgroundColor: "black" ,color: "white", textAlign: "center" ,fontSize: "20px" }} >{this.props.error.message}</p>// we get message from firebase. the error come from firebase and its given me a javascript object
            );
        }
      return (
      
          <Modal show={true} onHide={this.closeAddNewUser}   backdrop={false}
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px" }}  >
            <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
              <Modal.Title  >הוספת משתמש חדש</Modal.Title>   
            </Modal.Header>
      
              <div className={classes.separator}></div>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",maxHeight: "100%",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    {errorMessage}
              <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
              <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="firstName"  >שם פרטי</label>
                   <input type="text" id="firstName" autocomplete="off" class="form-control " style={{marginLeft: "10px"}} placeHolder="הכנס/י שם פרטי"
                     onChange={(event) => this.inputChangedHandler(event)} aria-describedby="passwordHelpInline" value={this.state.controls.firstName.value}/>
                 </div>
      
                 <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="lastName" >שם משתמש</label>
                   <input type="text" id="lastName" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)} 
                   style={{marginLeft: "10px"}} value={this.state.controls.lastName.value} placeHolder=" הכנס/י שם משפחה"/>
                 </div>         
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

                 <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="userPermissions" >הרשאות</label>
                   <select type="number" id="userPermissions" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}}  value={this.state.controls.userPermissions.value}>
                            <option selected>בחר/י סוג הרשאות</option>
                            <option selected>{this.state.controls.userPermissions.elementConfig.options[0].displayValue}</option>
                            <option>{this.state.controls.userPermissions.elementConfig.options[1].displayValue}</option>
                            <option>{this.state.controls.userPermissions.elementConfig.options[2].displayValue}</option>
                    </select>
                 </div>
                 </div>
                 
                 <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 

                 <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="email" >כתובת מייל</label>
                   <input type="text" id="email" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}} placeHolder="הכנס/י מייל" value={this.state.controls.email.value}/>
                 </div>
      
                 <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                   <label for="password" >סיסמא</label>
                   <input  type="number"  id="password" class="form-control" autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}
                   style={{marginLeft: "10px"}} placeHolder="הכנס/י סיסמא" aria-describedby="passwordHelpInline" value={this.state.controls.password.value}/>
                 </div>
               </div> 
      
              </Modal.Body>
            <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                 {workButtons}
            </Modal.Footer>
          </Modal> 
          
          );
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
    const formData = {};
        formData['title'] = this.state.taskForm.newTaskForUser.title;
        formData['checked'] = false;
        formData['tag'] = 'NEW';
        formData['list'] = 'todo';
        formData['isEdit'] = false;
        formData['openedByFirstName'] = this.props.AdminFirstName;
        formData['openedByLastName'] = this.props.AdminLastName;
      
    
    this.props.onTaskOpening(formData,token, userBranchNumber, userKey,list); // this contains all the data of card 
    
    this.closeAddNewTaskModal();

    let updateTaskForm =  { 
            newTaskForUser: {  
                title: ''            
            }  
    }
    this.setState({taskForm: updateTaskForm});
}


renderDeleteUserModal = ( userKey,userBranchNumber,userToken,firstName,lastName) => { ///*** TOAST modal! ****

    let nodeBranchNumber = '';
    if(userBranchNumber === 'Talpiot'){
        nodeBranchNumber= 'תלפיות'
    }
    else if(userBranchNumber === 'GivatShaul'){
        nodeBranchNumber= 'גבעת שאול'
    }
    else if(userBranchNumber === 'Modiin'){
        nodeBranchNumber= 'מודיעין'
    }


    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
              <div style={{textAlign:"left"}}> 
              <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick={this.props.onDeleteUserModalClose} >ביטול</Button>{' '}
                <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick= {( ) => this.props.onUserDelete(this.props.token, userBranchNumber,userKey ,this.props.userId,userToken)}>מחק</Button>{' '}
            </div>
        </div>;
  
      return (
     
          <Modal show={true} onHide={this.props.onDeleteUserModalClose} backdrop={false} 
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px",boxShadow: "none",fontFamily: "Alef Hebrew"}}  >
            <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
              <Modal.Title  >מחיקת משתמש</Modal.Title>   
            </Modal.Header>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",maxHeight: "100%",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    
              <div class="form-row" style={{ direction: "rtl" ,fontSize: "22px", marginRight:"auto",fontWeight: "bold"}}> 
            האם למחוק את משתמש {firstName} {lastName}?
                 </div>

              </Modal.Body>

            <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                 {workButtons}
            </Modal.Footer>
          </Modal> 
      
          );
  }
  

  renderAddNewTaskModal = ( userKey,userBranchNumber,userToken,firstName,lastName) => { ///*** TOAST modal! ****

    let nodeBranchNumber = '';
    if(userBranchNumber === 'Talpiot'){
        nodeBranchNumber= 'תלפיות'
    }
    else if(userBranchNumber === 'GivatShaul'){
        nodeBranchNumber= 'גבעת שאול'
    }
    else if(userBranchNumber === 'Modiin'){
        nodeBranchNumber= 'מודיעין'
    }

    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
              <div style={{textAlign:"left"}}> 
              <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick={this.closeAddNewTaskModal} >ביטול</Button>{' '}
                <Button bsStyle="light" style={{borderColor: "black",color: "black"}} onClick= {( event ) => this.taskOpeningHandler( event,this.props.token,userBranchNumber,userKey,'todo')}>אישור</Button>{' '}
            </div>
        </div>;

      return (
     

          <Modal show={true} onHide={this.closeAddNewTaskModal} backdrop={false} 
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px",boxShadow: "none",fontFamily: "Alef Hebrew"}}  >
            <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
              <Modal.Title  >הוספת משימה חדשה למשתמש</Modal.Title>   
            </Modal.Header>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",maxHeight: "100%",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    
              <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
              <div class="form-group col-md-12"  style={{ marginBottom: "4px",width:"100%",height: "100%"}}   > 
              <label for="firstName" style={{ color: "black" ,fontSize: "16px", direction : "rtl",fontWeight: "bold",backgroundColor:"lightskyblue"}} >הוספת משימה חדשה ל: {firstName}{' '}{lastName}</label>

            <textarea name="message" id="newTaskForUser" style={{width: "100%",height: "100%", fontSize: "16px", marginTop: "15px" }} placeHolder="פרטי המשימה"
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
        let cards;
        

        if (this.props.loading) {
            cards = <div style= {{textAlign: "center",position: "center"}}><Spinner/></div>;
        }

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
         <div>
            {
                this.props.loading ? 
                <div style= {{textAlign: "center",position: "center"}}><Spinner/></div>
            :
            <div> 
            <Button bsStyle="secondary" style={{borderColor: "black"}} onClick= {( event ) => this.openAddNewUserModal( event)}>פתיחת משתמש חדש</Button> 
            {this.props.showAddNewUserModel?
                this.renderAddNewUserModal()

            :null} 
              { this.props.showSuccessCase ?
             this.renderToastModal( 'משתמש נפתח בהצלחה')

              :null }
            { this.props.showDeleteSuccessCase ?
                        this.renderToastModal( 'משתמש נמחק בהצלחה')

                        :null }
            { this.props.showAddTaskSuccessCase ?
                        this.renderToastModal( 'משימה הוספה בהצלחה')

                        :null }


            <p> </p>
         
            <div class="table-wrapper" style={{direction: "rtl", backgroundColor: "white"}}>
        <table class="table table-bordered" style={{marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew"}} >
            <thead>   
                <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                    <th  scope="col" style={{ textAlign: "right"}}>סניף</th>
                    <th  scope="col" style={{ textAlign: "right"}}>שם</th>
                    <th  scope="col" style={{ textAlign: "right"}}>מייל</th>
                    <th  scope="col" style={{ textAlign: "right"}}>הרשאות</th>
                    <th  scope="col" style={{ textAlign: "right"}}>פעולות</th> 
                </tr>
            </thead>
            <tbody>

            {this.props.TalpiotUsers.map( user =>  (
                <tr>
                    <td>תלפיות</td>
                    <td>{user.firstName}{' '}{user.lastName}</td>
                    <td>{user.email}</td>                        
                    <td>{user.userPermissions}</td>
                    <td>
                        {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                        {' '}
                        {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                      
                    </td>
                </tr>
                 ))
            }

            {this.props.GivatShaulUsers.map( user =>  (
            <tr>
                <td>גבעת שאול</td>
                <td>{user.firstName}{' '}{user.lastName}</td>
                <td>{user.email}</td>                        
                <td>{user.userPermissions}</td>
                <td>
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                   
                </td>
            </tr>
            ))
            }

            {this.props.ModiinUsers.map( user =>  (
            <tr>
                <td>מודיעין</td>
                <td>{user.firstName}{' '}{user.lastName}</td>
                <td>{user.email}</td>                        
                <td>{user.userPermissions}</td>
                <td>
                    {this.renderDeleteUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                    {' '}
                    {this.renderAddTaskToUser(user.keyUser,user.branchNumber,user.userToken,user.firstName,user.lastName)}
                
                </td>
            </tr>
            ))
            }

            </tbody>
        </table> 
        </div>

            </div>
            }
        </div>
        );
    }
}


const mapStateToProps = state => { 
    return {
        showSuccessCase: state.admin.showSuccessCase,
        error: state.admin.error,
        loading: state.admin.loading,

        token: state.auth.token,
        userId: state.auth.userId,
        AdminFirstName: state.auth.firstName,
        AdminLastName: state.auth.lastName,
        branchNumber: state.auth.branchNumber,

        showAddNewUserModel: state.admin.showAddNewUserModel,
        showDeleteSuccessCase: state.admin.showDeleteSuccessCase,
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
        lastName: state.admin.lastName
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

        onDeleteUserModalOpening: (userKey,userBranchNumber,userToken,firstName,lastName) =>  dispatch(actions.deleteUserModalOpening(userKey,userBranchNumber,userToken,firstName,lastName)),
        onDeleteUserModalClose: ( ) =>  dispatch(actions.deleteUserModalClose()),

        onUserSignUp: (token,userId,firstName,lastName,branchNumber,userPermissions,email, password) => dispatch(actions.authSignUp(token,userId,firstName,lastName,branchNumber,userPermissions,email, password)),
        onToastModalClose: ( ) =>  dispatch(actions.toastModalClose()),
        onTaskOpening: (task, token,branchNumber,userKey,list) => dispatch(actions.taskOpeningForUser(task, token, branchNumber,userKey,list)),

    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( AdminUserManagement, axios ) ); // I need to pass axios otherwise this won't work
// I can check if withErrorHandler by delete from axios.get('/cards.json') the .json and just -> get('/cards')  