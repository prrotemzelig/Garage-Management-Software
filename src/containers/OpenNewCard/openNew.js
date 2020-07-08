
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import DatePicker from "react-datepicker";
//import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { database } from 'firebase';
import "react-datepicker/dist/react-datepicker.css";
// import Image from './images.js';
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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import card from '../../components/Card/Card';
// import { FaThinkPeaks } from 'react-icons/fa';
import { Modal ,Button } from 'react-bootstrap';
import classes from '../../components/UI/Modal/Modal.module.css';
import * as emailjs from 'emailjs-com'
import { Form, FormGroup, Label, Input } from 'reactstrap' // FormFeedback,
//import Promise from 'bluebird'
//import { storageRef } from "../../config";
import './hoverEffect.css';
import  './modal2.css'; //filesStyle from
//import './image.css';
import {ProgressBar} from 'react-bootstrap';



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
    imagesArrayForCheck: [],
    docsArrayForCheck: [],
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
    showReplacementCarDiv:true,
//    showUploadDocDiv:true,
    showSendMailDiv: true,
//    showWorkModel: false, 
    showImagesAndDoc: false,
    showCloseModal: false,

    cardForm: { 
      licenseNumber: {
        value: '',
        validation: {
          required: true,
          minLength: 3, //need to change to 7 
          maxLength: 10, //need to change to 8 
          isNumeric: true
      },
        valid: false
      }, 
      
      ticketNumber: {value: ''}, 
      cardType: {value: ''} ,
      openingDate: {value: getDateTime()},
      insuranceAgent:{value: ''},
      appraiser:{value: ''},   
      insuranceCompany:{value: '' },
      customerParticipation:{value: ''},
      policyNumber:{value: ''},
      claimNumber:{value: ''},  
      dateOfDamage:{value: ''},
      customerRequests:{ value: ''},
      status:{ value: ''}
    },

    vehicleData: { 
      carDescription:{value: '' },
      speedometer:{value: ''},
      engineCapacity:{value: '' },
      color:{value: '' },
      chalkModel:{ value: ''},
      lastVisit:{value: '' },
      manufactureYear:{value: ''},
      deliveryDate:{value: ''},
      driverName:{value: ''},
      code:{ value: '' },
      carNote:{value: '' }
    },
 
    customerDetails:{
      // customerNumber:{value: ''},
      customerName:{value: ''},
      address:{value: ''},
      city:{value: ''},
      postalCode:{value: '' },
      homePhone:{ value: ''},
      cellphone:{value: ''},
      workingPhone:{value: ''},
      identificationNumber:{value: '' },
      mailAdress:{value: ''},
      orderNumber:{value: '' },
      customerNote:{value: ''}
    },

    cardWork:{
      workDescription:{value: ''},
      time:{value: ''},
      gross:{ value: '' },
      discount:{value: ''},
      net:{ value: ''}
    },
  
    cardPart:{
      partDescription:{value: '' },
      amount:{value: 1},
      gross:{value: ''},
      discount:{value: ''},
      net:{ value: '' }
    },

    garageReplacementVehicle:{
      replacementVehicleNumber:{value: '' },
      typeReplacementVehicle:{value: ''},
      fuelBefore:{value: ''},
      fuelAfter:{value: ''},
      dateOfDelivery:{value: ''},
      returnDate:{value: ''},
      isTaken:{value:''}
    },
   

    rentalCompanyReplacementVehicle:{
      nameRentalCompany:{value: '' },
      dateOfDelivery:{value: ''},
      returnDate:{value: ''},
      isTaken:{value:''}
    },

    alternateVehicleTaken:false,
    garageReplacementCheck:false,
    rentalCompanyReplacementCheck:false,
    garage_replacement_data:[],
    rental_company_data:[],
    garageReplacementDetails:{}, 
    rentalCompanyDetails:{},

    invoiceClosure:{
      allWorksGross:{value: 0.00 },
      allWorksDiscount:{value: 0.00},
      allWorksDiscountAmount:{value: 0.00},
      allWorksNet:{value: 0.00},
      allExteriorWorksGross:{value: 0.00 },
      allExteriorWorksDiscount:{value: 0.00},
      allExternalWorksDiscountAmount:{value: 0.00},
      allExteriorWorksNet:{value: 0.00},
      allPartsGross:{value: 0.00},
      allPartsDiscount:{value: 0.00},
      allPartsDiscountAmount:{value:0.00},
      allPartsNet:{value: 0.00 },
      totalGross:{value: 0.00},
      totalDiscount:{value: 0.00},
      totalDiscountAmount:{value: 0.00},
      totalNet:{value: 0.00},
      amountOfVAT:{value: 0.00 },
      totalPayment:{value:  0.00}
    }

  };
      // this.newSet = this.newSet.bind(this);

}

    //  this.state.invoiceClosure.amountOfVAT.value= 0.17 * this.state.invoiceClosure.totalNet.value;
    //  this.state.invoiceClosure.totalPayment.value=this.state.invoiceClosure.totalNet.value + this.state.invoiceClosure.amountOfVAT.value ;
      //  this.state.invoiceClosure.allWorksNet.value=allWorksGross;
      // this.state.invoiceClosure.allPartsNet.value=allPartsGross;


      // newSet() {
      //   const allWorksNet = this.state.invoiceClosure.allWorksGross.value;
      //   const allPartsNet = this.state.invoiceClosure.allPartsGross;
      //   const amountOfVAT = 0.17 * this.state.invoiceClosure.totalNet;
      //   const totalPayment = this.state.invoiceClosure.totalNet + this.state.invoiceClosure.amountOfVAT;
      //   console.log(allWorksNet);
      //   this.setState({
      //     allWorksNet: allWorksNet,allPartsNet: allPartsNet, amountOfVAT: amountOfVAT, totalPayment: totalPayment });
      // }

componentWillUnmount() {
     this.setTheStates('');
}

componentDidUpdate(prevProps,prevState) {
  // console.log("671");
  // console.log(this.props.currentCardKey);
  // console.log(this.state.identifiedCardID);

  // Typical usage (don't forget to compare props):
//    if (this.props.currentCardKey === '' ) { //&& this.props.currentCardKey === '' && this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== '' 
//       console.log("678");
// }

//   else if (this.props.currentCardKey === this.state.identifiedCardID  ) { //&& this.props.currentCardKey === '' && this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== '' 
//     console.log("684");
// }
//this.props.currentCardKey!== '' &&
   if ( this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID === '' ) { //&& this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== ''
    // console.log("687");
    this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
    this.add();
  }

//   else if (this.props.currentCardKey!== ''  ) { //&& this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== '' 
// }
//  this.props.userID !== prevProps.userID
  // else if (this.props.currentCardKey !== prevProps.currentCardKey ) { //&& this.props.currentCardKey === '' && this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== '' 
  //     this.setTheStates();
  // }
// else if (this.props.currentCardKey === '' ) { //&& this.props.currentCardKey === '' && this.props.currentCardKey !== this.state.identifiedCardID && this.state.identifiedCardID !== '' 
//     this.setTheStates();
// }
}

componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
  console.log("212");
  this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
}


add = () => { 
  let value = this.state.cardForm['licenseNumber'].value;

  if(value  !== '' && this.props.currentCardKey !== ''  ){
    this.setState({found: true}); // check!!
 
     // this.state.found=true;
      this.state.dataBaseCarNumber=this.state.cardForm.licenseNumber.value;
    
      for (let formElementIdentifier in this.state.cardForm) {
        this.state.cardDetails[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
    }

    this.state.cardDetails['ticketNumber'] = this.props.currentTicketNumber;

    for (let formElementIdentifier in this.state.vehicleData) {
      this.state.carDetails[formElementIdentifier] = this.state.vehicleData[formElementIdentifier].value;
  }

  for (let formElementIdentifier in this.state.garageReplacementVehicle) {
    this.state.garageReplacementDetails[formElementIdentifier] = this.state.garageReplacementVehicle[formElementIdentifier].value;
}
for (let formElementIdentifier in this.state.rentalCompanyReplacementVehicle) {
  this.state.rentalCompanyDetails[formElementIdentifier] = this.state.rentalCompanyReplacementVehicle[formElementIdentifier].value;
}



this.state.garageReplacementCheck=this.state.garageReplacementVehicle['isTaken'].value;
this.state.rentalCompanyReplacementCheck=this.state.rentalCompanyReplacementVehicle['isTaken'].value;


  for (let formElementIdentifier in this.state.customerDetails) {
    this.state.customer_details[formElementIdentifier] = this.state.customerDetails[formElementIdentifier].value;
}

      this.state.identifiedCardID=this.props.currentCardKey
      this.state.branchNumber=this.props.branchNumber;
      
      // console.log(this.props.currentCardKey);
      // console.log(this.state.found);
      // console.log(this.state.dataBaseCarNumber);
      // console.log(this.state.cardDetails);
      // console.log(this.state.customer_details);
      // console.log(this.state.identifiedCardID);
      // console.log(this.state.branchNumber);
  }

  this.props.onSetCurrentCardKey(); //this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID
  // this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);

      if(this.state.found === true){
        console.log("251");
        this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
        this.props.onGetImages(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/images');
        this.props.onGetDocs(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/docs');     
      }
  }


//   {this.state.showCloseModal?
//     this.renderShowCloseModal()
// :null} 
// onClick={this.ModalCardCloseHandler}>סגירת כרטיס</Button> 



inputInvoiceWorksGrossChangedHandler = (event) => { //rotem need to do // רותם לעשות
  if(event.target.id === 'allWorksGross' ){
    const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
      value: event.target.value
  });
  let finalNetValue;
  if(this.state.invoiceClosure.allWorksDiscount.value !== '')
    finalNetValue = event.target.value - (this.state.invoiceClosure.allWorksDiscount.value * event.target.value )/100 ; //calculate the final price after discount
  else
    finalNetValue= event.target.value;
  
  const updatedFormElementForNet = updateObject(this.state.invoiceClosure['allWorksNet'], { 
    value: finalNetValue
});

  const updatedCardForm = updateObject(this.state.invoiceClosure, { 
      [event.target.id]: updatedFormElement,
      ['allWorksNet']: updatedFormElementForNet 
  });
  
  this.setState({invoiceClosure: updatedCardForm}); 
  }

  else if(event.target.id === 'allWorksDiscount'){
          const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
            value: event.target.value
        });

        const finalNetValue = this.state.invoiceClosure.allWorksGross.value - (event.target.value * this.state.invoiceClosure.allWorksGross.value )/100 ; //calculate the final price after discount
        const updatedFormElementForNet = updateObject(this.state.invoiceClosure['allWorksNet'], { 
          value: finalNetValue
      });

      const finalAmountValue = this.state.invoiceClosure.allWorksGross.value - finalNetValue; //calculate the total amount of the discount
      const updatedFormElementForFinalAmountValue = updateObject(this.state.invoiceClosure['allWorksDiscountAmount'], { 
        value: finalAmountValue
    });

        const updatedCardForm = updateObject(this.state.invoiceClosure, { 
            [event.target.id]: updatedFormElement,
            ['allWorksNet']: updatedFormElementForNet,
            ['allWorksDiscountAmount']: updatedFormElementForFinalAmountValue,
        });
        this.setState({invoiceClosure: updatedCardForm}); 
      }
  
      console.log(this.state.invoiceClosure);
  // else{
  //         const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
  //           value: event.target.value
  //       });
  //       const updatedCardForm = updateObject(this.state.invoiceClosure, { 
  //           [event.target.id]: updatedFormElement 
  //       });
  //       this.setState({invoiceClosure: updatedCardForm}); 
  // }
}



