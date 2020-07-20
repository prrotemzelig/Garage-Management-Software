import React, { Component } from 'react'
//import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
// import classes from '../../components/Card/Card.module.css';
// import Card from './CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { Modal ,Button } from 'react-bootstrap';
import {Input} from 'reactstrap' // FormFeedback,
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import classes from '../UI/Modal/Modal.module.css';
import { updateObject} from '../../shared/utility'; //checkFormatNumbers

class showData extends Component   {
    constructor(props){
        super(props);
        this.state = {
        cardDetails:{},
        carDetails:{},
        customer_details:{},
        garageReplacementVehicle:{},
        rentalCompanyReplacementVehicle:{},
        alternateVehicleTaken:'',
        CarNumber:'',
        ticketNumber:'',
        parts:[],
        works:[],
        showDetailsDiv: true,
        showCarInfoDiv:true,
        showCustomerDetailsDiv: true,
        showTinsmithingDetailsDiv:true,
        showCustomerRequestsDiv:true,
        showReplacementCarDiv:true,
        showSendMailDiv: true,
        showImagesAndDoc: false,
        isAddNewWorkOrPartOpen: false,
        isUpdateWorkOrPartOpen: false,
        // showImagesAndDoc: false,
        imagesArrayForCheck: [],
        docsArrayForCheck: [],
        closeDate: '',
        partsDetails: [],
        worksDetails: [],
        showCloseModal: false,
        invoiceClosureData: {}
        }
      }
  
    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
        this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchNumber,this.props.UserKey); 

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

openWorkModal = (event,kind) => {
  // event.preventDefault(); // with that we get the Card details
this.props.onWorkModalOpening( ); // this contains all the data of card //this.props.token
};

openPartModal = (event,kind) => {
  // event.preventDefault(); // with that we get the Card details
this.props.onPartModalOpening( ); // this contains all the data of card //this.props.token
};

onMultipleImagesDownload(node) {
  Object.keys(this.state.imagesArrayForCheck).map((key, i) => {
    this.props.onDownloadImage(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
     delete this.state.imagesArrayForCheck[key];
    })
}

onMultipleDocDownload(node) { //url2,name,key,
  Object.keys(this.state.docsArrayForCheck).map((key, i) => {
    this.props.onDownloadDoc(this.props.userId ,this.props.token,this.props.branchNumber,this.state.identifiedCardID,this.state.cardDetails['ticketNumber'], node,key);   
     delete this.state.docsArrayForCheck[key];
    })
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

renderImagesAndDocModal = () => { ///*** images and docs modal! ****
  //,top: "50%",  left: "50%",transform: "translate(-50%, -50%)",wordWrap: "break-word",width: "min-content"
  //,display: "flex"
  return (
//display: "inline-flex"

    <Modal show={true} onHide={this.switchShowImagesAndDoc} dialogClassName={classes.Dialog} backdrop={false} 
    style={{ position: "fixed",fontFamily: "Alef Hebrew"}}>
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
                <AssignmentReturnedIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onMultipleImagesDownload('/images')}/>  
              </p>
          </div>
        : null
        }
            <section style={{ display: "flex",flexWrap: "wrap"}}> 
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
                          </section> 
            </div> 

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"  style={{opacity: "initial"}}>
        {
         Object.keys(this.state.docsArrayForCheck).length !== 0 ?

          <div id="textbox" style={{direction: "rtl", textAlign: "right",fontSize: "25px",width: "100%"}}>
              <p class="alignright" style={{	float: "right"}}>
              { Object.keys(this.state.docsArrayForCheck).length} נבחרו 
              </p>
              <p class="alignleft" style={{	float: "left"}}>
                <AssignmentReturnedIcon style={{ fontSize:"xx-large",margin: "5px",cursor: "pointer" }} onClick={() => this.onMultipleDocDownload('/docs')}/>  
              </p>
          </div>
        : null
        }

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
                </div>

          </div>
        </Modal.Body>
        <Modal.Footer style={{direction: "rtl"}}>    
          <Button onClick={this.switchShowImagesAndDoc} style={{textAlign: "right"}} disabled={this.props.isUploading} >סגירה</Button>
        </Modal.Footer>
      </Modal>

  ); 
    
}


