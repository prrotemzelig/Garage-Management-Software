import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label,Input} from 'reactstrap';

const Example = (props) => {
    //style={{direction: "rtl"}}
  return (
 
    <div style={{direction: "rtl" ,color: "gray" }}> 
    
    
    <div class="bigBox" style={{ width: "100px",display: "inline"}}>
    <div class="p-4 mb-4 bg-dark text-white" >  </div>

    <form class="form-inline" >

      <div class="allInput" > 
        <label for="inputLicenseNumber" style={{ display: "inline"}} >מספר רישוי</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>
        
        <div class="allInput" > 
        <label for="inputLicenseNumber" style={{ display: "inline", width:"30px"}}>מספר כרטיס</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>
        
        <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ display: "inline"}}>סוג כרטיס</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>
        
        <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ display: "inline"}}>תאריך פתיחה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>

    </form>
    </div>
    <p></p>
    <p></p>

    <div class="p-3 mb-2 bg-dark text-white" >עדכון פרטי רכב</div>
    <p></p>
    <p></p>

   <div class="bigBox" style={{ width: "100px",display: "flex" }}>
      <form class="form" >

      <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ width: "100px",display: "inline"}}>יצרן</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>

      <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ width: "100px"}}>דגם</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>

      </form>        
        <form class="form-inline" >

        <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ width: "100px"}}>תיאור רכב</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>

        <div class="allInput" style={{color: "gray" }}> 

        <label for="inputLicenseNumber" style={{ width: "100px"}}>מד אוץ</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>
        
        <div class="allInput" style={{color: "gray" }}> 
        <label for="inputLicenseNumber" style={{ width: "100px"}}>ביקור אחרון</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/></div>
    </form>
    <p></p>
    <form class="form-inline">

        <label for="inputLicenseNumber" style={{ width: "100px"}}>מספר שלדה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>מספר מנוע</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>מה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>צבע</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>

      <label for="inputState" style={{ width: "100px"}}>  שנת ייצור</label>
      <select id="inputState" class="form-control">
        <option selected>2020</option>
        <option>2019</option>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
        <option>2015</option>
        <option>2014</option>

      </select>
        
      </form>

    <p></p>

    <form class="form-inline">
      
        <label for="inputLicenseNumber" style={{ width: "100px"}}>שם הנהג</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>אזעקה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>הערה לרכב</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>תאריך מסירה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        </form>
    <p></p>
    <p></p>


    </div>

    <div class="p-3 mb-2 bg-dark text-white" >עדכון פרטי לקוח</div>
    <p></p>
    <p></p>

   
      <form class="form-inline">
        <label for="inputLicenseNumber" style={{ width: "100px"}}>מספר לקוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>שם לקוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>כתובת</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>טלפון</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>סלולרי</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
    </form>
    <p></p>
    <form class="form-inline">

        <label for="inputLicenseNumber" style={{ width: "100px"}}>סלולרי נוסף</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>ח.פ/ת.ז</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>צבע</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>שנת יצור</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>תאריך מסירה</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>הערות לקוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        </form>

        <p></p>
    <form class="form-inline"></form>
    <p></p>
    <p></p>

    <div class="p-3 mb-2 bg-dark text-white" >נתוני כרטיס פחחות</div>
    <p></p>
    <p></p>

   
      <form class="form-inline">
        <label for="inputLicenseNumber" style={{ width: "100px"}}>סוכן ביטוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>שמאי</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>חברת ביטוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>

        <label for="inputState">  סוג תיקון</label>
      <select id="inputState" class="form-control">
        <option selected>ביטוח</option>
        <option>פרטי</option>
     
      </select>
    </form>
    <p></p>
    <p></p>

    <div class="p-3 mb-2 bg-dark text-white" >תלונות/בקשות הלקוח</div>
    <p></p>
    <p></p>

      <form class="form-inline">
        <label for="inputLicenseNumber" style={{ width: "100px"}}>סוכן ביטוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>שמאי</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>
        <label for="inputLicenseNumber" style={{ width: "100px"}}>חברת ביטוח</label>
        <input type="text" id="inputLicenseNumber" class="form-control mx-sm-3" aria-describedby="passwordHelpInline"/>

    </form>
    <p></p>
    <p></p>
    <p></p>
    <p></p>

    <span><a class="btn btn-secondary btn-lg" href="#" role="button">עבודות</a>  </span>
    <span><a class="btn btn-secondary btn-lg" href="#" role="button">חלקים</a>   </span>

    <span><a class="btn btn-secondary btn-lg" href="#" role="button">הדפסת כרטיס</a>   </span>
    <span><a class="btn btn-secondary btn-lg" href="#" role="button">סגירת כרטיס</a>   </span>
    <span><a class="btn btn-secondary btn-lg" href="#" role="button" >שמירה ויציאה</a>   </span>


    </div>


  );
}

export default Example;




  