inputInvoicePartsGrossChangedHandler = (event) => { //rotem need to do // רותם לעשות
  if(event.target.id === 'allPartsGross' ){
    const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
      value: event.target.value
  });
  let finalNetValue;
  if(this.state.invoiceClosure.allPartsDiscount.value !== '')
    finalNetValue = event.target.value - (this.state.invoiceClosure.allPartsDiscount.value * event.target.value )/100 ; //calculate the final price after discount
  else
    finalNetValue= event.target.value;
  
  const updatedFormElementForNet = updateObject(this.state.invoiceClosure['allPartsNet'], { 
    value: finalNetValue
});

  const updatedCardForm = updateObject(this.state.invoiceClosure, { 
      [event.target.id]: updatedFormElement,
      ['allPartsNet']: updatedFormElementForNet 
  });
  
  this.setState({invoiceClosure: updatedCardForm}); 
  }

  else if(event.target.id === 'allPartsDiscount'){
          const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
            value: event.target.value
        });

        const finalNetValue = this.state.invoiceClosure.allPartsGross.value - (event.target.value * this.state.invoiceClosure.allPartsGross.value )/100 ; //calculate the final price after discount
        const updatedFormElementForNet = updateObject(this.state.invoiceClosure['allPartsNet'], { 
          value: finalNetValue
      });

      const finalAmountValue = this.state.invoiceClosure.allPartsGross.value - finalNetValue; //calculate the total amount of the discount
      const updatedFormElementForFinalAmountValue = updateObject(this.state.invoiceClosure['allPartsDiscountAmount'], { 
        value: finalAmountValue
    });

        const updatedCardForm = updateObject(this.state.invoiceClosure, { 
            [event.target.id]: updatedFormElement,
            ['allPartsNet']: updatedFormElementForNet,
            ['allPartsDiscountAmount']: updatedFormElementForFinalAmountValue,
        });
        this.setState({invoiceClosure: updatedCardForm}); 
      }

            console.log(this.state.invoiceClosure);

  
  // else{
  //         const updatedFormElement = updateObject(this.state.invoiceClosure[event.target.id], { 
  //           value: event.target.value
  //       });
  //       const updatedCardForm = updateObject(this.state.invoiceClosure, { 
  //           [event.target.id]: updatedFormElement 
  //       });
  //       this.setState({invoiceClosure: updatedCardForm}); 
  // }
}



currency = (num) => {
  num = parseFloat(num);
  if(isNaN(num)){
    return isNaN(num);
  }
  else{
    num = num.toFixed(2);
   //num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // work but not in react
    return num;
  }
}


  renderShowCloseModal = () => { ///*** add new user modal! ****

    var allWorksGross= 0;
    var allPartsGross= 0;

    for(var i=0; i < this.props.workData.length ; i++){
      allWorksGross += parseInt(this.props.workData[i].net, 10) ;
     }

     for(var j=0; j < this.props.partsData.length ; j++){
      allPartsGross += parseInt(this.props.partsData[j].net, 10);
     }
     this.state.invoiceClosure.allWorksGross.value=allWorksGross;
      this.state.invoiceClosure.allPartsGross.value=allPartsGross;

     this.state.invoiceClosure.totalGross.value= allWorksGross + allPartsGross;
     this.state.invoiceClosure.allWorksNet.value= allWorksGross - this.state.invoiceClosure.allWorksDiscountAmount.value ;
     this.state.invoiceClosure.allPartsNet.value= allPartsGross - this.state.invoiceClosure.allPartsDiscountAmount.value ;
    //  this.state.invoiceClosure.allWorksNet.value=allWorksGross;
    //  this.state.invoiceClosure.allPartsNet.value=allPartsGross;
    this.state.invoiceClosure.totalNet.value= this.state.invoiceClosure.allWorksNet.value + this.state.invoiceClosure.allPartsGross.value;

     this.state.invoiceClosure.amountOfVAT.value= 0.17 * this.state.invoiceClosure.totalNet.value;
     this.state.invoiceClosure.totalPayment.value=this.state.invoiceClosure.totalNet.value + this.state.invoiceClosure.amountOfVAT.value ;
   

      // allWorksGross = this.currency(allWorksGross); 
      // allPartsGross = this.currency(allPartsGross); 

   
   

      console.log(this.state.invoiceClosure.totalGross.value);

      // this.state.invoiceClosure.totalGross.value = this.currency(this.state.invoiceClosure.totalGross.value);
      console.log(this.state.invoiceClosure.totalGross.value);


    let workButtons =
        <div class="form-group" style={{marginBottom: "4px"}}>
            <div style={{textAlign:"left"}}> 
                  <Button bsStyle="secondary" style={{borderColor: "black"}} onClick={this.ModalCardCloseHandler} >יציאה</Button>{' '}
                  
                  <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.cardCloseHandler} >סגירת חשבון</Button>     </div>
        </div>;
  
  // <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
      return (
        
          <Modal show={this.state.showCloseModal} onHide={this.ModalCardCloseHandler}   backdrop={false}
              style={{ display: "flex", textAlign:"right", paddingLeft: "1px" }}  >
            <Modal.Header closeButton   >
              <Modal.Title  >סגירת חשבון לכרטיס עבודה</Modal.Title>   
            </Modal.Header>
      
              <div className={classes.separator}></div>
            <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"3px",flex: "none",marginRight: "5px" ,marginBottom: "15px", marginTop: "15px" , marginLeft: "5px" }}   >
                    <div autocomplete="off">
              <div class="form-row" autocomplete="off" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
              <form  class="form-group col-md-3"  style={{ marginBottom: "4px"}} > 
                   <label for="firstName"  >שם לקוח</label>
                   <input type="text" id="firstName" autocomplete="off" class="form-control " style={{marginLeft: "10px"}} value={this.state.customerDetails.customerName.value} />
                 </form >
      
                   <form class="form-group col-md-3" >
                  <label for="address">כתובת</label>
                  <input type="text" id="address" class="form-control" autocomplete="off"  style={{backgroundColor: "white"}}  
                  value={this.state.customerDetails.address.value}/>
                </form> 

                <form class="form-group col-md-3" >
                  <label for="city">עיר</label>
                  <input type="text" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.city.value}  />
                </form>

                 <form class="form-group col-md-3" >
                  <label for="postalCode" >מיקוד</label>
                  <input type="number" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.postalCode.value}/>
                </form>

                <form class="form-group col-md-3" >
                  <label for="identificationNumber" >ח.פ/ת.ז</label>
                  <input ref="identificationNumber" type="text"  class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  value={this.state.customerDetails.identificationNumber.value} />
                </form> 

                <form class="form-group col-md-3" >
                  <label for="homePhone">טלפון בית</label>
                  <input type="number" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.homePhone.value}/>
                </form>


                <form class="form-group col-md-3" >
                  <label for="cellphone">סלולרי</label>
                  <input type="number" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.customerDetails.cellphone.value} />
                </form>

                 </div>
      
                 <div className={classes.anoSeparator}></div>

              <form class="form-group " >
                 </form>
                 <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto" }}> 
        
        
                 <form class="form-group col-md-2" >
                 <label for="cellphone">עבודות</label>
                 </form>

                 <div class="form-group col-md-3" >
                  <label for="allWorksGross">ברוטו</label>
                  <input type="number" id="allWorksGross" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.invoiceClosure.allWorksGross.value} />
                </div>

                <div class="form-group col-md-2" >
                  <label for="allWorksDiscount">הנחה</label>
                  <input type="number" id="allWorksDiscount" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                 value={this.state.invoiceClosure.allWorksDiscount.value} 
                 onChange = {(event) => this.inputInvoiceWorksGrossChangedHandler(event)} />
                </div>

           

                <div class="form-group col-md-2" >
                  <label for="allWorksDiscountAmount">סכום ההנחה</label>
                  <input type="number" id="allWorksDiscountAmount" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.invoiceClosure.allWorksDiscountAmount.value} />
                </div>

                <form class="form-group col-md-3" >
                  <label for="allWorksNet">נטו</label>
                  <input type="number" id="allWorksNet" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  value={this.state.invoiceClosure.allWorksNet.value} />
                </form>

                 </div>
                 
                 <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
                 
                 <form class="form-group col-md-2" >
                 <label for="cellphone">עבודות חוץ</label>
                 </form>

                 <form class="form-group col-md-3" >
                  {/* <label for="cellphone">עבודות חוץ</label> */}
                  <input type="number" id="allExteriorWorksGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.invoiceClosure.allExteriorWorksGross.value} />
                </form>

                <form class="form-group col-md-2" >
                  {/* <label for="cellphone">הנחה</label> */}
                  <input type="number" id="allExteriorWorksDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.invoiceClosure.allExteriorWorksDiscount.value} />
                </form>

                <form class="form-group col-md-2" >
                  {/* <label for="cellphone">סכום ההנחה</label> */}
                  <input type="number" id="allExternalWorksDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.invoiceClosure.allExternalWorksDiscountAmount.value} />
                </form>

                <form class="form-group col-md-3" >
                  {/* <label for="cellphone">נטו</label> */}
                  <input type="number" id="allExteriorWorksNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                  defaultValue={this.state.invoiceClosure.allExteriorWorksNet.value} />
                </form>
               </div> 

               <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 

               <form class="form-group col-md-2" >
                 <label for="cellphone">חלקים</label>
                 </form>
                    <form class="form-group col-md-3" >
                    {/* <label for="cellphone">חלפים</label> */}
                    <input type="number" id="allPartsGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                    value={this.state.invoiceClosure.allPartsGross.value} />
                    </form>

                    <form class="form-group col-md-2" >
                    {/* <label for="cellphone">הנחה</label> */}
                    <input type="number" id="allPartsDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                    value={this.state.invoiceClosure.allPartsDiscount.value}
                    onChange = {(event) => this.inputInvoicePartsGrossChangedHandler(event)} />
              
                    </form>

                    <form class="form-group col-md-2" >
                    {/* <label for="cellphone">סכום ההנחה</label> */}
                    <input type="number" id="allPartsDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                    value={this.state.invoiceClosure.allPartsDiscountAmount.value} />
                    </form>

                    <form class="form-group col-md-3" >
                    {/* <label for="cellphone">נטו</label> */}
                    <input type="number" id="allPartsNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                    value={this.state.invoiceClosure.allPartsNet.value} />
                    </form>
                    </div> 






                    <div className={classes.anoSeparator}></div>

                    
                    <div class="form-row" >
                 </div>
                    <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 


                    {/* <form class="form-row" >
                 </form> */}
                    <form class="form-group col-md-2" >
                 <label for="cellphone">סה"כ</label>
                 </form>

                        <form class="form-group col-md-3" >
                        {/* <label for="cellphone">סה"כ</label> */}
                        <input type="number" id="totalGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                        value={this.state.invoiceClosure.totalGross.value} />
                        </form>

                        <form class="form-group col-md-2" >
                        <input type="number" id="totalDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                        defaultValue={this.state.invoiceClosure.totalDiscount.value} />
                        </form>

                        <form class="form-group col-md-2" >
                        <input type="number" id="totalDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                        defaultValue={this.state.invoiceClosure.totalDiscountAmount.value} />
                        </form>

                        <form class="form-group col-md-3" >
                        <input type="number" id="totalNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                        defaultValue={this.state.invoiceClosure.totalNet.value} />
                        </form>
                        </div> 


                        <div class="form-row" style={{ fontSize: "11px", marginRight:"auto",textAlign:"right"}}> 


                          <form class="form-group col-md-3" >
                          {/* <label for="cellphone">סה"כ</label> */}
                          <input type="number" id="amountOfVAT" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                          defaultValue={this.state.invoiceClosure.amountOfVAT.value} />
                          </form>


                          <form class="form-group col-md-2" >
                      <label for="cellphone">מע"מ 17%</label>
                      </form>
                        
                          </div> 

                          <div class="form-row" style={{ fontSize: "11px", marginRight:"auto",textAlign:"right"}}> 

                                <form class="form-group col-md-4" >
                                {/* <label for="cellphone">סה"כ</label> */}
                                <input type="number" id="totalPayment" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                                defaultValue={this.state.invoiceClosure.totalPayment.value} />
                                </form>

                                <form class="form-group col-md-2" >
                            <label for="cellphone">סה"כ לתשלום</label>
                            </form>
                              
                             </div> 


                          

               </div>
              </Modal.Body>
            <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
                 {workButtons}
            </Modal.Footer>
          </Modal> 
          
          );
  }


