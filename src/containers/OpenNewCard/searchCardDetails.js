
import React from 'react';
import Card from '../../components/Card/CardSearch';

var temp=0;

const cardSearch = ( props ) => {
    const number=props.data;
    if(props.cardData.licenseNumber===number){
        const cardDetails = []; // this is a code to transform each of my open card into an array of all the open cards.
        temp=1;
        for ( let fieldName in props.cardData ) {
            cardDetails.push( //the object we are pushing into this array
            {
                name: fieldName, //store the name of the field 
                data: props.cardData[fieldName] // store the value of the field ( what the user entered)
            }
            );
        }
        //after we pushed into the cards array, 
    //we can map my cards to text basically in the return ->  <p> {cardsDetailsOutput}</p>
    const cardsDetailsOutput = cardDetails.map(ig => {
        // here we return some JSX
        //we can use in ig.name as a unique key because it is unique here
        return <span 
            style={{
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px',
                color: 'black'
                }}
            key={ig.name}>{ig.name} ({ig.data})</span>;
    });

    
    return (
        <div className={classes.Card} >
            <p style={{color:'black'}}>פרטי הרכב </p>
            <p> {cardsDetailsOutput}</p>
        </div>
    );
    }
    else{
        return (
            <div></div>
        );
    }
};
export default cardSearch;


/**
 *         <div class="form-group col-md-3" >
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
                  <input type="carDescription" id="carDescription" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="speedometer">מד אוץ</label>
                  <input  type="text"  id="speedometer" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
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
                  <input  type="text"  id="engineCapacity" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="color" >צבע</label>
                  <input  type="text" id="color" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="chalkModel">דגם גיר</label>
                  <input  type="text" id="chalkModel" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="lastVisit">ביקור אחרון</label>
                  <input type="text" id="lastVisit" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="manufactureYear">שנת יצור</label>
                  <select  id="manufactureYear" class="form-control" onChange={(event) => this.inputCarChangedHandler(event)}>
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
                  <input type="text" id="deliveryDate" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="driverName">שם הנהג</label>
                  <input  type="text" id="driverName" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="code">קודן</label>
                  <input  type="text" id="code" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="carNote">הערה לרכב</label>
                  <input  type="text"  id="carNote" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCarChangedHandler(event)}/>
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
                  <input type="text" id="address" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="city">עיר</label>
                  <input type="text"  id="city" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                <div class="form-group col-md-3" >
                  <label for="postalCode" >מיקוד</label>
                  <input type="text" id="postalCode" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="homePhone">טלפון בית</label>
                  <input type="text" id="homePhone" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="cellphone">סלולרי</label>
                  <input type="text" id="cellphone" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="workingPhone">טלפון עבודה</label>
                  <input type="text"  id="workingPhone" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
                
                <div class="form-group col-md-3" >
                  <label for="identificationNumber" >ח.פ/ת.ז</label>
                  <input ref="identificationNumber" type="text" id="identificationNumber" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="mailAdress">כתובת מייל</label>
                  <input type="text" id="mailAdress" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="orderNumber">מספר הזמנה</label>
                  <input type="text" id="orderNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="customerNote">הערה ללקוח</label>
                  <input type="text"  id="customerNote" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputCusChangedHandler(event)}/>
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
                  <input type="text" id="insuranceAgent" class="form-control " aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="appraiser">שמאי</label>
                  <input type="text" id="appraiser" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="insuranceCompany">חברת ביטוח</label>
                  <input type="text" id="insuranceCompany" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="customerParticipation">השתתפות הלקוח</label>
                  <input type="text"  id="customerParticipation" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="policyNumber">מס. פוליסה</label>
                  <input type="text" id="policyNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="claimNumber">תביעה</label>
                  <input type="text"  id="claimNumber" class="form-control" aria-describedby="passwordHelpInline" onChange={(event) => this.inputChangedHandler(event)}/>
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
                  <input type="text" id="customerRequests" class="form-control " aria-describedby="passwordHelpInline" onChange={(date) => this.inputChangedHandler(date)}/>
                </div>
 */