closeWorksModal = (event) => {
//  this.setWorkAndPartStates();
  this.props.onWorkModalClose(this.props.token); // this contains all the data of card 
// this.setState({ showWorkModel: false });
};

closePartsModal = (event) => {
  //this.setWorkAndPartStates();
  this.props.onPartsModalClose(this.props.token);  
};


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
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="time">זמן תקן</label>
              <input type="number" id="time" class="form-control" value={this.state.cardWork.time.value} autocomplete="off"  aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-1"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" data-type="currency" id="gross" class="form-control" autocomplete="off" value={this.state.cardWork.gross.value} aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardWork.discount.value} autocomplete="off" aria-describedby="passwordHelpInline" 
              onChange = {(event) => this.inputNewWorkChangedHandler(event)}/>
              </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}  >
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
               value={this.state.CarNumber}
                 />
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="ticketNumber" >מספר כרטיס</label>
                 <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber} autocomplete="off" style={{marginLeft: "10px"}} 
                 class="form-control" aria-describedby="passwordHelpInline"/>
               </div>
    
               <div class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cardType" >סוג כרטיס</label>
                 <select id="cardType" class="form-control"  style={{marginLeft: "10px"}}  
                 value={this.state.cardDetails.cardType} >
                 {/* <option>{this.state.cardDetails.cardType}</option> */}
                 <option></option>
                    <option>ביטוח</option>
                      <option>פרטי</option>
                 </select>
               </div>
    
               <div class="form-group col-md-3"   style={{ marginBottom: "4px"}}  > 
               <label htmlFor="openingDate"  >תאריך פתיחה</label>
               <input  type="text" name="openingDate" className="form-control" autocomplete="off" style={{marginLeft: "10px"}}  value= {  this.state.cardDetails.openingDate } />
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
    
               <form class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="cellphone" >סלולרי</label>
                 <input type="number" id="cellphone" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.cellphone}/>
               </form>
     
               <form class="form-group col-md-3"  style={{ marginBottom: "4px"}}   > 
                 <label for="homePhone" >טלפון בית</label>
                 <input type="number" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" style={{marginLeft: "10px"}}  
                 value={this.state.customer_details.homePhone}/>
               </form>
    
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
                           <th  scope="col" style={{ textAlign: "right"}}>עבודת חוץ</th>
                       </tr>
                   </thead>
                   <tbody>


        {this.state.worksDetails.map( work =>  (

            <tr>
              <td>{work.workDescription}</td>
              <td>{work.time}</td>
              <td>{work.gross}</td>
              <td>{work.discount}</td> 
              <td>{work.net}</td>
              {work.isExteriorWork ?
                      <td>
                      <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} id="isExteriorWork"  />
                      </td>
                     :
                     <td>
                    <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} id="isExteriorWork"  />
                    </td>
              } 
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
              {/* <Button bsStyle="secondary" style={{backgroundColor: "lightsteelblue",borderColor: "black"}} onClick={this.handleAddRow} >הוספה</Button>  */}
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
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
            </div>

            <div class="form-group col-md-1" style={{ marginBottom: "4px"}}  >
              <label for="amount">כמות</label>
              <input type="number" id="amount" class="form-control" autocomplete="off" value={this.state.cardPart.amount.value} aria-describedby="passwordHelpInline" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-1"  style={{ marginBottom: "4px"}}  >
             <label for="gross">ברוטו</label>
             <input type="number" id="gross" class="form-control" value={this.state.cardPart.gross.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}   >
              <label for="discount">הנחה %</label>
              <input type="number" id="discount" class="form-control" value={this.state.cardPart.discount.value} aria-describedby="passwordHelpInline" autocomplete="off" 
               onChange = {(event) => this.inputNewPartChangedHandler(event) }/>
               </div>

            <div class="form-group col-md-1 "  style={{ marginBottom: "4px"}}  >
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
                  value={this.state.CarNumber}
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
                      {/* <option selected></option> */}
                      <option></option>
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
                       </tr>
                   </thead>
                   <tbody>

  
        {this.state.partsDetails.map( part =>  (
            <tr>
              <td>{part.partDescription}</td>
              <td>{part.amount}</td>
              <td>{part.gross}</td>
              <td>{part.discount}</td>   
              <td>{part.net}</td>
      
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

ModalCardCloseHandler = () => {

  // let invoiceClosureForm = {
  //   allWorksGross:{value: 0.00 },
  //   allWorksDiscount:{value: 0.00},
  //   allWorksDiscountAmount:{value: 0.00},
  //   allWorksNet:{value: 0.00},
  //   allExteriorWorksGross:{value: 0.00 },
  //   allExteriorWorksDiscount:{value: 0.00},
  //   allExternalWorksDiscountAmount:{value: 0.00},
  //   allExteriorWorksNet:{value: 0.00},
  //   allPartsGross:{value: 0.00},
  //   allPartsDiscount:{value: 0.00},
  //   allPartsDiscountAmount:{value:0.00},
  //   allPartsNet:{value: 0.00 },
  //   totalGross:{value: 0.00},
  //   totalDiscount:{value: 0.00},
  //   totalDiscountAmount:{value: 0.00},
  //   totalNet:{value: 0.00},
  //   amountOfVAT:{value: 0.00},
  //   totalPayment:{value:0.00}
  // }

  // this.setState({invoiceClosure: invoiceClosureForm});
  // this.setState({invoiceClosureIsCalculated: false});

  this.setState(prevState => {
      return {showCloseModal: !prevState.showCloseModal};
      });
}

renderShowCloseModal = () => { ///*** invoice closure modal! ****


  let workButtons =
      <div class="form-group" style={{marginBottom: "4px"}}>
          <div style={{textAlign:"left"}}> 
                <Button bsStyle="secondary" style={{borderColor: "black"}} onClick={this.ModalCardCloseHandler} >יציאה</Button>    </div>
      </div>;

// <Modal.Header closeButton style={{ padding: "5px", textAlign:"right", borderBottom: "2px solid black"}}   >
    return (
      
        <Modal show={this.state.showCloseModal} onHide={this.ModalCardCloseHandler}   backdrop={false}
        dialogClassName={classes.ModalDialog2}  >
          <Modal.Header closeButton   >
            <Modal.Title  >סגירת חשבון לכרטיס עבודה</Modal.Title>   
          </Modal.Header>
    
            <div className={classes.separator}></div>
          <Modal.Body  style={{  display: "block", maxHeight: "calc(100% - 120px)",overFlowY: "auto", padding:"0px",flex: "none",marginRight: "5px" ,marginBottom: "5px", marginTop: "5px" , marginLeft: "5px" }}   >
                  <div autocomplete="off">
            <div class="form-row" autocomplete="off" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
            <form  class="form-group col-md-3"  style={{ marginBottom: "1rem"}} > 
                 <label for="firstName"  >שם לקוח</label>
                 <input type="text" id="firstName" autocomplete="off" class="form-control " style={{marginLeft: "10px"}} 
                 value={this.state.customer_details.customerName} />
               </form >
    
                 <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="address">כתובת</label>
                <input type="text" id="address" class="form-control" autocomplete="off"  style={{backgroundColor: "white"}}  
                value={this.state.customer_details.address}/>
              </form> 

              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="city">עיר</label>
                <input type="text" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.city}  />
              </form>

               <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="postalCode" >מיקוד</label>
                <input type="number" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.postalCode}/>
              </form>

              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}} >
                <label for="identificationNumber" >ח.פ/ת.ז</label>
                <input ref="identificationNumber" type="text"  class="form-control " autocomplete="off" style={{backgroundColor: "white"}} aria-describedby="passwordHelpInline" 
                value={this.state.customer_details.identificationNumber} />
              </form> 

              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="homePhone">טלפון בית</label>
                <input type="number" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.homePhone}/>
              </form>


              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="cellphone">סלולרי</label>
                <input type="number" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}}  
                value={this.state.customer_details.cellphone} />
              </form>

               </div>
    
               <div className={classes.anoSeparator}></div>

            <form class="form-group " style={{ marginBottom: "1rem"}}>
               </form>
               <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto" }}> 
      
      
               <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
               <label for="cellphone">עבודות</label>
               </form>

               <div class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="allWorksGross">ברוטו</label>
                <input type="number" id="allWorksGross" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allWorksGross} />
              </div>

              <div class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                <label for="allWorksDiscount">% הנחה</label>
                <input type="number" id="allWorksDiscount" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} 
               value={this.state.invoiceClosureData.allWorksDiscount} 
               />
              </div>

         

              <div class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                <label for="allWorksDiscountAmount">סכום ההנחה</label>
                <input type="number" id="allWorksDiscountAmount" class="form-control" autocomplete="off" style={{backgroundColor: "white"}}
                value={this.state.invoiceClosureData.allWorksDiscountAmount}
             />
              </div>

              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <label for="allWorksNet">נטו</label>
                <input type="number" id="allWorksNet" class="form-control" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allWorksNet} />
              </form>
               </div>
               
               <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 
               
               <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
               <label for="cellphone">עבודות חוץ</label>
               </form>

               <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <input type="number" id="allExteriorWorksGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allExteriorWorksGross} />
              </form>

              <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                <input type="number" id="allExteriorWorksDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allExteriorWorksDiscount}/>
              </form>

              <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                <input type="number" id="allExternalWorksDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allExternalWorksDiscountAmount}/>
              </form>

              <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                <input type="number" id="allExteriorWorksNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.invoiceClosureData.allExteriorWorksNet} />
              </form>
             </div> 

             <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto"}}> 

             <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
               <label for="cellphone">חלקים</label>
               </form>
                  <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                  <input type="number" id="allPartsGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                  value={this.state.invoiceClosureData.allPartsGross} />
                  </form>

                  <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                  {/* <label for="cellphone">הנחה</label> */}
                  <input type="number" id="allPartsDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                  value={this.state.invoiceClosureData.allPartsDiscount} />
                  </form>

                  <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                  {/* <label for="cellphone">סכום ההנחה</label> */}
                  <input type="number" id="allPartsDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                  value={this.state.invoiceClosureData.allPartsDiscountAmount} />
                  </form>

                  <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                  {/* <label for="cellphone">נטו</label> */}
                  <input type="number" id="allPartsNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                  value={this.state.invoiceClosureData.allPartsNet} />
                  </form>
                  </div> 

                  <div className={classes.anoSeparator}></div>
                  
                  <div class="form-row" >
               </div>
                  <div class="form-row" style={{ direction: "rtl" ,fontSize: "11px", marginRight:"auto",paddingTop: "15px"}}> 


                  {/* <form class="form-row" >
               </form> */}
                  <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
               <label for="cellphone">סה"כ</label>
               </form>

                      <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                      <input type="number" id="totalGross" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                      value={this.state.invoiceClosureData.totalGross} />
                      </form>

                      <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                      <input type="number" id="totalDiscount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                      value={this.state.invoiceClosureData.totalDiscount}/>
                      </form>

                      <form class="form-group col-md-2" style={{ marginBottom: "1rem"}}>
                      <input type="number" id="totalDiscountAmount" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                      value={this.state.invoiceClosureData.totalDiscountAmount} />
                      </form>

                      <form class="form-group col-md-3" style={{ marginBottom: "1rem"}}>
                      <input type="number" id="totalNet" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                      value={this.state.invoiceClosureData.totalNet} />
                      </form>
                      </div> 

                     
                      <div class="form-row" style={{ fontSize: "11px", marginRight:"auto",textAlign:"right",direction: "rtl"}}> 

                      <div class="form-group col-md-3" style={{marginBottom: "2px"}}>
                      <label for="customerParticipation">השתתפות הלקוח</label>
                      <input type="number"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}}  
                      value={this.state.cardDetails.customerParticipation}/>
                    </div>

                    <div class="form-group col-md-3"  >
                    <label for="amountOfVAT" style={{textAlign: "right"}}> מע"מ 17%</label>
                    <input type="number" id="amountOfVAT" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                        value={this.state.invoiceClosureData.amountOfVAT}/>
                  </div>

                  <div class="form-group col-md-6"  >
                  <div class="form-group" style={{ margin:"0px", backgroundColor: "gray", border: "1px solid black"}}>
                          <div for="totalPayment" style={{fontWeight: "bold"}}>סה"כ לתשלום</div>
                          
                      <div  style={{ padding:"10px", backgroundColor: "gray"}}>
                              <input type="number" id="totalPayment" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}}  
                              value={this.state.invoiceClosureData.totalPayment} />
                              </div>

                      </div>         
               </div>                       
            </div> 
             </div>
            </Modal.Body>
          <Modal.Footer style={{padding: "5px", display: "block", borderTop: "3px solid #e5e5e5", backgroundColor: "silver"}} >
               {workButtons}
          </Modal.Footer>
        </Modal> 
        
        );
}

