
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import dd from './openNew.module.css';
// import DatePicker from "react-datepicker";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { database } from 'firebase';
import "react-datepicker/dist/react-datepicker.css";
// import Image from './images.js';
// import Button2 from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; //checkFormatNumbers
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
// import card from '../../components/Card/Card';
// import { FaThinkPeaks } from 'react-icons/fa';
import { Modal ,Button } from 'react-bootstrap';
import classes from '../../components/UI/Modal/Modal.module.css';
import * as emailjs from 'emailjs-com'
import { Form, FormGroup, Label, Input } from 'reactstrap' // FormFeedback,



const getDateTime = () => {
  let tempDate = new Date();
  let date = tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds() +' '+ tempDate.getDate() + '.' + (tempDate.getMonth()+1) + '.' + tempDate.getFullYear(); 
  return date;
}
class openNew extends Component   {
  
    constructor(props) {
        super(props)
    this.state = {
    //cardKey:'',
    name: '',
    email: '',
    subject: '',
    message: '',
    car_data:[],
    card_data:[],
    customer_data:[],
    branchNumber:'',
    identifiedCardID:'',
    rows: [],
    car_term:'',
    card_term:'',
    customer_term:'',
    cards:{},
    book:[],
    userCarNumber:'',
    dataBaseCarNumber:'',
    cardDetails:{},
    carDetails:{},
    imageFiles:[],
    imageArray:[],
    docFiles:[],
    found: false,
    customer_details:{},
    startDate: new Date(),
    myDate: new Date(),
    reportStartDate: getDateTime(),
    formIsValid: false,
    isAddNewWorkOrPartOpen: false,
    isUpdateWorkOrPartOpen: false,
    itemKeyForUpdateWorkOrPart: '',
    showDetailsDiv: true,
    showCarInfoDiv:true,
    showCustomerDetailsDiv: true,
    showTinsmithingDetailsDiv:true,
    showCustomerRequestsDiv:true,
    showUploadDocDiv:true,
    showSendMailDiv: true,
//    showWorkModel: false,

    cardForm: { 
      licenseNumber: {
        value: '',
        validation: {
          required: true,
          minLength: 3, //need to change to 7 
          maxLength: 10, //need to change to 8 
          isNumeric: true
      },
        valid: false,
        touched: false
      }, 
      
      ticketNumber: {
        value: '',
        valid: false,
        touched: false
      }, 

      cardType: {
        value: '', //ביטוח
        valid: false,
        touched: false
      } ,

      openingDate: {
        value: getDateTime(),
        valid: false,
        touched: false
      },
     
      insuranceAgent:{
        value: '',
        valid: false,
        touched: false
      },
       
      appraiser:{
        value: '',
        valid: false,
        touched: false
      },
          
      insuranceCompany:{
        value: '',
        valid: false,
        touched: false
      },
          
      customerParticipation:{
        value: '',
        valid: false,
        touched: false
      },

      policyNumber:{
        value: '',
        valid: false,
        touched: false
      },

      claimNumber:{
        value: '',
        valid: false,
        touched: false
      },
        
      dateOfDamage:{
        value: '',
        valid: false,
        touched: false
      },

      customerRequests:{
        value: '',
        valid: false,
        touched: false
      }

    },

    vehicleData: { 

    
      carDescription:{
        value: '',
        valid: false,
        touched: false
      },
      speedometer:{
        value: '',
        valid: false,
        touched: false
      },
     
      engineCapacity:{
        value: '',
        valid: false,
        touched: false
      },
      color:{
        value: '',
        valid: false,
        touched: false
      },
      chalkModel:{
        value: '',
        valid: false,
        touched: false
      },
      lastVisit:{
        value: '',
        valid: false,
        touched: false
      },
      manufactureYear:{
        value: '',
        valid: false,
        touched: false
      },
      deliveryDate:{
        value: '',
        valid: false,
        touched: false
      },
      driverName:{
        value: '',
        valid: false,
        touched: false
      },
      code:{
        value: '',
        valid: false,
        touched: false
      },
      carNote:{
        value: '',
        valid: false,
        touched: false
      }
    },
 
    customerDetails:{
      
      customerNumber:{
        value: '',
        valid: false,
        touched: false
      },
      customerName:{
        value: '',
        valid: false,
        touched: false
      },
      address:{
        value: '',
        valid: false,
        touched: false
      },
      city:{
        value: '',
        valid: false,
        touched: false
      },
      postalCode:{
        value: '',
        valid: false,
        touched: false
      },
      homePhone:{
        value: '',
        valid: false,
        touched: false
      },
      cellphone:{
        value: '',
        valid: false,
        touched: false
      },
      workingPhone:{
        value: '',
        valid: false,
        touched: false
      },
      identificationNumber:{
        value: '',
        valid: false,
        touched: false
      },
      mailAdress:{
        value: '',
        valid: false,
        touched: false
      },
      orderNumber:{
        value: '',
        valid: false,
        touched: false
      },
      customerNote:{
        value: '',
        valid: false,
        touched: false
      }
    },

    cardWork:{

      workDescription:{
        value: '',
        valid: false,
        touched: false
      },
      time:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false,
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }

    },
  
    cardPart:{
      partDescription:{
        value: '',
        valid: false,
        touched: false
      },
      amount:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false,
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }
    }
  }; 
}
//    constructor(props){
//      super(props);
//      this.state = {
//                reportStartDate: getDateTime(),
//           }
//   };

  cardOpeningHandler = ( event ) => {
    event.preventDefault(); // with that we get the Card details
    const formData = {};
    for (let formElementIdentifier in this.state.cardForm) {
      formData[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
  }

  formData['ticketNumber'] = this.props.cards.length + this.props.closeCards.length + 1;
  console.log(formData['ticketNumber']);
  const carData = {};
  for (let formElementIdentifier in this.state.vehicleData) {
    carData[formElementIdentifier] = this.state.vehicleData[formElementIdentifier].value;
  }

const customerData = {};
for (let formElementIdentifier in this.state.customerDetails) {
  customerData[formElementIdentifier] = this.state.customerDetails[formElementIdentifier].value;
}

    const card = { // here we  prepare the card data
        cardData: formData,
        carData: carData, 
        customerData: customerData,
        userId: this.props.userId,
        branchNumber: this.props.branchNumber
    }   

  //  this.setState({found: true});

  //  console.log(this.state.found);
    this.props.onCardOpening(card,this.props.userId,this.props.token, this.props.branchNumber, 'cards'); // this contains all the data of card 
    // this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);


    // let cards;    

    // console.log(this.state.cardForm.licenseNumber.value);
    //   cards = this.props.cards.map( card => (
    //     this.check(card,this.state.cardForm.licenseNumber.value)
    //   ))
    
  
    //   if(this.state.found === true){
    //     console.log("385");
    //     this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
    //   }
  //   if ( this.props.showSuccessCase ) {  //this.props.loading
  //     console.log("371");
  //     return(
      

  //       <div  class="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{opacity: "inherit",alignSelf: "center"}}>
  //           <div class="toast-header">
  //             <img src="..." class="rounded mr-2" alt="..."/>
  //             <strong class="mr-auto">Bootstrap</strong>
  //             <small>11 mins ago</small>
  //             <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
  //                 <span aria-hidden="true">&times;</span>
  //             </button>
  //           </div>

  //           <div class="toast-body">
  //           Hello, world! This is a toast message.
  //           </div>
  //       </div>
  
  //     );
  // }
 
}



inputChangedHandler = (event) => { 
console.log(event.target.id);
console.log(event.target.value);

  const updatedFormElement = updateObject(this.state.cardForm[event.target.id], { 
      // here we pass my cardForm and there (inputIdentifier) -> it show the control 
      // this.state.cardForm[inputIdentifier] -> this is the old object
      // the second object it a java script object
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
      touched: true
  });
  const updatedCardForm = updateObject(this.state.cardForm, { // here we want to update the overall card for a given input identifer
      [event.target.id]: updatedFormElement // here we need to pass javascript object and pass a new properties and it should be dynamic input identifier where we pick a specific control.
  });

  let formIsValid = true;
  if (event.target.id === 'licenseNumber'   ) { // the user must enter valid car number! the rest does not matter
      formIsValid = updatedCardForm[event.target.id].valid;  
  }
  // let formIsValid = true;
  // for (let inputIdentifier in updatedCardForm) {
  //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
  // }

  if(event.target.id==='licenseNumber')    
    this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: event.target.value});
  else
    this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: event.target.value});

    let cards;    

  if(event.target.value!==""){
    cards = this.props.cards.map( card => (
      this.check(card,event.target.value)
    ))
  }

    if(this.state.found === true){
      this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
    }
  }

