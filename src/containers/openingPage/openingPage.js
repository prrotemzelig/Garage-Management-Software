/* eslint-disable no-undef */
import React, { Component } from 'react';
import './openingPage.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
//import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity} from '../../shared/utility'; 

$('input[type="submit"]').click(function(){
    $('.login').addClass('test')
    setTimeout(function(){
      $('.login').addClass('testtwo')
    },300);
    setTimeout(function(){
      $(".authent").show().animate({right:-320},{easing : 'easeOutQuint' ,duration: 600, queue: false });
      $(".authent").animate({opacity: 1},{duration: 200, queue: false }).addClass('visible');
    },500);
    setTimeout(function(){
      $(".authent").show().animate({right:90},{easing : 'easeOutQuint' ,duration: 600, queue: false });
      $(".authent").animate({opacity: 0},{duration: 200, queue: false }).addClass('visible');
      $('.login').removeClass('testtwo')
    },2500);
    setTimeout(function(){
      $('.login').removeClass('test')
      $('.login div').fadeOut(123);
    },2800);
    setTimeout(function(){
      $('.success').fadeIn();
    },3200);
  });
  
  $('input[type="text"],input[type="password"]').focus(function(){
    $(this).prev().animate({'opacity':'1'},200)
  });
  $('input[type="text"],input[type="password"]').blur(function(){
    $(this).prev().animate({'opacity':'.5'},200)
  });
  
  $('input[type="text"],input[type="password"]').keyup(function(){
    if(!$(this).val() == ''){
      $(this).next().animate({'opacity':'1','right' : '30'},200)
    } else {
      $(this).next().animate({'opacity':'0','right' : '20'},200)
    }
  });
  
  var open = 0;
  $('.tab').click(function(){
    $(this).fadeOut(200,function(){
      $(this).parent().animate({'left':'0'})
    });
  });
class openingPage extends Component {
    
