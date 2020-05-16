
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import dd from './openNew.module.css';
import DatePicker from "react-datepicker";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { database } from 'firebase';
import "react-datepicker/dist/react-datepicker.css";
import Image from './images.js';
import Button2 from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; //
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import card from '../../components/Card/Card';
import { FaThinkPeaks } from 'react-icons/fa';
import { Modal ,Button } from 'react-bootstrap';
import classes from '../../components/UI/Modal/Modal.module.css';
import axios2 from '../../axios-cards';


const getDateTime = () => {
  let tempDate = new Date();
  let date = tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds() +' '+ tempDate.getDate() + '.' + (tempDate.getMonth()+1) + '.' + tempDate.getFullYear(); 
  return date;
}
class openNew extends Component   {
  
    constructor(props) {
        super(props)
    this.state = {
    branchNumber:'',
    identifiedCardID:'',
    rows: [],
    term:'',
    cards:{},
    book:[],
    userCarNumber:'',
    dataBaseCarNumber:'',
    cardDetails:{},
    carDetails:{},
    ImageFiles:[],
    DocFiles:[],
    found: false,
    customer_details:{},
    startDate: new Date(),
    myDate: new Date(),
    reportStartDate: getDateTime(),
    formIsValid: false,
    isAddNewWorkOpen: false,
    showDetailsDiv: true,
    showCarInfoDiv:true,
    showCustomerDetailsDiv: true,
    showTinsmithingDetailsDiv:true,
    showCustomerRequestsDiv:true,
    showUploadDocDiv:true,
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
        value: 'ביטוח',
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

      JobDescription:{
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
  
    cardParts:{
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
    //this.setState( { loading: true } ); // set the state to loading initially to show a spinner
    const formData = {};
    for (let formElementIdentifier in this.state.cardForm) {
      formData[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
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
        cardData: formData,
        carData: carData, 
        customerData: customerData,
        userId: this.props.userId,
        branchNumber: this.props.branchNumber
    }   
    this.props.onCardOpening(card, this.props.token, this.props.branchNumber); // this contains all the data of card 
}

inputChangedHandler = (event) => { 

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

  //console.log("299" + state);

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

 handleChange = date => {
  this.setState({
    startDate: date
  });
};
cardUpdateHandler = ( event ) => {
  event.preventDefault(); // with that we get the Card details

  const carData=this.state.carDetails;
  const cardData=this.state.cardDetails;
  const customerData=this.state.customer_details;
  console.log(carData);
  console.log(cardData);
  console.log(customerData);
  console.log(this.props.branchNumber);
  this.props.onCardUpdate(carData,cardData,customerData, this.props.token, this.state.branchNumber,this.state.identifiedCardID); // this contains all the data of card 

/**axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/carData.json?auth=' + this.props.token, carData)
        .then(res => {
        console.log(res);
        })

    axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/cardData.json?auth=' + this.props.token, cardData)
        .then(res => {
        console.log(res);
        })

    axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/customerData.json?auth=' + this.props.token, customerData)
        .then(res => {
        console.log(res);
        })
 *  */  

  /*console.log(this.state.branchNumber);
  console.log(this.state.identifiedCardID);
  console.log(this.state.carDetails);
  console.log(this.state.cardDetails);
  console.log(this.state.customer_details);
  console.log(this.state.term);
  axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/carData.json?auth=' + this.props.token, this.state.carDetails)
  .then(res => {
  console.log(res);
  })

  axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/cardData.json?auth=' + this.props.token, this.state.cardDetails)
  .then(res => {
  console.log(res);
  })

  axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/customerData.json?auth=' + this.props.token, this.state.customer_details)
  .then(res => {
  console.log(res);
  })*/
  
    
    /*const carData=this.state.carDetails;
    const cardData=this.state.cardDetails;
    const customerData=this.state.customer_details;
      
      axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/carData.json?auth=' + this.props.token, carData)
      .then(res => {
      console.log(res);
      })

      axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/cardData.json?auth=' + this.props.token, cardData)
      .then(res => {
      console.log(res);
      })

      axios2.put(this.state.branchNumber+'/cards/'+this.state.identifiedCardID+'/customerData.json?auth=' + this.props.token, customerData)
      .then(res => {
      console.log(res);
      })
*/

      
    /*var card=1;
      const carData=this.state.cards[card].carData;
      const cardData=this.state.cards[card].cardData;
      const customerData=this.state.cards[card].customerData;
      
      axios2.put(this.state.cards[card].branchNumber+'/cards/'+this.state.cards[card].id+'/carData.json?auth=' + this.props.token, carData)
      .then(res => {
      console.log(res);
      })

      axios2.put(this.state.cards[card].branchNumber+'/cards/'+this.state.cards[card].id+'/cardData.json?auth=' + this.props.token, cardData)
      .then(res => {
      console.log(res);
      })

      axios2.put(this.state.cards[card].branchNumber+'/cards/'+this.state.cards[card].id+'/customerData.json?auth=' + this.props.token, customerData)
      .then(res => {
      console.log(res);
      })

    
*/
    
    /*axios2.put(this.state.cards[0].branchNumber+'/cards/'+this.state.cards[0].id+'/carData.json?auth=' + this.props.token, this.state.cards[0].carData)
      .then(res => {
      console.log(res);
      })
 */
  /**
   * 
   *   axios2.put(this.state.cards[0].branchNumber+'/cards/'+this.state.cards[0].id+'/cardData.json?auth=' + this.props.token, this.state.cards[0].cardData)
    .then(res => {
    console.log(res);
    })
    axios2.put(this.state.cards[0].branchNumber+'/cards/'+this.state.cards[0].id+'/customerData.json?auth=' + this.props.token, this.state.cards[0].customerData)
    .then(res => {
    console.log(res);
    })
   * 
   *axios2.put('Talpiot/cards/-M7DmG6e-XZCy4mUN_vf/carData.json?auth=' + this.props.token, carData)
    .then(res => {
    console.log(res);
  })
   */
  
 // const response = await axios.put('Talpiot/cards/-M78PZO7rO3pSazAY5YD/carData/carDescription.json', {carData})
  //console.log(response)
  //console.log(response.data)


  /*const carData =
    {
        carDescription: this.state.cards[0].carData.carDescription,
        carNote: this.state.cards[0].carData.carNote,
        chalkModel: this.state.cards[0].carData.chalkModel,
        code: this.state.cards[0].carData.code,
        color: this.state.cards[0].carData.color,
        deliveryDate: this.state.cards[0].carData.deliveryDate,
        driverName: this.state.cards[0].carData.driverName,
        engineCapacity: this.state.cards[0].carData.engineCapacity,
        lastVisit: this.state.cards[0].carData.lastVisit,
        manufactureYear: this.state.cards[0].carData.manufactureYear,
        speedometer: this.state.cards[0].carData.speedometer
    }*/
}

//    this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: event.target.value, found: true,dataBaseCarNumber:data.cardData.licenseNumber });




check(data){
  if(data.cardData.licenseNumber===this.state.userCarNumber){
    this.state.found=true;
    this.state.dataBaseCarNumber=data.cardData.licenseNumber;
    this.state.carDetails=data.carData;
    this.state.cardDetails=data.cardData;
    this.state.customer_details=data.customerData;
    this.state.identifiedCardID=data.id;//rotem
    this.state.branchNumber=data.branchNumber;
  }
}

componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
  this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);

}

componentWillUpdate(newProps, newState) {
  //console.log(newState);
  //console.log(newProps);
  
  this.state.cards=newProps.cards;
  var i=0; 
  console.log(this.state.cards);
  

}

componentDidUpdate(preProps,preState){
  //console.log(preProps);
  //console.log(preState);
  //this.updateAPI();
}
handleShowWorkModel = () => {
  this.setState( { showWorkModel: true } );
  console.log("370" + this.showWorkModel);
}

getInitialState() {
  return { showWorkModel: false };
}

close = (event) => {
  this.props.workModalClose(this.props.token); // this contains all the data of card 
// this.setState({ showWorkModel: false });
};

open = (event) => {
    // event.preventDefault(); // with that we get the Card details
  console.log("427");
      this.props.workModalOpening(this.props.token); // this contains all the data of card 

  //return updateObject( this, { showWorkModel: true } );
  //this.setState({ showWorkModel: true });
};

handleAddRow = () => {
  this.setState( { isAddNewWorkOpen: true } );

  this.setState((prevState, props) => {
    const row = {jobDescription: "1",time: "2",gross: "3",discount: "4",net: "5" };
    return { rows: [...prevState.rows, row] };
  });
};

handleRemoveRow = () => {
  this.setState((prevState, props) => {
    return { rows: prevState.rows.slice(1) };
  });
};


closeAddButton = () => {
  this.setState( { isAddNewWorkOpen: false } );

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


updateInputValue(evt) {
  this.setState({
      term: evt.target.value
  });
}

change(term){
  const name = this.props.searchBoxName || undefined
    this.setState({term});
    if(this.props.onSearchTermChange){
      this.props.onSearchTermChange({name,term})
    }
  //this.setState(event.target.value);
  //console.log(event.target.value);
  
}

fileSelectedHandler = (e) => {
  for ( let fieldName in e.target.files ) {
    if(e.target.files[fieldName].type==="image/jpeg"){
      this.state.ImageFiles.push(e.target.files[fieldName]);
    }
  }
  for ( let fieldName in e.target.files ) {
    if(e.target.type === "file" && e.target.files[fieldName].type!=="image/jpeg"){
      this.state.DocFiles.push(e.target.files[fieldName]);
    }
  }
  for(let g in this.state.DocFiles){
    if(this.state.DocFiles[g].type==='undefined'){
      //console.log(this.state.DocFiles[g].type);
    }
  }
  console.log(this.state.ImageFiles);
  console.log(this.state.DocFiles);
}

onChange = date => this.setState({ date })

  render () {
  console.log(this.state.branchNumber);
  console.log(this.state.identifiedCardID);
  //this.state.id=this.props.name; 
    let workButtons;
    let { isAddNewWorkOpen } = this.state;
    let { licenseNumber , ticketNumber } = this.state;

    if (!isAddNewWorkOpen) {
    //  console.log("497" + isAddNewWorkOpen);
      workButtons =
      <div >
          <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px"}} >         
            <div> 
              <Button onClick={this.close} >יציאה</Button>{' '}
              <Button onClick={this.close}>עדכון</Button>{' '}
              <Button onClick={this.close}>מחיקה</Button>{' '}
              <Button onClick={this.handleAddRow} >הוספה</Button> 
            </div>
          </form>
      </div>;
    }

    else {
      workButtons = 
      <div > 
        <form  class="form-group" style={{fontSize: "11px", marginBottom: "4px"}} >
          <div class="form-row" style={{direction: "rtl", fontWeight : "none" ,marginBottom: "4px" }} > 
            <div class="form-group col-md-8" style={{ marginBottom: "4px"}}  >       
              <label for="JobDescription" >תיאור עבודה</label>
              <input type="text" id="JobDescription" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="time">זמן תקן</label>
              <input type="text" id="time" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="text" id="gross" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="text" id="discount" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}  >
              <label for="net">נטו</label>
              <input type="text" id="net" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

          </div>
        </form>
        
        <form  onSubmit={this.cardOpeningHandler}  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px", justifyContent: "left"}} >
          <div  >  
            <Button bsStyle="secondary" onClick={this.cardOpeningHandler}> <CheckIcon/> אישור </Button> {' '}
            <Button bsStyle="secondary" onClick={this.closeAddButton}> <CloseIcon/> ביטול </Button> {' '}
          </div>
         </form>
      </div>
      ;

    }
//    const showWorkModel = this.state.showWorkModel;

    // const formElementsArray = [];
    // for (let key in this.state.cardForm) {
    //     formElementsArray.push({
    //         id: key,
    //         config: this.state.cardForm[key]         
    //     });
    // }
    let cards;
    if(this.state.userCarNumber!==""){
      cards = this.props.cards.map( card => (
        this.check(card)
      ))
    }

//   if ( this.props.loading ) {
  //     return(
  //         <Toast>
  //           <Toast.Header>
  //           <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
  //            <strong className="mr-auto">Bootstrap</strong>
  //             <small>11 mins ago</small>
  //         </Toast.Header>
  //         <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
  //       </Toast>
  //     );
  // }
  let button;
  if (this.state.found) {
    button =<Button2  btnType="Success" disabled={!this.state.formIsValid}>שמירה  </Button2>;
  } else {
    button = <Button2  btnType="Success" onClick={this.cardUpdateHandler}>עדכון  </Button2>;
  }
  
  if(this.state.found){

  }
  //if(!this.state.found){
  return (
    
          <form  onSubmit={this.state.found ? this.cardUpdateHandler : this.cardOpeningHandler}  class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandler} >פרטים</div>
            
            {this.state.showDetailsDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="licenseNumber" >מספר רישוי</label>
                  <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline" 

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
                  <input type="text" id="ticketNumber" class="form-control" aria-describedby="passwordHelpInline"
                  value={this.state.cardForm.ticketNumber.value}
                   onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="cardType">סוג כרטיס</label>
                  <select id="inputState" class="form-control" onChange={(event) => this.inputChangedHandler(event)}>
                    <option selected>ביטוח</option>
                    <option>פרטי</option>
                  </select>
                </div>
  
                <div className="form-group col-md-3">
                <label htmlFor="openingDate">תאריך פתיחה</label>
                <input  type="text" name="openingDate" className="form-control" 
                value={this.state.reportStartDate} 
                onChange={(event) => this.inputChangedHandler(event)}  />
              </div>
              </div> 
            </div>
          : null }
          </div>


          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandlerCar}>עדכון פרטי רכב</div>
            
            {this.state.showCarInfoDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row">              
                <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found){
                  this.state.vehicleData.carDescription.value=this.state.carDetails.carDescription;
                }    
              })()}
                  <label for="carDescription">תאור הרכב</label>
                  <input type="carDescription" id="carDescription" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                    value={this.state.vehicleData.carDescription.value} 
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateInputValue(evt)}/>
                </div>
  
                <div class="form-group col-md-3" >
                 {(() => {
                   if(this.state.found){
                    this.state.vehicleData.speedometer.value= this.state.carDetails.speedometer;
                    }    
                 })()}
                  <label for="speedometer">מד אוץ</label>
                  <input  type="text"  id="speedometer" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                 value={this.state.vehicleData.speedometer.value}
               
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
               
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.engineCapacity.value= this.state.carDetails.engineCapacity;
                    }    
                 })()}
                  <label for="engineCapacity">נפח מנוע</label>
                  <input  type="text"  id="engineCapacity" class="form-control" 
                  aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.engineCapacity.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.color.value= this.state.carDetails.color;
                    }    
                 })()}
                  <label for="color" >צבע</label>
                  <input  type="text" id="color" class="form-control " aria-describedby="passwordHelpInline" 
                  value={this.state.vehicleData.color.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.chalkModel.value= this.state.carDetails.chalkModel;
                    }    
                 })()}
                  <label for="chalkModel">דגם גיר</label>
                  <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.chalkModel.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.lastVisit.value= this.state.carDetails.lastVisit;
                    }    
                 })()}
                  <label for="lastVisit">ביקור אחרון</label>
                  <input type="text" id="lastVisit" class="form-control" aria-describedby="passwordHelpInline"  
                  value={this.state.vehicleData.lastVisit.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="manufactureYear">שנת יצור</label>
                  <select  id="manufactureYear" class="form-control" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}>
                    <option selected></option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                    <option>2016</option>
                    <option>2015 and more</option>
                  </select>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.deliveryDate.value= this.state.carDetails.deliveryDate;
                    }    
                 })()}
                  <label for="deliveryDate" >תאריך מסירה</label> 
                  <input type="text" id="deliveryDate" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.deliveryDate.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.driverName.value= this.state.carDetails.driverName;
                    }    
                 })()}
                  <label for="driverName">שם הנהג</label>
                  <input  type="text" id="driverName" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.driverName.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.code.value= this.state.carDetails.code;
                    }    
                 })()}
                  <label for="code">קודן</label>
                  <input  type="text" id="code" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.code.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.carNote.value= this.state.carDetails.carNote;
                    }    
                 })()}
                  <label for="carNote">הערה לרכב</label>
                  <input  type="text"  id="carNote" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.vehicleData.carNote.value}
                  onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
              </div> 
            </div> 
              : null } 
          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandlerCus}>עדכון פרטי לקוח</div>
            
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
                  <input type="text" id="customerNumber" class="form-control " aria-describedby="passwordHelpInline" 
                  value={this.state.customerDetails.customerNumber.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerName.value= this.state.customer_details.customerName;
                    }    
                 })()}
                  <label for="customerName">שם לקוח</label>
                  <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" 
                  value={this.state.customerDetails.customerName.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.address.value= this.state.customer_details.address;
                    }    
                 })()}
                  <label for="address">כתובת</label>
                  <input type="text" id="address" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.address.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.city.value= this.state.customer_details.city;
                    }    
                 })()}
                  <label for="city">עיר</label>
                  <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.city.value}  
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.postalCode.value= this.state.customer_details.postalCode;
                    }    
                 })()}
                  <label for="postalCode" >מיקוד</label>
                  <input type="text" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.postalCode.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.homePhone.value= this.state.customer_details.homePhone;
                    }    
                 })()}
                  <label for="homePhone">טלפון בית</label>
                  <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.homePhone.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.cellphone.value= this.state.customer_details.cellphone;
                    }    
                 })()}
                  <label for="cellphone">סלולרי</label>
                  <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.cellphone.value} 
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.workingPhone.value= this.state.customer_details.workingPhone;
                    }    
                 })()}
                  <label for="workingPhone">טלפון עבודה</label>
                  <input type="text"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.workingPhone.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.identificationNumber.value= this.state.customer_details.identificationNumber;
                    }    
                 })()}
                  <label for="identificationNumber" >ח.פ/ת.ז</label>
                  <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  value={this.state.customerDetails.identificationNumber.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.mailAdress.value= this.state.customer_details.mailAdress;
                    }    
                 })()}
                  <label for="mailAdress">כתובת מייל</label>
                  <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.mailAdress.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.orderNumber.value= this.state.customer_details.orderNumber;
                    }    
                 })()}
                  <label for="orderNumber">מספר הזמנה</label>
                  <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.orderNumber.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerNote.value= this.state.customer_details.customerNote;
                    }    
                 })()}
                  <label for="customerNote">הערה ללקוח</label>
                  <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.customerNote.value}
                  onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>

              </div> 
            </div>  
               : null}
          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandlerTin}>נתוני כרטיס פחחות</div>
            
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
                  <input type="text" id="insuranceAgent" class="form-control " style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  value={this.state.cardForm.insuranceAgent.value}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.appraiser.value= this.state.cardDetails.appraiser;
                    }    
                 })()}
                  <label for="appraiser">שמאי</label>
                  <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.appraiser.value}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.insuranceCompany.value= this.state.cardDetails.insuranceCompany;
                    }    
                 })()}
                  <label for="insuranceCompany">חברת ביטוח</label>
                  <input type="text" id="insuranceCompany" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.insuranceCompany.value}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.customerParticipation.value= this.state.cardDetails.customerParticipation;
                    }    
                 })()}
                  <label for="customerParticipation">השתתפות הלקוח</label>
                  <input type="text"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.customerParticipation.value}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.policyNumber.value= this.state.cardDetails.policyNumber;
                    }    
                 })()}
                  <label for="policyNumber">מס. פוליסה</label>
                  <input type="text" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.policyNumber.value} 
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.claimNumber.value= this.state.cardDetails.claimNumber;
                    }    
                 })()}
                  <label for="claimNumber">תביעה</label>
                  <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.claimNumber.value}
                  onChange={(event) => this.inputChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.dateOfDamage.value= this.state.cardDetails.dateOfDamage;
                    }    
                 })()}
                  <label for="dateOfDamage">תאריך נזק</label>
                  <DatePicker name="dateOfDamage" style={{input: "input"}} class="form-control" aria-describedby="passwordHelpInline" selected={this.state.startDate}  
                  value={this.state.cardForm.dateOfDamage.value}
                  onChange={(event) => this.inputChangedHandler(event)} />
                </div>
              </div> 
            </div>
          : null }

          </div>
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandlerReq}>תלונות/בקשות הלקוח</div>  
            {this.state.showCustomerRequestsDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.customerRequests.value= this.state.cardDetails.customerRequests;
                    }    
                 })()}
                  <label for="customerRequests" >תלונות/בקשות הלקוח</label>
                  <input type="text" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.cardForm.customerRequests.value}
                  onChange={(date) => this.inputChangedHandler(date)}/>
                </div>
              </div> 
              
            </div> 
               : null }   
          </div>  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px",fontWeight: "bold"}} onClick={this.switchDivModeHandlerDoc}>העלאת תמונות וקבצים</div>
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
              
                </div>  
              </div>  
               : null }  
            </div>  
     
        <form class="form-group" > 
        <span>       
     <Button bsStyle="secondary" onClick={this.open} disabled={!this.state.formIsValid} > עבודות </Button> {' '}

     <Modal show={this.props.showWorkModel} onHide={this.close}  dialogClassName={classes.ModalDialog} 
         style={{ display: "flex", textAlign:"right", paddingLeft: "1px"  }}  >
       <Modal.Header closeButton style={{ padding: "5px", textAlign:"right"}}   >
         <Modal.Title  >עבודות לכרטיס</Modal.Title>   
       </Modal.Header>

       <Modal.Body  style={{ backgroundColor:"#6c757d", display: "block", maxHeight: "calc(100% - 120px)", overFlowY: "scroll", padding:"3px",flex: "none"}}   >
         <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 

            <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
              <label for="licenseNumber" >מספר רישוי</label>
              <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
              value2={this.state.userCarNumber}
              />
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="ticketNumber" >מספר כרטיס</label>
              <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber} style={{marginLeft: "10px"}} 
              class="form-control" aria-describedby="passwordHelpInline"/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="cardType" >סוג כרטיס</label>
              <select id="inputState" class="form-control" style={{marginLeft: "10px"}}  onChange={(event) => this.inputChangedHandler(event)}>
                <option selected>ביטוח</option>
                <option>פרטי</option>
              </select>
            </div>

            <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
            <label htmlFor="openingDate"  >תאריך פתיחה</label>
            <input  type="text" name="openingDate" className="form-control" style={{marginLeft: "10px"}}  value={this.state.cardDetails.openingDate} />
          </div>
          </div> 
         </Modal.Body>
      
         <div className={classes.separator}></div>

       <Modal.Body  style={{ backgroundColor:"#6c757d" , display: "block", maxHeight: "calc(100% - 120px)",maxHeight: "100%",overFlowY: "auto", padding:"3px",flex: "none"}}   >
      
         <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto"}}> 
        
         <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
              <label for="customerRequests"  >תיאור העבודה</label>
              <input type="text" id="customerRequests" class="form-control " style={{marginLeft: "10px"}}  
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerRequests}/>
            </div>

            <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
              <label for="customerName" >שם לקוח</label>
              <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
              value={this.state.customer_details.customerName}/>
            </div>
            </div>

            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="cellphone" >סלולרי</label>
              <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
              value={this.state.customer_details.cellphone}/>
            </div>
  
            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="homePhone" >טלפון בית</label>
              <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}}  
              value={this.state.customer_details.homePhone}/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="orderNumber" >הזמנה</label>
              <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
              value={this.state.customer_details.orderNumber}/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="speedometer" >מד אוץ</label>
              <input  type="text"  id="speedometer" class="form-control" style={{marginLeft: "10px"}}  
              aria-describedby="passwordHelpInline" value={this.state.carDetails.speedometer}/>
            </div>

          </div> 

         </Modal.Body>
         <div className={classes.separator}></div>
         <Modal.Body  style={{ backgroundColor:"#6c757d", padding:"3px",flex: "none" }}   >

         <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל עבודות:</div> 
         <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל שורות:</div> 

      </Modal.Body>

       <Modal.Body style={{padding: "0px",flex: "auto"}}>
        <div class="table-wrapper" style={{direction: "rtl"}}>
            <table class="table table-bordered" style={{marginBottom: "1px"}} >
                <thead >
                    <tr >
                        <th  scope="col" style={{ textAlign: "right"}}>תיאור עבודה</th>
                        <th  scope="col" style={{ textAlign: "right"}}>זמן</th>
                        <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                        <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                        <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>טיפול</td>
                        <td>00:00</td>
                        <td>3$</td>
                        <td>10%</td>

                        <td>
							              <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons" ><AddIcon style={{fontSize:"large"}}/></i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"><EditIcon style={{fontSize:"large"}}/></i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"><DeleteIcon style={{fontSize:"large"}}/></i></a>
                        </td>
                    </tr>
                </tbody>
                <tbody>
            {this.state.rows.map(row => (
              <tr>
                <td>{row.jobDescription}</td>
                <td>{row.time}</td>
                <td>{row.gross}</td>
                <td>{row.discount}</td>
                <td>{row.net}</td>
              </tr>
            ))}
          
          </tbody>
            </table>
        </div>
       </Modal.Body>
       <Modal.Footer style={{padding: "5px", display: "block"}}>
            {workButtons}
       </Modal.Footer>
     </Modal>

   </span>

      <Button bsStyle="secondary" disabled={!this.state.formIsValid} >חלקים</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid}>הדפסת כרטיס</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid}>סגירת כרטיס</Button> {' '}
      {this.state.found
        ? <button 
          type="submit" 
          className="btn btn-md btn-primary sign-in-button"
          onClick={this.cardUpdateHandler}
          >
          עדכון
        </button> 
        : <Button2 bsStyle="secondary" disabled={!this.state.formIsValid}>שמירה</Button2>     
      }

        </form>
      </form>
    );
  //}
  /*
  else{
    return (
      
      <form onSubmit={this.cardUpdateHandler} class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >

      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>פרטים</div>
        
        <div class="card-body text-dark bg-white" >
          <div class="form-row" > 
            <div class="form-group col-md-3" >
              <label for="licenseNumber" >מספר רישוי</label>
              <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value2={this.state.userCarNumber}
              
              onChange={(event) => this.inputChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="ticketNumber">מספר כרטיס</label>
              <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber}
              class="form-control" aria-describedby="passwordHelpInline"/>
            </div>

            <div class="form-group col-md-3" >
              <label for="cardType">סוג כרטיס</label>
              <select id="inputState" class="form-control" onChange={(event) => this.inputChangedHandler(event)}>
                <option selected>ביטוח</option>
                <option>פרטי</option>
              </select>
            </div>
            
            <div className="form-group col-md-3">
            <label htmlFor="openingDate">תאריך פתיחה</label>
            <input  type="text" name="openingDate" className="form-control" value={this.state.cardDetails.openingDate} 
            />
          </div>
          </div> 
        </div>

      </div>


      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי רכב</div>   
        <div class="card-body text-dark bg-white" >
          <div class="form-row"> 
            <div class="form-group col-md-3" >
            {(() => {
                if(this.state.term!==''){
                  this.state.carDetails.carDescription=this.state.term;
                }    
              })()}
              <label for="carDescription">תאור הרכב</label>
              <input type="carDescription" id="carDescription" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.carDescription}
              onChange={event => this.change(event.target.value)}
              />
            </div>

            <div class="form-group col-md-3" >
              <label for="speedometer">מד אוץ</label>
              <input  type="text"  id="speedometer" class="form-control" 
              aria-describedby="passwordHelpInline" value={this.state.carDetails.speedometer}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="engineCapacity">נפח מנוע</label>
              <input  type="text"  id="engineCapacity" class="form-control" 
              aria-describedby="passwordHelpInline" value={this.state.carDetails.engineCapacity}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="color" >צבע</label>
              <input  type="text" id="color" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.color}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="chalkModel">דגם גיר</label>
              <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.chalkModel}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="lastVisit">ביקור אחרון</label>
              <input type="text" id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.lastVisit}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="manufactureYear">שנת יצור</label>
              <select  id="manufactureYear" class="form-control" 
              value={this.state.carDetails.manufactureYear}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="deliveryDate" >תאריך מסירה</label> 
              <input type="text" id="deliveryDate" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.deliveryDate}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="driverName">שם הנהג</label>
              <input  type="text" id="driverName" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.driverName}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="code">קודן</label>
              <input  type="text" id="code" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.code}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="carNote">הערה לרכב</label>
              <input  type="text"  id="carNote" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.carNote}/>
            </div>
          </div> 
        </div>  
      </div>

      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי לקוח</div>
        
        <div class="card-body text-dark bg-white" >
          <div class="form-row" > 
            <div class="form-group col-md-3" >
              <label for="customerNumber" >מספר לקוח</label>
              <input type="text" id="customerNumber" class="form-control " 
              aria-describedby="passwordHelpInline" value={this.state.customer_details.customerNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="customerName">שם לקוח</label>
              <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.customerName}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="address">כתובת</label>
              <input type="text" id="address" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.address}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="city">עיר</label>
              <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.city}/>
            </div>
            <div class="form-group col-md-3" >
              <label for="postalCode" >מיקוד</label>
              <input type="text" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.postalCode}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="homePhone">טלפון בית</label>
              <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.homePhone}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="cellphone">סלולרי</label>
              <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.cellphone}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="workingPhone">טלפון עבודה</label>
              <input type="text"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.workingPhone}/>
            </div>
            
            <div class="form-group col-md-3" >
              <label for="identificationNumber" >ח.פ/ת.ז</label>
              <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " 
              aria-describedby="passwordHelpInline" value={this.state.customer_details.identificationNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="mailAdress">כתובת מייל</label>
              <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.mailAdress}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="orderNumber">מספר הזמנה</label>
              <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.orderNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="customerNote">הערה ללקוח</label>
              <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.customer_details.customerNote}/>
            </div>

          </div> 
        </div>  
      </div>

      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>נתוני כרטיס פחחות</div>
        
        <div class="card-body text-dark bg-white" >
          <div class="form-row" > 
            <div class="form-group col-md-3" >
              <label for="insuranceAgent" >סוכן ביטוח</label>
              <input type="text" id="insuranceAgent" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.cardDetails.insuranceAgent}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="appraiser">שמאי</label>
              <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.cardDetails.appraiser}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="insuranceCompany">חברת ביטוח</label>
              <input type="text" id="insuranceCompany" class="form-control" 
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.insuranceCompany}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="customerParticipation">השתתפות הלקוח</label>
              <input type="text"  id="customerParticipation" class="form-control" 
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerParticipation}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="policyNumber">מס. פוליסה</label>
              <input type="text" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.cardDetails.policyNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="claimNumber">תביעה</label>
              <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.cardDetails.claimNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="dateOfDamage">תאריך נזק</label>
              <DatePicker name="dateOfDamage" style={{input: "input"}} class="form-control" 
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.dateOfDamage} />
            </div>
          </div> 
        </div>
      </div>

      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>תלונות/בקשות הלקוח</div>  
        <div class="card-body text-dark bg-white" >
          <div class="form-row" > 
            <div class="form-group col-md-3" >
              <label for="customerRequests" >תלונות/בקשות הלקוח</label>
              <input type="text" id="customerRequests" class="form-control " 
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerRequests}/>
            </div>
          </div>   
        </div>   
      </div>  
      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>העלאת תמונות וקבצים</div>
              <div class="card-body text-dark bg-white" >
                <div class="form-row" > 
                  <div class="form-group col-md-3" >
                  <form>
                    <h5>תמונות:</h5>
                        <input type="file" multiple onChange={this.fileSelectedHandler}/>
                  </form>
                  <form>
                    <h5>מסמכים:</h5>
                        <input type="file" multiple onChange={this.fileSelectedHandler} />
                  </form>
                  </div>
                </div>  
              </div>  
            </div> 
    <form class="form-group" > 
    <span>    
        <Button bsStyle="secondary" onClick={this.open} disabled={!this.state.formIsValid} >עבודות</Button> {' '}

        <Modal show={this.props.showWorkModel} onHide={this.close}  dialogClassName={classes.ModalDialog} 
         style={{ display: "flex", textAlign:"right", paddingLeft: "1px"  }}  >
       <Modal.Header closeButton style={{ padding: "5px", textAlign:"right"}}   >
         <Modal.Title  >עבודות לכרטיס</Modal.Title>   
       </Modal.Header>

       <Modal.Body  style={{ backgroundColor:"#6c757d", display: "block", maxHeight: "calc(100% - 120px)", overFlowY: "scroll", padding:"3px",flex: "none"}}   >
         <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 

            <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
              <label for="licenseNumber" >מספר רישוי</label>
              <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
              value2={this.state.userCarNumber}
              />
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="ticketNumber" >מספר כרטיס</label>
              <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber} style={{marginLeft: "10px"}} 
              class="form-control" aria-describedby="passwordHelpInline"/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="cardType" >סוג כרטיס</label>
              <select id="inputState" class="form-control" style={{marginLeft: "10px"}}  onChange={(event) => this.inputChangedHandler(event)}>
                <option selected>ביטוח</option>
                <option>פרטי</option>
              </select>
            </div>

            <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
            <label htmlFor="openingDate"  >תאריך פתיחה</label>
            <input  type="text" name="openingDate" className="form-control" style={{marginLeft: "10px"}}  value={this.state.cardDetails.openingDate} />
          </div>
          </div> 
         </Modal.Body>
      
         <div className={classes.separator}></div>

       <Modal.Body  style={{ backgroundColor:"#6c757d" , display: "block", maxHeight: "calc(100% - 120px)",maxHeight: "100%",overFlowY: "auto", padding:"3px",flex: "none"}}   >
      
         <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto"}}> 
        
         <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
              <label for="customerRequests"  >תיאור העבודה</label>
              <input type="text" id="customerRequests" class="form-control " style={{marginLeft: "10px"}}  
              aria-describedby="passwordHelpInline" value={this.state.cardDetails.customerRequests}/>
            </div>

            <div class="form-group col-md-6"  style={{ marginBottom: "4px"}}   > 
              <label for="customerName" >שם לקוח</label>
              <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
              value={this.state.customer_details.customerName}/>
            </div>
            </div>

            <div class="form-row" style={{ direction: "rtl",color: "white" ,fontSize: "11px", marginRight:"auto" }}> 

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="cellphone" >סלולרי</label>
              <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
              value={this.state.customer_details.cellphone}/>
            </div>
  
            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="homePhone" >טלפון בית</label>
              <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}}  
              value={this.state.customer_details.homePhone}/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="orderNumber" >הזמנה</label>
              <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline"  style={{marginLeft: "10px"}} 
              value={this.state.customer_details.orderNumber}/>
            </div>

            <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
              <label for="speedometer" >מד אוץ</label>
              <input  type="text"  id="speedometer" class="form-control" style={{marginLeft: "10px"}}  
              aria-describedby="passwordHelpInline" value={this.state.carDetails.speedometer}/>
            </div>

          </div> 

         </Modal.Body>
         <div className={classes.separator}></div>
         <Modal.Body  style={{ backgroundColor:"#6c757d", padding:"3px",flex: "none" }}   >

         <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל עבודות:</div> 
         <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל שורות:</div> 

      </Modal.Body>

       <Modal.Body style={{padding: "0px",flex: "auto"}}>
        <div class="table-wrapper" style={{direction: "rtl"}}>
            <table class="table table-bordered" style={{marginBottom: "1px"}} >
                <thead >
                    <tr >
                        <th  scope="col" style={{ textAlign: "right"}}>תיאור עבודה</th>
                        <th  scope="col" style={{ textAlign: "right"}}>זמן</th>
                        <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                        <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                        <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>טיפול</td>
                        <td>00:00</td>
                        <td>3$</td>
                        <td>10%</td>

                        <td>
							              <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons" ><AddIcon style={{fontSize:"large"}}/></i></a>
                            <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"><EditIcon style={{fontSize:"large"}}/></i></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"><DeleteIcon style={{fontSize:"large"}}/></i></a>
                        </td>
                    </tr>
                </tbody>
                <tbody>
            {this.state.rows.map(row => (
              <tr>
                <td>{row.jobDescription}</td>
                <td>{row.time}</td>
                <td>{row.gross}</td>
                <td>{row.discount}</td>
                <td>{row.net}</td>
              </tr>
            ))}
          
          </tbody>
            </table>
        </div>
       </Modal.Body>
       <Modal.Footer style={{padding: "5px", display: "block"}}>
            {workButtons}
       </Modal.Footer>
     </Modal>
      </span>     
      <Button bsStyle="secondary"  disabled={!this.state.formIsValid}  >חלקים</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid} >הדפסת כרטיס</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid}>סגירת כרטיס</Button> {' '}
      
      <button 
              type="submit" 
              className="btn btn-md btn-primary sign-in-button"
              onClick={this.cardUpdateHandler}
            >
              עדכון
      </button> 
    </form>

  </form>
  );
  }
  */
}
}
//      <Button  btnType="secondary" disabled={this.state.formIsValid}>עדכון  </Button>
//      <Button2 btnType="Success" disabled={!this.state.formIsValid}>שמירה  </Button2>