inputCarChangedHandler = (event) => { 
const updatedFormElement = updateObject(this.state.vehicleData[event.target.id], { 
    value: event.target.value,
    //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
    touched: true
});
const updatedCardForm = updateObject(this.state.vehicleData, { 
    [event.target.id]: updatedFormElement 
});

// let formIsValid = true;
// for (let inputIdentifier in updatedCardForm) {
//     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
// }

this.setState({vehicleData: updatedCardForm}); //, formIsValid: formIsValid
}


inputCusChangedHandler = (event) => { //inputIdentifier

const updatedFormElement = updateObject(this.state.customerDetails[event.target.id], { 

    value: event.target.value,
    //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
    touched: true
});

const updatedCardForm = updateObject(this.state.customerDetails, { 
    [event.target.id]: updatedFormElement 
});

// let formIsValid = true;
// for (let inputIdentifier in updatedCardForm) {
//     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
// }
this.setState({customerDetails: updatedCardForm}); //, formIsValid: formIsValid
}

inputNewWorkChangedHandler = (event) => { 
  const updatedFormElement = updateObject(this.state.cardWork[event.target.id], { 
      value: event.target.value,
     // value: checkFormatNumbers(event.target.value),

      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
      touched: true
  });
  const updatedCardForm = updateObject(this.state.cardWork, { 
      [event.target.id]: updatedFormElement 
  });
  
  // let formIsValid = true;
  // for (let inputIdentifier in updatedCardForm) {
  //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
  // }
  this.setState({cardWork: updatedCardForm}); //, formIsValid: formIsValid
}

updateWorkChangedHandler = (event) => { 
  const updatedFormElement = updateObject(this.state.cardWork[event.target.id], { 
      value: event.target.value,
     // value: checkFormatNumbers(event.target.value),
      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
      touched: true
  });
  const updatedCardForm = updateObject(this.state.cardWork, { 
      [event.target.id]: updatedFormElement 
  });
  
  // let formIsValid = true;
  // for (let inputIdentifier in updatedCardForm) {
  //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
  // }
  //console.log(event.target.value);
  this.setState({cardWork: updatedCardForm}); //, formIsValid: formIsValid
}


inputNewPartChangedHandler = (event) => { 
  const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
      value: event.target.value,
      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
      touched: true
  });
  const updatedCardForm = updateObject(this.state.cardPart, { 
      [event.target.id]: updatedFormElement 
  });
  
  // let formIsValid = true;
  // for (let inputIdentifier in updatedCardForm) {
  //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
  // }
  this.setState({cardPart: updatedCardForm}); //, formIsValid: formIsValid
}

UpdatePartChangedHandler = (event) => { 
  const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
      value: event.target.value,
      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
      touched: true
  });
  const updatedCardForm = updateObject(this.state.cardPart, { 
      [event.target.id]: updatedFormElement 
  });
  
  // let formIsValid = true;
  // for (let inputIdentifier in updatedCardForm) {
  //     formIsValid = updatedCardForm[inputIdentifier].valid && formIsValid;
  // }
  this.setState({cardPart: updatedCardForm}); //, formIsValid: formIsValid
}
    

workOrPartsOpeningHandler = ( event,kind ) => {
      event.preventDefault(); // with that we get the task details
      const formData = {};

      if(kind === 'workData'){
          formData['workDescription'] = this.state.cardWork.workDescription.value;
          formData['time'] = this.state.cardWork.time.value;
          formData['gross'] = this.state.cardWork.gross.value;
          formData['discount'] = this.state.cardWork.discount.value;
          formData['net'] = this.state.cardWork.net.value;
          formData['kind'] = kind;
      }

      else if( kind === 'partsData'){// partDescription amount
        formData['partDescription'] = this.state.cardPart.partDescription.value;
        formData['amount'] = this.state.cardPart.amount.value;
        formData['gross'] = this.state.cardPart.gross.value;
        formData['discount'] = this.state.cardPart.discount.value;
        formData['net'] = this.state.cardPart.net.value;
        formData['kind'] = kind;

      }
      let cardKey = this.state.identifiedCardID;
      this.props.onWorkOrPartsOpening(formData, this.props.token, this.props.branchNumber, this.props.userId, kind,cardKey ); // this contains all the data of card 
     
      if(kind ==='workData'){
        let updateCardWork = {
          workDescription:{
            value: '',
            valid: false,
            touched: false
          },
          time:{
            value: '',
            valid: false,
            touched: false
          },
          gross:{
            value: '',
            valid: false,
            touched: false
          },
          discount:{
            value: '',
            valid: false,
            touched: false
          },
          net:{
            value: '',
            valid: false,
            touched: false
          }
        }
        this.setState({cardWork: updateCardWork});
      }


     else if(kind ==='partsData'){
        let updateCardWork = {
          partDescription:{
            value: '',
            valid: false,
            touched: false
          },
          amount:{
            value: '',
            valid: false,
            touched: false
          },
          gross:{
            value: '',
            valid: false,
            touched: false
          },
          discount:{
            value: '',
            valid: false,
            touched: false
          },
          net:{
            value: '',
            valid: false,
            touched: false
          }
        }
        this.setState({cardPart: updateCardWork});
      }

      this.setState( { isAddNewWorkOrPartOpen: false } );
  }

workOrPartsUpdateHandler = ( event,kind ) => {
      event.preventDefault(); // with that we get the task details
      const itemData = {};

      if(kind === 'workData'){
        itemData['workDescription'] = this.state.cardWork.workDescription.value;
        itemData['time'] = this.state.cardWork.time.value;
        itemData['gross'] = this.state.cardWork.gross.value;
        itemData['discount'] = this.state.cardWork.discount.value;
        itemData['net'] = this.state.cardWork.net.value;
        itemData['kind'] = kind;
      }

      else if( kind === 'partsData'){// partDescription amount
        itemData['partDescription'] = this.state.cardPart.partDescription.value;
        itemData['amount'] = this.state.cardPart.amount.value;
        itemData['gross'] = this.state.cardPart.gross.value;
        itemData['discount'] = this.state.cardPart.discount.value;
        itemData['net'] = this.state.cardPart.net.value;
        itemData['kind'] = kind;

      }
      let cardKey = this.state.identifiedCardID;
      let itemKey = this.state.itemKeyForUpdateWorkOrPart;

      this.props.onWorkOrPartUpdate(itemData, this.props.token, this.props.branchNumber, this.props.userId,'cards', kind,cardKey,itemKey ); // this contains all the data of card 
     
      if(kind ==='workData'){
        let updateCardWork = {
          workDescription:{
            value: '',
            valid: false,
            touched: false
          },
          time:{
            value: '',
            valid: false,
            touched: false
          },
          gross:{
            value: '',
            valid: false,
            touched: false
          },
          discount:{
            value: '',
            valid: false,
            touched: false
          },
          net:{
            value: '',
            valid: false,
            touched: false
          }
        }
        this.setState({cardWork: updateCardWork});
      }


     else if(kind ==='partsData'){
        let updateCardWork = {
          partDescription:{
            value: '',
            valid: false,
            touched: false
          },
          amount:{
            value: '',
            valid: false,
            touched: false
          },
          gross:{
            value: '',
            valid: false,
            touched: false
          },
          discount:{
            value: '',
            valid: false,
            touched: false
          },
          net:{
            value: '',
            valid: false,
            touched: false
          }
        }
        this.setState({cardPart: updateCardWork});
      }

      
      this.setState( { isUpdateWorkOrPartOpen: false } );
      this.setState( { isAddNewWorkOrPartOpen: false } );
  }
  
 handleChange = date => {
  this.setState({
    startDate: date
  });
};

cardUpdateHandler = ( event ) => {
  event.preventDefault(); // with that we get the Card details
 
  const carData ={
    carDescription: this.state.car_data[0],
    carNote: this.state.car_data[1],
    chalkModel: this.state.car_data[2],
    code: this.state.car_data[3],
    color: this.state.car_data[4],
    deliveryDate: this.state.car_data[5],
    driverName: this.state.car_data[6],
    engineCapacity: this.state.car_data[7],
    lastVisit: this.state.car_data[8],
    manufactureYear: this.state.car_data[9],
    speedometer: this.state.car_data[10]
  }

  console.log(this.state.car_data[9]);
  const cardData={
    appraiser: this.state.card_data[0],
    cardType: this.state.card_data[1],
    claimNumber: this.state.card_data[2],
    customerParticipation: this.state.card_data[3],
    customerRequests: this.state.card_data[4],
    dateOfDamage: this.state.card_data[5],
    insuranceAgent: this.state.card_data[6],
    insuranceCompany: this.state.card_data[7],
    licenseNumber: this.state.cardDetails.licenseNumber,
    openingDate: this.state.cardDetails.openingDate,
    policyNumber: this.state.card_data[10],
    ticketNumber: this.state.cardDetails.ticketNumber
  }

  console.log(this.state.cardDetails.ticketNumber);

  const customerData={
    address: this.state.customer_data[0],
    cellphone: this.state.customer_data[1],
    city: this.state.customer_data[2],
    customerName: this.state.customer_data[3],
    customerNote: this.state.customer_data[4],
    customerNumber: this.state.customer_data[5],
    homePhone: this.state.customer_data[6],
    identificationNumber: this.state.customer_data[7],
    mailAdress: this.state.customer_data[8],
    orderNumber: this.state.customer_data[9],
    postalCode: this.state.customer_data[10],
    workingPhone: this.state.customer_data[11]
  }

  this.props.onCardUpdate(carData,cardData,customerData, this.props.token, this.props.branchNumber,this.state.identifiedCardID); // this contains all the data of card
  //this.props.onCardUpdate(carData,cardData,customerData, this.props.token, this.state.branchNumber,this.state.identifiedCardID); // this contains all the data of card 
}