cardOpeningHandler = ( event ) => {
    event.preventDefault(); // with that we get the Card details
    const formData = {};
    for (let formElementIdentifier in this.state.cardForm) {
      formData[formElementIdentifier] = this.state.cardForm[formElementIdentifier].value;
  }

  formData['ticketNumber'] = this.props.cards.length + this.props.closeCards.length + 1;
  const carData = {};
  for (let formElementIdentifier in this.state.vehicleData) {
    carData[formElementIdentifier] = this.state.vehicleData[formElementIdentifier].value;
  }

const customerData = {};
for (let formElementIdentifier in this.state.customerDetails) {
  customerData[formElementIdentifier] = this.state.customerDetails[formElementIdentifier].value;
}

const garageReplacementData = {};
for (let formElementIdentifier in this.state.garageReplacementVehicle) {
  garageReplacementData[formElementIdentifier] = this.state.garageReplacementVehicle[formElementIdentifier].value;
}

const rentalCompanyReplacementData = {};
for (let formElementIdentifier in this.state.rentalCompanyReplacementVehicle) {
  rentalCompanyReplacementData[formElementIdentifier] = this.state.rentalCompanyReplacementVehicle[formElementIdentifier].value;
}

garageReplacementData['isTaken'] = this.state.garageReplacementCheck;
rentalCompanyReplacementData['isTaken'] = this.state.rentalCompanyReplacementCheck;


this.state.garageReplacementVehicle['isTaken'].value=this.state.garageReplacementCheck;
this.state.rentalCompanyReplacementVehicle['isTaken'].value=this.state.rentalCompanyReplacementCheck;


    const card = { 
        cardData: formData,
        carData: carData, 
        garageReplacementData: garageReplacementData,
        rentalCompanyReplacementData: rentalCompanyReplacementData,
        alternateVehicleTaken: this.state.alternateVehicleTaken,
        customerData: customerData,
        userId: this.props.userId,
        branchNumber: this.props.branchNumber
    }   

  //  this.setState({found: true});
   this.props.onCardOpening(card,this.props.userId,this.props.token, this.props.branchNumber, 'cards'); // this contains all the data of card 
    this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
    // console.log(this.state.cardForm['licenseNumber'].value);

      // this.add();
  
    //   if(this.state.found === true){
    //     console.log("385");
    //     this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
    //   }
  //   if ( this.props.showSuccessCase ) {  //this.props.loading
  //     console.log("371");
  //     return(
      
 
}

inputChangedHandler = (event) => { 

  const updatedFormElement = updateObject(this.state.cardForm[event.target.id], { 
      // here we pass my cardForm and there (inputIdentifier) -> it show the control 
      // this.state.cardForm[inputIdentifier] -> this is the old object
      // the second object it a java script object
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation)
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

   // let cards;    


    // onMultipleDocDownload(node) { //url2,name,key,
    //   Object.keys(this.state.docsArrayForCheck).map((key, i) => {
    //     this.props.onDownloadDoc(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
    //      delete this.state.docsArrayForCheck[key];
    //      console.log(this.state.docsArrayForCheck);
    //     })
    // }


  if(event.target.value!==""){

    for(var i=0; i < this.props.cards.length ; i++){
     // console.log(this.props.cards);
      if(this.check(this.props.cards[i],event.target.value)){
        console.log("369");
        break;
      }
    }

    // cards = this.props.cards.map( (card,i) => {
    //   if(this.check(card,event.target.value)){
    //   }
    //   else{
    //     console.log("364");

    //   }
    // })

  }

  if(this.state.found === false && event.target.id==='licenseNumber'){
    console.log("361");
    this.setTheStates(event.target.value);
  }

    // if(this.state.found === true){
    //   console.log(this.state.cardDetails['ticketNumber']);
    //   console.log("372");
    //   this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
    //   this.props.onGetImages(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/images');
    //  //this.props.onGetDocs(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/docs');

    // }
}

inputCarChangedHandler = (event) => { 
      const updatedFormElement = updateObject(this.state.vehicleData[event.target.id], { 
          value: event.target.value,
      });
      const updatedCardForm = updateObject(this.state.vehicleData, { 
          [event.target.id]: updatedFormElement 
      });
      this.setState({vehicleData: updatedCardForm}); 
}



inputGarageReplacementChangedHandler = (event) => { 
 
  const updatedFormElement = updateObject(this.state.garageReplacementVehicle[event.target.id], { 
      value: event.target.value
  });
  const updatedCardForm = updateObject(this.state.garageReplacementVehicle, { 
      [event.target.id]: updatedFormElement 
  });
  this.setState({garageReplacementVehicle: updatedCardForm}); 

}

updateGarageReplacementInputValue=(evt,i)=> {
  evt.preventDefault(); 
  this.state.garage_replacement_data[i]=evt.target.value; 
}


inputRentalCompanyReplacementChangedHandler = (event) => { 

  const updatedFormElement = updateObject(this.state.rentalCompanyReplacementVehicle[event.target.id], { 
      value: event.target.value
  });
  const updatedCardForm = updateObject(this.state.rentalCompanyReplacementVehicle, { 
      [event.target.id]: updatedFormElement 
  });
  this.setState({rentalCompanyReplacementVehicle: updatedCardForm}); 
}


updateRentalCompanyReplacementInputValue=(evt,i)=> {
  evt.preventDefault(); 
  this.state.rental_company_data[i]=evt.target.value;
}


inputCusChangedHandler = (event) => { 
      const updatedFormElement = updateObject(this.state.customerDetails[event.target.id], { 
          value: event.target.value,
      });
      const updatedCardForm = updateObject(this.state.customerDetails, { 
          [event.target.id]: updatedFormElement 
      });
      this.setState({customerDetails: updatedCardForm}); 
}

inputNewWorkChangedHandler = (event) => { 
  if(event.target.id === 'gross'){
    const updatedFormElement = updateObject(this.state.cardWork[event.target.id], { 
      value: event.target.value
    // value: checkFormatNumbers(event.target.value),
      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
  });
  let finalNetValue;

  if(this.state.cardWork.discount.value !== ''){
    finalNetValue = event.target.value - (this.state.cardWork.discount.value * event.target.value )/100 ; //calculate the final price after discount
  }
  else{
    finalNetValue= event.target.value;
  }

  const updatedFormElementForNet = updateObject(this.state.cardWork['net'], { 
    value: finalNetValue
});

  const updatedCardForm = updateObject(this.state.cardWork, { 
      [event.target.id]: updatedFormElement,
      ['net']: updatedFormElementForNet 
  });
  
  this.setState({cardWork: updatedCardForm}); 
  }

  else if(event.target.id === 'discount'){
          const updatedFormElement = updateObject(this.state.cardWork[event.target.id], { 
            value: event.target.value
        });

        const finalNetValue = this.state.cardWork.gross.value - (event.target.value * this.state.cardWork.gross.value )/100 ; //calculate the final price after discount
        const updatedFormElementForNet = updateObject(this.state.cardWork['net'], { 
          value: finalNetValue
      });

        const updatedCardForm = updateObject(this.state.cardWork, { 
            [event.target.id]: updatedFormElement,
            ['net']: updatedFormElementForNet 
        });
        this.setState({cardWork: updatedCardForm}); 
  }
  
  else{
          const updatedFormElement = updateObject(this.state.cardWork[event.target.id], { 
            value: event.target.value
        });
        const updatedCardForm = updateObject(this.state.cardWork, { 
            [event.target.id]: updatedFormElement 
        });
        
        this.setState({cardWork: updatedCardForm}); 
  }
      
}

inputNewPartChangedHandler = (event) => { 

  if(event.target.id === 'gross'){
    const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
      value: event.target.value
    // value: checkFormatNumbers(event.target.value),
      //valid: checkValidity(event.target.value, this.state.cardForm[event.target.id].validation),
  });
  let finalNetValue;

  if(this.state.cardPart.discount.value !== ''){
    finalNetValue = (event.target.value - (this.state.cardPart.discount.value * event.target.value )/100) ; //calculate the final price after discount
  }
  else{
    finalNetValue= event.target.value;
  }
  
  const updatedFormElementForNet = updateObject(this.state.cardPart['net'], { 
    value: finalNetValue*this.state.cardPart.amount.value
});

  const updatedCardForm = updateObject(this.state.cardPart, { 
      [event.target.id]: updatedFormElement,
      ['net']: updatedFormElementForNet 
  });
  
  this.setState({cardPart: updatedCardForm}); 
  }

  else if(event.target.id === 'discount'){
          const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
            value: event.target.value
        });

        const finalNetValue = this.state.cardPart.gross.value - (event.target.value * this.state.cardPart.gross.value )/100 ; //calculate the final price after discount
        const updatedFormElementForNet = updateObject(this.state.cardPart['net'], { 
          value: finalNetValue*this.state.cardPart.amount.value
      });

        const updatedCardForm = updateObject(this.state.cardPart, { 
            [event.target.id]: updatedFormElement,
            ['net']: updatedFormElementForNet 
        });
        this.setState({cardPart: updatedCardForm}); 
  }
  
  else if(event.target.id === 'amount'){
    const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
      value: event.target.value
  });

  const finalNetValue =  this.state.cardPart.gross.value - (this.state.cardPart.discount.value * this.state.cardPart.gross.value )/100 ;
  const updatedFormElementForNet = updateObject(this.state.cardPart['net'], { 
    value: finalNetValue*event.target.value
});

  const updatedCardForm = updateObject(this.state.cardPart, { 
      [event.target.id]: updatedFormElement,
      ['net']: updatedFormElementForNet 
  });
  this.setState({cardPart: updatedCardForm}); 
}

  else{
          const updatedFormElement = updateObject(this.state.cardPart[event.target.id], { 
            value: event.target.value
        });
        const updatedCardForm = updateObject(this.state.cardPart, { 
            [event.target.id]: updatedFormElement 
        });
        this.setState({cardPart: updatedCardForm}); 
  }
}