    state = {
        controls: {
            branchNumber: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Talpiot', displayValue: 'תלפיות'},
                        {value: 'GivatShaul', displayValue: 'גבעת שאול'},
                        {value: 'Modiin', displayValue: 'מודיעין'}
                    ]
                },
                value: 'Talpiot',
                validation: {},
                valid: true,
                touched: false,
                text: ' סניף'
            },
            email: {
                elementType: 'input',
               
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                text: ' כתובת מייל'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'הכנס/י סיסמא'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                text: ' סיסמא'
            }
        },
        isSignup: true
    }

    inputChangedHandler = ( event ) => {
        event.preventDefault(); // we call this to prevent the reloading of the page

        const updatedControls = updateObject( this.state.controls, { // pass the old object we want to update
            [event.target.id]: updateObject( this.state.controls[event.target.id], { //here we want to update the control name
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[event.target.id].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
        console.log(this.state.controls);
    }

    submitHandler = (event) => {
        event.preventDefault(); // we call this to prevent the reloading of the page

        if(this.state.controls.email.value==='' && this.state.controls.password.value===''){
            alert('נא להכניס כתובת מייל וסיסמא'); 
        }
        else if(this.state.controls.email.value===''){
            alert('נא להכניס כתובת מייל'); 
        }
        else if(this.state.controls.password.value===''){
            alert('נא להכניס סיסמא'); 
        }
        else{
        //console.log("71" + this.state.controls.branchNumber.value);
        console.log(this.state.controls.email.value);
        console.log(this.state.controls.password.value);
        console.log(this.state.controls.branchNumber.value);
        this.props.onAuthSignIn(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.branchNumber.value); // pass email value and password value
        //this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup, this.state.controls.branchNumber.value); // pass email value and password value
    }
}

    
    render() {
        
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        
        return ( 
            <body class="body">
            <div>
            <div class="brand">
            <a>
              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/logo.png' alt=""/>
            </a>
          </div>
          <div class="login">

          

            <div class="login_title">
                {!this.props.loading?
          <div class="authent">
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg' alt=""/>
            <p>Authenticating...</p>
          </div>: null}
              <span>התחבר לחשבונך</span>
            </div>
            <div class="login_fields">

            <form class="login_fields__user">
                <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png' alt=""/>
                </div>
                
                {/* <input placeholder='סניף' type='text' style={{width: "100%"}} class="input"  autocomplete="off"/> */}
                  {/* <div class='validation'>
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'/>
                  </div> */}
                {/* </input> */}
             

                <select placeholder='סניף' type='text' id="branchNumber" onChange={(event) => this.inputChangedHandler(event)}
                style={{width: "99%",cursor: "pointer", color: "#afb1be",marginTop: "-2px",background: "#32364a",left: "0",padding: "10px 65px",borderTop: "2px solid #393d52",borderBottom: "2px solid #393d52",borderRight: "none",borderLeft: "none",outline: "none",boxShadow: "none",  fontFamily: "Alef Hebrew"}} class="input"  autocomplete="off">
                      <option>בחר/י סניף</option>
                      <option>תלפיות</option>
                      <option>גבעת שאול</option>
                      <option>מודיעין</option>
            
                  </select>
              </form>


              <form class="login_fields__user">
                <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/user_icon_copy.png' alt=""/>
                </div>
                
                <input placeholder='כתובת מייל' id="email" type='text' style={{width: "99%"}} class="input"  autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}/>
                  {/* <div class='validation'>
                    <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png'/>
                  </div> */}
                {/* </input> */}
              </form>

              <div class="login_fields__password" autocomplete="off" >
                <div class="icon">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/lock_icon_copy.png' alt=""/>
                </div>
                <form>
                <input placeholder='סיסמא' id="password" type='password' style={{width: "99%"}} class="input"  autocomplete="off" onChange={(event) => this.inputChangedHandler(event)}/>
                </form>
                <div class="validation">
                  <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tick.png' alt=""/>
                </div>
              </div>

              <div class="login_fields__submit">
                <input type='submit' value='כניסה' class="input" onClick={(event) => this.submitHandler(event)}/>
               
              </div>

              <div class="login_fields__submit">
                <div class="forgot">
                  <a alt="">שכחת סיסמא? פנה למנהל</a>
                </div>
              </div>
            </div>
            <div class="success">
              <h2>Authentication Success</h2>
              <p>Welcome back</p>
            </div>
            <div class="disclaimer">
              <p>ברוכים הבאים למוסכניק האתר הטוב ביותר לניהול המוסך שלך! כאן תוכל לנהל באופן מלא את המוסך שלך ולקבל את חווית המשתמש הטובה ביותר</p>
            </div>
          </div>
          {/* {this.props.loading?
          <div class="authent">
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg' alt=""/>
            <p>Authenticating...</p>
          </div>: null} */}
          <div class="love">
            <p>נעשה ב <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/love_copy.png" alt=""/> על ידי <a > רותם ואריאל </a></p>
          </div>
       
 </div>
 </body>

        )
    }
}


const mapStateToProps = state => { // for displat the spinner
    return {
        loading: state.auth.loading, // we take access to auth
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => { // we do this to be able to dispatch something here via props in this component
    
    return {
        onAuthSignIn: (email, password,branchNumber) => dispatch(actions.authSignIn(email, password,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        //onAuth: (email, password, isSignup,branchNumber) => dispatch(actions.auth(email, password,isSignup,branchNumber)), // "onAuth" - is a method which holds a reference to a method where we will eventually dispatch our action - and we want to dispatch the auto action
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
        
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( openingPage );

//export default openingPage;

// <div class="page">
// <div class="container">
//   <div class="left">
//     <div class="login">Login</div>
//     <div class="eula">By logging in you agree to the ridiculously long terms that you didn't bother to read</div>
//   </div>
//   <div class="right">
//     <svg viewBox="0 0 320 300">
//       <defs>
//         <linearGradient
//                         collect="always"
//                         id="linearGradient"
//                         x1="13"
//                         y1="193.49992"
//                         x2="307"
//                         y2="193.49992"
//                         gradientUnits="userSpaceOnUse">
//           <stop
//                 style={{stopColor:"#ff00ff"}}
//                 offset="0"
//                 id="stop876" />
//           <stop
//                 style={{stopColor:"#ff0000"}}
//                 offset="1"
//                 id="stop878" />
//         </linearGradient>
//       </defs>
//       <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
//     </svg>
//     <div class="form">
//       <label for="email">Email</label>
//       <input type="email" id="email"/>
//       <label for="password">Password</label>
//       <input type="password" id="password"/>
//       <input type="submit" id="submit" value="Submit"/>
//     </div>
//   </div>
// </div>
// </div>



{/* <div  style={{ backgroundColor: "rgb(247, 248, 252)"}}> 
<form className={classes.Opening}>
    <p><strong>ברוכים הבאים למוסכניק</strong></p> 
    <p> האתר הטוב ביותר לניהול המוסך שלך</p> 
    <p> כאן תוכל לנהל באופן מלא את המוסך שלך</p> 
    <p> ולקבל את חווית המשתמש הטובה ביותר</p> 
</form> 
</div>   */}