cardCloseHandler = ( event ) => {
event.preventDefault(); // with that we get the Card details

const cardData = {};
for (let formElementIdentifier in this.state.cardForm) {
  cardData[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
}

const carData = {};
for (let formElementIdentifier in this.state.vehicleData) {
  carData[formElementIdentifier] = this.state.vehicleData[formElementIdentifier].value;
}

const customerData = {};
for (let formElementIdentifier in this.state.customerDetails) {
  customerData[formElementIdentifier] = this.state.customerDetails[formElementIdentifier].value;
}

  const card = { // here we  prepare the card data
      cardData: cardData,
      carData: carData, 
      customerData: customerData,
      userId: this.props.userId,
      branchNumber: this.props.branchNumber,
      closeDate: getDateTime()
  }   
  this.props.onCardDelete(this.props.token, this.props.branchNumber, this.state.identifiedCardID,'cards',this.props.userId); // this contains all the data of card 
  this.props.onCardOpening(card,this.props.userId, this.props.token, this.props.branchNumber,'closeCards'); // this contains all the data of card 
  
  this.setTheStates();

  // let updateTaskForm =  { 
 
  //     licenseNumber: {
  //       value: '',
  //       validation: {
  //         required: true,
  //         minLength: 3, //need to change to 7 
  //         maxLength: 10, //need to change to 8 
  //         isNumeric: true
  //     },
  //       valid: false,
  //       touched: false
  //     }, 
      
  //     ticketNumber: {
  //       value: '',
  //       valid: false,
  //       touched: false
  //     }, 

  //     cardType: {
  //       value: 'ביטוח',
  //       valid: false,
  //       touched: false
  //     } ,

  //     openingDate: {
  //       value: getDateTime(),
  //       valid: false,
  //       touched: false
  //     },
     
  //     insuranceAgent:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },
       
  //     appraiser:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },
          
  //     insuranceCompany:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },
          
  //     customerParticipation:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },

  //     policyNumber:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },

  //     claimNumber:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },
        
  //     dateOfDamage:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     },

  //     customerRequests:{
  //       value: '',
  //       valid: false,
  //       touched: false
  //     }  
  // }

  // let updateVehicleForm = {
    
  //   carDescription:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   speedometer:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
   
  //   engineCapacity:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   color:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   chalkModel:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   lastVisit:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   manufactureYear:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   deliveryDate:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   driverName:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   code:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   carNote:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   }
  // }
 
  // let updateCustomerForm = {
    
  //   customerNumber:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   customerName:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   address:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   city:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   postalCode:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   homePhone:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   cellphone:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   workingPhone:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   identificationNumber:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   mailAdress:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   orderNumber:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   },
  //   customerNote:{
  //     value: '',
  //     valid: false,
  //     touched: false
  //   }
  // }

  // this.setState({car_data: []});
  // this.setState({card_data: []});
  // this.setState({customer_data: []});
  // this.setState({branchNumber: ''});
  // this.setState({identifiedCardID: ''});

  //  this.setState({cardForm: updateTaskForm});
  //  this.setState({vehicleData: updateVehicleForm });
  //  this.setState({customerDetails: updateCustomerForm});
  //  this.setState({found: false});
  //  this.setState({dataBaseCarNumber: ''});

  //   this.setState({carDetails: ''});
  //   this.setState({userCarNumber: ''});

}
//    this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: event.target.value, found: true,dataBaseCarNumber:data.cardData.licenseNumber });


setTheStates = () => {
  
    let updateTaskForm =  { 
   
        licenseNumber: {
          value: '',
          validation: {
            required: true,
            minLength: 3,
            maxLength: 10,
            isNumeric: true
        },
          valid: false,
          touched: false
        }, 
        
        ticketNumber: {
          value: '',
          valid: false,
          touched: false
        }, 
  
        cardType: {
          value: '', //ביטוח
          valid: false,
          touched: false
        } ,
  
        openingDate: {
          value: getDateTime(),
          valid: false,
          touched: false
        },
       
        insuranceAgent:{
          value: '',
          valid: false,
          touched: false
        },
         
        appraiser:{
          value: '',
          valid: false,
          touched: false
        },
            
        insuranceCompany:{
          value: '',
          valid: false,
          touched: false
        },
            
        customerParticipation:{
          value: '',
          valid: false,
          touched: false
        },
  
        policyNumber:{
          value: '',
          valid: false,
          touched: false
        },
  
        claimNumber:{
          value: '',
          valid: false,
          touched: false
        },
          
        dateOfDamage:{
          value: '',
          valid: false,
          touched: false
        },
  
        customerRequests:{
          value: '',
          valid: false,
          touched: false
        }  
    }
  
    let updateVehicleForm = {
      
      carDescription:{
        value: '',
        valid: false,
        touched: false
      },
      speedometer:{
        value: '',
        valid: false,
        touched: false
      },
     
      engineCapacity:{
        value: '',
        valid: false,
        touched: false
      },
      color:{
        value: '',
        valid: false,
        touched: false
      },
      chalkModel:{
        value: '',
        valid: false,
        touched: false
      },
      lastVisit:{
        value: '',
        valid: false,
        touched: false
      },
      manufactureYear:{
        value: '',
        valid: false,
        touched: false
      },
      deliveryDate:{
        value: '',
        valid: false,
        touched: false
      },
      driverName:{
        value: '',
        valid: false,
        touched: false
      },
      code:{
        value: '',
        valid: false,
        touched: false
      },
      carNote:{
        value: '',
        valid: false,
        touched: false
      }
    }
   
    let updateCustomerForm = {
      
      customerNumber:{
        value: '',
        valid: false,
        touched: false
      },
      customerName:{
        value: '',
        valid: false,
        touched: false
      },
      address:{
        value: '',
        valid: false,
        touched: false
      },
      city:{
        value: '',
        valid: false,
        touched: false
      },
      postalCode:{
        value: '',
        valid: false,
        touched: false
      },
      homePhone:{
        value: '',
        valid: false,
        touched: false
      },
      cellphone:{
        value: '',
        valid: false,
        touched: false
      },
      workingPhone:{
        value: '',
        valid: false,
        touched: false
      },
      identificationNumber:{
        value: '',
        valid: false,
        touched: false
      },
      mailAdress:{
        value: '',
        valid: false,
        touched: false
      },
      orderNumber:{
        value: '',
        valid: false,
        touched: false
      },
      customerNote:{
        value: '',
        valid: false,
        touched: false
      }
    }
  
    this.setState({car_data: []});
    this.setState({card_data: []});
    this.setState({customer_data: []});
    this.setState({branchNumber: ''});
    this.setState({identifiedCardID: ''});
  
     this.setState({cardForm: updateTaskForm});
     this.setState({vehicleData: updateVehicleForm });
     this.setState({customerDetails: updateCustomerForm});
     this.setState({found: false});
     this.setState({dataBaseCarNumber: ''});
  
      this.setState({carDetails: ''});
      this.setState({userCarNumber: ''});
  
  }


check(data,licenseNumber){
 // console.log("1068");
  //console.log(data.cardData.licenseNumber);
 // console.log(licenseNumber);


  if(data.cardData.licenseNumber===licenseNumber){
    //console.log("860");


    this.state.found=true;
    this.state.dataBaseCarNumber=data.cardData.licenseNumber;
    this.state.carDetails=data.carData;
    this.state.cardDetails=data.cardData;
    this.state.customer_details=data.customerData;
    this.state.identifiedCardID=data.id;//rotem
    this.state.branchNumber=data.branchNumber;

    console.log(data.carData.manufactureYear);
    // this.setState({found: true});
    // this.setState({dataBaseCarNumber: data.cardData.licenseNumber});
    // this.setState({carDetails: data.carData});
    // this.setState({cardDetails: data.cardData});

    // this.setState({customer_details: data.customerData});
    // this.setState({identifiedCardID: data.id});
    // this.setState({branchNumber: data.branchNumber});



    //     console.log(this.state.found);
    //     console.log(this.state.dataBaseCarNumber);
    //     console.log(this.state.carDetails);
    //     console.log(this.state.cardDetails);
    //     console.log(this.state.customer_details);
    //     console.log(this.state.identifiedCardID);
    //     console.log(this.state.branchNumber);
  }
}




componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
  this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
 // console.log("857");

// if(this.state.found === true){
//   console.log("859");
//   this.props.onGetAllCardData(this.props.token, this.props.userId, this.props.branchNumber, 'cards', this.state.identifiedCardID);
// }
}