workOrPartsOpeningHandler = ( event,kind ) => {
      event.preventDefault(); 
      const formData = {};

      if(kind === 'workData'){
          formData['workDescription'] = this.state.cardWork.workDescription.value;
          formData['time'] = this.state.cardWork.time.value;
          formData['gross'] = this.state.cardWork.gross.value;
          formData['discount'] = this.state.cardWork.discount.value;
          formData['net'] = this.state.cardWork.net.value;
          formData['kind'] = kind;
      }

      else if( kind === 'partsData'){ 
        formData['partDescription'] = this.state.cardPart.partDescription.value;
        formData['amount'] = this.state.cardPart.amount.value;
        formData['gross'] = this.state.cardPart.gross.value;
        formData['discount'] = this.state.cardPart.discount.value;
        formData['net'] = this.state.cardPart.net.value;
        formData['kind'] = kind;
      }
      let cardKey = this.state.identifiedCardID;
      this.props.onWorkOrPartsOpening(formData, this.props.token, this.props.branchNumber, this.props.userId, kind,cardKey ); // this contains all the data of card 
      this.setWorkAndPartStates();
  }

  setWorkAndPartStates = () => {
      let updateCardWork = {
        workDescription:{value: ''},
        time:{value: ''},
        gross:{value: ''},
        discount:{value: ''},
        net:{value: ''}
      }

      let updateCardPart = {
        partDescription:{value: ''},
        amount:{value: 1},
        gross:{value: ''},
        discount:{value: ''},
        net:{value: ''}
      }
      this.setState({cardWork: updateCardWork});
      this.setState({cardPart: updateCardPart});
      this.setState( { isAddNewWorkOrPartOpen: false } );
      this.setState( { isUpdateWorkOrPartOpen: false } );
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

      else if( kind === 'partsData'){ 
        itemData['partDescription'] = this.state.cardPart.partDescription.value;
        itemData['amount'] = this.state.cardPart.amount.value;
        itemData['gross'] = this.state.cardPart.gross.value;
        itemData['discount'] = this.state.cardPart.discount.value;
        itemData['net'] = this.state.cardPart.net.value;
        itemData['kind'] = kind;
      }
      let cardKey = this.state.identifiedCardID;
      let itemKey = this.state.itemKeyForUpdateWorkOrPart;

      this.props.onWorkOrPartUpdate(itemData, this.props.token, this.props.branchNumber, this.props.userId,'cards', kind,cardKey,itemKey ); 
      this.setWorkAndPartStates();
  }
  
 handleChange = date => {
  this.setState({
    startDate: date
  });
};




changeVehicleNumberHandler = ( event ) => { // update card
  event.preventDefault(); 
  var newNumberInput = prompt("בבקשה הכנס מספר רכב מעודכן", this.state.cardForm.licenseNumber.value);
  if (newNumberInput !== null) {
    this.props.onChangeVehicleNumber(newNumberInput, this.props.token, this.props.branchNumber,this.state.identifiedCardID, this.props.userId ); 
    this.setState({dataBaseCarNumber: newNumberInput});
    this.setState({userCarNumber: newNumberInput});
    this.state.cardForm.licenseNumber.value=newNumberInput;

    // document.getElementById("demo").innerHTML =
    // "Hello " + newNumberInput + "! How are you today?";
  } 
}


cardUpdateHandler = ( event ) => { // update card
 
  event.preventDefault(); 
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
    ticketNumber: this.state.cardDetails.ticketNumber,
    status: this.state.card_data[11]

  }

  const customerData={
    address: this.state.customer_data[0],
    cellphone: this.state.customer_data[1],
    city: this.state.customer_data[2],
    customerName: this.state.customer_data[3],
    customerNote: this.state.customer_data[4],
    // customerNumber: this.state.customer_data[5],
    homePhone: this.state.customer_data[6],
    identificationNumber: this.state.customer_data[7],
    mailAdress: this.state.customer_data[8],
    orderNumber: this.state.customer_data[9],
    postalCode: this.state.customer_data[10],
    workingPhone: this.state.customer_data[11]
  }

  const garageReplacementData={
    replacementVehicleNumber: this.state.garage_replacement_data[0],
    typeReplacementVehicle: this.state.garage_replacement_data[1],
    fuelBefore: this.state.garage_replacement_data[2],
    fuelAfter: this.state.garage_replacement_data[3],
    dateOfDelivery: this.state.garage_replacement_data[4],
    returnDate: this.state.garage_replacement_data[5],
    isTaken: this.state.garageReplacementCheck
  }

  const rentalCompanyReplacementData={
    nameRentalCompany: this.state.rental_company_data[0],
    dateOfDelivery: this.state.rental_company_data[1],
    returnDate: this.state.rental_company_data[2],
    isTaken: this.state.rentalCompanyReplacementCheck
  }

  this.props.onCardUpdate(carData,cardData,customerData,garageReplacementData,rentalCompanyReplacementData,this.state.alternateVehicleTaken, this.props.token, this.props.branchNumber,this.state.identifiedCardID,this.props.userId); // this contains all the data of card
  this.setTheStates('');
  document.getElementById("workCardForm").reset(); 
}




ModalCardCloseHandler = () => {
  this.setState(prevState => {
      return {showCloseModal: !prevState.showCloseModal};
      });
}

cardCloseHandler = ( event ) => {
      event.preventDefault(); 

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


      const garageReplacementData = {};
      for (let formElementIdentifier in this.state.garageReplacementVehicle) {
        garageReplacementData[formElementIdentifier] = this.state.garageReplacementVehicle[formElementIdentifier].value;
      }

      const rentalCompanyReplacementData = {};
      for (let formElementIdentifier in this.state.rentalCompanyReplacementVehicle) {
        rentalCompanyReplacementData[formElementIdentifier] = this.state.rentalCompanyReplacementVehicle[formElementIdentifier].value;
      }


      const invoiceClosureData = {};
      for (let formElementIdentifier in this.state.invoiceClosure) {
        invoiceClosureData[formElementIdentifier] = this.state.invoiceClosure[formElementIdentifier].value;
      }

      
        const card = { 
            cardData: cardData,
            carData: carData, 
            customerData: customerData,
            garageReplacementData: garageReplacementData,
            rentalCompanyReplacementData: rentalCompanyReplacementData,
            invoiceClosureData: invoiceClosureData,
            alternateVehicleTaken: this.state.alternateVehicleTaken,
            userId: this.props.userId,
            branchNumber: this.props.branchNumber,
            closeDate: getDateTime()
        }   
        this.props.onCardDelete(this.props.token, this.props.branchNumber, this.state.identifiedCardID,'cards',this.props.userId);  
        this.props.onCardOpening(card,this.props.userId, this.props.token, this.props.branchNumber,'closeCards');  
        this.setTheStates('');
}
//    this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: event.target.value, found: true,dataBaseCarNumber:data.cardData.licenseNumber });


setTheStates = (licenseNumber) => {
  let valueLicenseNumber;
  if(licenseNumber !== ''){
    valueLicenseNumber = licenseNumber;
  }
  else{
    valueLicenseNumber= '';
  }
    let updateTaskForm =  { 
        licenseNumber: {
            value: valueLicenseNumber,
          validation: {
            required: true,
            minLength: 3,
            maxLength: 10,
            isNumeric: true
        },
          valid: false
        }, 
        ticketNumber: {value: ''}, 
        cardType: {value: ''} ,
        openingDate: {value: getDateTime()},
        insuranceAgent:{value: ''},
        appraiser:{value: ''},   
        insuranceCompany:{value: ''},    
        customerParticipation:{value: ''},
        policyNumber:{value: ''},
        claimNumber:{value: ''},
        dateOfDamage:{value: ''},
        customerRequests:{value: ''},
        status:{ value: ''}
 
    }
  
    let updateVehicleForm = {
      carDescription:{value: ''},
      speedometer:{value: ''}, 
      engineCapacity:{value: ''},
      color:{value: ''},
      chalkModel:{value: ''},
      lastVisit:{value: ''},
      manufactureYear:{value: ''},
      deliveryDate:{value: ''},
      driverName:{value: '' },
      code:{value: ''},
      carNote:{value: ''}
    }
   
    let updateCustomerForm = {
      // customerNumber:{value: ''},
      customerName:{value: '' },
      address:{value: ''},
      city:{value: ''},
      postalCode:{value: ''},
      homePhone:{value: ''},
      cellphone:{value: ''},
      workingPhone:{value: ''},
      identificationNumber:{value: ''},
      mailAdress:{value: ''},
      orderNumber:{value: ''},
      customerNote:{value: ''}
    }
  
    let garageReplacementForm = {
      replacementVehicleNumber:{value: ''},
      typeReplacementVehicle:{value: '' },
      fuelBefore:{value: ''},
      fuelAfter:{value: ''},
      dateOfDelivery:{value: ''},
      returnDate:{value: ''},
      isTaken:{value:''}
    }

    let rentalCompanyReplacementForm = {
      nameRentalCompany:{value: ''},
      dateOfDelivery:{value: '' },
      returnDate:{value: ''},
      isTaken:{value:''}
    }


    let invoiceClosureForm = {
      allWorksGross:{value: 0.00 },
      allWorksDiscount:{value: 0.00},
      allWorksDiscountAmount:{value: 0.00},
      allWorksNet:{value: 0.00},
      allExteriorWorksGross:{value: 0.00 },
      allExteriorWorksDiscount:{value: 0.00},
      allExternalWorksDiscountAmount:{value: 0.00},
      allExteriorWorksNet:{value: 0.00},
      allPartsGross:{value: 0.00},
      allPartsDiscount:{value: 0.00},
      allPartsDiscountAmount:{value:0.00},
      allPartsNet:{value: 0.00 },
      totalGross:{value: 0.00},
      totalDiscount:{value: 0.00},
      totalDiscountAmount:{value: 0.00},
      totalNet:{value: 0.00},
      amountOfVAT:{value: 0.00},
      totalPayment:{value:0.00}
    }
   


    document.getElementById("workCardForm").reset(); 
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
      this.setState({carDetails: {}});
      this.setState({userCarNumber: ''});
      this.setState({cardDetails: {}});
      this.setState({customer_details: {}});
      this.setState({garageReplacementVehicle: garageReplacementForm});
      this.setState({rentalCompanyReplacementVehicle: rentalCompanyReplacementForm});
      this.setState({invoiceClosure: invoiceClosureForm});

      this.setState({alternateVehicleTaken: false});
      this.setState({garageReplacementCheck: false});
      this.setState({rentalCompanyReplacementCheck: false});
      this.setState({showCloseModal: false});
      this.setState({garage_replacement_data: []});
      this.setState({rental_company_data: []});
      this.setState({garageReplacementDetails: {}});
      this.setState({rentalCompanyDetails: {}});


      // if( licenseNumber!==''){
      //   const updatedFormElement = updateObject(this.state.cardForm['licenseNumber'], { 
      //     value: licenseNumber,
      //     valid: checkValidity(licenseNumber, this.state.cardForm['licenseNumber'].validation)
      // });
      // const updatedCardForm = updateObject(this.state.cardForm, { // here we want to update the overall card for a given input identifer
      //     ['licenseNumber']: updatedFormElement // here we need to pass javascript object and pass a new properties and it should be dynamic input identifier where we pick a specific control.
      // });
    
     // let formIsValid = true;
     // formIsValid = updatedCardForm['licenseNumber'].valid;  
     // this.setState({cardForm: updatedCardForm, formIsValid: formIsValid,userCarNumber: licenseNumber});

      document.getElementById("workCardForm").reset(); 


     // }

  }


