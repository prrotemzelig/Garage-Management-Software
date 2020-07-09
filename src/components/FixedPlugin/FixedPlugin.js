
import React, { Component } from "react";
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-cards';
import * as actions from '../../store/actions/index';

// import { Button } from "reactstrap";
import classes from './fixedPlugin.module.css';
// import SettingsIcon from '@material-ui/icons/Settings';

class FixedPlugin extends Component {
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



  
  handleSidebarBgClick = (color,kind) => {
  //  console.log(color);
    this.props.onUpdateSettingUser(color,kind,this.props.token,this.props.branchNumber,this.props.userKey,this.props.userId); // this contains all the data of card
     

  };

  activateMode = mode => {
    switch (mode) {
      case "light":
        document.body.classList.add("white-content");
        break;
      default:
        document.body.classList.remove("white-content");
        break;
    }
  };

  render() {
    return (
      <div className={classes.fixedPlugin}>
        <div className={this.state.classes}>
          <div onClick={this.handleClick}>
          </div>
          <ul className={classes.dropdownMenu}>
            <div className={classes.headerTitle}>רקע סרגל הצד</div>
            <div className={classes.adjustmentsLine}>
              <div className={classes.badgeColors}>
                <span
                  className={
                    this.props.sidebarBackgroundColor === "primary"
                      ? (classes.badgePrimaryActive)
                      : (classes.badgePrimary)
                  }
                  data-color="primary"
                  onClick={() => {
                    this.handleSidebarBgClick("primary",'sidebarBackgroundColor');
                  }}
                />{" "}
                <span
                  className={
                    this.props.sidebarBackgroundColor === "blue"
                      ? (classes.badgeInfoActive) 
                      : (classes.badgeInfo)
                  }
                  data-color="blue"
                  onClick={() => {
                    this.handleSidebarBgClick("blue",'sidebarBackgroundColor');
                  }}
                />{" "}
                <span
                  className={
                    this.props.sidebarBackgroundColor === "green"
                      ? (classes.badgeSuccessActive)
                      : (classes.badgeSuccess)
                  }
                  data-color="green"
                  onClick={() => {
                    this.handleSidebarBgClick("green",'sidebarBackgroundColor');
                  }}
                />{" "}
              </div>
            </div>
            <div className={classes.adjustmentsLine} >
              <span className={classes.colorLabel}>מצב בהיר</span>{" "}
              <span
                className={[classes.lightBadge,classes.badge].join(' ')}
                onClick={() => {
                  this.handleSidebarBgClick("light",'backgroundColor');
                }}
            
              />{" "}
              <span
                className={[classes.darkBadge,classes.badge ].join(' ')}
                onClick={() => {
                  this.handleSidebarBgClick("dark",'backgroundColor');
                }}
          
              />{" "}
              <span className={classes.colorLabel}>מצב כהה</span>{" "}
            </div>

            <div className={classes.block}> 
            <div className={classes.headerTitle}>תמונה אישית</div>
            <div className={classes.adjustmentsLine}>
              <div className={classes.badgeColors}>
               <div> 
              <img src={require("../../assets/anime7.jpg")} alt="avatar"  className={classes.avatar} 
              onClick={() => { this.handleSidebarBgClick("anime7",'profileImage'); }}/>
              <img src={require("../../assets/anime12.jpg")} alt="avatar"  className={classes.avatar}
              onClick={() => { this.handleSidebarBgClick("anime12",'profileImage'); }} />
              <img src={require("../../assets/anime10.jpg")} alt="avatar"  className={classes.avatar} 
              onClick={() => { this.handleSidebarBgClick("anime10",'profileImage');}}/>
               <img src={require("../../assets/anime9.jpg")} alt="avatar"  className={classes.avatar} 
              onClick={() => { this.handleSidebarBgClick("anime9",'profileImage');}}/>
               <img src={require("../../assets/anime2.png")} alt="avatar"  className={classes.avatar} 
              onClick={() => { this.handleSidebarBgClick("anime2",'profileImage');}}/>
               <img src={require("../../assets/anime13.jpg")} alt="avatar"  className={classes.avatar} 
              onClick={() => { this.handleSidebarBgClick("anime13",'profileImage');}}/>
              </div>
        
              </div>
            </div>
        </div>

          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => { // here we get the state and return a javascript object
  return {
      token: state.auth.token,
      userId: state.auth.userId,
      branchNumber: state.auth.branchNumber,
      userKey: state.auth.userKey,
      backgroundColor: state.auth.backgroundColor,
      profileImage: state.auth.profileImage,
      sidebarBackgroundColor: state.auth.sidebarBackgroundColor,
     

  };
};

const mapDispatchToProps = dispatch => { // for this to work we need to connect this constant "mapDispatchToProps" with our component 
  return {
    onUpdateSettingUser: (updateData,field,token,branchNumber,userKey,userId) => dispatch( actions.updateSettingUser(updateData,field,token,branchNumber,userKey,userId) )

  };
};


export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(FixedPlugin,axios));

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