closeWorksModal = (event) => {

  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );
  this.props.onWorkModalClose(this.props.token); // this contains all the data of card 
// this.setState({ showWorkModel: false });
};

closeToastModal = (event) => {

  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );
  this.props.onToastModalClose(this.props.token); // this contains all the data of card 
// this.setState({ showWorkModel: false });
};



closePartsModal = (event) => {
  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );
  this.props.onPartsModalClose(this.props.token); // this contains all the data of card 
};


openWorkModal = (event,kind) => {
    // event.preventDefault(); // with that we get the Card details
  this.props.onWorkModalOpening( ); // this contains all the data of card //this.props.token
};

openPartModal = (event,kind) => {
  // event.preventDefault(); // with that we get the Card details
this.props.onPartModalOpening( ); // this contains all the data of card //this.props.token
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



renderWorksModal = (list) => { ///*** workkkkkkk modal! ****

  let workButtons;
  let { isAddNewWorkOrPartOpen } = this.state;

  let { isUpdateWorkOrPartOpen } = this.state;
  if (!isAddNewWorkOrPartOpen) {
      workButtons =
      <div >
          <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px"}} >         
            <div> 
              <Button bsStyle="secondary" style={{borderColor: "black"}} onClick={this.closeWorksModal} >יציאה</Button>{' '}
              {/* <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.closeWorksModal}>עדכון</Button>{' '} */}
              {/* <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.closeWorksModal}>מחיקה</Button>{' '} */}
              <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.handleAddRow} >הוספה</Button> 
            </div>
          </form>
      </div>;
    }

    else {
      workButtons = 
      <div > 
        <form  class="form-group" style={{fontSize: "11px", marginBottom: "4px"}}  >
          <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 
            <div class="form-group col-md-8" style={{ marginBottom: "4px"}}  >       
              <label for="workDescription" >תיאור עבודה</label>
              <input type="text" id="workDescription" class="form-control" value={this.state.cardWork.workDescription.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = { isUpdateWorkOrPartOpen ? (event) => this.updateWorkChangedHandler(event) : (event) => this.inputNewWorkChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="time">זמן תקן</label>
              <input type="number" id="time" class="form-control" value={this.state.cardWork.time.value} autocomplete="off"  aria-describedby="passwordHelpInline" 
              onChange = { isUpdateWorkOrPartOpen ? (event) => this.updateWorkChangedHandler(event) : (event) => this.inputNewWorkChangedHandler(event) }/>
              </div>

            <div class="form-group col-md-1"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" id="gross" class="form-control" autocomplete="off" value={this.state.cardWork.gross.value} aria-describedby="passwordHelpInline" 
             onChange = { isUpdateWorkOrPartOpen ? (event) => this.updateWorkChangedHandler(event) : (event) => this.inputNewWorkChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardWork.discount.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = { isUpdateWorkOrPartOpen ? (event) => this.updateWorkChangedHandler(event) : (event) => this.inputNewWorkChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}  >
              <label for="net">נטו</label>
              <input type="number" id="net" class="form-control" value={this.state.cardWork.net.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = { isUpdateWorkOrPartOpen ? (event) => this.updateWorkChangedHandler(event) : (event) => this.inputNewWorkChangedHandler(event) }/>
            </div>

          </div>
        </form>
        {/* onSubmit={this.cardOpeningHandler}   */}
        <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px", justifyContent: "left"}} >
          <div>  

            { isUpdateWorkOrPartOpen ?  
            <div>            
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.workOrPartsUpdateHandler( event, 'workData')}> <CheckIcon/> עדכון </Button> 
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.closeEditButton}> <CloseIcon/> ביטול </Button> 
           </div>  
            :
            <div>
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.workOrPartsOpeningHandler( event, 'workData')}> <CheckIcon/> אישור </Button> 
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.closeAddButton}> <CloseIcon/> ביטול </Button> 
           
           </div>  
           
           }
          
          </div>
         </form>
      </div>
      ;

    }
    return (
    
    
        <Modal show={true} onHide={this.closeWorksModal}  dialogClassName={classes.ModalDialog} 
            style={{ display: "flex", textAlign:"right", paddingLeft: "1px"  }}  >
          <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
            <Modal.Title  >עבודות לכרטיס</Modal.Title>   
          </Modal.Header>
    
          <Modal.Body  style={{ backgroundColor:"#6c757d", display: "block", maxHeight: "calc(100% - 120px)", overFlowY: "scroll", padding:"3px",flex: "none"}}   >
            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 
    
               <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
                 <label for="licenseNumber" >מספר רישוי</label>
                 <input  type="text"  id="licenseNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
                 value={this.state.cardForm.licenseNumber.value}
                 value2={this.state.userCarNumber}
                 />
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="ticketNumber" >מספר כרטיס</label>
                 <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber} autocomplete="off" style={{marginLeft: "10px"}} 
                 class="form-control" aria-describedby="passwordHelpInline"/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cardType" >סוג כרטיס</label>
                 <select id="cardType" class="form-control" value={this.state.cardDetails.cardType} style={{marginLeft: "10px"}}  >
                   <option selected>ביטוח</option>
                   <option>פרטי</option>
                 </select>
               </div>
    
               <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
               <label htmlFor="openingDate"  >תאריך פתיחה</label>
               <input  type="text" name="openingDate" className="form-control" autocomplete="off" style={{marginLeft: "10px"}}  value={this.state.cardDetails.openingDate} />
             </div>
             </div> 
            </Modal.Body>
         
            <div className={classes.separator}></div>
    
          <Modal.Body  style={{ backgroundColor:"#6c757d" , display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none"}}   >
         
            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto"}}> 
           
            <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                 <label for="customerRequests"  >תיאור העבודה</label>
                 <input type="text" id="customerRequests" autocomplete="off" class="form-control " style={{marginLeft: "10px"}}  
                 aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerRequests}/>
               </div>
    
               <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                 <label for="customerName" >שם לקוח</label>
                 <input type="text" id="customerName" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.customerName}/>
               </div>
               </div>
    
               <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cellphone" >סלולרי</label>
                 <input type="number" id="cellphone" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.cellphone}/>
               </div>
     
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="homePhone" >טלפון בית</label>
                 <input type="number" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}}  
                 value={this.state.customer_details.homePhone}/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="orderNumber" >הזמנה</label>
                 <input type="text" id="orderNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.orderNumber}/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="speedometer" >מד אוץ</label>
                 <input  type="number"  id="speedometer" class="form-control" autocomplete="off" style={{marginLeft: "10px"}}  
                 aria-describedby="passwordHelpInline" value={this.state.carDetails.speedometer}/>
               </div>
    
             </div> 
    
            </Modal.Body>
            <div className={classes.separator}></div>
            <Modal.Body  style={{ backgroundColor:"#6c757d", padding:"3px",flex: "none" }}   >
    
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל עבודות:</div> 
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל שורות:</div> 
    
         </Modal.Body>
    
          <Modal.Body style={{padding: "0px",flex: "auto"}} scrollable={true}>
           <div class="table-wrapper" style={{direction: "rtl"}}>
               <table class="table table-bordered" style={{marginBottom: "1px"}} >
                   <thead >
                       <tr >
                           <th  scope="col" style={{ textAlign: "right"}}>תיאור עבודה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>זמן</th>
                           <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>פעולות</th>
                       </tr>
                   </thead>
             
                   <tbody>

        
        {this.props.workData.map( work =>  (

            <tr>
              <td>{work.workDescription}</td>
              <td>{work.time}</td>
              <td>{work.gross}</td>
              <td>{work.discount}</td> 
              <td>{work.net}</td>
              <td>
                    {this.renderDeleteWorkOrPart(work.workKey,list)}
                    {this.renderEditWorkOrPart(work.workKey,list,work.workDescription,work.time,work.gross,work.discount,work.net)}
              </td>
            </tr>
        ))
      }
             </tbody>
               </table>
           </div>
          </Modal.Body>
          <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5"}} >
               {workButtons}
          </Modal.Footer>
        </Modal> 
        );
      
}