check(data,licenseNumber){

  if(data.cardData.licenseNumber===licenseNumber){
    this.state.found=true;
    this.state.dataBaseCarNumber=data.cardData.licenseNumber;
    this.state.carDetails=data.carData;
    this.state.cardDetails=data.cardData;
    this.state.customer_details=data.customerData;
    this.state.garageReplacementDetails=data.garageReplacementData;
    this.state.rentalCompanyDetails=data.rentalCompanyReplacementData;
    this.state.identifiedCardID=data.id;//rotem
    this.state.branchNumber=data.branchNumber;
    this.state.alternateVehicleTaken=data.alternateVehicleTaken;
    this.state.garageReplacementCheck=data.garageReplacementData.isTaken;
    this.state.rentalCompanyReplacementCheck=data.rentalCompanyReplacementData.isTaken;

   // if(this.state.found === true){
      this.props.onGetAllCardData(this.props.token,this.props.branchNumber, this.props.userId, 'cards', this.state.identifiedCardID);
      this.props.onGetImages(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/images');
     this.props.onGetDocs(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/docs');

    //}
    // this.setState({found: true});
    // this.setState({dataBaseCarNumber: data.cardData.licenseNumber});
    // this.setState({carDetails: data.carData});
    // this.setState({cardDetails: data.cardData});

    // this.setState({customer_details: data.customerData});
    // this.setState({identifiedCardID: data.id});
    // this.setState({branchNumber: data.branchNumber});

    return true;
  }


  else if(data.cardData.licenseNumber!==licenseNumber && this.state.dataBaseCarNumber !== data.cardData.licenseNumber ){
   // this.setTheStates(licenseNumber);
    this.state.found=false;
    return false;
  }
}


closeWorksModal = (event) => {
  this.setWorkAndPartStates();
  this.props.onWorkModalClose(this.props.token); // this contains all the data of card 
// this.setState({ showWorkModel: false });
};

closeToastModal = (event) => {
  this.setState( { isAddNewWorkOrPartOpen: false } );
  this.setState( { isUpdateWorkOrPartOpen: false } );
  this.props.onToastModalClose(this.props.token); 
// this.setState({ showWorkModel: false });
};



closePartsModal = (event) => {
  this.setWorkAndPartStates();
  this.props.onPartsModalClose(this.props.token);  
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
            <div class="form-group col-md-5" style={{ marginBottom: "4px"}}  >       
              <label for="workDescription" >תיאור עבודה</label>
              <input type="text" id="workDescription" class="form-control" value={this.state.cardWork.workDescription.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="time">זמן תקן</label>
              <input type="number" id="time" class="form-control" value={this.state.cardWork.time.value} autocomplete="off"  aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-2"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" id="gross" class="form-control" autocomplete="off" value={this.state.cardWork.gross.value} aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-2 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardWork.discount.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-2 "  style={{ marginBottom: "4px"}}  >
              <label for="net">נטו</label> 
              <input type="number" id="net" class="form-control" value={this.state.cardWork.net.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>
          </div>
        </form>

        <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px", justifyContent: "left"}} >
          <div>  
            { isUpdateWorkOrPartOpen ?  
            <div>            
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.workOrPartsUpdateHandler( event, 'workData')}> <CheckIcon/> עדכון </Button> 
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.setWorkAndPartStates}> <CloseIcon/> ביטול </Button> 
           </div>  
            :
            <div>
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.workOrPartsOpeningHandler( event, 'workData')}> <CheckIcon/> אישור </Button> 
           <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={this.setWorkAndPartStates}> <CloseIcon/> ביטול </Button> 
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
                    <option></option>
                    <option>ביטוח</option>
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
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל עבודות: {this.props.workData.length}</div>   
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
            <div class="form-group col-md-5" style={{ marginBottom: "4px"}}  >       
              <label for="partDescription" >תיאור חלק</label>        
              <input type="text" id="partDescription" class="form-control" autocomplete="off" value={this.state.cardPart.partDescription.value} aria-describedby="passwordHelpInline"
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="amount">כמות</label>
              <input type="number" id="amount" class="form-control" autocomplete="off" value={this.state.cardPart.amount.value} aria-describedby="passwordHelpInline" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-2"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" id="gross" class="form-control" value={this.state.cardPart.gross.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-2 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardPart.discount.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-2 "  style={{ marginBottom: "4px"}}  >
              <label for="net">נטו</label>
              <input type="number" id="net" class="form-control" value={this.state.cardPart.net.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

          </div>
        </form>
        {/* onSubmit={this.cardOpeningHandler}   */}
        <form  class="form-group" style={{   fontSize: "11px",textAlign:"left", marginBottom: "4px", justifyContent: "left"}} >
          <div>  

          { isUpdateWorkOrPartOpen ?  
            <div>            
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue", borderColor: "black"}}  onClick= {( event ) => this.workOrPartsUpdateHandler( event, 'partsData')}> <CheckIcon/> עדכון </Button> 
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}}  onClick={this.setWorkAndPartStates}> <CloseIcon/> ביטול </Button> 
           </div>  
            :
            <div>
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue", borderColor: "black"}}  onClick= {( event ) => this.workOrPartsOpeningHandler( event, 'partsData')}> <CheckIcon/> אישור </Button> 
           <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}}  onClick={this.setWorkAndPartStates}> <CloseIcon/> ביטול </Button> 
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
                 <select id="cardType" class="form-control" value={this.state.cardDetails.cardType} style={{marginLeft: "10px"}}>
                      <option selected></option>
                      <option >ביטוח</option>
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
            <div  style={{ color: "white" ,fontSize: "12px", direction : "rtl"}}>סך הכל חלקים: {this.props.partsData.length}</div> 
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
  return( <EditIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.onEditWorkOrPartClick( itemKey,list,workDescription,time,gross,discount,net)}/> );
}

onEditWorkOrPartClick = ( itemKey,list,workDescription,time,gross,discount,net) =>  {
  this.setState({isUpdateWorkOrPartOpen: true});
  this.setState({isAddNewWorkOrPartOpen: true});
  this.setState({itemKeyForUpdateWorkOrPart: itemKey});
 // this.setState({itemKeyForUpdateModalWorkOrPart: itemKey});
  
  if(list ==='workData'){
    let updateCardWork = {
      workDescription:{value: workDescription},
      time:{value: time},
      gross:{value: gross},
      discount:{value: discount},
      net:{value: net}
    }
    this.setState({cardWork: updateCardWork});
  }

 else if(list ==='partsData'){
    let updateCardWork = {
      partDescription:{value: workDescription},
      amount:{value: time},
      gross:{value: gross},
      discount:{value: discount},
      net:{value: net}
    }
    this.setState({cardPart: updateCardWork});
  }
  //let cardKey = this.state.identifiedCardID;
  
}      

renderDeleteWorkOrPart = (itemKey,list) => { 
  return( <DeleteIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.onDeleteWorkOrPartClick(itemKey,list)}/> );
}

