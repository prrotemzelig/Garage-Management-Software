
  
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
                <td>{row.workDescription}</td>
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