renderPartsModal = (list) => { /// *** parttttttt modal! ****

  let partButtons;
  let { isAddNewWorkOrPartOpen } = this.state;
  let { isUpdateWorkOrPartOpen } = this.state;

  if (!isAddNewWorkOrPartOpen) {
      partButtons =
      <div >
          <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px"}} >         
            <div> 
              <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}} onClick={this.closePartsModal} >יציאה</Button>{' '}
              {/* <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}} onClick={this.closePartsModal}>עדכון</Button>{' '}
              <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}} onClick={this.closePartsModal}>מחיקה</Button>{' '} */}
              <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}} onClick={this.handleAddRow} >הוספה</Button> 
            </div>
          </form>
      </div>;
    }

    else {
      partButtons = 
      <div > 
        <form  class="form-group" style={{fontSize: "11px", marginBottom: "4px"}}  >
          <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 
            <div class="form-group col-md-8" style={{ marginBottom: "4px"}}  >       
              <label for="partDescription" >תיאור חלק</label>        
              <input type="text" id="partDescription" class="form-control" autocomplete="off" value={this.state.cardPart.partDescription.value} aria-describedby="passwordHelpInline"
               onChange = { isUpdateWorkOrPartOpen ? (event) => this.UpdatePartChangedHandler(event) : (event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="amount">כמות</label>
              <input type="number" id="amount" class="form-control" autocomplete="off" value={this.state.cardPart.amount.value} aria-describedby="passwordHelpInline" 
               onChange = { isUpdateWorkOrPartOpen ? (event) => this.UpdatePartChangedHandler(event) : (event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" id="gross" class="form-control" value={this.state.cardPart.gross.value} aria-describedby="passwordHelpInline" autocomplete="off" 
              onChange = { isUpdateWorkOrPartOpen ? (event) => this.UpdatePartChangedHandler(event) : (event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardPart.discount.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = { isUpdateWorkOrPartOpen ? (event) => this.UpdatePartChangedHandler(event) : (event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}  >
              <label for="net">נטו</label>
              <input type="number" id="net" class="form-control" value={this.state.cardPart.net.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = { isUpdateWorkOrPartOpen ? (event) => this.UpdatePartChangedHandler(event) : (event) => this.inputNewPartChangedHandler(event) }/>
            </div>

          </div>
        </form>
        {/* onSubmit={this.cardOpeningHandler}   */}
        <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px", justifyContent: "left"}} >
          <div>  

          { isUpdateWorkOrPartOpen ?  
            <div>            
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue", borderColor: "black"}}  onClick= {( event ) => this.workOrPartsUpdateHandler( event, 'partsData')}> <CheckIcon/> עדכון </Button> 
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}}  onClick={this.closeAddButton}> <CloseIcon/> ביטול </Button> 
           </div>  
            :
            <div>
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue", borderColor: "black"}}  onClick= {( event ) => this.workOrPartsOpeningHandler( event, 'partsData')}> <CheckIcon/> אישור </Button> 
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}}  onClick={this.closeAddButton}> <CloseIcon/> ביטול </Button> 
           
           </div>  
           
           }
          </div>
         </form>
      </div>
      ;

    }
    return (
    
    
        <Modal show={true} onHide={this.closePartsModal}  dialogClassName={classes.ModalDialog} 
            style={{ display: "flex", textAlign:"right", paddingLeft: "1px"  }}  >
          <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
            <Modal.Title  >חלקים לכרטיס</Modal.Title>   
          </Modal.Header>
    
          <Modal.Body  style={{ backgroundColor:"lightsteelblue", display: "block", maxHeight: "calc(100% - 120px)", overFlowY: "scroll", padding:"3px",flex: "none"}}   >
            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 
    
               <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
                 <label for="licenseNumber" >מספר רישוי</label>
                 <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off"  style={{marginLeft: "10px"}} 
                 value={this.state.cardForm.licenseNumber.value}
                 value2={this.state.userCarNumber}
                 />
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="ticketNumber" >מספר כרטיס</label>
                 <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber} autocomplete="off" style={{marginLeft: "10px"}} 
                 class="form-control" aria-describedby="passwordHelpInline"/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cardType" >סוג כרטיס</label>
                 <select id="cardType" class="form-control" value={this.state.cardDetails.cardType} style={{marginLeft: "10px"}}  >
                 {/* {this.state.cardForm.cardType.value === 'פרטי' ? 
                        <option selected>פרטי</option> 
                    : 
                    <option selected >ביטוח</option>
                    }  */}
                         <option selected>ביטוח</option>
                   <option>פרטי</option>
                 </select>
               </div>
    
               <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
               <label htmlFor="openingDate"  >תאריך פתיחה</label>
               <input  type="text" name="openingDate" className="form-control" style={{marginLeft: "10px"}} autocomplete="off" value={this.state.cardDetails.openingDate} />
             </div>
             </div> 
            </Modal.Body>
         
            <div className={classes.separator}></div>
    
          <Modal.Body  style={{ backgroundColor:"lightsteelblue" , display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none"}}   >
         
            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto"}}> 
           
            <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                 <label for="customerRequests"  >תיאור העבודה</label>
                 <input type="text" id="customerRequests" class="form-control " autocomplete="off" style={{marginLeft: "10px"}}  
                 aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerRequests}/>
               </div>
    
               <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
                 <label for="customerName" >שם לקוח</label>
                 <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.customerName}/>
               </div>
               </div>
    
               <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cellphone" >סלולרי</label>
                 <input type="number" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.cellphone}/>
               </div>
     
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="homePhone" >טלפון בית</label>
                 <input type="number" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{marginLeft: "10px"}}  
                 value={this.state.customer_details.homePhone}/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="orderNumber" >הזמנה</label>
                 <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off"  style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.orderNumber}/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="speedometer" >מד אוץ</label>
                 <input type="number"  id="speedometer" class="form-control" autocomplete="off" style={{marginLeft: "10px"}}  
                 aria-describedby="passwordHelpInline" value={this.state.carDetails.speedometer}/>
               </div>
    
             </div> 
    
            </Modal.Body>
            <div className={classes.separator}></div>
            <Modal.Body  style={{ backgroundColor:"lightsteelblue", padding:"3px",flex: "none" }}   >
    
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל חלקים:</div> 
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל שורות:</div> 
    
         </Modal.Body>
    
          <Modal.Body style={{padding: "0px",flex: "auto"}}>
           <div class="table-wrapper" style={{direction: "rtl"}}>
               <table class="table table-bordered" style={{marginBottom: "1px"}} >
                   <thead >
                       <tr >
                           <th  scope="col" style={{ textAlign: "right"}}>תיאור חלק</th>
                           <th  scope="col" style={{ textAlign: "right"}}>כמות</th>
                           <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>פעולות</th>
                       </tr>
                   </thead>
             
                   <tbody>

        
        {this.props.partsData.map( part =>  (

            <tr>
              <td>{part.partDescription}</td>
              <td>{part.amount}</td>
              <td>{part.gross}</td>
              <td>{part.discount}</td>   
              <td>{part.net}</td>
              <td>
                    {this.renderDeleteWorkOrPart(part.workKey,list)}
                    {this.renderEditWorkOrPart(part.workKey,list,part.partDescription,part.amount,part.gross,part.discount,part.net)}
              </td>
            </tr>
        ))
      }
             </tbody>
               </table>
           </div>
          </Modal.Body>
          <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5"}} >
               {partButtons}
          </Modal.Footer>
        </Modal> 
        );
      
}


renderEditWorkOrPart = ( itemKey,list,workDescription,time,gross,discount,net) => { 
  return(
      <EditIcon 
      style={{ fontSize:"large" }}
      onClick={() => this.onEditWorkOrPartClick( itemKey,list,workDescription,time,gross,discount,net)}/>  
    
  );
}

onEditWorkOrPartClick = ( itemKey,list,workDescription,time,gross,discount,net) =>  {
  this.setState({isUpdateWorkOrPartOpen: true});
  this.setState({isAddNewWorkOrPartOpen: true});
  this.setState({itemKeyForUpdateWorkOrPart: itemKey});
 // this.setState({itemKeyForUpdateModalWorkOrPart: itemKey});
  
  if(list ==='workData'){
    let updateCardWork = {
      workDescription:{
        value: workDescription,
        valid: false,
        touched: false
      },
      time:{
        value: time,
        valid: false,
        touched: false
      },
      gross:{
        value: gross,
        valid: false,
        touched: false
      },
      discount:{
        value: discount,
        valid: false,
        touched: false
      },
      net:{
        value: net,
        valid: false,
        touched: false
      }
    }
    this.setState({cardWork: updateCardWork});
  }


 else if(list ==='partsData'){
    let updateCardWork = {
      partDescription:{
        value: workDescription,
        valid: false,
        touched: false
      },
      amount:{
        value: time,
        valid: false,
        touched: false
      },
      gross:{
        value: gross,
        valid: false,
        touched: false
      },
      discount:{
        value: discount,
        valid: false,
        touched: false
      },
      net:{
        value: net,
        valid: false,
        touched: false
      }
    }
    this.setState({cardPart: updateCardWork});
  }
  //let cardKey = this.state.identifiedCardID;
  
  // here will be the update work or part 
 // this.props.onWorkOrPartDelete(this.props.token, this.props.branchNumber,cardKey,itemKey ,list,this.props.userId); // this contains all the data of card 
}      



