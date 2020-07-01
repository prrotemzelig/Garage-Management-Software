//import React from 'react';
import React, {Component} from 'react';
import * as actions from '../../store/actions/index';

import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import IconSearch from '../../assets/icon-search';
import IconBellNew from '../../assets/icon-bell-new';
import { connect } from 'react-redux';
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.js";
import SettingsIcon from '@material-ui/icons/Settings';
import { StreamApp, NotificationDropdown,FlatFeed } from 'react-activity-feed';
import { Modal ,Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
            position: 'fixed'

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
          modal: false,
          sidebarOpened:
            document.documentElement.className.indexOf("nav-open") !== -1
        };
     }
     componentDidMount() { 
        this.props.onFetchNotification(this.props.token, this.props.userId, this.props.branchnumber,this.props.UserKey); 
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
    notify = () =>{
        let notification=this.props.notification;
        console.log(this.props.notification);
        for(var i=0;i<notification.length;i++){
            if(notification[i].type=="task"){
                let notificationData=notification[i].description+":נוספה משימה חדשה "+'\n';
                notificationData+='\n'+notification[i].openedBy+" על ידי";
                //this.props.onNotificationDelete(this.props.token,this.props.branchnumber,this.props.UserKey,notification[i].id,this.props.userId);

                toast.info(notificationData);
                //this.deleteNotification(notification[i].id);
            }
        }
        this.deleteNotification();
        if(notification.length==0){
            this.modalOpen();
            //this.setState({ modal: true });
        }
    } 

    deleteNotification = () =>{
        let notification=this.props.notification;
        console.log(this.props.notification);

        for(var i=0;i<notification.length;i++){
            console.log(this.props.branchnumber+" "+this.props.UserKey+" "+notification[i].id+" "+this.props.userId);
            this.props.onNotificationDelete(this.props.token,this.props.branchnumber,this.props.UserKey,notification[i].notificationKey,this.props.userId);
        }
    }

    render(){        
        
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
        if(this.props.profileimage==='anime3'){
            userProfileImage = require("../../assets/anime3.png");
        }
        else if(this.props.profileimage==='anime6'){
            userProfileImage = require("../../assets/anime6.png");
        }

        const { icon, title, ...otherProps } = this.props;
        
    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>
            <Row vertical="center" style={{position: "left"}}>

            <span className={this.props.backgroundcolor==='light' ?
                css(styles.title)
                : css(styles.title, styles.titleDark)} >סניף {thisUserBranchNumber}</span>
               </Row>
            <Row vertical="center" style={{position: "left"}}>
                <div className={css(styles.iconStyles)}>
                    <IconSearch />
                </div>
                <div className={css(styles.iconStyles)}>
                <button onClick={this.notify}><IconBellNew /></button>
                <div>
                <ToastContainer
                position="top-left"
                autoClose={false}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                </div>
                <Modal show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <div className="form-group">
                אין הודעות חדשות
            </div>
            <Button bsStyle="secondary" style={{borderColor: "black"}}  onClick={e => this.modalClose(e)} >סגור</Button> 
            
          </Modal>
                </div>
                <div className={css(styles.separator)}></div> 
                <Row vertical="center">
                    <span className={this.props.backgroundcolor==='light' ?
                    css(styles.name, styles.cursorPointer)
                    : css(styles.name, styles.cursorPointer,styles.nameDark)}>שלום,{' '}{title}</span> 
                    <img src={userProfileImage} alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
                </Row>
                <SettingsIcon onClick={() => this.onSettingClick()} 
                style={{fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",fontsize: "9rem",borderRadius: "4px",boxSizing: "content-box",padding: "8px 16px", margin: "4px"}}/>
              
               {this.props.showsettingmodel ? <FixedPlugin /> : null }

            </Row>
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
        UserKey: state.auth.userKey,
        userId: state.auth.userId,
        notificationKey: state.notification.notificationId,
        loading: state.notification.loading





    };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onSettingOpening: () => dispatch( actions.SettingOpening() ),
    onSettingClose: () => dispatch( actions.SettingClose() ),
    onFetchNotification: (token, userId,branchNumber,userKey)=>dispatch(actions.fetchNotification(token, userId,branchNumber,userKey)),
    onNotificationDelete:(token,branchNumber,userKey,notificationKey ,userId)=>dispatch(actions.notificationDelete(token,branchNumber,userKey,notificationKey ,userId))

  };
};

export default connect( mapStateToProps,mapDispatchToProps)( HeaderComponent );