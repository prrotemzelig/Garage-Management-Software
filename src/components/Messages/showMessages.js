
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
          let notification3=notification[i].description;
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader style={{ fontSize: "13px",    padding: "10px 16px"}}>
              <div  class="form-row" style={{width: "100%"}}>
                <div style={{marginLeft:"auto"}} >
                {notification1}
                </div>
                <div  >
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)}
                  style={{cursor: "pointer",maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",borderRadius: "4px",padding: "0px 1px 1px 1px"}}                
              ><DeleteOutlinedIcon/></Button>{' '}
                </div>

              </div>
              </CardHeader>
              <CardBody style={{ fontSize: "11px", padding: "8px",fontWeight: "bold"}}>{notification3}</CardBody>
              <CardBody style={{ fontSize: "11px", padding: "8px"}}>{notification2}</CardBody>

            </Card>;
          Toast.push(message);
        }
        if(notification[i].type==="closeCard"){
          id=notification[i].id;
          let notification1=" נסגר כרטיס עבודה: "+notification[i].description;
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader style={{ fontSize: "12px",    padding: "10px 16px"}}>
              <div  class="form-row" style={{width: "100%"}}>
              <div style={{marginLeft:"auto"}} >
                {notification1}
                </div>
                <div>
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)}
                  style={{cursor: "pointer",maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",borderRadius: "4px",padding: "0px 1px 1px 1px"}}                
              ><DeleteOutlinedIcon/></Button>{' '}  
              </div> 
              </div>
              </CardHeader>
              <CardBody style={{ fontSize: "11px", padding: "8px"}}>{notification2}</CardBody>
            </Card>;
          Toast.push(message);
        }
        if(notification[i].type==="openCard"){
          id=notification[i].id;
          let notification1="נפתח כרטיס עבודה: "+notification[i].description;
          let notification2=" על ידי: "+notification[i].openedBy;
          message =
            <Card>
              <CardHeader style={{ fontSize: "12px",    padding: "10px 16px"}}>
              <div  class="form-row" style={{width: "100%"}}>
              <div style={{marginLeft:"auto"}} >

                {notification1}

                </div>
                <div>
                <Button bsStyle="secondary" onClick={(event)=>this.deleteNotification(event,id)}
                  style={{cursor: "pointer" ,maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px',fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",borderRadius: "4px",padding: "0px 1px 1px 1px"}}                
              ><DeleteOutlinedIcon/></Button>{' '}  
              </div>
              </div>           
               </CardHeader>
              <CardBody style={{ fontSize: "11px", padding: "8px"}}>{notification2}</CardBody>
            </Card>;
          Toast.push(message);
        }
    }
    return Toast;
} 
isMobile() {
  let check = false;
  ((a => {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = true;
  }))(navigator.userAgent || navigator.vendor);
  return check;
 }

  render() {
    let notification=this.notify();
    let is_mobile=this.isMobile();

    return (
      <div>
      <div className={!is_mobile ? classes.showMessages : classes.showMessagesPhone}>  
        <div className={this.state.classes}>
          <ul className={classes.dropdownMenu} style={{cursor: "auto"}}>
            <div class="form-row" > 
                <div class="form-group col" style={{borderBottom: "1px solid black"}}>
                  <div className={classes.headerTitle} >הודעות</div>
                </div>
                <div class="form-group col" style={{borderBottom: "1px solid black"}}>
                  <div style={{cursor: "pointer"}} className={classes.headerTitle} onClick={this.deleteAllNotification}>מחק הכל</div>
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