// <form class="form-group" style={{display: "flex"}} > 

// <div class="custom-file" >
//   <input type="file" class="custom-file-input" id="customFiles"/>
//   <label class="custom-file-label" for="customFiles"> מסמכים להעלאה</label>

// </div>
// <div class="custom-file">
//   <input type="file" class="custom-file-input" id="customImages"/>
//   <label class="custom-file-label" for="customImages"> תמונות להעלאה</label>
// </div>

// </form>

/* <Button onClick={this.close} >יציאה</Button>
    
<Button onClick={this.close}>עדכון</Button>
<Button onClick={this.close}>מחיקה</Button>
<Button onClick={this.handleAddRow} >הוספה</Button> */





//  <DatePicker style={{input: "input"}} class="form-control" aria-describedby="passwordHelpInline" selected={this.state.startDate} onChange={this.handleChange}/>
/*
 * <button 
              type="submit" 
              className="btn btn-md btn-primary sign-in-button"
              onClick={() => this.updateTitle()}
            >
              Post
      </button>
 */

const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      cards: state.card.cards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
      loading: state.card.loading,
      token: state.auth.token,
      userId: state.auth.userId,
      showWorkModel: state.card.showWorkModel,
      branchNumber: state.auth.branchNumber
  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ),
    onCardOpening: (cardData, token,branchNumber) => dispatch(actions.cardOpening(cardData, token, branchNumber)),
    onCardUpdate:(carData,cardData,customerData, token, branchNumber,identifiedCardID) => dispatch(actions.cardUpdate(carData,cardData,customerData, token, branchNumber,identifiedCardID)), // this contains all the data of card 
    workModalOpening: (token ) =>  dispatch(actions.workModalOpening(token)),
    workModalClose: (token ) =>  dispatch(actions.workModalClose(token))

        //  return a map to map my props to dispatchable functions
      //here we want to execute an anonymous function where we eventually dispatch the action we just created it
      // note - we need to execute this function - "fetchCards()" to really get the action

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(openNew,axios));