onDeleteWorkOrPartClick = (itemKey,list) =>  {
  let cardKey = this.state.identifiedCardID;
  this.props.onWorkOrPartDelete(this.props.token, this.props.branchNumber,cardKey,itemKey ,list,this.props.userId);  
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

switchModeAlternateVehicle = () => {
  this.setState(prevState => {
      return {alternateVehicleTaken: !prevState.alternateVehicleTaken};
      });
}

switchModeGarageReplacementVehicle = () => {
  this.setState(prevState => {
      return {garageReplacementCheck: !prevState.garageReplacementCheck};
      });
}

switchModeRentalCompanyReplacementCheck = () => {
  this.setState(prevState => {
      return {rentalCompanyReplacementCheck: !prevState.rentalCompanyReplacementCheck};
      });
}

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

switchDivModeHandlerReplacementCar = () => {
  this.setState(prevState => {
      return {showReplacementCarDiv: !prevState.showReplacementCarDiv};
      });
}

switchDivModeHandlerMail = () => {
  this.setState(prevState => {
      return {showSendMailDiv: !prevState.showSendMailDiv};
      });
}

updateCarInputValue=(evt,i)=> {
      evt.preventDefault(); 
      this.state.car_data[i]=evt.target.value;
      if(i===9){
        this.state.carDetails.manufactureYear=evt.target.value;
        this.state.vehicleData.manufactureYear.value=evt.target.value;
        this.setState(prevState => {
          return (this.state.vehicleData.manufactureYear.value);
          });
        //return (this.state.carDetails.manufactureYear);
        return (this.state.vehicleData.manufactureYear.value);
      }
      //value={this.state.carDetails.manufactureYear}
}

updateCardInputValue=(evt,i)=> {
  evt.preventDefault(); 
    this.state.card_data[i]=evt.target.value;

   // this.state.cardForm.cardType.value=this.state.cardDetails.cardType;
    if(i===1){
      this.state.cardDetails.cardType=evt.target.value;
      this.state.cardForm.cardType.value=evt.target.value;
      this.setState(prevState => {
        return (this.state.cardForm.cardType.value);
        });
      //return (this.state.carDetails.manufactureYear);
      return (this.state.cardForm.cardType.value);
    }
    if(i===11){
      this.state.cardDetails.status=evt.target.value;
      this.state.cardForm.status.value=evt.target.value;
      this.setState(prevState => {
        return (this.state.cardForm.status.value);
        });
      //return (this.state.carDetails.manufactureYear);
      return (this.state.cardForm.status.value);
    }
}

updateCustomerInputValue(evt,i) {
  this.state.customer_data[i]=evt.target.value;
}


switchShowImagesAndDoc = () => {
  this.setState(prevState => {
      return {showImagesAndDoc: !prevState.showImagesAndDoc,imagesArrayForCheck:[], docsArrayForCheck: []};
      });
}

// MakeFile() {
//   var FileSaver = require('file-saver');
//   //var blob = new Blob([this.props.imagesForCard[i].url], {type: "image.jpg;charset=utf-8"});
//   for(var i=0;i<this.state.docFiles.length;i++){
//     console.log(this.state.docFiles[i]);
//     console.log(this.state.docFiles[i].name);

//     FileSaver.saveAs(this.state.docFiles[i], this.state.docFiles[i].name);
//   }
//   for(var i=0;i<this.state.imageFiles.length;i++){
//         console.log(this.state.imageFiles[i]);
//         console.log(this.state.imageFiles[i].name);

//     FileSaver.saveAs(this.state.imageFiles[i], this.state.imageFiles[i].name);
//   }
  
// }




onMultipleDocDownload(node) { //url2,name,key,
  Object.keys(this.state.docsArrayForCheck).map((key, i) => {
    this.props.onDownloadDoc(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
     delete this.state.docsArrayForCheck[key];
    })
}



onDeleteMultipleDocs = (node) => {
  Object.keys(this.state.docsArrayForCheck).map((key, i) => {
       this.props.onDeleteDocs(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
        delete this.state.docsArrayForCheck[key];
  })
}


onDeleteMultipleImages = (node) => {
  Object.keys(this.state.imagesArrayForCheck).map((key, i) => {
       this.props.onDeleteImages(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
        delete this.state.imagesArrayForCheck[key];
  })
}

onMultipleImagesDownload(node) {
  Object.keys(this.state.imagesArrayForCheck).map((key, i) => {
    this.props.onDownloadImage(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
     delete this.state.imagesArrayForCheck[key];
    })
}




onCheckBoxImageClick(key, name, url,index,check){

  if(check){ // unmarked the box
   // this.props.docsForCard[index].check = false;
    const imagesArrayForCheck = Object.assign({}, this.state.imagesArrayForCheck);
    delete imagesArrayForCheck[name];
    delete this.state.imagesArrayForCheck[name];
    this.setState({ imagesArrayForCheck: imagesArrayForCheck });
  
  }
  else if(!check){ // marked the box
    //this.props.docsForCard[index].check = true;
    this.state.imagesArrayForCheck[name] = true;
  
    const updatedCardForm = updateObject(this.state.imagesArrayForCheck, { 
      [name]: true 
  });
    this.setState({imagesArrayForCheck: updatedCardForm});
  } 
}


onCheckBoxFileClick(key, name, url,index,check){

if(check){ // unmarked the box
 // this.props.docsForCard[index].check = false;
  const docsArrayForCheck = Object.assign({}, this.state.docsArrayForCheck);
  delete docsArrayForCheck[name];
  delete this.state.docsArrayForCheck[name];
  this.setState({ docsArrayForCheck: docsArrayForCheck });

}
else if(!check){ // marked the box
  //this.props.docsForCard[index].check = true;
  this.state.docsArrayForCheck[name] = true;
  const updatedCardForm = updateObject(this.state.docsArrayForCheck, { 
    [name]: true 
});
  this.setState({docsArrayForCheck: updatedCardForm});
}

}

renderImagesAndDocModal = () => { ///*** images and docs modal! ****
    //,top: "50%",  left: "50%",transform: "translate(-50%, -50%)",wordWrap: "break-word",width: "min-content"
    
    return (
//display: "inline-flex"

      <Modal show={true} onHide={this.switchShowImagesAndDoc} dialogClassName={classes.Dialog} backdrop={false} 
      style={{ position: "fixed",display: "flex",fontFamily: "Alef Hebrew"}}>
          <Modal.Header closeButton disabled={this.props.isUploading} >
            <Modal.Title>תמונות ומסמכים לכרטיס</Modal.Title>
          </Modal.Header>
          <Modal.Body >


         <ul class="nav nav-tabs" id="myTab" role="tablist" style={{direction: "rtl"}}>
              <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">תמונות</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">מסמכים</a>
              </li>
 
              <li class="nav-item">
                <a class="nav-link" id="newUpload-tab" data-toggle="tab" href="#newUpload" role="tab" aria-controls="newUpload" aria-selected="false">העלאה חדשה</a>
              </li>


            </ul>
            <div class="tab-content" id="myTabContent">
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" style={{opacity: "initial"}}>


              { 
           Object.keys(this.state.imagesArrayForCheck).length !== 0 ?

            <div id="textbox" style={{direction: "rtl", textAlign: "right",fontSize: "25px",width: "100%" , display: "inline-table"}}>
                <p class="alignright" style={{	float: "right"}}>
                { Object.keys(this.state.imagesArrayForCheck).length} נבחרו 
                </p>
                <p class="alignleft" style={{	float: "left"}}>
                <DeleteOutlineIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onDeleteMultipleImages('/images') }/>
                  <AssignmentReturnedIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onMultipleImagesDownload('/images')}/>  
                </p>
            </div>
          : null
          }
                { Object.keys(this.props.imagesForCard).length === 0 ?
                      <h5 style={{textAlign: "center"}}><b style={window.innerWidth > '500' ? {fontSize: "x-large",fontWeight: "bold"}: {fontSize: "15px",fontWeight: "bold"}} >עבור להעלאה כדי להתחיל להעלאות תמונות</b></h5>

                :
                <section style={{ display: "-webkit-box",flexWrap: "wrap"}}> 
                    {this.props.imagesForCard.map(image =>
                            <div className="div" ng-repeat="img in imgs" style={{width:image.width*200/image.height + 'px',flexGrow:image.width*200/image.height}} >
                            <i className="i" style={{paddingBottom:image.height/image.width*100 + '%'}}></i>
                            <div class="hovereffect">
                              <img className="img" src={image.url} alt={image.key}  />
                            <div class="overlay">   
                            {
                          this.state.imagesArrayForCheck[image.name] ?
                    <CheckBoxIcon style={{ fontSize:"large",cursor: "pointer" }} onClick={() => this.onCheckBoxImageClick(image.key,image.name,image.url,image.index,this.state.imagesArrayForCheck[image.name])}/>
                     :
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"large",cursor: "pointer" }} onClick={() => this.onCheckBoxImageClick(image.key,image.name,image.url,image.index,this.state.imagesArrayForCheck[image.name])}/>

                      } 
           
                    </div>
                    </div>
                        </div>
                      )} 
          
                            </section> }   
              </div> 

              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"  style={{opacity: "initial"}}>
          {
           Object.keys(this.state.docsArrayForCheck).length !== 0 ?

            <div id="textbox" style={{direction: "rtl", textAlign: "right",fontSize: "25px",width: "100%"}}>
                <p class="alignright" style={{	float: "right"}}>
                { Object.keys(this.state.docsArrayForCheck).length} נבחרו 
                </p>
                <p class="alignleft" style={{	float: "left"}}>
                <DeleteOutlineIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onDeleteMultipleDocs('/docs') }/>
                  <AssignmentReturnedIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onMultipleDocDownload('/docs')}/>  
                </p>
            </div>
          : null
          }

      { Object.keys(this.props.docsForCard).length === 0 ?
                      <h5 style={{textAlign: "center"}}><b style={window.innerWidth > '500' ? {fontSize: "x-large",fontWeight: "bold"}: {fontSize: "15px",fontWeight: "bold"}} >עבור להעלאה כדי להתחיל להעלאות מסמכים</b></h5>
            :
              <div class="table-wrapper" style={{direction: "rtl", backgroundColor: "white"} }>
        <table class="table table-bordered" style={window.innerWidth > '376' ? {marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew",  tableLayout: "fixed"}: {marginBottom: "1px",direction: "rtl",fontFamily: "Alef Hebrew"}} >
            <thead>  

             <tr style={{fontWeight: "bold", fontSize: "18px"}}>
                    <th  scope="col" style={{ textAlign: "right"}}>שם קובץ</th>
                    <th  scope="col" style={{ textAlign: "right"}}>תאריך שינוי אחרון</th>
                </tr>
            </thead>
            <tbody>

            {this.props.docsForCard.map( file =>  (
                    <tr> 
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>
                      {
                          this.state.docsArrayForCheck[file.name] ?
                    <CheckBoxIcon style={{ fontSize:"large",cursor: "pointer" }} onClick={() => this.onCheckBoxFileClick(file.key,file.name,file.url,file.index,this.state.docsArrayForCheck[file.name])}/>
                     :
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"large",cursor: "pointer" }} onClick={() => this.onCheckBoxFileClick(file.key,file.name,file.url,file.index,this.state.docsArrayForCheck[file.name])}/>
                      }{' '}
                    {file.name}
                    </td>
                    <td style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-Word"}}>{file.lastModified}</td>  
                    </tr>      
                 ))  
            }
       </tbody>
        </table> 
        </div>



        }
                  </div>


              <div class="tab-pane fade" id="newUpload" role="tabpanel" aria-labelledby="newUpload-tab" style={{opacity: "initial"}}>
              <div class="item-wrapper one" >
                <div class="item">
                    <form data-validation="true" action="#" method="post" enctype="multipart/form-data">
                        <div class="item-inner">
                            <div class="item-content">
                                <div class="image-upload">
                                   <label style={{cursor: "pointer",direction: "rtl"}} for="file_upload" > 
                                   <CloudUploadIcon style={{ fontSize: "100px",color: "gainsboro",margin: "5px" }}  />
                                        <div class="h-100">
                                            <div class="dplay-tbl">
                                                <div class="dplay-tbl-cell"> <i class="fa fa-cloud-upload"></i>
                                                    <h5><b style={window.innerWidth > '500' ? {fontSize: "x-large"}: {fontSize: "larger"}} >בחר את הקבצים שלך להעלאה</b></h5>
                                                    {window.innerWidth > '769' ?
                                                    <h6 class="mt-10 mb-70" style={{fontSize: "medium"}}  >או גרור את הקבצים לכאן</h6>
                                                    : null}
                                                </div>
                                            </div>
                                        </div>

                                        <input type="file" multiple id="file_upload" value="" class="image-input" style={{height: "100%"}} data-traget-resolution="image_resolution" ondrop={ (event) =>  this.fileSelectedHandler(event,'images')} ondragover="return false"  onChange={ (event) =>  this.fileSelectedHandler(event,'images')} disabled={!this.state.formIsValid}/>

                                    </label> 
                                    {this.props.isUploading === true ?
                                    <div>

                                          <div class="dplay-tbl-cell"> <i class="fa fa-cloud-upload"></i>
                                                    <h5><b style={{fontSize: "small",fontWeight: "bold"}} >הקבצים בהעלאה {this.props.currentUploadNumber}</b></h5>
                                                    <h6 class="mt-10 mb-70" style={{fontSize: "small",direction: "rtl"}}  >מעלה כעת את: {this.props.currentFileUploaded} </h6>
                                                </div>
                                    <ProgressBar variant="success" now={this.props.payload} label={this.props.payload + "%"}  />
                                    </div>
                                    : null
                                    }
                                    </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                  </div> 
            </div>
          </Modal.Body>
          <Modal.Footer style={{direction: "rtl"}}>    
            <Button onClick={this.switchShowImagesAndDoc} style={{textAlign: "right"}} disabled={this.props.isUploading} >סגירה</Button>
          </Modal.Footer>
        </Modal>

    ); 
      
}