renderDeleteWorkOrPart = (itemKey,list) => { 
  return(
      <DeleteIcon 
      style={{ fontSize:"large" }}
      onClick={() => this.onDeleteWorkOrPartClick(itemKey,list)}/>     
 
  );
}

onDeleteWorkOrPartClick = (itemKey,list) =>  {
  let cardKey = this.state.identifiedCardID;
  this.props.onWorkOrPartDelete(this.props.token, this.props.branchNumber,cardKey,itemKey ,list,this.props.userId); // this contains all the data of card 
}  

handleAddRow = () => {
  this.setState( { isAddNewWorkOrPartOpen: true } );

  // this.setState((prevState, props) => {
  //   const row = {workDescription: "1",time: "2",gross: "3",discount: "4",net: "5" };
  //   return { rows: [...prevState.rows, row] };
  // });
};

handleRemoveRow = () => {
  this.setState((prevState, props) => {
    return { rows: prevState.rows.slice(1) };
  });
};


closeAddButton = () => {
  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );

    let updateCardWork = {
      workDescription:{
        value: '',
        valid: false,
        touched: false
      },
      time:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false,
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }
    }
    this.setState({cardWork: updateCardWork});
  



    let updateCardPart = {
      partDescription:{
        value: '',
        valid: false,
        touched: false
      },
      amount:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false,
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }
    }
    this.setState({cardPart: updateCardPart});
  

};

closeEditButton = () => {
  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );


    let updateCardWork = {
      workDescription:{
        value: '',
        valid: false,
        touched: false
      },
      time:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false, 
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }
    }
    this.setState({cardWork: updateCardWork});
  



    let updateCardPart = {
      partDescription:{
        value: '',
        valid: false,
        touched: false
      },
      amount:{
        value: '',
        valid: false,
        touched: false
      },
      gross:{
        value: '',
        valid: false,
        touched: false
      },
      discount:{
        value: '',
        valid: false,
        touched: false
      },
      net:{
        value: '',
        valid: false,
        touched: false
      }
    }
    this.setState({cardPart: updateCardPart});
  
  
};



switchDivModeHandler = () => {
  this.setState(prevState => {
      return {showDetailsDiv: !prevState.showDetailsDiv};
      });
}


switchDivModeHandlerCar = () => {
  this.setState(prevState => {
      return {showCarInfoDiv: !prevState.showCarInfoDiv};
      });
}

switchDivModeHandlerCus = () => {
  this.setState(prevState => {
      return {showCustomerDetailsDiv: !prevState.showCustomerDetailsDiv};
      });
}

switchDivModeHandlerTin = () => {
  this.setState(prevState => {
      return {showTinsmithingDetailsDiv: !prevState.showTinsmithingDetailsDiv};
      });
}

switchDivModeHandlerReq = () => {
  this.setState(prevState => {
      return {showCustomerRequestsDiv: !prevState.showCustomerRequestsDiv};
      });
}

switchDivModeHandlerDoc = () => {
  this.setState(prevState => {
      return {showUploadDocDiv: !prevState.showUploadDocDiv};
      });
}

switchDivModeHandlerMail = () => {
  this.setState(prevState => {
      return {showSendMailDiv: !prevState.showSendMailDiv};
      });
}



updateCarInputValue=(evt,i)=> {
  evt.preventDefault(); // with that we get the Card details

  this.state.car_data[i]=evt.target.value;
  console.log(this.state.car_data);
  if(i===9){
    this.state.carDetails.manufactureYear=evt.target.value;
    this.state.vehicleData.manufactureYear.value=evt.target.value;
    this.setState(prevState => {
      return (this.state.vehicleData.manufactureYear.value);
      });
    //return (this.state.carDetails.manufactureYear);
    
    return (this.state.vehicleData.manufactureYear.value);

  }
  console.log(this.state.carDetails.manufactureYear);
  console.log(this.state.vehicleData.manufactureYear.value);

  console.log(i);

  //value={this.state.carDetails.manufactureYear}

}

updateCardInputValue=(evt,i)=> {
  console.log(this.state.card_data);
  console.log(evt.target.value);

    this.state.card_data[i]=evt.target.value;
    console.log(this.state.card_data[i]);


}

updateCustomerInputValue(evt,i) {
  this.state.customer_data[i]=evt.target.value;
  //console.log(this.state.customer_data);
}
buildImgTag(){

  return <div className="photo-container">
  { 
    this.state.imageArray.map(imageURI => 
    (<img className="photo-uploaded" src={imageURI} alt="Photo uploaded"/>)) 
  }
  </div>
}

