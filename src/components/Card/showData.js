import React, { Component } from 'react'
// import Button2 from '../UI/Button/Button';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
// import classes from '../../components/Card/Card.module.css';
// import Card from './CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { Modal } from 'react-bootstrap';


class showData extends Component   {
    constructor(props){
        super(props);
        this.state = {
        cardDetails:{},
        carDetails:{},
        customer_details:{},
        CarNumber:'',
        parts:[],
        works:[],
        }
      }
  
    componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber);
      
      }
      check(data){
        if(data.cardData.licenseNumber===this.state.CarNumber){
          this.state.carDetails=data.carData;
          this.state.cardDetails=data.cardData;
          this.state.customer_details=data.customerData;

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
        
        this.state.CarNumber=this.props.value;
        let cards;
        if(this.state.userCarNumber!==""){
          cards = this.props.cards.map( card => (
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
        
        const partsDetailsOutput = partsDetails.map(ig => {
          // here we return some JSX
          //we can use in ig.name as a unique key because it is unique here
          return  <td 
              
                  cardData={ig.name}>{ig.name} </td>;
      });
      if(this.state.works[0]===null || this.state.works[0]=== undefined || this.state.works[0] === ''){
      }
      else{
      worksDetails.push( {name: this.state.works[0].workDescription} );
      worksDetails.push( {name: this.state.works[0].time} );
      worksDetails.push( {name: this.state.works[0].gross+'.00'} );
      worksDetails.push( {name: this.state.works[0].discount+'.00'}  );
      worksDetails.push( {name: this.state.works[0].net+'.00'}  );
      }
        const worksDetailsOutput = worksDetails.map(ig => {
          // here we return some JSX
          //we can use in ig.name as a unique key because it is unique here
          return  <td 
              
                  cardData={ig.name}>{ig.name} </td>;
      });
          return (   
            <form onSubmit={this.cardUpdateHandler} class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >
      
            <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
              <div class="card-header" style={{fontSize: "14px"}}>פרטים</div>
              
              <div class="card-body text-dark bg-white" >
                <div class="form-row" > 
                  <div class="form-group col-md-3" >
                    <label for="licenseNumber" >מספר רישוי</label>
                    <input type="text"  id="licenseNumber" class="form-control" aria-describedby="passwordHelpInline" 
                    value={this.state.CarNumber}/>
                  </div>
      
                  <div class="form-group col-md-3" >
                    <label for="ticketNumber">מספר כרטיס</label>
                    <input type="text" id="ticketNumber" value={this.state.cardDetails.ticketNumber}
                    class="form-control" aria-describedby="passwordHelpInline"/>
                  </div>
      
                  <div class="form-group col-md-3" >
                    <label for="cardType">סוג כרטיס</label>
                    <select id="inputState" class="form-control">
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
                    <label for="carDescription">תאור הרכב</label>
                    <input type="carDescription" id="carDescription" class="form-control" aria-describedby="passwordHelpInline" 
                    value={this.state.carDetails.carDescription}
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
            <Modal.Body style={{padding: "0px",flex: "auto"}} scrollable={true}>
            <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
              <div class="card-header" style={{fontSize: "14px"}}>עבודות שהתבצעו:</div>  
            </div>
            <div class="table-wrapper" style={{direction: "rtl"}}>
               <table class="table table-bordered" style={{marginBottom: "1px"}} >
                   <thead >
                       <tr >
                           <th  scope="col" style={{ textAlign: "right"}}>תיאור העבודה שהתבצעה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>זמן</th>
                           <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                       </tr>
                   </thead>
                   <tbody >
                    {worksDetailsOutput}
                </tbody>
               </table>
           </div>
          
          </Modal.Body>
          <Modal.Body style={{padding: "0px",flex: "auto"}} scrollable={true}>
            <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
              <div class="card-header" style={{fontSize: "14px"}}>חלקים שהוחלפו:</div>  
            </div>
            <div class="table-wrapper" style={{direction: "rtl"}}>
               <table class="table table-bordered" style={{marginBottom: "1px"}} >
                   <thead >
                       <tr >
                           <th  scope="col" style={{ textAlign: "right"}}> החלקים שהוחלפו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>כמות</th>
                           <th  scope="col" style={{ textAlign: "right"}}>ברוטו</th>
                           <th  scope="col" style={{ textAlign: "right"}}>הנחה</th>
                           <th  scope="col" style={{ textAlign: "right"}}>נטו</th>
                       </tr>
                   </thead>
                   <tbody >
                    {partsDetailsOutput}
                </tbody>
               </table>
           </div>
          
          </Modal.Body>
        </form>
          );
        }

}
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
          onFetchCards: (token,userId,branchNumber) => dispatch( actions.fetchCards(token, userId,branchNumber) )
        };
      };
      
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(showData,axios));