showImagesAndDoc  = () => {
  this.props.onGetImages(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/images');
  this.props.onGetDocs(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'],'/docs');
  // console.log(this.props.showGetSuccessCase);
  // if(this.props.showGetSuccessCase){
  //   console.log(this.props.imagesForCard);
  // }
}


fileSelectedHandler = (e,type) => {
  e.preventDefault();
  const arrFiles = Array.from(e.target.files);
  this.props.onImageOrDocUploading(arrFiles,this.props.userId ,this.props.token,this.props.branchNumber,'images',this.state.identifiedCardID,this.state.cardDetails['ticketNumber']);
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
 
  const { name, email, message } = this.state //subject
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
   // const imgTag = this.buildImgTag();

    // let { licenseNumber , ticketNumber } = this.state;

    // let cards;
    // if(this.state.userCarNumber!==""){
    //   cards = this.props.cards.map( card => (
    //     this.check(card)
    //   ))
    // }


  return (
    <form id="workCardForm" onSubmit={this.state.found ? this.cardUpdateHandler : this.cardOpeningHandler}  class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >  

          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > פרטים </span> 
              { !this.state.showDetailsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandler}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandler}/>
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
                <div class="form-group col-md-2" >
                {(() => {
                if(this.state.found){
                  this.state.cardForm.ticketNumber.value=this.state.cardDetails.ticketNumber;
                }    
              })()}
                  <label for="ticketNumber">מספר כרטיס</label>
                  <input type="text" id="ticketNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline"
                  defaultValue={this.state.cardForm.ticketNumber.value} 
                  // {this.props.cards.length +1}
                  // value={this.state.cardForm.ticketNumber.value}
                  //  onChange={(event) => this.inputChangedHandler(event)}
                   />
                </div>
                
  
                <div class="form-group col-md-2" >
                {(() => {
                if(this.state.found && this.state.term !==''){
                  this.state.cardForm.cardType.value=this.state.cardDetails.cardType;
                  //this.g(this.state.carDetails.carDescription.value);
                  //console.log(this.state.carDetails);
                }    
                })()}
                  <label for="cardType">סוג כרטיס</label>
                  <select id="cardType" class="form-control"  disabled={!this.state.formIsValid} style={{backgroundColor: "white"}} 
                  value={this.state.cardForm.cardType.value} 
                   onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,1)}>
                      <option></option>
                      <option>ביטוח</option>
                      <option>פרטי</option>
            
                  </select>
                </div>
  
                <div className="form-group col-md-2">
                <label for="openingDate">תאריך פתיחה</label>
                <input  type="text" id="openingDate" autocomplete="off" className="form-control" 
                value= {this.state.found ?  this.state.cardDetails.openingDate : this.state.reportStartDate}
                
                // {this.state.cardDetails.openingDate}
                // value={this.state.reportStartDate} 
                // onChange={(event) => this.inputChangedHandler(event)} 
                 />
              </div>

              <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found && this.state.term !==''){
                  this.state.cardForm.status.value=this.state.cardDetails.status;
                  //this.g(this.state.carDetails.carDescription.value);
                  //console.log(this.state.carDetails);
                }    
                })()}
                  <label for="status">סטטוס טיפול ברכב</label>
                  <select id="status" class="form-control"  disabled={!this.state.formIsValid} style={{backgroundColor: "white"}} 
                  value={this.state.cardForm.status.value} 
                   onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,11)}>
                      <option></option>
                      <option>ממתין לאישור מהביטוח</option>
                      <option>ממתין לשמאי</option>
                      <option>ממתין לחלקים חליפיים</option>
                      <option>ממתין לתחילת תיקון</option>
                      <option>בתיקון</option>
                      <option>בצביעה</option>
                      <option>בשטיפה</option>
                      <option>מוכן</option>
                      <option>נמסר ללקוח</option>
                  </select>
                </div>

              </div> 
            </div>
          : null }
          </div>

          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>

             <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > עדכון פרטי רכב </span> 
              { !this.state.showCarInfoDiv ? 
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerCar}/>
              : <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerCar}/> }
              </div>

            {this.state.showCarInfoDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row">              
                <div class="form-group col-md-3" >
                {(() => {
                if(this.state.found && this.state.term !==''){
                  this.state.vehicleData.carDescription.value=this.state.carDetails.carDescription;
                  //this.g(this.state.carDetails.carDescription.value);
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
                  <input  type="text" id="color" class="form-control" style={{backgroundColor: "white"}} aria-describedby="passwordHelpInline" autocomplete="off" disabled={!this.state.formIsValid}
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
                  <input type="datetime-local"  id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" disabled={!this.state.formIsValid} 
                  defaultValue={this.state.vehicleData.lastVisit.value} style={{backgroundColor: "white"}}
                  onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,8)}/>
                </div>
  
                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.vehicleData.manufactureYear.value= this.state.carDetails.manufactureYear;
                    // console.log(this.state.vehicleData.manufactureYear.value)
                    }    
                 })()}
                  <label for="manufactureYear">שנת יצור</label>
                  <select  id="manufactureYear" class="form-control"  style={{backgroundColor: "white"}}  
                   value={ this.state.vehicleData.manufactureYear.value}  
                  disabled={!this.state.formIsValid} onChange={!this.state.found ? (event) => this.inputCarChangedHandler(event) : (evt) => this.updateCarInputValue(evt,9)}>
                  
                    {/* <option selected></option> */}
                    <option></option>
                    <option>2020</option> <option>2019</option> <option>2018</option> <option>2017</option><option>2016</option> <option>2015</option> <option>2014</option> <option>2013</option>
                    <option>2012</option> <option>2011</option> <option>2010</option> <option>2009</option> <option>2008</option> <option>2007</option> <option>2006</option> <option>2005</option>
                    <option>2004</option> <option>2003</option> <option>2002</option> <option>2001</option> <option>2000</option> <option>1999</option> <option>1998</option> <option>1997</option>
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
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerCus}/>
              : <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerCus}/> }
              </div>

            {this.state.showCustomerDetailsDiv ?
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                {/* <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.customerDetails.customerNumber.value= this.state.customer_details.customerNumber;
                    }    
                 })()}
                  <label for="customerNumber" >מספר לקוח</label>
                  <input type="text" id="customerNumber" class="form-control" autocomplete="off"
                  defaultValue={this.state.customerDetails.customerNumber.value}
                  onChange={!this.state.found ? (event) => this.inputCusChangedHandler(event) : (evt) => this.updateCustomerInputValue(evt,5)}/>
                </div> */}
  
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
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerTin}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerTin}/>
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
  
          <div class="form-row" > 
          <div class="form-group col-md-6" >
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > תלונות/בקשות הלקוח </span> 
              { !this.state.showCustomerRequestsDiv ? 
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerReq}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerReq}/>
              }
              </div>
             
            {this.state.showCustomerRequestsDiv ? 
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                {(() => {
                   if(this.state.found){
                    this.state.cardForm.customerRequests.value= this.state.cardDetails.customerRequests;
                    }    
                 })()}
                  <label for="customerRequests" >תלונות/בקשות הלקוח</label>
                  <Input type="textarea" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid}
                          defaultValue={this.state.cardForm.customerRequests.value}
                          onChange={!this.state.found ? (event) => this.inputChangedHandler(event) : (evt) => this.updateCardInputValue(evt,4)}/>
                </div>
              </div> 
               : null }   
          </div>  

          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span > רכב חליפי </span> 
              { !this.state.showReplacementCarDiv ? 
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerReplacementCar}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerReplacementCar}/>
              }
              </div>
            {this.state.showReplacementCarDiv ? 
            <div class="card-body text-dark bg-white" >
              <div >
              <div class="form-row">
            {this.state.alternateVehicleTaken ?
                          <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                            <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeAlternateVehicle()}/>
                            {' '}רכב חליפי נלקח?                    
                          </div>
                     :
                     <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeAlternateVehicle()}/>
                    {' '}רכב חליפי נלקח?   
                  </div>
                      } 
                      </div>

                      <div > 
        {this.state.alternateVehicleTaken ?
                      <div class="form-row"> 
                        {this.state.garageReplacementCheck ?
                          <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                            <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeGarageReplacementVehicle()}/>
                            {' '}רכב מהמוסך?                    
                        </div>
                     :
                     <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeGarageReplacementVehicle()}/>
                    {' '}רכב מהמוסך?   
                  </div>
                      } 
                  {this.state.rentalCompanyReplacementCheck ?
                          <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                            <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeRentalCompanyReplacementCheck()}/>
                            {' '}רכב מחברת השכרה?                    
                        </div>
                     :
                     <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} onClick={() => this.switchModeRentalCompanyReplacementCheck()}/>
                    {' '}רכב מחברת השכרה?   
                  </div>
                      } 
                </div>
                      : null
                      }
                      </div>
              </div>


    {this.state.alternateVehicleTaken ?
              <div class="form-row" >
          { this.state.garageReplacementCheck?
            <div > 

        <div class="form-row" > 
          <div class="form-row" > 
            <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){    
                    this.state.garageReplacementVehicle.replacementVehicleNumber.value= this.state.garageReplacementDetails.replacementVehicleNumber;
                    }    
                 })()}  

                  <label for="replacementVehicleNumber" >מספר רכב</label>
                  <input type="text" id="replacementVehicleNumber" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.garageReplacementVehicle.replacementVehicleNumber.value}
                  onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,0)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.garageReplacementVehicle.typeReplacementVehicle.value= this.state.garageReplacementDetails.typeReplacementVehicle;
                    }    
                 })()}
                  <label for="typeReplacementVehicle" >סוג רכב</label>
                  <input type="text" id="typeReplacementVehicle" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.garageReplacementVehicle.typeReplacementVehicle.value}
                  onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,1)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.garageReplacementVehicle.fuelBefore.value= this.state.garageReplacementDetails.fuelBefore;
                    }    
                 })()}
                  <label for="fuelBefore" >דלק לפני</label>
                  <input type="text" id="fuelBefore" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.garageReplacementVehicle.fuelBefore.value}
                  onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,2)}/>
                </div>

                <div class="form-group col-md-3" >
                {(() => {
                   if(this.state.found){
                    this.state.garageReplacementVehicle.fuelAfter.value= this.state.garageReplacementDetails.fuelAfter;
                    }    
                 })()}
                  <label for="fuelAfter" >דלק אחרי</label>
                  <input type="text" id="fuelAfter" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.garageReplacementVehicle.fuelAfter.value}
                  onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,3)}/>
                </div>
                </div>

                <div class="form-group col-md-6" >
                {(() => {
                   if(this.state.found){
                      this.state.garageReplacementVehicle.dateOfDelivery.value= this.state.garageReplacementDetails.dateOfDelivery;
                  }    
                 })()}
                        <label for="dateOfDelivery" >תאריך מסירה</label> 
                        <input type="datetime-local" id="dateOfDelivery" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                        defaultValue={this.state.garageReplacementVehicle.dateOfDelivery.value}
                        onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,4)}/>
                      </div>
                      <div class="form-group col-md-6" >
                    {(() => {
                      if(this.state.found){
                        this.state.garageReplacementVehicle.returnDate.value= this.state.garageReplacementDetails.returnDate;
                        }    
                    })()}
                      <label for="returnDate" >תאריך החזרה</label> 
                      <input type="datetime-local" id="returnDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
                      defaultValue={this.state.garageReplacementVehicle.returnDate.value}
                      onChange={!this.state.found ? (event) => this.inputGarageReplacementChangedHandler(event) : (evt) => this.updateGarageReplacementInputValue(evt,5)}/>
                    </div>
                    </div>
                  </div>
                  :null}

    {this.state.rentalCompanyReplacementCheck?
            <div style={{width: "100%"}} > 
                <div class="form-row" > 
                <div class="form-group col-md-6" >
                {(() => {
                   if(this.state.found){
                    this.state.rentalCompanyReplacementVehicle.nameRentalCompany.value= this.state.rentalCompanyDetails.nameRentalCompany;
                    }    
                 })()}
                  <label for="nameRentalCompany" >שם חברת ההשכרה</label>
                  <input type="text" id="nameRentalCompany" class="form-control " autocomplete="off" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} aria-describedby="passwordHelpInline" 
                  defaultValue={this.state.rentalCompanyReplacementVehicle.nameRentalCompany.value}
                  onChange={!this.state.found ? (event) => this.inputRentalCompanyReplacementChangedHandler(event) : (evt) => this.updateRentalCompanyReplacementInputValue(evt,0)}/>
                </div>
                </div>
                <div class="form-row" > 

    <div class="form-group col-md-6" >
          {(() => {
             if(this.state.found){
              this.state.rentalCompanyReplacementVehicle.dateOfDelivery.value= this.state.rentalCompanyDetails.dateOfDelivery;
              }    
           })()}
            <label for="dateOfDelivery" >תאריך מסירה</label> 
            <input type="datetime-local" id="dateOfDelivery" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
            defaultValue={this.state.rentalCompanyReplacementVehicle.dateOfDelivery.value}
            onChange={!this.state.found ? (event) => this.inputRentalCompanyReplacementChangedHandler(event) : (evt) => this.updateRentalCompanyReplacementInputValue(evt,1)}/>
          </div>
          <div class="form-group col-md-6" >
          {(() => {
             if(this.state.found){
              this.state.rentalCompanyReplacementVehicle.returnDate.value= this.state.rentalCompanyDetails.returnDate;
              }    
           })()}
            <label for="returnDate" >תאריך החזרה</label> 
            <input type="datetime-local" id="returnDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} disabled={!this.state.formIsValid} 
            defaultValue={this.state.rentalCompanyReplacementVehicle.returnDate.value}
            onChange={!this.state.found ? (event) => this.inputRentalCompanyReplacementChangedHandler(event) : (evt) => this.updateRentalCompanyReplacementInputValue(evt,2)}/>
          </div>
          </div>
                </div>
          : null}
                </div>
                  :null}
              </div> 
               : null }   
          </div>  
              </div> 

              <div class="form-group col-md-6" >
            <div class="card text-white bg-dark mb-6" style={{display: "flex"}}>
            <div class="card-header"style={{fontSize: "14px",fontWeight: "bold"}} >
              <span >שליחת מייל לשמאי/חברת ביטוח </span> 
              { !this.state.showSendMailDiv ? 
              <AddIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerMail}/>
              :
              <RemoveIcon style={{textAlign:"left",float: "left",cursor: "pointer"}} onClick={this.switchDivModeHandlerMail}/>
              }
              </div>
            {this.state.showSendMailDiv ? 
              <div class="card-body text-dark bg-white" >
                   <>
          <Form >
            

    
                 <form>
            <FormGroup controlId="formBasicEmail" autocomplete="off">
              <Label >כתובת מייל</Label>
              <Input type="text" name="email" value={this.state.email} placeholder="הכנס/י כתובת מייל" autocomplete="off" disabled={!this.state.formIsValid} 
                    style={{backgroundColor: "white"}} onChange={this.handle_Change.bind(this, 'email')} />
            </FormGroup>
            </form>
            <form>
            <FormGroup controlId="formBasicName">
              <Label >שם</Label>
              <Input type="text" name="name" value={this.state.name} placeholder="הכנס/י שם" autocomplete="off" disabled={!this.state.formIsValid}
                   style={{backgroundColor: "white"}} onChange={this.handle_Change.bind(this, 'name')} />
            </FormGroup>
            </form>
            <FormGroup controlId="formBasicSubject">
              <Label >נושא</Label>
              <Input type="text" name="subject" value={this.state.subject} placeholder="הכנס/י נושא" autocomplete="off" disabled={!this.state.formIsValid}
                  style={{backgroundColor: "white"}} onChange={this.handle_Change.bind(this, 'subject')}/>
            </FormGroup>
            <FormGroup controlId="formBasicMessage">
              <Label >הודעה</Label>
              <Input type="textarea" name="message" value={this.state.message} placeholder="הכנס/י הודעה" autocomplete="off" disabled={!this.state.formIsValid}
                    style={{backgroundColor: "white"}} onChange={this.handle_Change.bind(this, 'message')}/>
            </FormGroup>
            <Button variant="primary" type="submit" style={{textAlign:"left",direction: "ltr",float: "left"}} disabled={!this.state.formIsValid} onClick={this.handle_Submit.bind(this)}> שלח מייל </Button>
          </Form>
      </>
              </div>  
               : null }  
            </div>  
            </div>
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


               {this.state.showCloseModal?
                    this.renderShowCloseModal()
            :null} 

            {' '}
      {this.state.found ? 
        <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid}  onClick={this.switchShowImagesAndDoc}> תמונות ומסמכים</Button> 
      : null}
        {' '}

      {' '}
      {this.state.found ? 
      <>
      <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid} onClick={this.changeVehicleNumberHandler}>שינוי מספר רכב</Button> 
      {' '}
      <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid} onClick={this.cardUpdateHandler}>עדכון כרטיס</Button> 
      {' '}
      {this.state.found ? 
        <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid}  onClick={this.ModalCardCloseHandler}>סגירת כרטיס</Button> 
      : null}
  


      </>
      :   
      <div  style={{textAlign:"left"}} > 
      <Button bsStyle="secondary" style={{borderColor: "black"}}  disabled={!this.state.formIsValid} onClick={this.cardOpeningHandler}>שמירת כרטיס חדש</Button> 
      </div>  
      }

      {' '}
        {/* { this.props.showSuccessCase ? this.renderToastModal( 'כרטיס נשמר בהצלחה') :null } */}
        {/* { this.props.showUpdateSuccessCase ? this.renderToastModal('כרטיס עודכן בהצלחה') :null } */}
        {/* { this.props.showCloseCardSuccessCase && this.props.showSuccessCase ? this.renderToastModal( 'כרטיס נסגר בהצלחה') :null } */}
        { this.state.showImagesAndDoc ? this.renderImagesAndDocModal() :null }

        </form>
      </form>
    );

}
}


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
      partsData: state.card.partsData,
      currentCardKey: state.card.currentCardKey,
      currentTicketNumber: state.card.currentTicketNumber,
      showGetSuccessCase: state.storage.showGetSuccessCase,
      imagesForCard: state.storage.fetchedImages,
      numberOfImages: state.storage.numberOfImages,
      docsForCard: state.storage.fetchedDocs,
      numberOfDocs: state.storage.numberOfDocs,
      resizeImagesForCard: state.storage.resizeImages,
      backgroundColor: state.auth.backgroundColor,
      payload: state.storage.payload,
      currentFileUploaded: state.storage.currentFileUploaded,
      isUploading: state.storage.isUploading,
      currentUploadNumber: state.storage.currentUploadNumber
  };
};