fileSelectedHandler = (e) => {
  console.log(e.target.files);
  
  for(var i=0;i<e.target.files.length;i++){
    let type=e.target.files[i].type;
    if(type.includes("image/jpeg")){
      this.state.imageFiles.push(e.target.files[i]);
    }
    else{
      this.state.docFiles.push(e.target.files[i]);
    }
  }
  console.log(this.state.imageFiles);
  console.log(this.state.docFiles);
  
 if (e.target.files) {

  /* Get files in array form */
  const files = Array.from(e.target.files);

  /* Map each file to a promise that resolves to an array of image URI's */ 
  Promise.all(files.map(file => {
      return (new Promise((resolve,reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (ev) => {
              resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
      }));
  }))
  .then(images => {

      /* Once all promises are resolved, update state with image URI array */
      this.setState({ imageArray : images })

  }, error => {        
      console.error(error);
  });
  }
  console.log(this.state.imageArray);
 

}

handle_Submit(e) {
  e.preventDefault()
 
  const { name, email, subject, message } = this.state
  let templateParams = {
    from_name: name,
    to_name: email,
    subject: subject,
    message_html: message,    
   }
   
   emailjs.send(
    'gmail',
    'template_ioZDdoH7',
     templateParams,
    'user_4U9CbkH78jIK0dza4aWEp'
   )
 
   this.resetForm()
}
resetForm() {
  this.setState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
}
handle_Change = (param, e) => {
  this.setState({ [param]: e.target.value })
}

sendEmail(e) {
 

  const { name, email, subject, message } = this.state
  // create a new XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // get a callback when the server responds
  xhr.addEventListener('load', () => {
      // update the response state and the step
      
      this.setState ({
          emailStatus: xhr.responseText
      });
      console.log( xhr.responseText);
  });
  //'http://api.ruvictor.com/sendemail/index.php?sendto='
  // open the request with the verb and the url
  xhr.open('GET', 'http://localhost:3000/' + email + 
                          '&name=' + name + 
                          '&message=' + message);
  // send the request
  xhr.send();
  this.resetForm()


 /* 
  "use strict";
  const nodemailer = require("nodemailer");
  const account={
    user:"oswald.auer37@ethereal.email",
    pass:"axm8ujnm1aq2YpxkZD"
  };
// async..await is not allowed in global scope, must use a wrapper
  async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "ariel.asaraf@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
*/
  /*e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

  emailjs.sendForm('gmail', 'template_ioZDdoH7', e.target, 'user_4U9CbkH78jIK0dza4aWEp')
    .then((result) => {
    	console.log('Email successfully sent!')
    }, (error) => {
        console.log(error.text);
    });*/
}

onChange = date => this.setState({ date })

  render () {
    const imgTag = this.buildImgTag();

    // let { licenseNumber , ticketNumber } = this.state;

  

    // let cards;
    // if(this.state.userCarNumber!==""){
    //   cards = this.props.cards.map( card => (
    //     this.check(card)
    //   ))
    // }

    


       /* <Toast>
            <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
             <strong className="mr-auto">Bootstrap</strong>
              <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast> */

  //if(!this.state.found){

    // <div  class="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{opacity: "inherit",alignSelf: "center"}}>
    //         <div class="toast-header">
    //           <img src="..." class="rounded mr-2" alt="..."/>
    //           <strong class="mr-auto">Bootstrap</strong>
    //           <small>11 mins ago</small>
    //           <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
    //               <span aria-hidden="true">&times;</span>
    //           </button>
    //         </div>

    //         <div class="toast-body">
    //         Hello, world! This is a toast message.
    //         </div>
    //     </div> 


  return (
    <form  onSubmit={this.state.found ? this.cardUpdateHandler : this.cardOpeningHandler}  class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >  

          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > פרטים </span> 
              { !this.state.showDetailsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandler}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandler}/>
              }
              </div>
            
            {this.state.showDetailsDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="licenseNumber" >מספר רישוי</label>
                  <input  type="number"  id="licenseNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{ webkitAppearance: "none" , margin: "0"}}

                  value={this.state.cardForm.licenseNumber.value}
                  value2={this.state.userCarNumber}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
                <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found){
                  this.state.cardForm.ticketNumber.value=this.state.cardDetails.ticketNumber;
                }    
              })()}
                  <label for="ticketNumber">מספר כרטיס</label>
                  <input type="text" id="ticketNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline"
                  value={this.state.cardForm.ticketNumber.value} 
                  // {this.props.cards.length +1}
                  // value={this.state.cardForm.ticketNumber.value}
                  //  onChange={(event) => this.inputChangedHandler(event)}
                   />
                </div>
                
  
                <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found && this.state.term !==''){
                  this.state.cardForm.cardType.value=this.state.cardDetails.cardType;
                  //this.g(this.state.carDetails.carDescription.value);
                  //console.log(this.state.carDetails);
                }    
                })()}
                  <label for="cardType">סוג כרטיס</label>
                  <select id="cardType" class="form-control" 
                  defaultValue={this.state.cardDetails.cardType} 
                   onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,1)}>
                      {this.state.found && this.state.term !== '' && this.state.cardForm.cardType.value === 'פרטי' ? 
                      <>
                      <option >ביטוח</option>
                        <option selected>פרטי</option> 
                        </>
                    : 
                    <>
                    <option selected >ביטוח</option>
                    <option >פרטי</option> 
                    </>} 
                   
                  </select>
                </div>
  
                <div className="form-group col-md-3">
                <label for="openingDate">תאריך פתיחה</label>
                <input  type="text" id="openingDate" autocomplete="off" className="form-control" 
                value= {this.state.found ?  this.state.cardDetails.openingDate : this.state.reportStartDate}
                
                // {this.state.cardDetails.openingDate}
                // value={this.state.reportStartDate} 
                // onChange={(event) => this.inputChangedHandler(event)} 
                 />
              </div>
              </div> 
            </div>
          : null }
          </div>

          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>

             <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > עדכון פרטי רכב </span> 
              { !this.state.showCarInfoDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerCar}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerCar}/>
              }
              </div>


            {this.state.showCarInfoDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row">              
                <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found && this.state.term !==''){
                  this.state.vehicleData.carDescription.value=this.state.carDetails.carDescription;
                  //this.g(this.state.carDetails.carDescription.value);
                  //console.log(this.state.carDetails);
                }    
                })()}
                  <label for="carDescription">תאור הרכב</label>
                  <input type="carDescription" id="carDescription" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.carDetails.carDescription} 
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,0)}/>
                </div>
  
                <div class="form-group col-md-3" >
                 {(() => {
                   if(this.state.found && this.state.term !==''){
                    this.state.vehicleData.speedometer.value= this.state.carDetails.speedometer;
                    //this.state.carDetails.speedometer=this.state.term;
                    }    
                 })()}
                  <label for="speedometer">מד אוץ</label>
                  <input  type="number"  id="speedometer" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.carDetails.speedometer}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,10)}/>
                </div>
  
               
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.engineCapacity.value= this.state.carDetails.engineCapacity;
                    }    
                 })()}
                  <label for="engineCapacity">נפח מנוע</label>
                  <input  type="number"  id="engineCapacity" class="form-control" autocomplete="off"
                  aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.engineCapacity.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,7)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.color.value= this.state.carDetails.color;
                    }    
                 })()}
                  <label for="color" >צבע</label>
                  <input  type="text" id="color" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off"
                  defaultValue={this.state.vehicleData.color.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,4)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.chalkModel.value= this.state.carDetails.chalkModel;
                    }    
                 })()}
                  <label for="chalkModel">דגם גיר</label>
                  <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.chalkModel.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,2)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.lastVisit.value= this.state.carDetails.lastVisit;
                    }    
                 })()}
                  <label for="lastVisit">ביקור אחרון</label>
                  <input type="datetime-local"  id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" 
                  defaultValue={this.state.vehicleData.lastVisit.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,8)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.manufactureYear.value= this.state.carDetails.manufactureYear;
                    console.log(this.state.vehicleData.manufactureYear.value)
                    }    
                 })()}
                  <label for="manufactureYear">שנת יצור</label>
                  <select  id="manufactureYear" class="form-control"  style={{backgroundColor: "white"}}  
                   value={ this.state.vehicleData.manufactureYear.value}  
                  disabled={!this.state.formIsValid} onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,9)}>
                  
                    {/* <option selected></option> */}
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015</option>
                    <option>2014</option>
                    <option>2013</option>
                    <option>2012</option>
                    <option>2011</option>
                    <option>2010</option>
                    <option>2009</option>
                    <option>2008</option>
                    <option>2007</option>
                    <option>2006</option>
                    <option>2005</option>
                    <option>2004</option>
                    <option>2003</option>
                    <option>2002</option>
                    <option>2001</option>
                    <option>2000</option>
                    <option>1999</option>
                    <option>1998</option>
                    <option>1997</option>
        
                  </select>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.deliveryDate.value= this.state.carDetails.deliveryDate;
                    }    
                 })()}
                  <label for="deliveryDate" >תאריך מסירה</label> 
                  <input type="datetime-local" id="deliveryDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.deliveryDate.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,5)}/>
                </div>



                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.driverName.value= this.state.carDetails.driverName;
                    }    
                 })()}
                  <label for="driverName">שם הנהג</label>
                  <input  type="text" id="driverName" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.driverName.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,6)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.code.value= this.state.carDetails.code;
                    }    
                 })()}
                  <label for="code">קודן</label>
                  <input  type="text" id="code" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.code.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,3)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.carNote.value= this.state.carDetails.carNote;
                    }    
                 })()}
                  <label for="carNote">הערה לרכב</label>
                  <input  type="text"  id="carNote" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.carNote.value}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,1)}/>
                </div>
              </div> 
            </div> 
              : null } 
          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > עדכון פרטי לקוח </span> 
              { !this.state.showCustomerDetailsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerCus}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerCus}/>
              }
              </div>



            {this.state.showCustomerDetailsDiv ?
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerNumber.value= this.state.customer_details.customerNumber;
                    }    
                 })()}
                  <label for="customerNumber" >מספר לקוח</label>
                  <input type="text" id="customerNumber" class="form-control" autocomplete="off"
                  defaultValue={this.state.customerDetails.customerNumber.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,5)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerName.value= this.state.customer_details.customerName;
                    }    
                 })()}
                  <label for="customerName">שם לקוח</label>
                  <input type="text" id="customerName" class="form-control"  autocomplete="off"
                  defaultValue={this.state.customerDetails.customerName.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,3)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.address.value= this.state.customer_details.address;
                    }    
                 })()}
                  <label for="address">כתובת</label>
                  <input type="text" id="address" class="form-control" autocomplete="off"  style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.address.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,0)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.city.value= this.state.customer_details.city;
                    }    
                 })()}
                  <label for="city">עיר</label>
                  <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.city.value}  
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,2)}/>
                </div>
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.postalCode.value= this.state.customer_details.postalCode;
                    }    
                 })()}
                  <label for="postalCode" >מיקוד</label>
                  <input type="number" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.postalCode.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,10)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.homePhone.value= this.state.customer_details.homePhone;
                    }    
                 })()}
                  <label for="homePhone">טלפון בית</label>
                  <input type="number" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.homePhone.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,6)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.cellphone.value= this.state.customer_details.cellphone;
                    }    
                 })()}
                  <label for="cellphone">סלולרי</label>
                  <input type="number" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.cellphone.value} 
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,1)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.workingPhone.value= this.state.customer_details.workingPhone;
                    }    
                 })()}
                  <label for="workingPhone">טלפון עבודה</label>
                  <input type="number"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.workingPhone.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,11)}/>
                </div>
                
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.identificationNumber.value= this.state.customer_details.identificationNumber;
                    }    
                 })()}
                  <label for="identificationNumber" >ח.פ/ת.ז</label>
                  <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.customerDetails.identificationNumber.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,7)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.mailAdress.value= this.state.customer_details.mailAdress;
                    }    
                 })()}
                  <label for="mailAdress">כתובת מייל</label>
                  <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.mailAdress.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,8)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.orderNumber.value= this.state.customer_details.orderNumber;
                    }    
                 })()}
                  <label for="orderNumber">מספר הזמנה</label>
                  <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.orderNumber.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,9)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerNote.value= this.state.customer_details.customerNote;
                    }    
                 })()}
                  <label for="customerNote">הערה ללקוח</label>
                  <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.customerDetails.customerNote.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,4)}/>
                </div>

              </div> 
            </div>  
               : null}
          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > נתוני כרטיס פחחות </span> 
              { !this.state.showTinsmithingDetailsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerTin}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerTin}/>
              }
              </div>


            {this.state.showTinsmithingDetailsDiv ?
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.insuranceAgent.value= this.state.cardDetails.insuranceAgent;
                    }    
                 })()}
                  <label for="insuranceAgent" >סוכן ביטוח</label>
                  <input type="text" id="insuranceAgent" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.cardForm.insuranceAgent.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,6)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.appraiser.value= this.state.cardDetails.appraiser;
                    }    
                 })()}
                  <label for="appraiser">שמאי</label>
                  <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.appraiser.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,0)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.insuranceCompany.value= this.state.cardDetails.insuranceCompany;
                    }    
                 })()}
                  <label for="insuranceCompany">חברת ביטוח</label>
                  <input type="text" id="insuranceCompany" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.insuranceCompany.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,7)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.customerParticipation.value= this.state.cardDetails.customerParticipation;
                    }    
                 })()}
                  <label for="customerParticipation">השתתפות הלקוח</label>
                  <input type="text"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.customerParticipation.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,3)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.policyNumber.value= this.state.cardDetails.policyNumber;
                    }    
                 })()}
                  <label for="policyNumber">מס. פוליסה</label>
                  <input type="number" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.policyNumber.value} 
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,10)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.claimNumber.value= this.state.cardDetails.claimNumber;
                    }    
                 })()}
                  <label for="claimNumber">תביעה</label>
                  <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.claimNumber.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,2)}/>
                </div>

            <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.dateOfDamage.value= this.state.cardDetails.dateOfDamage;
                    }    
                 })()}
                  <label for="dateOfDamage">תאריך נזק</label>
                  <input type="datetime-local" id="dateOfDamage" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} selected={this.state.startDate} 
                  defaultValue={this.state.cardForm.dateOfDamage.value}

                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,5)}/>
              </div>
           </div>
           </div> 
  
          : null }




          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            

            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > תלונות/בקשות הלקוח </span> 
              { !this.state.showCustomerRequestsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerReq}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerReq}/>
              }
              </div>
             
            {this.state.showCustomerRequestsDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-12" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.customerRequests.value= this.state.cardDetails.customerRequests;
                    }    
                 })()}
                  <label for="customerRequests" >תלונות/בקשות הלקוח</label>
                  <input type="text" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.cardForm.customerRequests.value}
                  onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,4)}/>
                </div>
              </div> 
              
            </div> 
               : null }   
          </div>  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>


            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span >העלאת תמונות וקבצים </span> 
              { !this.state.showUploadDocDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerDoc}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerDoc}/>
              }
              </div>
             

            {this.state.showUploadDocDiv ? 
              <div class="card-body text-dark bg-white" >
                <div class="form-row" > 
                  <div class="form-group col-md-3">
                    <h5>תמונות:</h5>
                        <input type="file" multiple onChange={this.fileSelectedHandler}/>
                  </div>
                  <div class="form-group col-md-3">
                    <h5>מסמכים:</h5>
                        <input type="file" multiple onChange={this.fileSelectedHandler} />
                  </div>
                  {imgTag}

              
                </div>  
              </div>  
               : null }  
            </div>  
            <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>

            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span >שליחת מייל לשמאי/חברת ביטוח </span> 
              { !this.state.showSendMailDiv ? 
              <AddIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerMail}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left"}} onClick={this.switchDivModeHandlerMail}/>
              }
              </div>

            
            {this.state.showSendMailDiv ? 
              <div class="card-body text-dark bg-white" >
                   <>
          <Form >
            <FormGroup controlId="formBasicEmail" autocomplete="off">
              <Label className="text-muted">כתובת מייל</Label>
              <Input type="email" name="email" value={this.state.email} className="text-primary"  placeholder="הכנס/י כתובת מייל" autocomplete="off" 
                    onChange={this.handle_Change.bind(this, 'email')} />
            </FormGroup>
            <FormGroup controlId="formBasicName">
              <Label className="text-muted">שם</Label>
              <Input type="text" name="name" value={this.state.name} className="text-primary"  placeholder="הכנס/י שם" autocomplete="off"
                    onChange={this.handle_Change.bind(this, 'name')} />
            </FormGroup>
            <FormGroup controlId="formBasicSubject">
              <Label className="text-muted">נושא</Label>
              <Input type="text" name="subject" className="text-primary" value={this.state.subject} placeholder="הכנס/י נושא" autocomplete="off"
                  onChange={this.handle_Change.bind(this, 'subject')}/>
            </FormGroup>
            <FormGroup controlId="formBasicMessage">
              <Label className="text-muted">הודעה</Label>
              <Input type="textarea" name="message" className="text-primary" value={this.state.message} placeholder="הכנס/י הודעה" autocomplete="off"
                    onChange={this.handle_Change.bind(this, 'message')}/>
            </FormGroup>

            <Button variant="primary" type="submit" style={{textAlign:"left",direction: "ltr",float: "left"}} onClick={this.handle_Submit.bind(this)}> שלח מייל </Button>
          </Form>
      </>
              </div>  
               : null }  
            </div>  
        <form class="form-group" > 
        <span>    
        {this.state.found ?    
     <Button bsStyle="secondary" style={{borderColor: "black"}}   onClick= {( event ) => this.openWorkModal( event, 'workData')} disabled={!this.state.formIsValid} > עבודות </Button> 
               
        : null}
         {this.props.showWorkModel?
                this.renderWorksModal( 'workData')

            :null} 
            {' '}
   </span>

   
   {this.state.found ? 
      <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.openPartModal( event, 'PartsData')}  disabled={!this.state.formIsValid} >חלקים</Button> 
  
    :null} 
        {this.props.showPartModel?
                this.renderPartsModal( 'partsData')

            :null}  
            {' '}
      {this.state.found ? 
        <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid}  onClick={this.cardCloseHandler}>סגירת כרטיס</Button> 
      : null}
      {' '}
      {this.state.found ? 
      <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid} onClick={this.cardUpdateHandler}>עדכון כרטיס</Button> 
      :   
      <div  style={{textAlign:"left"}} > 
      <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid} onClick={this.cardOpeningHandler}>שמירת כרטיס חדש</Button> 
      </div>  
      }
      {' '}
       { this.props.showSuccessCase ?
             this.renderToastModal( 'כרטיס נשמר בהצלחה')

              :null }

      { this.props.showUpdateSuccessCase ?
             this.renderToastModal( 'כרטיס עודכן בהצלחה')

              :null }

