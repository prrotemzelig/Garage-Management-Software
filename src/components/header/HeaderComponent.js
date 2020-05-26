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
        width: '95%',        
        marginBottom: '20px'
    },
    cursorPointer: {
        cursor: 'pointer'
    },
    name: {
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
        '@media (max-width: 768px)': {
            marginRight: 36 // marginLeft: 36
        },
        '@media (max-width: 468px)': {
            fontSize: 20
        }
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
          backgroundColor: "blue",
          sidebarOpened:
            document.documentElement.className.indexOf("nav-open") !== -1
        };
     }

    //  handleBgClick = color => {
    //     this.setState({ backgroundColor: color });
    //     console.log(this.state.backgroundColor);
    //   };
 
    onSettingClick = () =>  {
        if(!this.props.showSettingModel){
        this.props.onSettingOpening(); // this contains all the data of card 
        }
        else{
            this.props.onSettingClose(); // this contains all the data of card 
        }
    }  
    render(){

        let thisUserBranchNumber ='';
        if(this.props.branchNumber==='Talpiot'){
            thisUserBranchNumber='תלפיות';
        }
        else if(this.props.branchNumber==='GivatShaul'){
            thisUserBranchNumber='גבעת שאול';
    
        }
    
        else if(this.props.branchNumber==='Modiin'){
            thisUserBranchNumber='מודיעין';
    
        }
          
        let userProfileImage;
        
        if(this.props.profileImage==='anime3'){
            userProfileImage = require("../../assets/anime3.png");
        }
        else if(this.props.profileImage==='anime6'){
            userProfileImage = require("../../assets/anime6.png");
        }


        const { icon, title, ...otherProps } = this.props;

    return (
        <Row className={css(styles.container)} vertical="center" horizontal="space-between" {...otherProps}>

            <span className={css(styles.title)}>סניף {thisUserBranchNumber}</span>
            
            <Row vertical="center">
                <div className={css(styles.iconStyles)}>
                    <IconSearch />
                </div>
                <div className={css(styles.iconStyles)}>
                    <IconBellNew />
                </div>
                <div className={css(styles.separator)}></div> 
                <Row vertical="center">
                    <span className={css(styles.name, styles.cursorPointer)}>שלום,{title}</span>
                    <img src={userProfileImage} alt="avatar" className={css(styles.avatar, styles.cursorPointer)} />
                </Row>
                <SettingsIcon onClick={() => this.onSettingClick()} 
                style={{fontSize:"large",color: "white", backgroundColor: "rgba(0, 0, 0, 0.3)",fontsize: "9rem",borderRadius: "4px",boxSizing: "content-box",padding: "8px 16px", margin: "4px"}}/>
               {this.props.showSettingModel ?
               <FixedPlugin
                  
                />
                : null}
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
        firstName: state.auth.firstName,
        branchNumber: state.auth.branchNumber,
        showSettingModel: state.auth.showSettingModel,
        sidebarBackgroundColor: state.auth.sidebarBackgroundColor,
        backgroundColor: state.auth.backgroundColor,
        profileImage: state.auth.profileImage

    };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onSettingOpening: () => dispatch( actions.SettingOpening() ),
    onSettingClose: () => dispatch( actions.SettingClose() )

  };
};

export default connect( mapStateToProps,mapDispatchToProps)( HeaderComponent );
//export default HeaderComponent;
