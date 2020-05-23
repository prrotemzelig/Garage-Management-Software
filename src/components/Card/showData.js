import Button2 from '../UI/Button/Button';
import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import classes from '../../components/Card/Card.module.css';
import Card from './CardSearch';
import axios from '../../axios-cards';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class showData extends React.Component   {
    constructor(props){
        super(props);
        this.state = {
        cardDetails:{},
        carDetails:{},
        customer_details:{},
        CarNumber:''
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
        }
      }
      
      componentDidMount() { // we want to fetch all the cards. so for doing that, I need to implement componentDidMount
        this.props.onFetchCards(this.props.token, this.props.userId, this.props.branchNumber); 
      }
      
      render () {
        this.state.CarNumber=this.props.value;
        let cards;
        if(this.state.userCarNumber!==""){
          cards = this.props.cards.map( card => (
            this.check(card)
          ))
        }
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