switchShowImagesAndDoc = () => {
  this.setState(prevState => {
      return {showImagesAndDoc: !prevState.showImagesAndDoc,imagesArrayForCheck:[], docsArrayForCheck: []};
      });
}

      check(data){
        if(data.cardData.licenseNumber===this.state.CarNumber && data.cardData.ticketNumber===this.state.ticketNumber){
          this.state.carDetails=data.carData;
          this.state.cardDetails=data.cardData;
          this.state.customer_details=data.customerData;
          this.state.garageReplacementVehicle=data.garageReplacementData;
          this.state.rentalCompanyReplacementVehicle=data.rentalCompanyReplacementData;
          this.state.alternateVehicleTaken=data.alternateVehicleTaken;
          this.state.closeDate=data.closeDate;
          
          this.state.invoiceClosureData = data.invoiceClosureData;
        //   console.log(this.state.invoiceClosureData);

        //   for(var i=0;i< this.state.invoiceClosureData.length;i++){
        //     console.log(this.state.invoiceClosureData[i]);
       
        // }
          
          if(data.workData !== undefined){
            this.state.worksDetails = data.workData;
          }
          if(data.partsData !== undefined){
            this.state.partsDetails = data.partsData;
          }
          console.log(this.state.invoiceClosureData);

          let part=[];
          let parts_card;
          part=data.partsData;
        
          if(part === undefined || part === null || part === ''){
          }
          else{
            parts_card=Object.values(data.partsData);
            this.state.parts=parts_card;
          }

          let work=[];
          let work_card;
          work=data.workData;
       
          if(work === undefined || work === null || work === ''){
          }
          else{
            work_card=Object.values(data.workData);
            this.state.works=work_card;
          }

      }
    }
      
      render () {
        const partsDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        const worksDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        this.state.ticketNumber=this.props.data;
        this.state.CarNumber=this.props.value;
        //let cards;
        if(this.state.userCarNumber!==""){
          this.props.cards.map( card => (
            this.check(card)
          ))
        }
        if(this.state.parts[0]===null || this.state.parts[0]=== undefined || this.state.parts[0] === ''){

        }
        else{
          partsDetails.push( {name: this.state.parts[0].partDescription} );
          partsDetails.push( {name: this.state.parts[0].amount} );
          partsDetails.push( {name: this.state.parts[0].gross+'.00'} );
          partsDetails.push( {name: this.state.parts[0].discount+'.00'}  );
          partsDetails.push( {name: this.state.parts[0].net+'.00'}  );
        }
        
      //   const partsDetailsOutput = partsDetails.map(ig => {
      //     return  <td 
      //             cardData={ig.name}>{ig.name} </td>;
      // });
      if(this.state.works[0]===null || this.state.works[0]=== undefined || this.state.works[0] === ''){
      }
      else{
      worksDetails.push( {name: this.state.works[0].workDescription} );
      worksDetails.push( {name: this.state.works[0].time} );
      worksDetails.push( {name: this.state.works[0].gross+'.00'} );
      worksDetails.push( {name: this.state.works[0].discount+'.00'}  );
      worksDetails.push( {name: this.state.works[0].net+'.00'}  );
      }
      //   const worksDetailsOutput = worksDetails.map(ig => {
      //     return  <td 
      //             cardData={ig.name}>{ig.name} </td>;
      // });

      return(

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
                value={this.state.CarNumber}/>
              </div>
              <div class="form-group col-md-2" >
                <label for="ticketNumber">מספר כרטיס</label>
                <input type="text" id="ticketNumber" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" value={this.state.cardDetails.ticketNumber}/>
              </div>
              
              <div class="form-group col-md-2" >            
                <label for="cardType">סוג כרטיס</label>
                <select id="cardType" class="form-control"  style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.cardType} >
                    <option></option>
                    <option>ביטוח</option>
                    <option>פרטי</option>
          
                </select>
              </div>

              <div className="form-group col-md-2">
              <label for="openingDate">תאריך פתיחה</label>
              <input  type="text" id="openingDate" autocomplete="off" className="form-control" 
              value= {  this.state.cardDetails.openingDate } />
            </div>



            <div class="form-group col-md-3" >
                  <label for="status">סטטוס טיפול ברכב</label>
                  <select id="status" class="form-control" value={this.state.cardDetails.status}  style={{backgroundColor: "white"}} >
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
          
                <label for="carDescription">תאור הרכב</label>
                <input type="carDescription" id="carDescription" autocomplete="off" class="form-control" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.carDescription} />
              </div>

              <div class="form-group col-md-3" >
           
                <label for="speedometer">מד אוץ</label>
                <input  type="number"  id="speedometer" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.speedometer}/>
              </div>

              <div class="form-group col-md-3" >
             
                <label for="engineCapacity">נפח מנוע</label>
                <input  type="number"  id="engineCapacity" class="form-control" autocomplete="off"
                aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.engineCapacity}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="color" >צבע</label>
                <input  type="text" id="color" class="form-control" style={{backgroundColor: "white"}} aria-describedby="passwordHelpInline" autocomplete="off" 
                value={this.state.carDetails.color}  />
              </div>

              <div class="form-group col-md-3" >
                <label for="chalkModel">דגם גיר</label>
                <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.chalkModel}/>
              </div>

              {/* <div class="form-group col-md-3" >
                <label for="lastVisit">ביקור אחרון</label>
                <input type="datetime-local"  id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" 
                value={this.state.carDetails.lastVisit} style={{backgroundColor: "white"}}/>
              </div> */}

              <div class="form-group col-md-3" >
            
                <label for="manufactureYear">שנת יצור</label>
                <select  id="manufactureYear" class="form-control"  style={{backgroundColor: "white"}}  
                 value={ this.state.carDetails.manufactureYear}  >
                      <option>{ this.state.carDetails.manufactureYear}</option>

                  {/* <option selected></option> */}
                  <option></option>
                  <option>2020</option> <option>2019</option> <option>2018</option> <option>2017</option><option>2016</option> <option>2015</option> <option>2014</option> <option>2013</option>
                  <option>2012</option> <option>2011</option> <option>2010</option> <option>2009</option> <option>2008</option> <option>2007</option> <option>2006</option> <option>2005</option>
                  <option>2004</option> <option>2003</option> <option>2002</option> <option>2001</option> <option>2000</option> <option>1999</option> <option>1998</option> <option>1997</option>
                </select>
              </div>

              <div class="form-group col-md-3" >
                <label for="deliveryDate" >תאריך מסירה</label> 
                <input type="date" id="deliveryDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.deliveryDate} />
              </div>

              <div class="form-group col-md-3" >
           
                <label for="driverName">שם הנהג</label>
                <input  type="text" id="driverName" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.driverName} />
              </div>

              <div class="form-group col-md-3" >
                <label for="code">קודן</label>
                <input  type="text" id="code" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.code}/>
              </div>

              <div class="form-group col-md-3" >
            
                <label for="carNote">הערה לרכב</label>
                <input  type="text"  id="carNote" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.carDetails.carNote}/>
              </div>


              <div className="form-group col-md-3">
              <label for="openingDate">תאריך סגירה</label>
              <input  type="text" id="openingDate" autocomplete="off" className="form-control" 
              value= {  this.state.closeDate } />
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
                <label for="customerNumber" >מספר לקוח</label>
                <input type="text" id="customerNumber" class="form-control" autocomplete="off"  style={{backgroundColor: "white"}}
                value={this.state.customer_details.customerNumber}/>
              </div> */}

              <div class="form-group col-md-3" >
                <label for="customerName">שם לקוח</label>
                <input type="text" id="customerName" class="form-control"  autocomplete="off" style={{backgroundColor: "white"}}
                value={this.state.customer_details.customerName}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="address">כתובת</label>
                <input type="text" id="address" class="form-control" autocomplete="off"  style={{backgroundColor: "white"}} 
                value={this.state.customer_details.address}
                />
              </div>

              <div class="form-group col-md-3" >
                <label for="city">עיר</label>
                <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.city}  />
              </div>
              <div class="form-group col-md-3" >
          
                <label for="postalCode" >מיקוד</label>
                <input type="number" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.postalCode}
                />
              </div>

              <form class="form-group col-md-3" >
                <label for="homePhone">טלפון בית</label>
                <input type="number" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.homePhone}/>
              </form>

              <form class="form-group col-md-3" >
                <label for="cellphone">סלולרי</label>
                <input type="number" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.cellphone} />
              </form>

              <form class="form-group col-md-3" >
                <label for="workingPhone">טלפון עבודה</label>
                <input type="number"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.workingPhone}/>
              </form>
              
              <div class="form-group col-md-3" >
                <label for="identificationNumber" >ח.פ/ת.ז</label>
                <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.customer_details.identificationNumber}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="mailAdress">כתובת מייל</label>
                <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.mailAdress}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="orderNumber">מספר הזמנה</label>
                <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.orderNumber}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="customerNote">הערה ללקוח</label>
                <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.customer_details.customerNote}/>
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
                <label for="insuranceAgent" >סוכן ביטוח</label>
                <input type="text" id="insuranceAgent" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.cardDetails.insuranceAgent} />
              </div>

              <div class="form-group col-md-3" >
                <label for="appraiser">שמאי</label>
                <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.appraiser}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="insuranceCompany">חברת ביטוח</label>
                <input type="text" id="insuranceCompany" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.insuranceCompany} />
              </div>

              <div class="form-group col-md-3" >
                <label for="customerParticipation">השתתפות הלקוח</label>
                <input type="text"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.customerParticipation}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="policyNumber">מס. פוליסה</label>
                <input type="number" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.policyNumber}  />
              </div>

              <div class="form-group col-md-3" >
                <label for="claimNumber">תביעה</label>
                <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                value={this.state.cardDetails.claimNumber}/>
              </div>

          <div class="form-group col-md-3" >
                <label for="dateOfDamage">תאריך נזק</label>
                <input type="date" id="dateOfDamage" class="form-control" aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}}  selected={this.state.startDate} 
                value={this.state.cardDetails.dateOfDamage}/>
            </div>
         </div>
         </div> 

        : null }

        </div>

        <div class="form-row" > 
        <div class="form-group col-md-6" >
        <div class="card text-white bg-dark mb-6" style={{display: "flex"}}>
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
                          <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
                          {' '}רכב חליפי נלקח?                    
                        </div>
                   :
                   <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                  <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
                  {' '}רכב חליפי נלקח?   
                </div>
                    } 
                    </div>

                    <div > 
      {this.state.alternateVehicleTaken ?
                    <div class="form-row"> 
                      {this.state.garageReplacementVehicle.isTaken ?
                        <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                          <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
                          {' '}רכב מהמוסך?                    
                      </div>
                   :
                   <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                  <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
                  {' '}רכב מהמוסך?   
                </div>
                    } 
                {this.state.rentalCompanyReplacementVehicle.isTaken ?
                        <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                          <CheckBoxIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
                          {' '}רכב מחברת השכרה?                    
                      </div>
                   :
                   <div style={{ fontSize: "14px",fontWeight: "bold"}}>
                  <CheckBoxOutlineBlankIcon style={{ fontSize:"x-large",cursor: "pointer" }} />
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
        { this.state.garageReplacementVehicle.isTaken?
          <div > 

      <div class="form-row" > 
        <div class="form-row" > 
          <div class="form-group col-md-3" >
        

                <label for="replacementVehicleNumber" >מספר רישוי</label>
                <input type="text" id="replacementVehicleNumber" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.garageReplacementVehicle.replacementVehicleNumber}/>
              </div>

              <div class="form-group col-md-3" >
                <label for="typeReplacementVehicle" >סוג רכב</label>
                <input type="text" id="typeReplacementVehicle" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.garageReplacementVehicle.typeReplacementVehicle}/>
              </div>

              <div class="form-group col-md-3" >
           
                <label for="fuelBefore" >דלק לפני</label>
                <input type="text" id="fuelBefore" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.garageReplacementVehicle.fuelBefore}/>
              </div>

              <div class="form-group col-md-3" >
           
                <label for="fuelAfter" >דלק אחרי</label>
                <input type="text" id="fuelAfter" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.garageReplacementVehicle.fuelAfter}/>
              </div>
              </div>

              <div class="form-group col-md-6" >
            
                      <label for="dateOfDelivery" >תאריך מסירה</label> 
                      <input type="date" id="dateOfDelivery" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}}  
                      value={this.state.garageReplacementVehicle.dateOfDelivery}/>
                    </div>
                    <div class="form-group col-md-6" >
              
                    <label for="returnDate" >תאריך החזרה</label> 
                    <input type="date" id="returnDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
                    value={this.state.garageReplacementVehicle.returnDate}/>
                  </div>
                  </div>
                </div>
                :null}

  {this.state.rentalCompanyReplacementVehicle.isTaken?
          <div style={{width: "100%"}} > 
              <div class="form-row" > 
              <div class="form-group col-md-6" >
                <label for="nameRentalCompany" >שם חברת ההשכרה</label>
                <input type="text" id="nameRentalCompany" class="form-control " autocomplete="off" style={{backgroundColor: "white"}}  aria-describedby="passwordHelpInline" 
                value={this.state.rentalCompanyReplacementVehicle.nameRentalCompany} />
              </div>
              </div>
              <div class="form-row" > 

  <div class="form-group col-md-6" >
          <label for="dateOfDelivery" >תאריך מסירה</label> 
          <input type="date" id="dateOfDelivery" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}}  
          value={this.state.rentalCompanyReplacementVehicle.dateOfDelivery} />
        </div>
        <div class="form-group col-md-6" >
      
          <label for="returnDate" >תאריך החזרה</label> 
          <input type="date" id="returnDate" class="form-control" autocomplete="off" aria-describedby="passwordHelpInline" style={{backgroundColor: "white"}} 
          value={this.state.rentalCompanyReplacementVehicle.returnDate}/>
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
           
                <label for="customerRequests" >תלונות/בקשות הלקוח</label>
                <Input type="textarea" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" autocomplete="off" style={{backgroundColor: "white"}} 
                        value={this.state.cardDetails.customerRequests}/>
              </div>
            </div> 
             : null }   
        </div>

          </div>
          </div>

      <form class="form-group" > 
      <span>    
   <Button bsStyle="secondary" style={{borderColor: "black"}}   onClick= {( event ) => this.openWorkModal( event, 'workData')}  > עבודות </Button> 
             
       {this.props.showWorkModel?
              this.renderWorksModal( 'workData')
          :null} 
          {' '}
 </span>


    <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick= {( event ) => this.openPartModal( event, 'PartsData')}  >חלקים</Button> 
      {this.props.showPartModel?
              this.renderPartsModal( 'partsData')
          :null}  
          {' '}

          {this.state.showCloseModal?
                    this.renderShowCloseModal()
            :null} 
      <Button bsStyle="secondary" style={{borderColor: "black"}}    onClick={this.switchShowImagesAndDoc}> תמונות ומסמכים</Button> 
      {' '}
      <Button bsStyle="secondary" style={{borderColor: "black"}}    onClick={this.ModalCardCloseHandler}> חשבון סופי</Button> 
      { this.state.showImagesAndDoc ? this.renderImagesAndDocModal() :null }
      </form>
    </form>
      );
     
        }

}
const mapStateToProps = state => { // here we get the state and return a javascript object
        return {
            cards: state.card.closeCards, // we get my cards from state. we state cards we are reaching out to the card reducer and with cards we then reach out to cards property in the state of my reducer 
            loading: state.card.loading,
            token: state.auth.token,
            userId: state.auth.userId,
            showWorkModel: state.card.showWorkModel,
            branchNumber: state.auth.branchNumber,
            showPartModel: state.card.showPartModel,
            workData: state.card.workData,
            partsData: state.card.partsData,
            imagesForCard: state.storage.fetchedImages,
            docsForCard: state.storage.fetchedDocs,
            UserKey: state.auth.userKey,
        };
      };
      
const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
        return {
          onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCloseCards(token, userId,branchNumber) ),
          onWorkModalOpening: () =>  dispatch(actions.workModalOpening()),   
          onWorkModalClose: (token ) =>  dispatch(actions.workModalClose(token)),
          onPartModalOpening: () =>  dispatch(actions.partModalOpening()),   
          onPartsModalClose: (token ) =>  dispatch(actions.partModalClose(token)),
          onDownloadDoc:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.downloadDoc(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
          onDownloadImage:(userId,token,branchNumber,cardKey,ticketNumber, node,name) => dispatch( actions.downloadImage(userId,token,branchNumber,cardKey,ticketNumber, node, name)),
          onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey))
        };
      };
      
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(showData,axios));