const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) ),
    onCardOpening: (cardData,userId, token,branchNumber,node) => dispatch(actions.cardOpening(cardData,userId, token, branchNumber,node)),
    onCardUpdate:(carData,cardData,customerData,garageReplacementData,rentalCompanyReplacementData,alternateVehicleTaken, token, branchNumber,identifiedCardID,userId) => dispatch(actions.cardUpdate(carData,cardData,customerData,garageReplacementData,rentalCompanyReplacementData,alternateVehicleTaken, token, branchNumber,identifiedCardID,userId)), // this contains all the data of card 
    onCardDelete:(token, branchNumber, identifiedCardID,node,userId) => dispatch( actions.cardDelete(token, branchNumber, identifiedCardID,node,userId)),
    onImageOrDocUploading:(file,userId ,token,branchNumber,node,cardKey,ticketNumber) => dispatch( actions.imageOrDocUploading(file,userId ,token,branchNumber,node,cardKey,ticketNumber)),
    onGetImages:(userId ,token,branchNumber,cardKey,ticketNumber, node) => dispatch( actions.getImages(userId ,token,branchNumber,cardKey,ticketNumber, node)),
    onDeleteImages:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.deleteImages(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
    onDeleteDocs:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.deleteDocs(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
    onDownloadDoc:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.downloadDoc(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
    onDownloadImage:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.downloadImage(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
    onGetDocs:(userId ,token,branchNumber,cardKey,ticketNumber, node) => dispatch( actions.getDocs(userId ,token,branchNumber,cardKey,ticketNumber, node)), 
    onWorkModalOpening: () =>  dispatch(actions.workModalOpening()),   
    onWorkModalClose: (token ) =>  dispatch(actions.workModalClose(token)),
    onToastModalClose: () =>  dispatch(actions.toastModalClose()),
    onPartModalOpening: () =>  dispatch(actions.partModalOpening()),   
    onPartsModalClose: (token ) =>  dispatch(actions.partModalClose(token)),
    onWorkOrPartsOpening: (formData, token,branchNumber,userId, kind,cardKey) => dispatch(actions.workOrPartsOpening(formData, token, branchNumber,userId, kind,cardKey)),
    onWorkOrPartUpdate: (itemData, token,branchNumber,userId,list, kind,cardKey,itemKey) => dispatch(actions.workOrPartUpdate(itemData, token,branchNumber,userId,list, kind,cardKey,itemKey)),
    onWorkOrPartDelete: (token, branchNumber, cardKey,itemKey ,list,userId) => dispatch( actions.WorkOrPartDelete(token,branchNumber,cardKey,itemKey,list,userId)),
    onGetAllCardData: (token,branchNumber,userId, kind,cardKey) => dispatch(actions.GetAllCardData(token,branchNumber,userId, kind,cardKey)),
    onSetCurrentCardKey: () => dispatch(actions.setCurrentCardKey()),


    onChangeVehicleNumber:(newNumberInput, token, branchNumber,identifiedCardID,userId) => dispatch(actions.changeVehicleNumber(newNumberInput, token, branchNumber,identifiedCardID,userId)) 



  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(openNew,axios));