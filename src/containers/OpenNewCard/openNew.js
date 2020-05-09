
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import dd from './openNew.module.css';
import DatePicker from "react-datepicker";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//import { database } from 'firebase';
import "react-datepicker/dist/react-datepicker.css";
import Image from './images.js';
import Button2 from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; //
import card from '../../components/Card/Card';
import { FaThinkPeaks } from 'react-icons/fa';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Modal ,Button } from 'react-bootstrap';
import classes from '../../components/UI/Modal/Modal.module.css';

const getDateTime = () => {
  let tempDate = new Date();
  let date = tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds() +' '+ tempDate.getDate() + '.' + (tempDate.getMonth()+1) + '.' + tempDate.getFullYear(); 
  return date;
}

class openNew extends Component  {
  
  constructor(props) {
    super(props)
    this.state = {
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

      manufacturer:{
        value: '',
        valid: false,
        touched: false
      },
      model:{
        value: '',
        valid: false,
        touched: false
     },
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
      engineHours:{
        value: '',
        valid: false,
        touched: false
      },
      chassisNumber:{
        value: '',
        valid: false,
        touched: false
      },
      engineNumber:{
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
        userId: this.props.userId
    }   
    this.props.onCardOpening(card, this.props.token); // this contains all the data of card 
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

//////////////////ariel
fetchBooks = () => {
  fetch('https://console.firebase.google.com/project/garage-management-softwa/database/data/')
  .then((response) => response.json())
  .then(booksList => {
      this.setState({ cards: booksList });
      
  });
  console.log(this.state.book);
}

check(data){
  if(data.cardData.licenseNumber===this.state.userCarNumber){
    this.state.found=true;
    this.state.dataBaseCarNumber=data.cardData.licenseNumber;
    this.state.carDetails=data.carData;
    this.state.cardDetails=data.cardData;
    this.state.customer_details=data.customerData;
    this.state.identifiedCardID=data.id;//rotem
    //console.log(this.state.carDetails);
    //console.log(this.state.cardDetails);
    //console.log(this.state.customer_details); 
  }
}

componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
  this.props.onFetchCards(this.props.token, this.props.userId);  
}

componentWillUpdate(nextProps, nextState) {
  console.log(nextProps.cards);
  console.log(nextState);
  //console.log(this.fetchData(this.props.cards));
  this.state.cards=nextProps.cards;
  //this.setState({books: nextProps.cards});
}

componentDidUpdate(preProps,preState){
  console.log(preProps.cards);
  console.log(preState);
  this.fetchBooks();
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

    let workButtons;
    let { isAddNewWorkOpen } = this.state;
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
  
  if(!this.state.found){
  return (
    
          <form  onSubmit={this.cardOpeningHandler}  class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >
  
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
                  <input type="text" id="ticketNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
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
                <input  type="text" name="openingDate" className="form-control" value={this.state.reportStartDate} onChange={(event) => this.inputChangedHandler(event)}  />
              </div>
              </div> 
            </div>
    
          </div>


          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי רכב</div>
            
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 

                <div class="form-group col-md-3" >
                  <label for="manufacturer" >יצרן</label>
                  <input  type="text" id="manufacturer" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="model">דגם</label>
                  <input  type="text" id="model" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="carDescription">תאור הרכב</label>
                  <input type="carDescription" id="carDescription" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="speedometer">מד אוץ</label>
                  <input  type="text"  id="speedometer" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="engineHours" >שעות מנוע</label>
                  <input  type="text" id="engineHours" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="chassisNumber">מספר שלדה</label>
                  <input  type="text" id="chassisNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="engineNumber">מספר מנוע</label>
                  <input  type="text" id="engineNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="engineCapacity">נפח מנוע</label>
                  <input  type="text"  id="engineCapacity" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="color" >צבע</label>
                  <input  type="text" id="color" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="chalkModel">דגם גיר</label>
                  <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="lastVisit">ביקור אחרון</label>
                  <input type="text" id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
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
                  <label for="deliveryDate" >תאריך מסירה</label> 
                  <input type="text" id="deliveryDate" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="driverName">שם הנהג</label>
                  <input  type="text" id="driverName" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="code">קודן</label>
                  <input  type="text" id="code" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="carNote">הערה לרכב</label>
                  <input  type="text"  id="carNote" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCarChangedHandler(event)}/>
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
                  <input type="text" id="customerNumber" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="customerName">שם לקוח</label>
                  <input type="text" id="customerName" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="address">כתובת</label>
                  <input type="text" id="address" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="city">עיר</label>
                  <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                <div class="form-group col-md-3" >
                  <label for="postalCode" >מיקוד</label>
                  <input type="text" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="homePhone">טלפון בית</label>
                  <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="cellphone">סלולרי</label>
                  <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="workingPhone">טלפון עבודה</label>
                  <input type="text"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                
                <div class="form-group col-md-3" >
                  <label for="identificationNumber" >ח.פ/ת.ז</label>
                  <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="mailAdress">כתובת מייל</label>
                  <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="orderNumber">מספר הזמנה</label>
                  <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="customerNote">הערה ללקוח</label>
                  <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputCusChangedHandler(event)}/>
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
                  <input type="text" id="insuranceAgent" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="appraiser">שמאי</label>
                  <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="insuranceCompany">חברת ביטוח</label>
                  <input type="text" id="insuranceCompany" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="customerParticipation">השתתפות הלקוח</label>
                  <input type="text"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="policyNumber">מס. פוליסה</label>
                  <input type="text" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="claimNumber">תביעה</label>
                  <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(event) => this.inputChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="dateOfDamage">תאריך נזק</label>
                  <DatePicker name="dateOfDamage" style={{input: "input"}} class="form-control" aria-describedby="passwordHelpInline" selected={this.state.startDate} onChange={(event) => this.inputChangedHandler(event)} />
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
                  <input type="text" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} onChange={(date) => this.inputChangedHandler(date)}/>
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
     <Button bsStyle="secondary" onClick={this.open} disabled={!this.state.formIsValid} > עבודות </Button> {' '}

     <Modal show={this.props.showWorkModel} onHide={this.close}  dialogClassName={classes.ModalDialog} 
           >
       <Modal.Header closeButton style={{ backgroundColor:"#6c757d"}}   >
         <Modal.Title  >
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <h4>Text</h4>
         <p>Du</p>
         <h4>Popover in a modal</h4>
        
       </Modal.Body>
       <Modal.Footer>
         <Button onClick={this.close}>Close</Button>
       </Modal.Footer>
     </Modal>
   </span>

       <Button bsStyle="secondary" disabled={!this.state.formIsValid} >חלקים</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid}>הדפסת כרטיס</Button> {' '}
      <Button bsStyle="secondary" disabled={!this.state.formIsValid}>סגירת כרטיס</Button> {' '}