{ this.props.showCloseCardSuccessCase && this.props.showSuccessCase ?
             this.renderToastModal( 'כרטיס נסגר בהצלחה')

              :null }


{/* <button type="submit" style={{backgroundColor: "secondary"}} className="btn btn-md btn-primary sign-in-button" onClick={this.cardUpdateHandler}>עדכון</button>  */}



        </form>
      </form>
    );

}

}
  // <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid}>הדפסת כרטיס</Button> {' '}


const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
      closeCards: state.card.closeCards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
      loading: state.card.loading,
      showSuccessCase: state.card.showSuccessCase,
      showUpdateSuccessCase: state.card.showUpdateSuccessCase,
      showCloseCardSuccessCase: state.card.showCloseCardSuccessCase,
      token: state.auth.token,
      userId: state.auth.userId,
      showWorkModel: state.card.showWorkModel,
      showPartModel: state.card.showPartModel,
      branchNumber: state.auth.branchNumber,
      workData: state.card.workData,
      partsData: state.card.partsData
  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    
    onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ),
    onCardOpening: (cardData,userId, token,branchNumber,node) => dispatch(actions.cardOpening(cardData,userId, token, branchNumber,node)),
    onCardUpdate:(carData,cardData,customerData, token, branchNumber,identifiedCardID) => dispatch(actions.cardUpdate(carData,cardData,customerData, token, branchNumber,identifiedCardID)), // this contains all the data of card 
    onCardDelete:(token, branchNumber, identifiedCardID,node,userId) => dispatch( actions.cardDelete(token, branchNumber, identifiedCardID,node,userId)),

    onWorkModalOpening: () =>  dispatch(actions.workModalOpening()),   
    onWorkModalClose: (token ) =>  dispatch(actions.workModalClose(token)),


    onToastModalClose: ( ) =>  dispatch(actions.toastModalClose()),

    onPartModalOpening: ( ) =>  dispatch(actions.partModalOpening()),   
    onPartsModalClose: (token ) =>  dispatch(actions.partModalClose(token)),

    onWorkOrPartsOpening: (formData, token,branchNumber,userId, kind,cardKey) => dispatch(actions.workOrPartsOpening(formData, token, branchNumber,userId, kind,cardKey)),
    onWorkOrPartUpdate: (itemData, token,branchNumber,userId,list, kind,cardKey,itemKey) => dispatch(actions.workOrPartUpdate(itemData, token,branchNumber,userId,list, kind,cardKey,itemKey)),
    onWorkOrPartDelete: (token, branchNumber, cardKey,itemKey ,list,userId) => dispatch( actions.WorkOrPartDelete(token,branchNumber,cardKey,itemKey,list,userId)),

    onGetAllCardData: (token,branchNumber,userId, kind,cardKey) => dispatch(actions.GetAllCardData(token,branchNumber,userId, kind,cardKey))

      //  return a map to map my props to dispatchable functions
      //here we want to execute an anonymous function where we eventually dispatch the action we just created it
      // note - we need to execute this function - "fetchCards()" to really get the action

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(openNew,axios));