import React, { Component } from 'react';
import classes from './openNew.module.css';
import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import "react-datepicker/dist/react-datepicker.css";



const getDateTime = () => {
  let tempDate = new Date();
  let date = tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds() +' '+ tempDate.getDate() + '.' + (tempDate.getMonth()+1) + '.' + tempDate.getFullYear(); 
  return date;
}

class openNew extends Component  {
  state = {
    startDate: new Date(),
        myDate: new Date()
  };

  constructor(props){
    super(props);
         this.state = {
              reportStartDate: getDateTime()
         }
 }

 handleChange = date => {
  this.setState({
    startDate: date
  });
};

onChange = date => this.setState({ date })


  render () {

  return (

    

      <form class="form-group" style={{direction: "rtl",   fontSize: "11px"}} >
        <form class="form-group" > 
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>פרטים</div>
            
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="inputCity" >מספר רישוי</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">מספר כרטיס</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">סוג כרטיס</label>
                  <select id="inputState" class="form-control">
                    <option selected>ביטוח</option>
                    <option>פרטי</option>
                  </select>
                </div>
  
                <div className="form-group col-md-3">
                <label htmlFor="reportStartDate">תאריך פתיחה</label>
                <input  type="text" name="reportStartDate" className="form-control" placeholder="Report Start Date" value={this.state.reportStartDate} onChange={e => this.change(e)} />
              </div>

              </div> 
            </div>
    
          </div>
  
        </form>

        <form class="form-group" > 
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי רכב</div>
            
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 

                <div class="form-group col-md-3" >
                  <label for="inputCity" >יצרן</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">דגם</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">תאור הרכב</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">מד אוץ</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity" >שעות מנוע</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">מספר שלדה</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">מספר מנוע</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">נפח מנוע</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="inputCity" >צבע</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">דגם גיר</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">ביקור אחרון</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">שנת יצור</label>
                  <select id="inputState" class="form-control">
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
                  <label for="inputCity" >תאריך מסירה</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">שם הנהג</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">קודן</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">הערה לרכב</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>

              </div> 
            </div>
    
          </div>
  
        </form>

        <form class="form-group" > 
  
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>עדכון פרטי לקוח</div>
            
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="inputCity" >מספר לקוח</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">שם לקוח</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">כתובת</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">עיר</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
                <div class="form-group col-md-3" >
                  <label for="inputCity" >מיקוד</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">טלפון בית</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">סלולרי</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">טלפון עבודה</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
                
                <div class="form-group col-md-3" >
                  <label for="inputCity" >ח.פ/ת.ז</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">כתובת מייל</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">מספר הזמנה</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">הערה ללקוח</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>

              </div> 
            </div>
    
          </div>
  
        </form>

        <form class="form-group" > 
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>נתוני כרטיס פחחות</div>
            
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="inputCity" >סוכן ביטוח</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">שמאי</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">חברת ביטוח</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">השתתפות הלקוח</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="inputCity">מס. פוליסה</label>
                  <input type="text" id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>
  
                <div class="form-group col-md-3" >
                  <label for="inputCity">תביעה</label>
                  <input type="text"  id="inputCity" class="form-control" aria-describedby="passwordHelpInline"/>
                </div>

                <div class="form-group col-md-3" >
                  <label for="inputCity">תאריך נזק</label>
                  <DatePicker  style={{input: "input"}} class="form-control" aria-describedby="passwordHelpInline" selected={this.state.startDate} onChange={this.handleChange}/>
                </div>
              </div> 
            </div>
    
          </div>
  
        </form>


        <form class="form-group" > 
          <div class="card text-white bg-dark mb-3" style={{display: "flex"}}>
            <div class="card-header" style={{fontSize: "14px"}}>תלונות/בקשות הלקוח</div>  
            <div class="card-body text-dark bg-white" >
              <div class="form-row" > 
                <div class="form-group col-md-3" >
                  <label for="inputCity" >תלונות/בקשות הלקוח</label>
                  <input type="text" id="inputCity" class="form-control " aria-describedby="passwordHelpInline"/>
                </div>
              </div> 
            </div>   
          </div>  
        </form>

        <form class="form-group" > 
          <span><a class="btn btn-secondary btn-lg" href="#" role="button">עבודות</a>  </span>
          <span><a class="btn btn-secondary btn-lg" href="#" role="button">חלקים</a>   </span>
          <span><a class="btn btn-secondary btn-lg" href="#" role="button">הדפסת כרטיס</a>   </span>
          <span><a class="btn btn-secondary btn-lg" href="#" role="button">סגירת כרטיס</a>   </span>
          <span><a class="btn btn-secondary btn-lg" style={{direction: "ltr"}} href="#" role="button" >שמירה ויציאה</a>   </span>
        </form>

      </form>

  );
}
}
export default openNew;



  