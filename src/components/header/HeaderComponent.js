//import React from 'react';
import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; //checkFormatNumbers

import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
// import IconSearch from '../../assets/icon-search';
import IconBellNew from '../../assets/icon-bell-new';
import { connect } from 'react-redux';
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.js";
import SettingsIcon from '@material-ui/icons/Settings';
// import { StreamApp, NotificationDropdown,FlatFeed } from 'react-activity-feed';
import { Modal ,Button } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Badge from '@material-ui/core/Badge';
import ShowMessages from "../../components/Messages/showMessages.js";
// import GooglePicker from 'react-google-picker';








const styles = StyleSheet.create({
    avatar: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 14,
        border: '1px solid #DFE0EB',
    },
    container: {
        height: 40,
        width: '98%',        
        marginBottom: '20px',
        '@media (max-width: 999px)': {
            width: '95%'
        }
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
        marginLeft:10,
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        textAlign: 'right',
        letterSpacing: 0.2,
        '@media (max-width: 768px)': {
            display: 'none'
        }
    },
    nameDark: {
        color: 'white'
    },
    separator: {
        borderLeft: '1px solid #DFE0EB',
        marginLeft: 32,
        marginRight: 32,
        height: 32,
        width: 2,
        '@media (max-width: 768px)': {
            marginLeft: 12,
            marginRight: 12
        }
    },
    title: {
        alignSelf: 'center',
        fontFamily: 'Alef Hebrew',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: '30px',
        letterSpacing: 0.3,
      //  position: 'fixed',
        '@media (max-width: 768px)': {
            marginRight: 25, // marginLeft: 36
            //position: 'fixed'

        },
        '@media (max-width: 468px)': {
            fontSize: 20,
            //position: 'fixed'
        },
        '@media (min-width: 769px)': {
            marginRight: 25, // marginLeft: 36

            // position: 'fixed'

        }
    },
    titleDark: {
        color: 'white'
    },
    iconStyles: {
        cursor: 'pointer',
        marginLeft: 25,
        '@media (max-width: 768px)': {
            marginLeft: 12
        }
    }
});

//function HeaderComponent(props) {
class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          backgroundcolor: "blue",
          branchChangeForMaster: null,
          modal: false,
          notificationLength: 0,
          fileId:[],
          sidebarOpened:
            document.documentElement.className.indexOf("nav-open") !== -1
        };
     }
    componentDidMount() { 
        this.props.onFetchUsers(this.props.token, this.props.userid); //, this.props.branchNumber //, this.allBranchsNumber
        this.props.onFetchNotification(this.props.token, this.props.userid, this.props.branchnumber,this.props.userkey); 
    }

    componentDidUpdate(prevProps, prevState){
        this.state.notificationLength=0;
        for(var i=0;i<this.props.notification.length;i++){
            if(this.props.notification[i].show=="false"){
                this.state.notificationLength+=1;
            }
        }
    }

    modalOpen() {
        this.setState({ modal: true });
    }
        
    modalClose() {
        this.setState({modal: false});
    }
    onSettingClick = () =>  {
        if(!this.props.showsettingmodel){
        this.props.onSettingOpening(); // this contains all the data of card 
        }
        else{
            this.props.onSettingClose(); // this contains all the data of card 
        }
    }  
    onNotificationClick = () =>  {
        this.setState({notificationLength: 0});
        for(var i=0;i<this.props.notification.length;i++){
            if(this.props.notification[i].show==="false"){
                const notificationData={
                    type: this.props.notification[i].type,
                    description: this.props.notification[i].description,
                    openedBy: this.props.notification[i].openedBy,
                    show: 'true'
                }
                this.props.onNotificationUpdate(notificationData, this.props.token, this.props.branchnumber, this.props.userkey,this.props.userid,this.props.notification[i].id); // this contains all the data of card 
            }
        }

        if(!this.props.shownotificationmodel){
            this.setState({notificationLength: 0});
            this.props.onNotificationOpening(); 
        }
        else{
            this.props.onNotificationClose(); 
        }
        document.getElementById("header").reset(); 
        this.forceUpdate();

        this.setState(prevState => {
            return {notificationLength: 0};
            });
    } 



