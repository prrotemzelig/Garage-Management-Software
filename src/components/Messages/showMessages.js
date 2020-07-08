
import React, { Component } from "react";
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';
import { Button } from 'react-bootstrap';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Card, CardHeader, CardBody } from 'react-simple-card'; //CardFooter
import classes from './showMessages.module.css';


class showMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show-dropdown"
    };
  }
  handleClick = () => {
    if (this.state.classes === "dropdown show-dropdown") {
      this.setState({ classes: "dropdown show-dropdown show" });
    } else {
      this.setState({ classes: "dropdown show-dropdown" });
    }
  };
  componentDidMount() { 
    this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchnumber,this.props.UserKey); 
}
deleteAllNotification = () =>{
  let notification=this.props.notification;
  for(var i=0;i<notification.length;i++){
      console.log(this.props.branchnumber+" "+this.props.UserKey+" "+notification[i].id+" "+this.props.userId);
      this.props.onNotificationDelete(this.props.token,this.props.branchnumber,this.props.UserKey,notification[i].id,this.props.userId);
  }
}
deleteNotification(e,data){
  this.props.onNotificationDelete(this.props.token,this.props.branchnumber,this.props.UserKey,data,this.props.userId);
}
  notify = () =>{
    let notification=this.props.notification;
    let Toast=[];
    let message=[];
    for(var i=0;i<notification.length;i++){
      let id='';
        if(notification[i].type==="task"){
          id=notification[i].id;
          let notification1=" נוספה משימה חדשה: ";
          let notification3="'"+notification[i].description+"'";
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader style={{ fontSize: "13px"}}>
                {notification1}
                <div class="form-group col-md-4">
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)}
                  style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",borderRadius: "4px",padding: "0px 1px 1px 1px",position: "absolute",bottom:"-23px"}}                
              ><DeleteOutlinedIcon/></Button>{' '}
              </div>
              </CardHeader>
              <CardBody style={{ fontSize: "11px"}}>{notification3+notification2}</CardBody>
            </Card>;
          Toast.push(message);
        }
        if(notification[i].type==="closeCard"){
          id=notification[i].id;
          let notification1=" נסגר כרטיס עבודה "+notification[i].description;
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader >
                {notification1}
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)} ><DeleteOutlinedIcon/></Button>{' '}
              </CardHeader>
              <CardBody style={{ fontSize: "11px"}}>{notification2}</CardBody>
            </Card>;
          Toast.push(message);
        }
        if(notification[i].type==="openCard"){
          id=notification[i].id;
          let notification1=" נפתח כרטיס עבודה חדש "+notification[i].description;
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader >
                {notification1}
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)} ><DeleteOutlinedIcon/></Button>{' '}
              </CardHeader>
              <CardBody style={{ fontSize: "11px"}}>{notification2}</CardBody>
            </Card>;
          Toast.push(message);
        }
    }
    return Toast;
} 


  render() {
    let notification=this.notify();
   
    return (
      <div>
      <div className={classes.showMessages}>  
        <div className={this.state.classes}>
          <ul className={classes.dropdownMenu}>
            <div class="form-row" > 
                <div class="form-group col">
                  <div className={classes.headerTitle}>הודעות</div>
                </div>
                <div class="form-group col">
                  <div className={classes.headerTitle} onClick={this.deleteAllNotification}>מחק הכל</div>
                </div>
            </div>
            <div className={classes.adjustmentsLine} style={{overflowX : 'auto',fontSize: '14px'}}>
              {notification}
            </div>
          </ul>
        </div>
      </div>
      </div>
    );
  }
}


const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      token: state.auth.token,
      userId: state.auth.userId,
      branchnumber: state.auth.branchNumber,
      UserKey: state.auth.userKey,
      backgroundColor: state.auth.backgroundColor,
      profileImage: state.auth.profileImage,
      sidebarBackgroundColor: state.auth.sidebarBackgroundColor,
      notification: state.notification.notification,

     

  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onUpdateSettingUser: (updateData,field,token,branchNumber,userKey,userId) => dispatch( actions.updateSettingUser(updateData,field,token,branchNumber,userKey,userId) ),
    onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey)),
    onNotificationDelete:(token,branchNumber,userKey,notificationKey ,userId)=>dispatch(actions.notificationDelete(token,branchNumber,userKey,notificationKey ,userId)),
  };
};


export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(showMessages,axios));

//export default FixedPlugin;



/* <div className={classes.buttonContainer}>
<Button
  href="https://www.creative-tim.com/product/black-dashboard-react"
  color="primary"
  block
  className="btn-round"
>
  Download Now
</Button>
<Button
  color="default"
  block
  className={classes.btnRound}
  outline
  href="https://demos.creative-tim.com/black-dashboard-react/#/documentation/tutorial"
>
  Documentation
</Button>
</div>
<div className={classes.headerTitle}>Want more components?</div>
<div className={classes.buttonContainer}>
<Button
  href="https://www.creative-tim.com/product/black-dashboard-pro-react"
  className={classes.btnRound}
  disabled
  block
  color="danger"
>
  Get pro version
</Button>
</div> */