          <Button2  btnType="Success" disabled={!this.state.formIsValid}>שמירה  </Button2>

        </form>
      </form>
    );
  }
  else{
    return (
      <form  onSubmit={this.cardOpeningHandler}  class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >

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
            <input  type="text" name="openingDate" className="form-control" value={this.state.cardDetails.openingDate} />
          </div>
          </div> 
        </div>

      </div>


      <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
        <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי רכב</div>
        
        <div class="card-body text-dark bg-white" >
          <div class="form-row" > 

            <div class="form-group col-md-3" >
              <label for="manufacturer" >יצרן</label>
              <input  type="text" id="manufacturer" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.manufacturer}
              />
              {(() => {
                if(true){}
              })()}
            </div>

            <div class="form-group col-md-3" >
              <label for="model">דגם</label>
              <input  type="text" id="model" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.model}
              />
            </div>
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
              <label for="engineHours" >שעות מנוע</label>
              <input  type="text" id="engineHours" class="form-control " aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.engineHours}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="chassisNumber">מספר שלדה</label>
              <input  type="text" id="chassisNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.chassisNumber}/>
            </div>

            <div class="form-group col-md-3" >
              <label for="engineNumber">מספר מנוע</label>
              <input  type="text" id="engineNumber" class="form-control" aria-describedby="passwordHelpInline" 
              value={this.state.carDetails.engineNumber}/>
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
      <Button2 btnType="Success" disabled={!this.state.formIsValid}>שמירה  </Button2>
      
      <Button  btnType="secondary" disabled={this.state.formIsValid}>עדכון  </Button>

    </form>

  </form>
  );
  }

}
}


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


/* <span><a class="btn btn-secondary btn-lg" href="#" role="button">חלקים</a>   </span>
<span><a class="btn btn-secondary btn-lg" href="#" role="button">הדפסת כרטיס</a>   </span>
<span><a class="btn btn-secondary btn-lg" href="#" role="button">סגירת כרטיס</a>   </span> */


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
      showWorkModel: state.card.showWorkModel

  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onFetchCards: (token,userId) => dispatch( actions.fetchCards(token, userId) ),
    onCardOpening: (cardData, token) => dispatch(actions.cardOpening(cardData, token)),
    workModalOpening: (token ) =>  dispatch(actions.workModalOpening(token)),
    workModalClose: (token ) =>  dispatch(actions.workModalClose(token))


  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(openNew,axios));