inputCarChangedHandler = (event) => { 
        event.preventDefault(); 
        const updatedCardForm = updateObject(this.state, { 
            [event.target.id]: event.target.value 
        });
        this.setState({state: updatedCardForm}); 
        this.setState(prevState => {
            return {branchChangeForMaster: this.state.branchChangeForMaster };
            });
  }
  
    
    render(){   
        let not=this.props.notification;
        this.state.notificationLength=0;
        for(var i=0;i<this.props.notification.length;i++){
            if(this.props.notification[i].show=="false"){
                this.state.notificationLength+=1;
            }
        }
        //this.state.notificationLength=this.props.notification.length;
       if(this.props.notification.length===0 && this.props.shownotificationmodel){
        this.state.modal=true;
        this.props.onNotificationClose();
        }
        let thisUserBranchNumber ='';
        if(this.props.branchnumber==='Talpiot'){
            thisUserBranchNumber='תלפיות';
        }
        else if(this.props.branchnumber==='GivatShaul'){
            thisUserBranchNumber='גבעת שאול';
        }
    
        else if(this.props.branchnumber==='Modiin'){ //branchNumber
            thisUserBranchNumber='מודיעין';
        }
          
        let userProfileImage;
        if(this.props.profileimage==='anime7'){
            userProfileImage = require("../../assets/anime7.jpg");
        }
        else if(this.props.profileimage==='anime12'){
            userProfileImage = require("../../assets/anime12.jpg");
        }

        else if(this.props.profileimage==='anime10'){
            userProfileImage = require("../../assets/anime10.jpg");
        }

         else if(this.props.profileimage==='anime9'){
            userProfileImage = require("../../assets/anime9.jpg");
        }

        else if(this.props.profileimage==='anime2'){
            userProfileImage = require("../../assets/anime2.png");
        }

        else if(this.props.profileimage==='anime13'){
            userProfileImage = require("../../assets/anime13.jpg");
        }
        const { icon, title, ...otherProps } = this.props;
    return (
        <Row   className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            <Row vertical="center" style={{position: "left"}}>
            <div style={{display: "flex"}}>  

            {window.innerWidth > '500' ?
            <span className={this.props.backgroundcolor==='light' ?
                css(styles.title)
                : css(styles.title, styles.titleDark)} >סניף {thisUserBranchNumber}</span>
               
                :

                <span className={this.props.backgroundcolor==='light' ?
                css(styles.title)
                : css(styles.title, styles.titleDark)} >{thisUserBranchNumber}</span>
    }
{/* 
                {this.props.userPermissions ==='Master'  ?

<form style={{marginBottom: "2px"}}>
{(() => {
  
//     this.state.vehicleData.manufactureYear.value= this.state.carDetails.manufactureYear;
//        if(this.state.car_data[9] !== undefined ){
//     this.state.vehicleData.manufactureYear.value = this.state.car_data[9]; 
// } 
      
 })()}
  <label for="branchChangeForMaster">שינוי סניף</label>
  <select  id="branchChangeForMaster" class="form-control"    
   value={ this.state.branchChangeForMaster}  
   onChange={(event) => this.inputCarChangedHandler(event)}>
    <option></option>
        <option>תלפיות</option>
        <option>גבעת שאול</option>
        <option>מודיעין</option> 
  </select>
</form>
             : null       
           
                } */}
                </div>
               </Row>
            <Row vertical="center" style={{position: "left"}}>
                <form id="header" className={css(styles.iconStyles)}>

                <Button style={{fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",fontsize: "9rem",borderRadius: "4px",boxSizing: "content-box",padding: "8px 16px", margin: "4px"}}
                onClick={this.onNotificationClick}>
                    <Badge color="secondary" badgeContent={this.state.notificationLength}>
                        <IconBellNew/>
                    </Badge> 
                </Button>

                {this.props.shownotificationmodel && this.props.notification.length!==0 ? <ShowMessages /> : null }
                {this.state.modal ?
                alert("אין הודעות חדשות",this.modalClose())
                : null }
                {/* <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="form-group">
                אין הודעות חדשות
            </div>
            <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >סגור</Button> 
          </Modal> */}
                </form>
                <div className={css(styles.separator)}></div> 
                <Row vertical="center">
                    <span className={this.props.backgroundcolor==='light' ?
                    css(styles.name, styles.cursorPointer)
                    : css(styles.name, styles.cursorPointer,styles.nameDark)}>שלום,{' '}{title}</span> 
                    <img src={userProfileImage} alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
                </Row>
                <SettingsIcon onClick={() => this.onSettingClick()} 
                style={{fontSize:"large",cursor: "pointer",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",fontsize: "9rem",borderRadius: "4px",boxSizing: "content-box",padding: "8px 16px", margin: "4px"}}/>
              
               {this.props.showsettingmodel ? <FixedPlugin /> : null }

            </Row>
            {/*
            <GooglePicker clientId={'741474190729-lt27j6e7a0ui96hkjo528bru8nfl1214.apps.googleusercontent.com'}
              developerKey={'AIzaSyAssXpUUKyyrAw-CkkUWbIMewCoshxGuq8'}
              scope={['https://www.googleapis.com/auth/drive']}
              onChange={data => console.log('on change:', data)}
              onAuthFailed={data => console.log('on auth failed:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              viewId={'DOCS'}
              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
              createPicker={ (google, oauthToken) => {
                const googleViewId = google.picker.ViewId.DOCS;
                const uploadView = new google.picker.DocsUploadView();
                const docsView = new google.picker.DocsView(googleViewId)
                    .setIncludeFolders(true)
                    .setSelectFolderEnabled(true);

                const picker = new window.google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                  .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .addView(docsView)
                    .addView(uploadView)
                    .setOAuthToken(oauthToken)
                    .setDeveloperKey('AIzaSyAssXpUUKyyrAw-CkkUWbIMewCoshxGuq8')
                    .setCallback((data)=>{
                      if (data.action == google.picker.Action.PICKED) {
                          var fileId = data.docs[0].id;
                          alert('The user selected: ' + fileId);
                          this.state.fileId.push("https://drive.google.com/file/d/"+fileId+"/view");
                          //picker();
                      }
                    });
                picker.build().setVisible(true);
            }}>
            <span>Click here</span>
            <div className="google"></div>
        </GooglePicker>
        */
    }
        </Row>
    )
    }
}


HeaderComponent.propTypes = {
    title: string
};

const mapStateToProps = state => {
    return {
        branchnumber: state.auth.branchNumber,
        showsettingmodel: state.auth.showSettingModel,
        backgroundcolor: state.auth.backgroundColor,
        profileimage: state.auth.profileImage,
        token: state.auth.token,
        notification: state.notification.notification,
        userkey: state.auth.userKey,
        userid: state.auth.userId,
        notificationkey: state.notification.notificationId,
        loading: state.notification.loading,
        shownotificationmodel: state.notification.showNotificationModel,
        userpermissions: state.auth.userPermissions
    

    };
};



const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onSettingOpening: () => dispatch( actions.SettingOpening() ),
    onSettingClose: () => dispatch( actions.SettingClose() ),
    onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey)),
    // onNotificationDelete:(token,branchNumber,userKey,notificationKey ,userId)=>dispatch(actions.notificationDelete(token,branchNumber,userKey,notificationKey ,userId)),
    onFetchUsers: (token,userId) => dispatch( actions.fetchUsers(token, userId)), 
    onNotificationOpening: () => dispatch( actions.NotificationOpening() ),
    onNotificationClose: () => dispatch( actions.NotificationClose() ),
    onNotificationUpdate: (updateData,token,branchNumber,userKey,userId,notificationKey) => dispatch( actions.notificationUpdate(updateData,token,branchNumber,userKey,userId,notificationKey) ),

  };
};

export default connect( mapStateToProps,mapDispatchToProps)( HeaderComponent );